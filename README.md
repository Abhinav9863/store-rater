# Store Rating Web Application

This is a full-stack web application. It provides a platform for users to rate stores, with dedicated dashboards and functionalities for three distinct user roles: Normal User, Store Owner, and System Administrator.

---

## Core Technologies

* **Frontend:** React (with Vite), React Router, Axios, Material-UI (MUI)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens), bcryptjs for password hashing

---

## Features Implemented

### General
- Secure user registration and login system with role-based access control.
- Light and Dark mode theme toggle.
- Ability for any logged-in user to update their password.

### Normal User
- View a list of all stores, sorted by highest rating.
- Live search for stores by both name and address from the navbar.
- Submit a new 1-5 star rating for any store.
- View and modify their previously submitted ratings.

### System Administrator
- Secure dashboard with overview statistics (total users, stores, ratings).
- Full CRUD (Create, Read, Update, Delete) management for stores.
- View a complete list of all users in the system.
- Filter and sort the user list by name, email, or role.

### Store Owner
- Secure dashboard showing data only for their assigned store.
- View their store's overall average rating.
- View a list of all users who have submitted a rating for their store.

---

## How to Run Locally

### Prerequisites
- Node.js
- PostgreSQL

### 1. Backend Setup
```sh
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your PostgreSQL credentials
# (See .env.example for a template if provided)

# Start the server
npm start