# 🌶️ ANU HOME FOODS

> A modern, responsive Full-Stack E-Commerce web application for authentic, homemade Andhra pickles and traditional foods.

---

## 📋 Overview

**ANU HOME FOODS** brings traditional homemade Andhra pickles (Veg & Non-Veg) directly to customers. Built with a **React + Vite** frontend and a **Node.js + Express** REST API backend, the platform provides a seamless shopping experience from product discovery to checkout.

---

## ✨ Features

- **🌶️ Product Catalog**: Explore a curated selection of authentic Andhra pickles (Avakaya, Gongura, Chicken Pickle, Mutton Pickle, Prawns Pickle, etc.).
- **🔍 Filtering & Categories**: Filter by category (Veg Pickles, Non-Veg Pickles, Bestsellers).
- **⚖️ Dynamic Weight Selection**: Choose from 250g, 500g, or 1kg options with dynamic price calculation.
- **🛒 Shopping Cart & Wishlist**: Context-driven real-time cart update, total calculation, and wishlist saved items.
- **💳 Checkout System**: Streamlined order placement with customer shipping information and order summary.
- **🔐 User Authentication**: User registration, login, and profile tracking.
- **📞 Direct Communication**: Floating widgets for quick WhatsApp order inquiry and direct phone calls.
- **📱 Fully Responsive**: Custom CSS layout optimized for Mobile, Tablet, and Desktop displays.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: `react-router-dom` (v6)
- **Icons**: `lucide-react`
- **State Management**: React Context API (`AuthContext`, `CartContext`, `WishlistContext`)
- **Styling**: Modern Modular Vanilla CSS with CSS custom variables

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Middleware**: `cors`, `dotenv`, `express.json`
- **Architecture**: Modular Controller-Route architecture (`/api/products`, `/api/orders`, `/api/auth`)

### **Database**
- **Database Engine**: [MySQL](https://www.mysql.com/)
- **Schema**: Structured relational tables for `products`, `users`, `orders`, and `order_items` (`database/schema.sql`).

---

## 📁 Project Structure

```text
Anu-git/
├── backend/                  # Node.js + Express REST API Server
│   ├── config/               # Database and app configurations
│   ├── controllers/          # API Route handlers (products, orders, auth)
│   ├── routes/               # Express endpoint definitions
│   ├── package.json          # Backend dependencies & scripts
│   └── server.js             # Main server entry point
├── database/                 # Database scripts
│   └── schema.sql            # MySQL schema setup script
├── frontend/                 # React + Vite Client Application
│   ├── public/               # Static assets & favicon
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Footer, Widgets)
│   │   ├── context/          # State management (Auth, Cart, Wishlist)
│   │   ├── data/             # Static product data & fallbacks
│   │   ├── pages/            # Page components (Home, Shop, Cart, Checkout, etc.)
│   │   ├── services/         # API integration services
│   │   └── styles/           # Modular CSS files
│   ├── index.html            # Entry HTML page
│   ├── vite.config.js        # Vite build & server settings
│   └── package.json          # Frontend dependencies & scripts
├── .gitignore                # Root gitignore rules
└── README.md                 # Project documentation
```

---

## 🚀 Quick Start & Installation

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [MySQL Database](https://www.mysql.com/) (Optional for REST API persistence)

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SHALEMMARAPAKULA/Anu-Home-Foods.git
cd Anu-Home-Foods
```

---

### 2️⃣ Database Setup (Optional)
Run the SQL schema in your MySQL client to set up the `anu_home_foods` database:
```bash
mysql -u root -p < database/schema.sql
```

---

### 3️⃣ Frontend Setup
Open a terminal window and run:
```bash
cd frontend
npm install
npm run dev
```
The frontend web application will start at `http://localhost:5173`.

---

### 4️⃣ Backend Setup
Open a **separate terminal window** and run:
```bash
cd backend
npm install
npm run dev
```
The Express REST API backend server will start at `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server status check |
| `GET` | `/api/products` | Retrieve all pickles |
| `GET` | `/api/products/:id` | Retrieve single product details |
| `POST` | `/api/orders` | Place a new order |
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Login user |

---

## 📄 License

This project is created for **ANU HOME FOODS**. All rights reserved.
