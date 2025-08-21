# Aloha Technologies Task

This project is a **Full-Stack Web Application** built with:

- **Backend**: Node.js (v20 LTS), Express.js
- **Frontend**: React 19 with Vite
- **Database**: (Add your database name here, e.g., MongoDB, PostgreSQL)
- **Styling**: (e.g., Bootstrap/Tailwind if applicable)

## Overview

This repository contains both the **backend** and **frontend** codebases in a monorepo structure.

---

## Tech Stack

- **Node.js (v20 LTS)** – Backend runtime
- **Express.js** – REST API
- **React 19** – Frontend framework
- **Vite** – Fast build tool for React
- **React Bootstrap** – (If used for UI components)
- **Luxon** – For date/time formatting

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rahul152-ai/alobha-technologies-task
cd aloha-technologies-task
```

## 2. Backend

```bash
cd backend
npm install
cp example.env .env
```

## 3. Edit .env file with your credentials:

```bash
MONGO_URI=Your db url
PORT=5000
JWT_SECRET=rahul345
NODE_ENV=development
```

### 4. Start the backend:

```bash
npm run dev
```

## 5. Frontend Setup

```bash
cd ../frontend
npm install
```

## 6. Create .env file:

```bash
VITE_SERVER_URL=Url of the server

Start the frontend:

npm run dev
```
