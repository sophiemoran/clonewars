(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, frequency, endFrequency, start, duration, gainAmount, type) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainAmount, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, 520, 760, start, 0.12, 0.12, 'triangle');
      } catch (error) {}
    },
    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, 660, 880, start, 0.14, 0.14, 'sine');
        tone(context, 880, 1180, start + 0.09, 0.16, 0.14, 'sine');
      } catch (error) {}
    },
    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, 180, 70, start, 0.24, 0.18, 'sawtooth');
        tone(context, 95, 45, start, 0.28, 0.1, 'square');
      } catch (error) {}
    }
  };
})();
