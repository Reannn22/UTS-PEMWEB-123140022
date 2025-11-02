# CryptoTracker 📈

A comprehensive cryptocurrency tracking application built with React, featuring real-time price updates, portfolio management, and advanced charting.

![CryptoTracker Homepage](./src/assets/images/screenshots/homepage.jpeg)

## ✨ Features

### 🏠 Homepage

- Modern, responsive hero section
- Quick access to key features
- Real-time cryptocurrency statistics
- Smooth animations and transitions

|                                  Desktop                                   |                                  Mobile                                  |
| :------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![Homepage Desktop](./src/assets/images/screenshots/homepage-desktop.jpeg) | ![Homepage Mobile](./src/assets/images/screenshots/homepage-mobile.jpeg) |

### 📊 Cryptocurrency List

- Real-time price updates
- Advanced filtering options:
  - Trending coins
  - Top gainers/losers
  - Price-based sorting
- Search functionality
- Responsive table/card views
- Pagination support

|                                     Desktop                                     |                                    Mobile                                     |
| :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| ![Crypto List Desktop](./src/assets/images/screenshots/cryptolist-desktop.jpeg) | ![Crypto List Mobile](./src/assets/images/screenshots/cryptolist-mobile.jpeg) |

### 📈 Chart Analysis

- Interactive price charts
- Multiple timeframes (24H, 7D, 30D, 90D, 1Y)
- Chart types:
  - Line chart with area
  - Candlestick chart
- Price and volume indicators
- Responsive design

Features:

- Line and Candlestick charts
- Multiple timeframes
- Price indicators
- Volume analysis

|                               Desktop                                |                               Mobile                               |
| :------------------------------------------------------------------: | :----------------------------------------------------------------: |
| ![Chart Desktop](./src/assets/images/screenshots/chart-desktop.jpeg) | ![Chart Mobile](./src/assets/images/screenshots/chart-mobile.jpeg) |

### 💼 Portfolio Calculator

- Add/remove coins
- Real-time portfolio valuation
- Holdings breakdown
- Search and add any cryptocurrency
- Persistent storage

|                                   Desktop                                    |                                   Mobile                                   |
| :--------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| ![Portfolio Desktop](./src/assets/images/screenshots/portfolio-desktop.jpeg) | ![Portfolio Mobile](./src/assets/images/screenshots/portfolio-mobile.jpeg) |

### 📱 Mobile Features

- Responsive navigation
- Touch-friendly interface
- Mobile-optimized charts
- Swipe gestures
- Bottom navigation

### 🌐 Internationalization

- Multi-language support (English & Indonesian)
- Currency conversion
- Localized number formatting

### 🎨 Theme Support

- Light/Dark mode
- Persistent theme preference
- Smooth transitions

### 📧 Contact Form

- Desktop
- Mobile

|                                 Desktop                                  |                                 Mobile                                 |
| :----------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| ![Contact Desktop](./src/assets/images/screenshots/contact-desktop.jpeg) | ![Contact Mobile](./src/assets/images/screenshots/contact-mobile.jpeg) |

## 🚀 Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Chart.js
- Context API
- Local Storage
- Vercel Deployment

## 🌐 Live Demo
[View Demo](https://uts-pemweb-123140022.vercel.app/)

## 📁 Project Structure

```
.
├── public/                    # Static files
│   ├── data/                 # JSON data files
│   ├── favicon.ico           # Site favicon
│   ├── index.html           # HTML template
│   ├── manifest.json        # PWA manifest
│   └── robots.txt          # SEO robots file
│
├── src/
│   ├── assets/
│   │   ├── icons/          # SVG icons
│   │   │   ├── chevron-down.svg
│   │   │   ├── chevron-left.svg
│   │   │   ├── chevron-right.svg
│   │   │   ├── chevron-up.svg
│   │   │   ├── github.svg
│   │   │   ├── languages.svg
│   │   │   ├── linkedin.svg
│   │   │   ├── moon.svg
│   │   │   ├── refresh-cw.svg
│   │   │   ├── search.svg
│   │   │   └── sun.svg
│   │   └── images/
│   │       ├── logo/
│   │       │   └── CryptoTracker.png
│   │       └── screenshots/
│   │           ├── chart-mobile.jpeg
│   │           ├── contact-desktop.jpeg
│   │           ├── contact-mobile.jpeg
│   │           ├── cryptolist-desktop.jpeg
│   │           ├── cryptolist-mobile.jpeg
│   │           ├── homepage-desktop.jpeg
│   │           ├── homepage-mobile.jpeg
│   │           ├── homepage.jpeg
│   │           └── portfolio-mobile.jpeg
│   │
│   ├── components/          # React components
│   │   ├── charts/         # Chart components
│   │   ├── common/         # Shared components
│   │   ├── layout/         # Layout components
│   │   ├── pages/         # Page components
│   │   └── index.js
│   │
│   ├── context/            # React contexts
│   ├── hooks/             # Custom hooks
│   ├── styles/            # CSS styles
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Root component
│   └── index.js          # Entry point
│
├── .env                   # Environment variables
├── .env.production       # Production env vars
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies
├── postcss.config.js    # PostCSS config
├── README.md           # Documentation
├── tailwind.config.js  # Tailwind config
└── vercel.json        # Vercel deployment
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- CoinGecko API Key

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/Reannn22/UTS-PEMWEB-123140022.git
cd UTS-PEMWEB-123140022
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Setup environment variables
Create a `.env` file in the root directory:
```env
REACT_APP_COINGECKO_API_KEY=your_coingecko_api_key
```

4. Run the development server
```bash
npm start
# or
yarn start
```

5. Build for production
```bash
npm run build
# or
yarn build
```

6. Deploy
Follow the deployment instructions for your preferred hosting provider.

## 🚀 Deployment to Vercel

### Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli)
- [Git](https://git-scm.com/downloads)

### Steps to Deploy

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Configure Environment Variables in Vercel
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings > Environment Variables
   - Add the following variables:
     ```
     REACT_APP_COINGECKO_API_KEY=your_api_key
     REACT_APP_COINGECKO_API_URL=https://api.coingecko.com/api/v3
     ```

4. Deploy
```bash
vercel --prod
```

### Automatic Deployments

1. Push your code to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect to Vercel
- Go to [Vercel Dashboard](https://vercel.com/new)
- Import your GitHub repository
- Configure project settings:
  - Framework Preset: Create React App
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Install Command: `npm install`

3. Environment Variables
- Add the same environment variables in the Vercel project settings

Your app will now automatically deploy on every push to the main branch.

## 🔑 Getting CoinGecko API Key

1. Create CoinGecko Account
   - Visit [CoinGecko](https://www.coingecko.com/)
   - Click "Sign Up" in the top right corner
   - Fill in your details and create account
   - Verify your email address

2. Subscribe to API Plan
   - Go to [CoinGecko API Plans](https://www.coingecko.com/en/api/pricing)
   - Choose your plan (Demo/Basic works for this project)
   - Click "Subscribe"
   - Complete the subscription process

3. Get Your API Key
   - Navigate to [API Dashboard](https://www.coingecko.com/en/api/dashboard)
   - Under "API Keys", you'll find your key
   - Copy the API key

4. Add API Key to Project
   ```env
   REACT_APP_COINGECKO_API_KEY=your_copied_api_key_here
   REACT_APP_COINGECKO_API_URL=https://api.coingecko.com/api/v3
   ```

5. API Rate Limits
   - Demo: 10-30 calls/minute
   - Basic: 50 calls/minute
   - Higher tiers available for more requests

Note: Keep your API key secret and never commit it to version control.

