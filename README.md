
# 🛒 বাজার দর | BazarDor

### Know Today's Market Prices at a Glance

**বাজার দর (BazarDor)** is a web application that helps users explore daily market prices of essential products in Bangladesh. It provides a simple, user-friendly interface for checking product prices, comparing price changes, and browsing products by category.

## 🚀 Technologies Used

- **Next.js 16** — React framework for building the web application
- **React** — Component-based user interface
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling and UI design
- **Better Auth** — Authentication and account management
- **MongoDB** — Database for application data
- **React Toastify** — Success and error notifications
- **Vercel** — Deployment and hosting

## ✨ Key Features

1. **📊 Daily Market Prices**  
   View today's prices of essential market products in one place.

2. **🔎 Category-Based Browsing**  
   Browse products by category to find specific items easily.

3. **↕️ Product Sorting**  
   Sort products by price from low to high, high to low, or by price change.

4. **📈 Price Change Indicators**  
   Quickly identify whether a product's price has increased, decreased, or remained unchanged.

5. **🔐 User Authentication**  
   Create an account and sign in using email and password, Google, or GitHub.

## 🖥️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Required authentication credentials for enabled OAuth providers

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd bazar-dor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables:

   ```env
   MONGODB_URL=your_mongodb_connection_string

   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Live Demo

[https://bazar-dor-ql1w.vercel.app/]

## 👨‍💻 Author

**Sudipto Roy**

- GitHub: [(https://github.com/sudiptoroy12/Bazar-Dor)]

---

⭐ If you find this project useful, consider giving it a star!
