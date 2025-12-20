📸 Instagram Feed Clone

GitHub Repository:
https://github.com/mohannamburu18/instagram_feednew

Deployment Link:
https://instagram-feednew-jc9l6pudq-mohans-projects-7ac7513d.vercel.app/

Ⅰ. Track Chosen + Why 🎯

Track C — Feed (Instagram-style consumption)
    I chose Track C to demonstrate an interactive feed with pagination, modal post viewing, and social actions such as like and save. This track best showcases frontend UX design, API integration, and state management in a production-minded way.
    
<br><br>
    

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
    

<br><br>
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
    

<br><br>
Ⅳ. How to Run the Project 🏃‍♂️

Backend (Server)
    Open Command Prompt / Terminal:

    cd instagram_feednew
    cd server
    npm install
    npm start

    Backend runs at:
    http://localhost:5000

    

Frontend (Client)

Open Command Prompt / Terminal:

1. cd instagram_feednew
2. cd client
3. npm install
4. npm run dev


Open the application in the browser at:
http://localhost:5173
    

  

<br><br>
Ⅴ. API Endpoints 🔗
<img width="688" height="223" alt="image" src="https://github.com/user-attachments/assets/52900abe-37ca-4ba2-89b6-628b4aa977d8" />


<br><br>
Ⅵ. Data Model 🗄️

posts table

<img width="391" height="286" alt="image" src="https://github.com/user-attachments/assets/19b55b87-1b31-4d89-9360-f856070b3718" />

<br><br>
Ⅶ. AI Collaboration Log 🤖


AI Tools Used
    1. ChatGPT
    2.  Claude
    3 . Gemini

How AI Helped 🧠
    • Gemini helped with overall UI and feed design inspiration
    • ChatGPT assisted with deployment and environment setup
    • Suggested state management for like and save toggles
    • Helped debug CORS and deployment issues
    • Improved component structure and code readability
    <br><br>

Example Prompt 💬
    Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next/previous navigation.

    My posts are not loading on Vercel and API requests are pending forever. Can you help debug frontend vs backend?

    

<br><br>
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


<br><br>
Ⅷ. Trade-offs & Next Improvements 🔮

    • Saved posts are stored locally instead of backend (intentional simplification)
    • Authentication is mocked using localStorage
    • Comments are UI-only (no backend yet)
    • Future: Add Saved Posts page
    • Future: Add real user authentication and profiles
    

<br><br>
Ⅸ. Sample Data 🧪

    • Included via SQLite seed data
    • Images loaded from static URLs
    

<br><br>
Ⅹ. Demo Video 🎥

    https://drive.google.com/file/d/1Df1oazf72RH6_KPR6UJ5EZgXff9e69eM/view?usp=sharing
