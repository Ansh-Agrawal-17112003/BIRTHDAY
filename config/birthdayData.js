/**
 * ==============================================================================
 * 🎂 BIRTHDAY SURPRISE CONFIGURATION
 * ==============================================================================
 * 
 * Customize this file with your best friend's details!
 * Every section below is commented so you know exactly what to change.
 * 
 * 1. Friend's Name & Nicknames
 * 2. Opening Screen Words
 * 3. Main Celebration Titles
 * 4. Heartfelt Letter / Birthday Message
 * 5. Memories & Photos (replace placeholder image URLs with your friend's photos)
 * 6. Wishes (all 6 wishes can be customized)
 * 7. Make-a-Wish Interactive Cake
 * 8. Final Surprise Message
 * 9. Music File Path
 * ==============================================================================
 */

export const birthdayData = {
  // ---------------------------------------------------------------------------
  // 1. FRIEND'S IDENTITY
  // ---------------------------------------------------------------------------
  friendName: "Bestie", // Replace with your best friend's real name (e.g. "Sophia", "Aarav", "Elena")
  nickname: "Sunshine", // A cute nickname or special term of endearment

  // ---------------------------------------------------------------------------
  // 2. OPENING SCREEN (The mysterious initial prompt)
  // ---------------------------------------------------------------------------
  opening: {
    firstLine: "Hey You... 💫",
    secondLine: "I have something special for you...",
    buttonText: "Open Your Birthday Surprise 🎁",
  },

  // ---------------------------------------------------------------------------
  // 3. MAIN BIRTHDAY CELEBRATION (Hero Section)
  // ---------------------------------------------------------------------------
  hero: {
    badge: "✨ IT'S YOUR SPECIAL DAY ✨",
    title: "HAPPY BIRTHDAY! 🎉",
    subtitle: "To an absolutely beautiful soul ❤️",
    tagline: "Today the world became a brighter, warmer, and much more wonderful place.",
    cakeQuote: "Make every moment as sweet as today!",
  },

  // ---------------------------------------------------------------------------
  // 4. HEARTFELT LETTER / MESSAGE
  // Edit the paragraphs below to say whatever comes straight from your heart!
  // ---------------------------------------------------------------------------
  letter: {
    sectionTitle: "From My Heart To Yours",
    headerQuote: "Today isn't just about celebrating your birthday... it's about celebrating the beautiful person you are.",
    paragraphs: [
      "From the countless conversations that stretched deep into the night to the quiet moments where just having you around made everything feel lighter, I am endlessly grateful for your presence in my life.",
      "You bring so much natural kindness, warmth, and effortless joy everywhere you go. Your laughter is contagious, your heart is pure gold, and the genuine care you show to people around you is something truly rare and precious.",
      "On this special day, I wish you endless peace, boundless love, unforgettable adventures, and every ounce of happiness this universe has to offer. May doors open for you in ways you never imagined, and may your journey always be guided by wonder and light.",
    ],
    closingQuote: "Never stop being the beautiful soul that you are. ❤️",
    senderSignature: "With all my love & gratitude,",
    senderName: "Your Best Friend Forever 💖",
  },

  // ---------------------------------------------------------------------------
  // 5. MEMORIES GALLERY (Polaroid Cards)
  // Replace the 'image' URLs with paths to your friend's photos!
  // Tip: You can drop images into `public/memories/` and link them as:
  //      image: "/memories/my-photo.jpg"
  // ---------------------------------------------------------------------------
  memories: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
      caption: "The laughs 😂",
      note: "That day we laughed so hard our stomachs hurt and our eyes were full of happy tears.",
      rotation: "-3deg",
      tapeColor: "bg-pink-300/60",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      caption: "The crazy moments 🤪",
      note: "Spontaneous adventures that made zero sense at the time, but made the absolute best stories.",
      rotation: "2.5deg",
      tapeColor: "bg-purple-300/60",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      caption: "The unforgettable memories ✨",
      note: "Quiet sunsets, deep conversations, and the comfort of knowing you'll always have my back.",
      rotation: "-2deg",
      tapeColor: "bg-amber-300/60",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      caption: "And all the moments yet to come ❤️",
      note: "Here is to 100 more years of making unforgettable memories, inside jokes, and celebrating life together.",
      rotation: "3deg",
      tapeColor: "bg-rose-300/60",
    },
  ],

  // ---------------------------------------------------------------------------
  // 6. A FEW WISHES FOR YOU
  // The 6 warm wishes revealed on scroll
  // ---------------------------------------------------------------------------
  wishes: [
    {
      icon: "🌸",
      highlight: "May your smile never fade.",
      detail: "May your days be filled with endless reasons to smile that genuine, eye-crinkling smile.",
    },
    {
      icon: "✨",
      highlight: "May your dreams become reality.",
      detail: "Every quiet wish you whisper to the stars, may life fulfill each and every one.",
    },
    {
      icon: "💫",
      highlight: "May success find you wherever you go.",
      detail: "May all your hard work, dedication, and passion blossom into incredible achievements.",
    },
    {
      icon: "❤️",
      highlight: "May you always be surrounded by people who truly care about you.",
      detail: "May you always feel cherished, celebrated, safe, and deeply appreciated.",
    },
    {
      icon: "🌎",
      highlight: "May life give you countless beautiful memories.",
      detail: "Filled with new places, unforgettable sunsets, and warm stories to tell for a lifetime.",
    },
    {
      icon: "🎂",
      highlight: "And may every birthday be even more special than the last.",
      detail: "Because someone as extraordinary as you deserves celebrations beyond measure.",
    },
  ],

  // ---------------------------------------------------------------------------
  // 7. INTERACTIVE "MAKE A WISH" CAKE
  // ---------------------------------------------------------------------------
  interactiveWish: {
    buttonLabel: "Make a Wish ✨",
    promptText: "Close your eyes, make a silent wish in your heart... and blow out the candles!",
    actionText: "Tap or click the candles to blow them out 🎂",
    postBlowText: "May your wish come true... ✨❤️",
    postBlowSubtext: "Sent with all the magic and love in the universe into the stars.",
  },

  // ---------------------------------------------------------------------------
  // 8. FINAL CINEMATIC SURPRISE
  // ---------------------------------------------------------------------------
  finalSurprise: {
    line1: "One Last Thing...",
    line2: "Thank you for being you.",
    line3: "Happy Birthday to one of the most beautiful souls I've ever known. ❤️",
    grandTitle: "HAPPY BIRTHDAY, BEAUTIFUL SOUL! 🎂✨❤️",
    replayText: "Replay the Surprise 💫",
  },

  // ---------------------------------------------------------------------------
  // 9. BACKGROUND MUSIC
  // Put your MP3 file into `public/music/birthday.mp3` or change this path.
  // (A synthesized music box plays automatically as a fallback!)
  // ---------------------------------------------------------------------------
  music: {
    src: "/music/birthday.mp3",
    title: "Happy Birthday Melodic Box",
    artist: "Ambient Magic",
  },
};
