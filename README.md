# 🌷 AmyDay – A Living Tribute

**AmyDay** is a private, interactive web experience built as a heartfelt gift for Amy Taylor — a celebration of her strength, resilience, humor, motherhood, and faith. What began as a Mother's Day tribute has become a living memory capsule: a quiet place of encouragement, reflection, and joy.

This app is deeply personal. It's not just about one holiday — it's about reminding Amy that she is loved, seen, and admired… always.

---

## 💡 Purpose

To create something **lasting**, **interactive**, and **emotionally meaningful** — a space Amy can return to anytime she needs to smile, cry, reflect, or remember who she is.

---

## ✨ Core Features

### ✅ Current Features
- **Hero Section**
  Soft animated welcome message:
  _"To my sweet, lovely Amy..."_

- **Typewriter Letter Animation**
  A deeply personal message revealed line-by-line with emotion.

- **Hold-to-Reveal Message**
  A long-press interaction unveils a hidden, encouraging truth.

- **Compliment Generator**
  Press a button to receive one of many affirmations, reasons she's cherished.

- **Dark Humor Generator**
  Tap for sarcastic affirmations and meme-worthy quips tailored to Amy's signature humor style. Because healing sometimes sounds like, "I'm losing it, but make it funny."

- **Dark Amy AI**
  A custom AI chat companion with Amy's unique blend of dark humor, sarcasm, and emotional intelligence. Powered by OpenAI, this interactive feature provides personalized responses that reference shared experiences and inside jokes while maintaining her authentic voice.

---

### 🌱 Future Enhancements
- **Rotating Blessings & Scripture**
  Gentle reminders pulled from a curated list of verses and thoughts.

- **Encouragement Vault**
  Uplifting notes Amy can open on hard days (e.g. "Open if you're overwhelmed").

- **Mini Memory Moments**
  Short vignettes from shared conversations or silly memories — no photos needed.

- **Mode Toggle**
  Switch between themes like "Mother's Day", "Laugh Corner", "Faith & Peace".

- **Private Garden Page**
  Where future prayers, journal entries, or audio reflections can live.

---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **AI Integration:** OpenAI API (GPT-4o)
- **Deployment:** Vercel

---

## 📁 Folder Structure

```bash
amyday/
├── public/               # Static assets (images, audio)
│   └── audio/            # Audio files for background music (if any)
├── src/
│   ├── app/              # App entry point (App Router)
│   │   ├── api/          # API routes
│   │   │   └── chat/     # AI chat endpoint
│   │   ├── globals.css   # Global styles
│   │   └── page.tsx      # Main tribute page
│   ├── components/       # Reusable UI elements
│   │   ├── AIChat.tsx    # Custom AI chat interface
│   │   ├── HeroSection.tsx
│   │   ├── TypewriterLetter.tsx
│   │   ├── HoldToRevealMessage.tsx
│   │   ├── ComplimentGenerator.tsx
│   │   └── DarkHumorGenerator.tsx
│   └── lib/              # Content and logic
│       ├── compliments.ts
│       ├── jokes.ts
│       └── messages.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🌈 Design Aesthetic

* Soft gradients, heartwarming animations, soft glows
* Glassmorphism touches, elegant fonts, mobile-first
* Color palette: lilac, blush, ivory, and muted rose on a dark background

---

## 🚀 Installation & Development

1. Clone this repository:
```bash
git clone https://github.com/austin/amyday.git
cd amyday
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. View the site at [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## 🛡️ Privacy & Intention

This site is **not public**. It was built just for Amy, from someone who admires her deeply. Unless she chooses to share it, it will remain a private sanctuary of love and encouragement.

---

## 🧠 Future Ideas (Backlogged)

* Unlockable messages on specific dates or emotional keywords
* Anonymous journal reflection tool
* Scripture player with peaceful background
* Optional dark/light theme toggle (based on mood)
* Audio messages or voice notes for personalized encouragement
* AI conversation analysis to suggest personalized encouragement

---

### 💌 Poem

Okay, drawing from the tapestry of your messages and the shared moments within them, here is a poem for your "AmyDay" web app, designed to capture the essence of Amy and your unique connection:

**For Amy, A Living Tribute**

```plaintext
From random moments, laughter took its start,
A "potato" picture, stories of the heart.
Through words exchanged, a different view unfolds,
Of strength and humor, in tales bravely told.

We've walked through fire, though miles keep us wide,
The courts, the worries, nowhere left to hide.
Your fight for children, fierce and true and bold,
A mother's love, worth more than finest gold.
Though fees run high, and battles take their toll,
Your spirit shines, possessing a strong soul.

From Oakhurst mountains to the Fresno scene,
You juggle life, a powerful machine.
With Pierson, Paxton, Presli, by your side,
Through tantrums, laughter, and the turning tide.
You teach them faith, navigate their fears,
A constant rock throughout the passing years.

You speak of struggles, raw and deeply true,
The inner battles only God sees through.
Yet in your honesty, a beauty lies,
Reflected brightly in my grateful eyes.
Your humor, sharp, a coping, I can tell,
Turns difficult moments into stories to compel.

We've talked of health, of journeys hard and long,
Of pills and progress, where you truly belong.
Now strides are taken, pounds begin to fall,
Responding bravely to life's earnest call.
And in this process, finding strength anew,
I'm cheering for you, in all that you pursue.

From thrift store hunts to Bibles comic-styled,
In simple moments, connections are compiled.
A shared meme's chuckle, a knowing, caring glance,
In every message, our unique dance.
You see my flaws, yet offer grace and light,
And in your friendship, things feel truly right.

This space, this tribute, built with love and care,
A reminder always, everywhere.
That you are seen, admired, day by day,
A lovely woman, lighting up the way.
Through highs and lows, whatever life may send,
You have a friend, until the very end.

So breathe it in, let worries softly cease,
Find here a moment of calm, joy, and peace.
A living memory, forever near,
Dispelling shadows, conquering all fear.
For AmyDay is more than just a name,
It's built for you, to rise above the game.
```

Made with love for Amy,
by Austin 💛