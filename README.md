# Instagram-Style Feed Application

## Track Chosen + Why
**Track C — Scroll Feed (Instagram-style consumption)**

I chose this track because it closely mimics real-world social media applications, allowing me to demonstrate full-stack development skills including infinite scroll implementation, state management, API pagination, and interactive features like likes/saves. This track showcases both frontend UX patterns and backend data handling that are core to modern web applications.

## Features Implemented
- [x] **Frontend (UI)**
  - [x] 3 screens: Feed View, Create Post, Edit Post
  - [x] Working form to create/update posts with image preview
  - [x] List/feed view displaying posts in card format
  - [x] Form validation (required fields for caption and image)
  - [x] Empty state when no posts exist
  
- [x] **Backend (API)**
  - [x] REST API with 5 endpoints (create, list, update, delete, like)
  - [x] Pagination support (page & limit parameters)
  - [x] Input validation with clear error messages
  - [x] Error handling middleware
  
- [x] **Persistence**
  - [x] SQLite database with posts table
  - [x] Local storage for likes/saves state
  
- [x] **Production Basics**
  - [x] Clean folder structure (client/server separation)
  - [x] Clear run instructions
  - [x] Environment variables with .env.example
  - [x] CORS configuration
  
- [x] **Track-Specific Features**
  - [x] Pagination with "Load More" button
  - [x] Like/Save toggle with localStorage persistence
  - [x] Like count display and animation
  - [x] Responsive card-based layout

## Tech Stack

### Frontend
- **React** (v18) - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with flexbox/grid

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **Multer** - File upload handling
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing

## How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
cp .env.example .env

# Start the server
npm run dev

# Server will run on http://localhost:5000
```

### Frontend Setup
```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev

# Client will run on http://localhost:5173
```

### Quick Start (from root directory)
```bash
# Install all dependencies
cd server && npm install && cd ../client && npm install && cd ..

# Start backend (terminal 1)
cd server && npm run dev

# Start frontend (terminal 2)
cd client && npm run dev
```

## API Endpoints List

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/posts` | Get all posts with pagination | Query: `page`, `limit` | `{ posts: [], currentPage, totalPages, totalPosts }` |
| POST | `/api/posts` | Create a new post | `{ caption, image, author }` | `{ message, post }` |
| PUT | `/api/posts/:id` | Update a post | `{ caption, image }` | `{ message, post }` |
| DELETE | `/api/posts/:id` | Delete a post | - | `{ message }` |
| POST | `/api/posts/:id/like` | Toggle like on a post | - | `{ message, likes }` |

### Example Requests

**Create Post**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "caption": "Beautiful sunset!",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "author": "johndoe"
  }'
```

**Get Posts (Paginated)**
```bash
curl "http://localhost:5000/api/posts?page=1&limit=10"
```

**Like a Post**
```bash
curl -X POST http://localhost:5000/api/posts/1/like
```

## Data Model

### Posts Table
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  caption TEXT NOT NULL,
  image TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique post identifier |
| author | TEXT | NOT NULL | Username of post creator |
| caption | TEXT | NOT NULL | Post caption/description |
| image | TEXT | NOT NULL | Image URL or base64 string |
| likes | INTEGER | DEFAULT 0 | Number of likes |
| created_at | DATETIME | DEFAULT NOW | Post creation timestamp |
| updated_at | DATETIME | DEFAULT NOW | Last update timestamp |

### Local Storage Schema
```javascript
{
  "likedPosts": ["1", "3", "5"],  // Array of liked post IDs
  "savedPosts": ["2", "4"]        // Array of saved post IDs
}
```

## AI Usage Log

### AI Tools Used
- **Claude (Anthropic)** - Primary development assistant
- **GitHub Copilot** - Code completion and suggestions

### How AI Helped
1. **Rapid API Structure Setup**: AI helped scaffold the Express.js REST API with proper error handling middleware and validation patterns, saving 2-3 hours of boilerplate setup.

2. **SQLite Schema Design**: Generated optimized database schema with proper indexes and constraints, including timestamp handling and foreign key relationships.

3. **React State Management**: Provided best practices for managing local state (likes/saves) alongside server state, implementing optimistic UI updates for better UX.

4. **Pagination Logic**: Assisted with implementing efficient pagination on both backend (SQL LIMIT/OFFSET) and frontend (Load More button with state management).

5. **CSS Responsive Layout**: Generated Instagram-like card layout with proper responsive breakpoints and CSS Grid/Flexbox patterns.

### Example Prompt
```
"Create a REST API endpoint for paginated posts in Express.js that:
- Accepts page and limit query parameters
- Defaults to page 1 and limit 10
- Returns posts array, current page, total pages, and total post count
- Uses SQLite with proper error handling
- Includes validation for invalid page numbers"
```

### Example Where I Corrected AI Output

**AI's Initial Like Toggle Implementation:**
```javascript
// AI suggested this approach
const handleLike = async (postId) => {
  await axios.post(`/api/posts/${postId}/like`);
  fetchPosts(); // Refetch all posts
};
```

**My Refactored Version:**
```javascript
// Optimistic UI update without refetching entire list
const handleLike = async (postId) => {
  const isLiked = likedPosts.includes(postId);
  
  // Optimistic update
  setPosts(posts.map(post => 
    post.id === postId 
      ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
      : post
  ));
  
  setLikedPosts(isLiked 
    ? likedPosts.filter(id => id !== postId)
    : [...likedPosts, postId]
  );
  
  try {
    await axios.post(`/api/posts/${postId}/like`);
  } catch (error) {
    // Revert on error
    setPosts(posts);
    setLikedPosts(isLiked ? [...likedPosts, postId] : likedPosts.filter(id => id !== postId));
  }
};
```

**Why This Is Better:**
- Immediate UI feedback (optimistic update)
- No unnecessary network request to refetch all posts
- Error handling with rollback mechanism
- Better user experience with instant visual feedback
- Reduces server load by avoiding redundant GET requests

## Trade-offs + Next Improvements

### Current Trade-offs
1. **Local Storage for Likes**: Using localStorage for likes/saves means they're device-specific and lost on browser clear. Better approach would be user authentication with server-side persistence.

2. **Image Handling**: Currently stores image URLs directly. For production, would implement proper image upload to cloud storage (AWS S3, Cloudinary) with image optimization and CDN delivery.

3. **Basic Pagination**: Using offset-based pagination which can have performance issues with large datasets. Cursor-based pagination would be more efficient.

4. **No Real-time Updates**: Posts don't update in real-time when others post. Would implement WebSocket connections (Socket.io) for live feed updates.

5. **Limited Validation**: Basic input validation only. Would add comprehensive validation library (Zod/Joi), rate limiting, and input sanitization.

### Next Improvements
1. **Authentication System**: Add JWT-based auth with user registration/login, allowing personalized feeds and proper like/save persistence.

2. **Image Upload**: Implement drag-and-drop image upload with preview, compression, and cloud storage integration.

3. **Comments System**: Add nested comments with real-time updates and mention functionality.

4. **Infinite Scroll**: Replace "Load More" button with intersection observer for true infinite scroll experience.

5. **Search & Filters**: Add search by caption/author and filter by date/popularity with Elasticsearch or full-text search.

6. **Performance Optimization**: Implement React.memo, useMemo, lazy loading, and virtual scrolling for better performance with thousands of posts.

7. **Testing**: Add comprehensive test coverage with Jest (unit), React Testing Library (component), and Supertest (API).

8. **Deployment**: Containerize with Docker, set up CI/CD pipeline, and deploy to cloud platforms (Vercel/Railway/AWS).

---

## License
MIT

## Author
Nithin - B.Tech CSE Final Year Student
