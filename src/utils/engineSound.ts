/**
 * Web Audio Engine Sound Generator
 * Generates interactive synthetic engine rumble, idle, and throttle revs
 * without external audio file dependencies.
 */

class EngineSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private currentRPM = 900;
  private targetRPM = 900;
  private idleRPM = 900;
  private redlineRPM = 8800;
  private soundType: 'v8' | 'v12' | 'ev' | 'turbo' = 'v12';

  // Audio Nodes
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private animationFrameId: number | null = null;
  private onRpmChangeCallbacks: ((rpm: number) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribeRPM(cb: (rpm: number) => void) {
    this.onRpmChangeCallbacks.push(cb);
    return () => {
      this.onRpmChangeCallbacks = this.onRpmChangeCallbacks.filter(c => c !== cb);
    };
  }

  private emitRPM(rpm: number) {
    this.onRpmChangeCallbacks.forEach(cb => cb(rpm));
  }

  public start(type: 'v8' | 'v12' | 'ev' | 'turbo' = 'v12') {
    this.initContext();
    if (!this.ctx) return;
    if (this.isRunning) {
      this.stop();
    }

    this.soundType = type;
    this.isRunning = true;
    this.targetRPM = type === 'ev' ? 200 : 900;
    this.idleRPM = type === 'ev' ? 200 : 900;
    this.redlineRPM = type === 'v12' ? 9000 : type === 'v8' ? 7800 : type === 'ev' ? 18000 : 7200;
    this.currentRPM = this.idleRPM;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.3, now + 0.15);
    this.masterGain.connect(ctx.destination);

    // Filter
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = type === 'ev' ? 'bandpass' : 'lowpass';
    this.filterNode.frequency.setValueAtTime(type === 'ev' ? 400 : 250, now);
    this.filterNode.Q.setValueAtTime(type === 'ev' ? 4 : 2, now);
    this.filterNode.connect(this.masterGain);

    if (type === 'ev') {
      // EV Sound: dual sine waves + sweeping resonance
      this.osc1 = ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(80, now);

      this.osc2 = ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(160, now);

      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.osc1.start();
      this.osc2.start();
    } else {
      // Combustion engines (V8, V12, Turbo)
      this.osc1 = ctx.createOscillator();
      this.osc1.type = type === 'v12' ? 'sawtooth' : 'triangle';
      this.osc1.frequency.setValueAtTime(type === 'v12' ? 55 : 38, now);

      this.osc2 = ctx.createOscillator();
      this.osc2.type = 'sawtooth';
      this.osc2.frequency.setValueAtTime(type === 'v12' ? 110 : 76, now);

      this.subOsc = ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(type === 'v12' ? 27.5 : 19, now);

      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.subOsc.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();
      this.subOsc.start();
    }

    this.loopUpdate();
  }

  private loopUpdate = () => {
    if (!this.isRunning || !this.ctx) return;

    // Smooth RPM interpolation
    const lerpRate = this.targetRPM > this.currentRPM ? 0.08 : 0.04;
    this.currentRPM += (this.targetRPM - this.currentRPM) * lerpRate;

    const baseFreqMultiplier = this.soundType === 'v12' ? 0.045 : this.soundType === 'v8' ? 0.03 : this.soundType === 'ev' ? 0.06 : 0.035;
    const freq1 = Math.max(20, this.currentRPM * baseFreqMultiplier);
    const freq2 = freq1 * (this.soundType === 'v12' ? 2 : 1.5);
    const filterFreq = this.soundType === 'ev' 
      ? 200 + (this.currentRPM / this.redlineRPM) * 3200 
      : 180 + (this.currentRPM / this.redlineRPM) * 1600;

    const now = this.ctx.currentTime;
    if (this.osc1) {
      this.osc1.frequency.setValueAtTime(freq1, now);
    }
    if (this.osc2) {
      this.osc2.frequency.setValueAtTime(freq2, now);
    }
    if (this.subOsc) {
      this.subOsc.frequency.setValueAtTime(freq1 * 0.5, now);
    }
    if (this.filterNode) {
      this.filterNode.frequency.setValueAtTime(filterFreq, now);
    }

    this.emitRPM(Math.round(this.currentRPM));
    this.animationFrameId = requestAnimationFrame(this.loopUpdate);
  };

  public setThrottle(isPressed: boolean) {
    if (!this.isRunning) return;
    if (isPressed) {
      // Rev up toward 80-95% of redline
      this.targetRPM = this.redlineRPM * (0.85 + Math.random() * 0.08);
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.48, this.ctx.currentTime + 0.1);
      }
    } else {
      // Settle down to idle
      this.targetRPM = this.idleRPM;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 0.2);
      }
    }
  }

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.subOsc?.stop();
          this.noiseNode?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.subOsc?.disconnect();
        } catch {
          // ignore
        }
      }, 350);
    }
    this.emitRPM(0);
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      currentRPM: this.currentRPM,
      redlineRPM: this.redlineRPM,
      soundType: this.soundType
    };
  }
}

export const engineSound = new EngineSoundEngine();
