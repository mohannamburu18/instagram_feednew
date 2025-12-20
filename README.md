1. Track Chosen + Why (2–3 lines)
Track C — Feed (Instagram-style consumption)
I chose Track C to demonstrate an interactive feed with pagination, modal post viewing, and social actions like like/save. This track best showcases frontend UX, API integration, and state management in a production-minded way.

2. Features Implemented (Checklist)
Frontend (UI)
•	Instagram-style feed grid
•	Post viewer modal (desktop + mobile)
•	Next / Previous post navigation
•	Like toggle (with count update)
•	Save (bookmark) toggle using localStorage
•	Mobile swipe navigation (up/down)
•	Floating actions on mobile (like/save)
•	Responsive design (desktop + mobile)
•	Empty state + loading state
•	Error handling UI

Backend (API)
•	REST API using Express
•	Get posts (pagination)
•	Like a post
•	Create / Delete post
•	Validation + error responses
Persistence
•	SQLite database for posts
•	localStorage for likes & saved posts

3. Tech Stack
Frontend
•	React (Vite)
•	CSS (custom, responsive)
•	Axios
Backend
•	Node.js
•	Express.js
•	SQLite
Deployment
•	Frontend: Vercel
•	Backend: Render

4.How to Run the Project 🏃‍♂️

Backend (Server)
Open Command Prompt / Terminal:

cd instagram_feednew
cd server
npm install
npm start

Backend runs at:
http://localhost:5000

Open the application in the browser at http://localhost:5173


5.API Endpoints
Method	Endpoint	Description
GET	/api/posts?page=1&limit=12	Get paginated posts
POST	/api/posts/:id/like	Like a post
POST	/api/posts	Create new post
DELETE	/api/posts/:id	Delete post
GET	/api/health	Health check


6. Data Model (Tables / Fields)
posts table
Field	Type
id	INTEGER (PK)
author	TEXT
caption	TEXT
image	TEXT
likes	INTEGER
creator_id	TEXT
created_at	TIMESTAMP


7. AI Collaboration Log
AI Tools Used
•	ChatGPT
•	Claude
•	Gemini

How AI Helped (3–5 bullets)
1.	Gemini helped getting images of  overall design
2.	Chatgpt helped in deployement
3.	Suggested state management for like/save toggle
4.	Helped debug CORS and deployment issues
5.	Improved component structure and readability
Example Prompt
Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next/previous navigation.
My posts are not loading on Vercel, API request is pending forever. Can you help debug frontend vs backend?”


Example Correction
Problem
•	PostViewer opened but:
o	Images overlapped with right sidebar
o	Background feed was still scrollable
o	Next/Previous buttons were inconsistent
o	Viewer looked embedded, not truly fullscreen
Your correction
•	Added a full-screen overlay layer
•	Locked background scroll when viewer opens
•	Separated layout into:
o	viewer-media (left → image)
o	viewer-sidebar (right → author, caption, actions)
 

8. Trade-offs & Next Improvements (3–5 bullets)
	Saved posts are stored locally instead of backend (intentional simplification)
	Authentication is mocked using localStorage
	Comments are UI-only (no backend yet)
	Future: add Saved Posts page
	Future: add real user auth and profiles


9. Sample Data
•	Included via SQLite seed data
•	Images loaded from static URLs

10. Demo Video 
https://drive.google.com/file/d/1Df1oazf72RH6_KPR6UJ5EZgXff9e69eM/view?usp=sharing

