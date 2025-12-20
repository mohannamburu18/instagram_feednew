📸 Instagram Feed Clone

GitHub Repository:
https://github.com/mohannamburu18/instagram_feednew

Deployment Link:
https://instagram-feednew-jc9l6pudq-mohans-projects-7ac7513d.vercel.app/

Ⅰ. Track Chosen + Why 🎯

Track C — Feed (Instagram-style consumption)
    I chose Track C to demonstrate an interactive feed with pagination, modal post viewing, and social actions such as like and save. This track best showcases frontend UX design, API integration, and state management in a production-minded way.

Ⅱ. Features Implemented 🚀

Frontend (UI) 🎨
    • Instagram-style feed grid
    • Post viewer modal (desktop and mobile)
    • Next / Previous post navigation
    • Like toggle with count update ❤️
    • Save (bookmark) toggle using localStorage 🔖
    • Mobile swipe navigation (up / down)
    • Floating actions on mobile (like / save)
    • Responsive design (desktop and mobile)
    • Empty state and loading state
    • Error handling UI

Backend (API) ⚙️
    • REST API using Express
    • Get posts with pagination
    • Like a post
    • Create and delete posts
    • Validation with clear error responses

Persistence 💾
    • SQLite database for posts
    • localStorage for likes and saved posts

Ⅲ. Tech Stack 🧩

Frontend
    • React (Vite)
    • CSS (custom, responsive)
    • Axios

Backend
    • Node.js
    • Express.js
    • SQLite

Deployment ☁️
    • Frontend: Vercel
    • Backend: Render

Ⅳ. How to Run the Project 🏃‍♂️

Backend (Server)
    Open Command Prompt / Terminal:

    cd instagram_feednew
    cd server
    npm install
    npm start

    Backend runs at:
    http://localhost:5000

    Open the application in the browser at:
    http://localhost:5173

Ⅴ. API Endpoints 🔗
Method	Endpoint	Description
GET	/api/posts?page=1&limit=12	Get paginated posts
POST	/api/posts/:id/like	Like a post
POST	/api/posts	Create new post
DELETE	/api/posts/:id	Delete post
GET	/api/health	Health check
Ⅵ. Data Model 🗄️

posts table

Field	Type
id	INTEGER (PK)
author	TEXT
caption	TEXT
image	TEXT
likes	INTEGER
creator_id	TEXT
created_at	TIMESTAMP
Ⅶ. AI Collaboration Log 🤖

AI Tools Used
    • ChatGPT
    • Claude
    • Gemini

How AI Helped 🧠
    • Gemini helped with overall UI and feed design inspiration
    • ChatGPT assisted with deployment and environment setup
    • Suggested state management for like and save toggles
    • Helped debug CORS and deployment issues
    • Improved component structure and code readability

Example Prompt 💬
    Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next/previous navigation.

    My posts are not loading on Vercel and API requests are pending forever. Can you help debug frontend vs backend?

Example Correction 🛠️

Problem
    PostViewer opened but:
    • Images overlapped with the right sidebar
    • Background feed was still scrollable
    • Next / Previous buttons were inconsistent
    • Viewer looked embedded instead of fullscreen

Correction Applied
    • Added a full-screen overlay layer
    • Locked background scroll when viewer opens
    • Separated layout into:
      – viewer-media (left – image)
      – viewer-sidebar (right – author, caption, actions)

Ⅷ. Trade-offs & Next Improvements 🔮

    • Saved posts are stored locally instead of backend (intentional simplification)
    • Authentication is mocked using localStorage
    • Comments are UI-only (no backend yet)
    • Future: Add Saved Posts page
    • Future: Add real user authentication and profiles

Ⅸ. Sample Data 🧪

    • Included via SQLite seed data
    • Images loaded from static URLs

Ⅹ. Demo Video 🎥

    https://drive.google.com/file/d/1Df1oazf72RH6_KPR6UJ5EZgXff9e69eM/view?usp=sharing
