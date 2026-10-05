/**
 * Audio Engine supporting both external MP3 audio file and
 * an elegant Web Audio API crystal music-box synthesizer fallback!
 */

class AudioController {
  constructor() {
    this.audioElement = null;
    this.audioCtx = null;
    this.analyser = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.synthInterval = null;
    this.synthStep = 0;
    this.listeners = new Set();
    this.frequencyData = new Uint8Array(16);
    this.mode = 'idle'; // 'audio' | 'synth' | 'idle'
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      mode: this.mode,
    }));
  }

  init(src = '/music/birthday.mp3') {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.src = src;
    this.audioElement.loop = true;
    this.audioElement.volume = 0.45;
    this.audioElement.preload = 'auto';

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.mode = 'audio';
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('error', () => {
      console.log('Audio file not found or failed to load, switching to crystal music-box synth fallback.');
      if (this.isPlaying) {
        this.startSynth();
      }
    });
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 32;
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  play() {
    this.getAudioContext();

    if (!this.audioElement) {
      this.init();
    }

    // Try playing the audio file first
    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.mode = 'audio';
          this.notify();
        })
        .catch(() => {
          // If error playing file (e.g. 404 or format issue), start crystal music box
          this.startSynth();
        });
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Delicate crystal music box playing a dreamy "Happy Birthday" melody
   * Notes: C4, C4, D4, C4, F4, E4 | C4, C4, D4, C4, G4, F4 | C4, C4, C5, A4, F4, E4, D4 | Bb4, Bb4, A4, F4, G4, F4
   */
  startSynth() {
    this.stopSynth();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isPlaying = true;
    this.mode = 'synth';
    this.notify();

    // Frequencies for Happy Birthday in key of F major
    const notes = [
      { f: 261.63, d: 0.35 }, // C4 Hap-
      { f: 261.63, d: 0.25 }, // C4 py
      { f: 293.66, d: 0.55 }, // D4 birth-
      { f: 261.63, d: 0.55 }, // C4 day
      { f: 349.23, d: 0.55 }, // F4 to
      { f: 329.63, d: 0.95 }, // E4 you...
      { f: null, d: 0.2 },

      { f: 261.63, d: 0.35 }, // C4 Hap-
      { f: 261.63, d: 0.25 }, // C4 py
      { f: 293.66, d: 0.55 }, // D4 birth-
      { f: 261.63, d: 0.55 }, // C4 day
      { f: 392.00, d: 0.55 }, // G4 to
      { f: 349.23, d: 0.95 }, // F4 you...
      { f: null, d: 0.2 },

      { f: 261.63, d: 0.35 }, // C4 Hap-
      { f: 261.63, d: 0.25 }, // C4 py
      { f: 523.25, d: 0.55 }, // C5 birth-
      { f: 440.00, d: 0.55 }, // A4 day
      { f: 349.23, d: 0.55 }, // F4 dear
      { f: 329.63, d: 0.55 }, // E4 be-
      { f: 293.66, d: 0.85 }, // D4 stie...
      { f: null, d: 0.2 },

      { f: 466.16, d: 0.35 }, // Bb4 Hap-
      { f: 466.16, d: 0.25 }, // Bb4 py
      { f: 440.00, d: 0.55 }, // A4 birth-
      { f: 349.23, d: 0.55 }, // F4 day
      { f: 392.00, d: 0.55 }, // G4 to
      { f: 349.23, d: 1.20 }, // F4 you!
      { f: null, d: 0.8 },
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlaying || this.mode !== 'synth') return;

      const current = notes[noteIndex];
      if (current.f) {
        this.playMusicBoxChime(current.f, current.d);
      }

      noteIndex = (noteIndex + 1) % notes.length;
      const delay = (current.d + 0.12) * 1000;
      this.synthInterval = setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  playMusicBoxChime(freq, duration = 0.5) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Primary bell sine tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Shimmer harmonic overtone for music box sparkle
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2.01, now);

      // Gentle bell envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

      overtoneGain.gain.setValueAtTime(0.001, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc.connect(gain);
      overtone.connect(overtoneGain);

      if (this.analyser) {
        gain.connect(this.analyser);
        overtoneGain.connect(this.analyser);
        this.analyser.connect(ctx.destination);
      } else {
        gain.connect(ctx.destination);
        overtoneGain.connect(ctx.destination);
      }

      osc.start(now);
      overtone.start(now);

      osc.stop(now + duration + 0.9);
      overtone.stop(now + duration + 0.9);
    } catch (e) {
      console.warn('Audio chime note error:', e);
    }
  }

  stopSynth() {
    if (this.synthInterval) {
      clearTimeout(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // Play a celebratory chime (e.g. for candle blowout or make-a-wish)
  playSparkleChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playMusicBoxChime(freq, 0.8);
      }, idx * 80);
    });
  }

  getVisualizerData() {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData);
      return Array.from(this.frequencyData.slice(0, 5));
    }
    return [0, 0, 0, 0, 0];
  }
}

export const audioController = new AudioController();
