import confetti from 'canvas-confetti';

/**
 * Confetti and Fireworks Utility for Birthday Moments
 */

export const triggerCelebration = () => {
  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#f472b6', '#fed7aa', '#fbbf24', '#d8b4fe', '#ffffff'],
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f472b6', '#e879f9', '#fbbf24', '#ffffff'],
    });
  }, 200);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#d8b4fe', '#fed7aa', '#f43f5e', '#ffffff'],
    });
  }, 400);
};

export const triggerHeartBurst = () => {
  const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
  const star = confetti.shapeFromText({ text: '✨', scalar: 2 });

  confetti({
    shapes: [heart, star],
    scalar: 2,
    particleCount: 35,
    spread: 80,
    origin: { y: 0.5 },
    gravity: 0.6,
    ticks: 200,
  });
};

export const triggerGrandFinale = () => {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Multiple fireworks bursts across random viewport coordinates
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ['#f472b6', '#fbbf24', '#d8b4fe', '#f43f5e', '#fed7aa'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ['#c084fc', '#fbcfe8', '#fef08a', '#38bdf8', '#ffffff'],
    });
  }, 300);
};

export const triggerCandleExtinguishParticles = () => {
  const count = 70;
  const defaults = {
    origin: { y: 0.55 },
    colors: ['#fbbf24', '#fed7aa', '#fef08a', '#ffffff', '#f472b6'],
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};
