# 💐 AmyDay – A Mother's Day Tribute

A special interactive web experience built just for Amy — to celebrate her beauty, strength, and kindness on Mother’s Day.

This project is a personal expression of appreciation, created using modern web tools and heartfelt creativity.

---

## 🌟 Live Preview

> _Coming soon – deployed on Vercel_

---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Components:** Shadcn UI (optional), Canvas API
- **Deployment:** Vercel

---

## 📁 Folder Structure

```

amyday/
├── public/               # Static assets (images, audio)
├── src/
│   ├── app/              # App Router entry
│   │   └── page.tsx      # Main tribute page
│   ├── components/       # Reusable UI elements
│   │   ├── TypewriterLetter.tsx
│   │   ├── ScratchCard.tsx
│   │   ├── ComplimentGenerator.tsx
│   │   ├── RevealMessage.tsx
│   │   ├── Confetti.tsx
│   │   └── VoicePlayer.tsx
│   ├── lib/
│   │   ├── compliments.ts
│   │   └── messages.ts
│   └── styles/           # Tailwind CSS config
├── tailwind.config.ts
├── tsconfig.json
└── README.md             # This file

````

---

## 💖 Features

### ✅ V1 Core Features

- **Hero Section:**
  Graceful landing with custom greeting:
  _"To my sweet, lovely Amy..."_

- **Typewriter Letter Animation:**
  Slowly reveals a heartfelt message, line-by-line

- **Press & Hold Reveal:**
  Long-press interaction to uncover a hidden, deeper message

---

### 🎁 V2 Optional Features

- **Scratch Card Surprise:**
  Canvas-based interaction that reveals a message or future date offer

- **Compliment Generator:**
  "Reasons I Adore You" button that cycles through sweet affirmations

- **Voice Player:**
  Optional narrated version of the letter with soft background music

---

## 🌈 Design Aesthetic

- Soft, elegant, and romantic
- Subtle gradients, glowing text, heart/confetti animations
- Responsive layout (mobile-first)

---

## 🚀 Getting Started

From your main code repo folder:

```bash
pnpm create next-app amyday -- --ts --app --tailwind --eslint --src-dir
cd amyday
pnpm dev
````

Now go to `http://localhost:3000`

---

## 🧠 Notes

This site is for Amy only. It will remain private unless explicitly shared.

Made with love by Austin 💛