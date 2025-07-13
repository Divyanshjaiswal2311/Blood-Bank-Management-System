# Blood Bank Management System

A full-stack web application for managing blood donations, donors, hospitals, and organizations. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features
- User authentication (register/login)
- Role-based dashboards (Admin, Donor, Hospital, Organization)
- Blood donation and inventory management
- Certificate generation for donors (with QR code)
- Analytics and reporting
- Responsive UI with modern design

## Tech Stack
- **Frontend:** React, Redux, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Other:** JWT Auth, REST API, Vercel/Render deployment

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas account (or local MongoDB)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Divyanshjaiswal2311/Blood-Bank-Management-System.git
   cd Blood-Bank-Management-System
   ```
2. **Install backend dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root with:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     DEV_MODE=development
     ```
4. **Start the backend server:**
   ```bash
   npm start
   ```
5. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```
6. **Start the frontend app:**
   ```bash
   npm start
   ```

## Deployment
- **Frontend:** Vercel or Netlify
- **Backend:** Render, Railway, or Cyclic
- **Database:** MongoDB Atlas

## Screenshots
_Add screenshots of the main pages here_

## Developer
**Divyanshu Jaiswal**

---
Feel free to contribute or raise issues!

## Deployment Options

### 1. **Backend Deployment** (Node.js/Express)
Popular platforms:
- **Render** (recommended for beginners)
- **Railway**
- **Heroku**
- **DigitalOcean App Platform**
- **AWS EC2**

### 2. **Frontend Deployment** (React)
Popular platforms:
- **Vercel** (recommended for React)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

### 3. **Database**
Your current setup uses **MongoDB Atlas** (cloud database), which is perfect for deployment.

## Environment Variables for Deployment

### Backend Production `.env` Variables:

```env
# Production Server Configuration
PORT=5000
DEV_MODE=production
NODE_ENV=production

# Database Configuration (keep your current MongoDB Atlas URL)
MONGO_URL=mongodb+srv://divyanshujais2311:Divyanshu2311@cluster0.axtqnf1.mongodb.net/

# JWT Configuration (use a stronger secret for production)
JWT_SECRET=your-super-secure-production-jwt-secret-key-2024
JWT_EXPIRE=7d

# CORS Configuration (add your frontend domain)
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Production `.env` Variables:

Create a `.env` file in the `client` folder:

```env
<code_block_to_apply_changes_from>
```

## Step-by-Step Deployment Guide

### Step 1: Prepare Your Code

1. **Update API.js** to use environment variables:
