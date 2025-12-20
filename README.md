📸 Instagram Feed Clone<br><br>

GitHub Repository:<br><br>
https://github.com/mohannamburu18/instagram_feednew<br><br>

Deployment Link:
https://instagram-feednew-jc9l6pudq-mohans-projects-7ac7513d.vercel.app/<br><br>

Ⅰ. Track Chosen + Why 🎯

Track C — Feed (Instagram-style consumption)
    I chose Track C to demonstrate an interactive feed with pagination, modal post viewing, and social actions such as like and save. This track best showcases frontend UX design, API integration, and state management in a production-minded way.
    
<br><br>
    

Ⅱ. Features Implemented 🚀

Frontend (UI) 🎨<br>
    1. Instagram-style feed grid
    <br>
    2. Post viewer modal (desktop and mobile)<br>
    3. Next / Previous post navigation<br>
    4. Like toggle with count update ❤️<br>
    5. Save (bookmark) toggle using localStorage 🔖<br>
    6. Mobile swipe navigation (up / down)<br>
    7. Floating actions on mobile (like / save)<br>
    8. Responsive design (desktop and mobile)<br>
    9. Empty state and loading state<br>
    10. Error handling UI<br>

Backend (API) ⚙️<br>
    1. REST API using Express<br>
    2. Get posts with pagination<br>
    3. Like a post<br>
    4. Create and delete posts<br>
    5. Validation with clear error responses<br>

Persistence 💾<br>
    1. SQLite database for posts<br>
    2 .localStorage for likes and saved posts<br>
    

<br><br>
Ⅲ. Tech Stack 🧩

Frontend<br>
    1. React (Vite)<br>
    2. CSS (custom, responsive)<br>
    3. Axios<br>

Backend
    1. Node.js<br>
    2. Express.js<br>
    3. SQLite<br>

Deployment ☁️<br>
    1. Frontend: Vercel<br>
    2. Backend: Render<br>
    

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
Ⅶ. AI Collaboration Log 🤖<br>


AI Tools Used<br>
    1. ChatGPT<br>
    2.  Claude<br>
    3 . Gemini<br>

How AI Helped 🧠<br>
    1. Gemini helped with overall UI and feed design inspiration<br>
    2. ChatGPT assisted with deployment and environment setup<br>
    3. Suggested state management for like and save toggles<br>
    4.  Helped debug CORS and deployment issues<br>
    5.  Improved component structure and code readability<br>
    <br><br>

Example Prompt 💬<br>
    Create a React Instagram-style feed with a grid of posts and a fullscreen post viewer with next/previous navigation.<br>

    My posts are not loading on Vercel and API requests are pending forever. Can you help debug frontend vs backend?<br>

    

<br><br>
Example Correction 🛠️

Problem<br>
    PostViewer opened but:<br>
    1.Images overlapped with the right sidebar<br>
    2.Background feed was still scrollable<br>
    3. Next / Previous buttons were inconsistent<br>
    4.Viewer looked embedded instead of fullscreen<br>

Correction Applied<br>
    1. Added a full-screen overlay layer<br>
    2. Locked background scroll when viewer opens<br>
    3.Separated layout into:<br>
      – viewer-media (left – image)<br>
      – viewer-sidebar (right – author, caption, actions)<br>


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
