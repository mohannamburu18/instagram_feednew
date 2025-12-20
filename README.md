Instagram Feed Clone 📸

<br><br>

Ⅰ. Track Chosen + Why 🎯

<br><br>

Track C – Feed (Instagram-style consumption)

Chosen to demonstrate an interactive, production-minded feed

Includes pagination, modal post viewing, and like/save actions

Highlights frontend UX, API integration, and state management

<br><br>

Ⅱ. Features Implemented 🚀

<br><br>

Frontend (UI) 🎨

<br>

Instagram-style feed grid

Fullscreen post viewer modal (desktop and mobile)

Next and Previous post navigation

Like toggle with real-time count update ❤️

Save (bookmark) toggle using localStorage 🔖

Mobile swipe navigation (up and down)

Floating action buttons on mobile

Fully responsive design

Loading and empty states

User-friendly error handling

<br><br>

Backend (API) ⚙️

<br>

REST API built with Express

Fetch posts with pagination

Like a post

Create posts

Delete posts

Input validation with clear error responses

<br><br>

Persistence 💾

<br>

SQLite database for posts

localStorage for likes and saved posts

<br><br>

Ⅲ. Tech Stack 🧩

<br><br>

Frontend

<br>

React (Vite)

Custom responsive CSS

Axios

<br><br>

Backend

<br>

Node.js

Express.js

SQLite

<br><br>

Deployment ☁️

<br>

Frontend deployed on Vercel

Backend deployed on Render

<br><br>

Ⅳ. How to Run the Project 🏃‍♂️

<br><br>

Backend (Server)

<br>

Open Command Prompt or Terminal

Navigate to the server folder

Install dependencies

Start the server

<br>

cd instagram_feednew
cd server
npm install
npm start

<br>

Backend runs at
http://localhost:5000

<br><br>

Frontend (Client)

<br>

Open another Command Prompt or Terminal

Navigate to the client folder

Install dependencies

Start development server

<br>

cd instagram_feednew
cd client
npm install
npm run dev

<br>

Frontend runs at
http://localhost:5173

<br><br>

Ⅴ. API Endpoints 🔗

<br><br>

Method | Endpoint | Description
GET | /api/posts?page=1&limit=12 | Get paginated posts
POST | /api/posts/:id/like | Like a post
POST | /api/posts | Create a new post
DELETE | /api/posts/:id | Delete a post
GET | /api/health | Health check

<br><br>

Ⅵ. Data Model 🗄️

<br><br>

posts table

<br>

id – INTEGER (Primary Key)

author – TEXT

caption – TEXT

image – TEXT

likes – INTEGER

creator_id – TEXT

created_at – TIMESTAMP

<br><br>

Ⅶ. AI Collaboration Log 🤖

<br><br>

AI Tools Used

<br>

ChatGPT

Claude

Gemini

<br><br>

How AI Helped 🧠

<br>

Assisted with UI and feed design inspiration

Helped with deployment and environment setup

Suggested state management for like/save toggles

Debugged CORS and frontend–backend connection issues

Improved component structure and code readability

<br><br>

Example Prompts 💬

<br>

Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next and previous navigation

My posts are not loading on Vercel and API requests are pending forever. Help debug frontend versus backend

<br><br>

Example Correction 🛠️

<br>

Problems Identified

<br>

Images overlapped with the right sidebar

Background feed was scrollable when viewer opened

Next and Previous buttons were inconsistent

Viewer was not truly fullscreen

<br><br>

Corrections Applied

<br>

Added a fullscreen overlay layer

Locked background scroll when viewer opens

Refactored layout into viewer-media and viewer-sidebar

<br><br>

Ⅷ. Trade-offs and Next Improvements 🔮

<br><br>

Current Limitations

<br>

Saved posts stored locally instead of backend

Authentication mocked using localStorage

Comments implemented only at UI level

<br><br>

Future Enhancements

<br>

Saved Posts page

Real user authentication and profiles

Backend persistence for saved posts

Full comment system with backend integration

<br><br>

Ⅸ. Sample Data 🧪

<br><br>

Included via SQLite seed data

Images loaded from static URLs

<br><br>

Ⅹ. Demo Video 🎥

<br><br>

https://drive.google.com/file/d/1Df1oazf72RH6_KPR6UJ5EZgXff9e69eM/view

<br><br>

Ⅺ. License 📄

<br><br>

This project is for educational purposes only

<br><br>

Ⅻ. Contact 📬

<br><br>

For questions or feedback, reach out through the GitHub repository
