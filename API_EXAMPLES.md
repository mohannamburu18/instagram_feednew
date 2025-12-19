# Instagram Feed API - Test Examples

## Base URL
```
http://localhost:5000
```

## Health Check
```bash
curl http://localhost:5000/api/health
```

## Get All Posts (Paginated)
```bash
# First page (default: 10 posts)
curl "http://localhost:5000/api/posts?page=1&limit=10"

# Second page with 5 posts per page
curl "http://localhost:5000/api/posts?page=2&limit=5"
```

## Get Single Post
```bash
curl http://localhost:5000/api/posts/1
```

## Create New Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "author": "tech_enthusiast",
    "caption": "Just deployed my first full-stack app! 🚀 #coding #webdev",
    "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
  }'
```

## Update Post
```bash
curl -X PUT http://localhost:5000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "caption": "Updated caption: Building amazing things with React! ⚛️"
  }'
```

## Like a Post
```bash
curl -X POST http://localhost:5000/api/posts/1/like
```

## Delete Post
```bash
curl -X DELETE http://localhost:5000/api/posts/1
```

## Error Cases

### Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "author": "test_user"
  }'
```

### Invalid Page Number
```bash
curl "http://localhost:5000/api/posts?page=0"
```

### Post Not Found
```bash
curl http://localhost:5000/api/posts/99999
```

## JavaScript Examples (Axios)

### Get Posts
```javascript
import axios from 'axios';

const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`/api/posts?page=${page}&limit=${limit}`);
    console.log('Posts:', response.data.posts);
    console.log('Pagination:', response.data.pagination);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};
```

### Create Post
```javascript
const createPost = async (postData) => {
  try {
    const response = await axios.post('/api/posts', {
      author: postData.author,
      caption: postData.caption,
      image: postData.image
    });
    console.log('Created:', response.data.post);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};
```

### Like Post
```javascript
const likePost = async (postId) => {
  try {
    const response = await axios.post(`/api/posts/${postId}/like`);
    console.log('New likes:', response.data.likes);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};
```
