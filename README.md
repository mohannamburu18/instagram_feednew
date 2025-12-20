Instagram Feed Clone

GitHub Repository

https://github.com/mohannamburu18/instagram_feednew

Live Deployment

https://instagram-feednew-jc9l6pudq-mohans-projects-7ac7513d.vercel.app/

<br><br>

I. Track Chosen + Why

Track C — Feed (Instagram-style consumption)

Chosen to demonstrate an interactive, production-minded feed

Includes pagination, modal post viewing, and like/save actions

Highlights frontend UX, API integration, and state management

<br><br>

II. Features Implemented

Frontend (UI)

Instagram-style feed grid

Fullscreen post viewer modal (desktop and mobile)

Next and Previous post navigation

Like toggle with real-time count update

Save (bookmark) toggle using localStorage

Mobile swipe navigation (up and down)

Floating action buttons on mobile

Fully responsive design

Loading and empty states

User-friendly error handling

Backend (API)

REST API built with Express

Fetch posts with pagination

Like a post

Create posts

Delete posts

Input validation with clear error responses

Persistence

SQLite database for posts

localStorage for likes and saved posts

<br><br>

III. Tech Stack

Frontend

React (Vite)

Custom responsive CSS

Axios

<br>

Backend

Node.js

Express.js

SQLite

<br>

Deployment

Frontend deployed on Vercel

Backend deployed on Render

<br><br>

IV. How to Run the Project

Backend (Server)

Open Command Prompt or Terminal

Navigate to the server folder

Install dependencies

Start the server

cd instagram_feednew
cd server
npm install
npm start


Backend runs at

http://localhost:5000

Frontend (Client)

Open another Command Prompt or Terminal

Navigate to the client folder

Install dependencies

Start development server

cd instagram_feednew
cd client
npm install
npm run dev


Frontend runs at

http://localhost:5173

<br><br>

V. API Endpoints

GET /api/posts?page=1&limit=12

Fetch paginated posts

POST /api/posts/:id/like

Like a post

POST /api/posts

Create a new post

DELETE /api/posts/:id

Delete a post

GET /api/health

Health check endpoint

<br><br>

VI. Data Model

posts table

id – INTEGER (Primary Key)

author – TEXT

caption – TEXT

image – TEXT

likes – INTEGER

creator_id – TEXT

created_at – TIMESTAMP

<br><br>

VII. AI Collaboration Log

AI Tools Used

ChatGPT

Claude

Gemini

How AI Helped

Assisted with UI and feed design inspiration

Helped with deployment and environment setup

Suggested state management for like and save toggles

Debugged CORS and frontend-backend connection issues

Improved component structure and readability

Example Prompts

Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next and previous navigation

My posts are not loading on Vercel and API requests are pending forever. Help debug frontend versus backend

Example Correction

Problems Identified

Images overlapped with the right sidebar

Background feed was scrollable when viewer opened

Next and Previous buttons were inconsistent

Viewer was not truly fullscreen

Corrections Applied

Added a fullscreen overlay layer

Locked background scroll when viewer opens

Refactored layout into viewer-media and viewer-sidebar

<br><br>

VIII. Trade-offs and Next Improvements

Current Limitations

Saved posts stored locally instead of backend

Authentication mocked using localStorage

Comments implemented only at UI level

Future Enhancements

Saved Posts page

Real user authentication and profiles

Backend persistence for saved posts

Full comment system with backend integration

<br><br>

IX. Sample Data

Included via SQLite seed data

Images loaded from static URLs

<br><br>

X. Demo Video

https://drive.google.com/file/d/1Df1oazf72RH6_KPR6UJ5EZgXff9e69eM/view

<br><br>

XI. License

This project is for educational purposes only

<br><br>

XII. Contact
