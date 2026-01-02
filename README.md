# 💄 Faye Beauty

![Faye Beauty Logo](/public/readmelogo.png)

Faye Beauty is a modern and responsive cosmetics e-commerce web application built to deliver a smooth, intuitive, and visually appealing shopping experience.
It enables users to explore beauty products, view detailed product information, manage their cart, and place orders securely, while ensuring fast data handling and seamless UI interactions.

---

## 🌐 Live Demo

- **Frontend:** https://faybeauty-frontend-yigo.vercel.app
- **Backend API:** https://faybeauty-backend-api.onrender.com

---

## ✨ Features

### 🛍️ User Features
- Browse cosmetics products by category
- View product details with images and pricing
- Add products to cart
- Secure checkout and order placement
- User authentication (Email & Google OAuth)
- Order history tracking

### 🛠️ Admin Features
- Product management (Add / Update / Delete)
- Order management
- User management
- Dashboard with sales & order insights

---

## 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Query (for efficient data fetching & caching)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Google OAuth
- Nodemailer (Email verification & OTP)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure
```
src/
│
├── api/ # API route definitions
├── assets/ # Images, icons, static assets
├── components/ # Reusable UI components
├── config/ # App & environment configurations (axios)
├── hooks/ # Custom React hooks
├── pages/ # Application pages (routes)
├── services/ # API service functions
├── utils/ # Helper & utility functions
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```
---

## 📸 Screenshots

### Home Page
![Home Page](/public/screenshots/home.png)

### Product Listing
![Products](/public/screenshots/products.png)

### Admin Dashboard
![Admin Dashboard](/public/screenshots/adminDashboard.png)

### Admin Profile Managemant
![Admin Profile](/public/screenshots/profile.png)

### Cart
![Cart](/public/screenshots/cart.png)

---

## 🔐 Authentication

- Email & password authentication
- Google OAuth login
- JWT-based authorization
- Email verification using OTP

## 📈 Architecture Highlights

- RESTful API design
- Modular MVC backend structure
- Efficient data fetching using React Query
- Secure authentication & authorization flow
- Scalable MongoDB schema design

---

## 🚀 Getting Started

- Follow these steps to run the Faye Beauty frontend locally.

### 📥 Clone the Repository

```
git clone https://github.com/your-username/faye-beauty-frontend.git
cd faye-beauty-frontend
```

### 📦 Install Dependencies

```
npm install
```

### ⚙️ Environment Variables Setup

- Create a .env file in the project root and add the following variables:

```
VITE_BACKEND_URL=https://faybeauty-backend-api.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### ▶️ Run the Development Server

```
npm run dev
```

- The application will be available at:

```
http://localhost:5173
```

---

## 👨‍💻 Author

- Chamod Malindu
- BICT Undergraduate – Uva Wellassa University of Sri Lanka
- Full Stack Developer

---

