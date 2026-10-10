<div align="center">

# 🧺 বাজারদর

**আজকের বাজারের দাম এক নজরে**

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং আগের দিনের তুলনা এক জায়গায়।

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐_লাইভ_সাইট-দেখুন-0a7c42?style=for-the-badge)](https://bazar-dor-cgzi.vercel.app/)

[🌐 লাইভ ডেমো](https://bazar-dor-cgzi.vercel.app/)

---

## 📖 পরিচিতি

🔗 **লাইভ সাইট:** [https://bazar-dor-cgzi.vercel.app/](https://bazar-dor-cgzi.vercel.app/)

**বাজারদর** একটি বাংলা ভাষার ওয়েব অ্যাপ, যেখানে নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর সহজে দেখা যায়। প্রতিটি পণ্যের জন্য দেখা যায় কোন বাজারে কত দাম, গড় দাম কত, এবং গতকালের তুলনায় দাম বেড়েছে না কমেছে।

## ✨ ফিচার

- 🛒 **সব পণ্য এক নজরে:** ক্যাটাগরিভিত্তিক পণ্যের তালিকা ও আজকের দাম
- 📊 **দামের সারসংক্ষেপ:** সর্বনিম্ন, সর্বাধিক ও গড় দাম, সাথে কোন বাজারে সেই দাম
- 🏪 **বাজারভিত্তিক তুলনা:** বাজার ও বিভাগ অনুযায়ী আলাদা দামের টেবিল
- 📈 **দামের পরিবর্তন:** গতকালের তুলনায় বাড়া/কমার পরিমাণ ও শতাংশ (▲ লাল / ▼ সবুজ)
- 🔐 **সাইন-ইন সুরক্ষা:** পণ্যের বিস্তারিত দেখতে সাইন-ইন করতে হয়
- 🔢 **বাংলা সংখ্যা ও একক:** সব সংখ্যা ও পরিমাপ বাংলায় প্রদর্শিত
- 📱 **রেসপন্সিভ ডিজাইন:** মোবাইল, ট্যাবলেট ও ডেস্কটপে সমান সুন্দর

## 🛠️ ব্যবহৃত প্রযুক্তি

| বিষয় | প্রযুক্তি |
|---|---|
| ফ্রেমওয়ার্ক | [Next.js](https://nextjs.org/) (App Router) |
| ভাষা | TypeScript |
| UI | React, [Tailwind CSS](https://tailwindcss.com/), [HeroUI](https://www.heroui.com/) |
| আইকন | [Lucide React](https://lucide.dev/) |
| নোটিফিকেশন | [react-hot-toast](https://react-hot-toast.com/) |
| ফন্ট | Hind Siliguri (Google Fonts) |
| হোস্টিং | [Vercel](https://vercel.com/) |



## 🚀 লোকালে চালানোর নিয়ম

**প্রয়োজনীয় জিনিস:** Node.js 18.18 বা তার ওপরে, এবং npm।

```bash
# ১. রিপোজিটরি ক্লোন করুন
git clone https://github.com/Kowshikkantidasbd/bazar-dor.git
cd bazar-dor

# ২. ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ৩. ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```

এরপর ব্রাউজারে [http://localhost:3000](http://localhost:3000) খুলুন।

### প্রোডাকশন বিল্ড

```bash
npm run build
npm start
```

## 🔑 এনভায়রনমেন্ট ভেরিয়েবল

প্রজেক্টের রুটে `.env.local` ফাইল বানিয়ে প্রয়োজনীয় মান দিন। **এই ফাইল কখনো GitHub-এ পুশ করবেন না।**

```env
# উদাহরণ (আপনার ব্যবহৃত অথ/API অনুযায়ী বদলান)
GITHUB_ID=আপনার_client_id
GITHUB_SECRET=আপনার_client_secret
```

Vercel-এ ডেপ্লয় করলে একই ভেরিয়েবলগুলো **Project Settings → Environment Variables**-এ যোগ করুন।

## ☁️ ডেপ্লয়

1. কোড GitHub-এ পুশ করুন
2. [Vercel](https://vercel.com/)-এ রিপোজিটরি ইমপোর্ট করুন
3. এনভায়রনমেন্ট ভেরিয়েবল যোগ করুন
4. **Deploy** চাপুন। এরপর প্রতিটি `git push`-এ নিজে থেকেই নতুন ডেপ্লয় হবে

## 🗺️ ভবিষ্যৎ পরিকল্পনা

- [ ] দামের ইতিহাসের গ্রাফ
- [ ] পণ্য সার্চ ও ফিল্টার
- [ ] প্রিয় পণ্যের তালিকা
- [ ] দাম বদলালে নোটিফিকেশন
- [ ] ডার্ক মোড

## 🤝 অবদান রাখুন

1. রিপোজিটরি **Fork** করুন
2. নতুন ব্রাঞ্চ খুলুন: `git checkout -b feature/amazing-feature`
3. কমিট করুন: `git commit -m "Add amazing feature"`
4. পুশ করুন: `git push origin feature/amazing-feature`
5. একটি **Pull Request** খুলুন

