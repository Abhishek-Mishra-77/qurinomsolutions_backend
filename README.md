Qurinom Solutions Backend

Backend for the Real-Time Chat App using MERN + Socket.IO.

Features

JWT Authentication (Signup/Login)

Protected Routes

Real-time 1-on-1 chat

MongoDB for users & messages

REST APIs for users & messages

Setup

Clone Repo

git clone https://github.com/Abhishek-Mishra-77/qurinomsolutions_backend.git
cd qurinomsolutions_backend


Install Dependencies

npm install


Environment Variables (.env)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=yourSecretKey
PORT=5000


Run

Development: npm run dev

Production: npm start

API Endpoints

POST /api/auth/signup → Signup

POST /api/auth/login → Login

GET /api/users → All users (protected)

GET /api/messages/:userId → Messages with user (protected)

POST /api/messages → Send message (protected)

Example Credentials
Email	Password
abhishek@gmail.com
	1234567
anurag@gmail.com
	1234567
Deployment

Backend deployed on Render

Health check: GET / → ✅ Backend is alive