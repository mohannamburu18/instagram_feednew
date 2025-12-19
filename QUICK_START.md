# 🚀 Quick Start Guide - Enhanced Instagram Feed

## 📦 Installation

```bash
# Extract the archive
tar -xzf instagram-feed-enhanced.tar.gz
cd instagram-feed-enhanced

# Run the setup script
./setup.sh

# Or manually:
# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

## ▶️ Running the Application

### Option 1: Using the provided script
```bash
# From the root directory
./setup.sh
```

### Option 2: Manual startup

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
Server runs on: `http://localhost:3001`

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```
Client runs on: `http://localhost:5173`

## 🎯 Key Features to Try

### 1. **Explore the Dark Theme** 🌙
- Notice the smooth gradient header
- Scroll through the stories carousel
- See the glassmorphism effects on cards

### 2. **Interact with Posts** 
- **Hover over cards** to see the overlay effects
- **Click the heart** to like posts (with animation!)
- **Click play button** on video posts
- **Open the menu** (⋮) for edit/delete options

### 3. **Create Posts**
- Click **"+ Create Post"** in the header
- Add author, caption, and image URL
- For **video posts**, use URLs ending in:
  - `.mp4`
  - `.webm`
  - `.mov`

### 4. **Try Video Posts**
Here are some free video URLs to test:
```
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4
```

### 5. **Mobile View** 📱
- Resize your browser window
- See the responsive 2-column grid
- Try the touch-friendly controls

## 🎨 What's Different?

### Visual Changes
- ✨ Dark black background with gradients
- 🎬 Video support with play controls
- 📖 Instagram-style stories at the top
- 🎯 Dynamic grid with mixed post sizes
- ✨ Gradient overlays on hover
- 🎨 Modern glassmorphism effects

### Layout Changes
- **Masonry grid** instead of uniform cards
- **12 posts per page** instead of 6
- **Stories section** added at the top
- **Wider container** (1400px vs 935px)
- **Dynamic sizing** (small, medium, large)

### Interaction Changes
- **Hover effects** show post details
- **Video controls** on hover
- **Quick actions** (like, save) in overlay
- **Smooth animations** everywhere
- **Auto-pause videos** when scrolling

## 🎬 Video Post Examples

When creating a post, use these formats for videos:

```javascript
// Example 1: Direct video URL
{
  author: "Travel Vlogger",
  caption: "Amazing mountain views 🏔️",
  image: "https://example.com/mountain-video.mp4"
}

// Example 2: With type specified
{
  author: "Food Blogger",
  caption: "Cooking tutorial 👨‍🍳",
  image: "https://example.com/cooking.webm",
  type: "video"
}
```

## 🐛 Troubleshooting

### "Server not connecting"
- Make sure both servers are running
- Check ports 3001 (backend) and 5173 (frontend) are free
- Try `npm install` in both folders again

### "Posts not loading"
- Check server logs in the terminal
- Ensure database file has write permissions
- Try deleting `server/posts.db` and restart

### "Video not playing"
- Verify the video URL is accessible
- Try opening the URL directly in browser
- Some videos may need CORS headers
- Use the sample video URLs provided above

### "Styles look broken"
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check console for CSS errors
- Ensure all files were extracted properly

## 📝 Creating Great Content

### Good Image URLs
```
https://images.unsplash.com/photo-...
https://picsum.photos/600/800
https://source.unsplash.com/random/600x800
```

### Good Video URLs
```
.mp4, .webm, .mov file extensions
CDN-hosted content
Public video platforms
```

### Caption Ideas
- Travel: "Exploring the mountains 🏔️ #adventure"
- Food: "Homemade pasta night 🍝 #foodie"
- Fitness: "Morning workout complete! 💪 #fitness"
- Art: "New watercolor piece 🎨 #art"

## 🎯 Pro Tips

1. **Create varied content** - mix small and large posts for visual interest
2. **Add videos** - they make the feed more dynamic
3. **Use emojis** - they show up beautifully in dark mode
4. **Try different caption lengths** - they truncate nicely
5. **Test on mobile** - resize your browser to see responsive design

## 🌟 Features Showcase

| Feature | How to Access |
|---------|---------------|
| Stories | Scroll at the top, click any story avatar |
| Video Play | Hover over video posts, click play button |
| Like Animation | Click the heart on any post |
| Post Menu | Hover post, click ⋮ button |
| Quick Like | Click heart in top-right corner on hover |
| Load More | Scroll down, click "Load More Posts" |
| Edit Post | Menu → Edit |
| Delete Post | Menu → Delete |

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (2 columns)
- **Tablet**: 768px - 1200px (3 columns)  
- **Desktop**: > 1200px (4 columns)

## 🎨 Customization Ideas

Want to make it yours? Try:

1. **Change gradient colors** in `App.css`
2. **Adjust grid sizes** in `PostCard.css`
3. **Modify animations** in `Feed.css`
4. **Add more story items** in `Feed.jsx`
5. **Change post pattern** in `getGridSize()` function

---

## 💫 Enjoy your enhanced Instagram feed!

For questions or issues, check:
- `ENHANCED_FEATURES.md` - Detailed feature list
- `README.md` - Original documentation
- Console logs - For debugging

Happy posting! 📸✨
