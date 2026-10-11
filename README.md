# 🧺 বাজার দর (Bazar Dor)

### Today's Market Prices at a Glance

A Bengali-language web application that provides daily market prices for essential commodities, including rice, lentils, oil, vegetables, fish, meat, eggs, and spices. Compare market-wise prices, average prices, minimum and maximum prices, and daily price changes in one place.

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-Email_%7C_Google_%7C_GitHub-0a7c42)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Site-Visit-0a7c42?style=for-the-badge)](https://bazar-dor-cgzi.vercel.app/)

---

## 📖 Introduction

🔗 **Live Website:** [https://bazar-dor-cgzi.vercel.app/](https://bazar-dor-cgzi.vercel.app/)
📦 **GitHub Repository:** [https://github.com/Kowshikkantidasbd/bazar-dor](https://github.com/Kowshikkantidasbd/bazar-dor)

**Bazar Dor** helps users easily check the daily market prices of essential commodities. Users can explore prices across different markets, view average prices, and compare current prices with those of the previous day.

## ✨ Features

- 🛒 **All Products at a Glance:** Browse products by category and view their current prices.
- 📈 **Price Rise & Fall Sections:** See the top 6 products whose prices rose (▲) and fell (▼) today.
- 📊 **Price Summary:** View minimum, maximum, and average prices, including the markets offering those prices.
- 🏪 **Market-wise Comparison:** Compare prices across different markets and divisions.
- 🔁 **Live Price Ticker:** An infinite scrolling strip showing product prices and percentage changes.
- 🔃 **Category Sorting:** Sort products by default order, price low to high, or price high to low.
- 🔐 **Authentication:** Email/password, Google and GitHub sign-in with Better Auth; product details are a protected route.
- 👤 **Profile & Update:** View your profile and update your name.
- 🔢 **Bengali Numerals and Units:** Display numbers, dates and measurement units in Bengali.
- 📱 **Responsive Design:** Optimized for mobile devices, tablets, and desktops.

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Programming Language | TypeScript |
| UI Library | React |
| CSS Framework | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [HeroUI](https://www.heroui.com/), [DaisyUI](https://daisyui.com/) |
| Authentication | [Better Auth](https://better-auth.com/) |
| Database | [MongoDB](https://www.mongodb.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Page Loader | [nextjs-toploader](https://www.npmjs.com/package/nextjs-toploader) |
| Font | Hind Siliguri (Google Fonts) |
| Hosting | [Vercel](https://vercel.com/) |

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js 18.18 or later
- npm
- A MongoDB database (for example, MongoDB Atlas)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Kowshikkantidasbd/bazar-dor.git
cd bazar-dor
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

BETTER_MONGODB_URL=your_mongodb_connection_string
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## ☁️ Deployment

This project is deployed on [Vercel](https://bazar-dor-cgzi.vercel.app/).

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables listed above in the Vercel project settings (set `BETTER_AUTH_URL` to your live URL).
4. Add the OAuth callback URLs in the Google and GitHub developer consoles:
   - `https://your-domain/api/auth/callback/google`
   - `https://your-domain/api/auth/callback/github`
5. Click **Deploy**.

Vercel automatically redeploys whenever you push changes to the connected branch.

## 🗺️ Future Plans

- [ ] Historical price charts and graphs
- [ ] Product search and filtering
- [ ] Favorite products list
- [ ] Notifications when prices change
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push your branch: `git push origin feature/amazing-feature`
5. Open a Pull Request.

## 📄 License

No license has been specified yet. Add a suitable license if you intend to distribute or allow others to reuse this project.

---

**Built with ❤️ to make daily market prices easier to access.**