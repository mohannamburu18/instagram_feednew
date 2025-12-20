📸 Instagram Feed Clone

<br><br>

I. Track Chosen + Why 🎯

Track C — Feed (Instagram-style consumption)
I chose Track C to demonstrate an interactive feed with pagination, modal post viewing, and social actions like like/save. This track best showcases frontend UX, API integration, and state management in a production-minded way.

<br><br>

II. Features Implemented 🚀
4

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
• Create / Delete post
• Validation + error responses

Persistence 💾
• SQLite database for posts
• localStorage for likes and saved posts

<br><br>

III. Tech Stack 🧩

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

<br><br>

IV. How to Run the Project 🏃‍♂️
Backend (Server)

Open Command Prompt / Terminal:

cd instagram_feednew
cd server
npm install
npm start


Backend runs at:
http://localhost:5000

Frontend (Client)

Open another Command Prompt / Terminal:

cd instagram_feednew
cd client
npm install
npm run dev


Frontend runs at:
http://localhost:5173

<br><br>

V. API Endpoints 🔗
Method	Endpoint	Description
GET	/api/posts?page=1&limit=12	Get paginated posts
POST	/api/posts/:id/like	Like a post
POST	/api/posts	Create new post
DELETE	/api/posts/:id	Delete post
GET	/api/health	Health check

<br><br>

VI. Data Model 🗄️

posts table

Field	Type
id	INTEGER (PK)
author	TEXT
caption	TEXT
image	TEXT
likes	INTEGER
creator_id	TEXT
created_at	TIMESTAMP

<br><br>

VII. AI Collaboration Log 🤖

AI Tools Used
• ChatGPT
• Claude
• Gemini

How AI Helped 🧠
• Helped with UI and feed design inspiration
• Assisted with deployment and environment setup
• Suggested state management for like/save toggles
• Debugged CORS and frontend–backend connection issues
• Improved component structure and readability

Example Prompt 💬
“Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next/previous navigation.”

Example Correction 🛠️
• Added fullscreen overlay for viewer
• Locked background scroll
• Refactored layout into viewer-media and viewer-sidebar

<br><br>

VIII. Trade-offs & Next Improvements 🔮

• Saved posts stored locally instead of backend
• Authentication mocked using localStorage
• Comments implemented only at UI level
• Future: Saved Posts page
• Future: Real user authentication and profiles

<br><br>

IX. Sample Data 🧪

• Included via SQLite seed data
• Images loaded from static URLs

<br><br>

X. Demo Video 🎥

https://drive.google.com/file/d/1Df1oazf72RH6_KPR6UJ5EZgXff9e69eM/view
