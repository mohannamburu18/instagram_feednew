const express = require('express');
const router = express.Router();
const { db } = require('./database');
const { validatePost, validatePostUpdate, validatePagination } = require('./validators');

// GET /api/posts - Get all posts with pagination
router.get('/', validatePagination, (req, res) => {
  const { page, limit } = req.pagination;
  const offset = (page - 1) * limit;

  // Get total count
  db.get('SELECT COUNT(*) as total FROM posts', (err, countResult) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching post count',
        error: err.message
      });
    }

    const totalPosts = countResult.total;
    const totalPages = Math.ceil(totalPosts / limit);

    // Get paginated posts
    db.all(
      'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset],
      (err, posts) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error fetching posts',
            error: err.message
          });
        }

        res.json({
          success: true,
          posts: posts,
          pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalPosts: totalPosts,
            postsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        });
      }
    );
  });
});

// GET /api/posts/:id - Get a single post
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching post',
        error: err.message
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      post: post
    });
  });
});

// POST /api/posts - Create a new post
router.post('/', validatePost, (req, res) => {
  const { author, caption, image, creator_id } = req.body;

  db.run(
    'INSERT INTO posts (author, caption, image, likes, creator_id) VALUES (?, ?, ?, 0, ?)',
    [author, caption, image, creator_id || null],
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error creating post',
          error: err.message
        });
      }

      // Fetch the created post
      db.get('SELECT * FROM posts WHERE id = ?', [this.lastID], (err, post) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Post created but error fetching it',
            error: err.message
          });
        }

        res.status(201).json({
          success: true,
          message: 'Post created successfully',
          post: post
        });
      });
    }
  );
});

// PUT /api/posts/:id - Update a post
router.put('/:id', validatePostUpdate, (req, res) => {
  const { id } = req.params;
  const { caption, image } = req.body;

  // First check if post exists
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching post',
        error: err.message
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (caption !== undefined) {
      updates.push('caption = ?');
      values.push(caption);
    }

    if (image !== undefined) {
      updates.push('image = ?');
      values.push(image);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`;

    db.run(query, values, function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error updating post',
          error: err.message
        });
      }

      // Fetch updated post
      db.get('SELECT * FROM posts WHERE id = ?', [id], (err, updatedPost) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Post updated but error fetching it',
            error: err.message
          });
        }

        res.json({
          success: true,
          message: 'Post updated successfully',
          post: updatedPost
        });
      });
    });
  });
});

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Check if post exists
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching post',
        error: err.message
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error deleting post',
          error: err.message
        });
      }

      res.json({
        success: true,
        message: 'Post deleted successfully'
      });
    });
  });
});

// POST /api/posts/:id/like - Toggle like on a post
router.post('/:id/like', (req, res) => {
  const { id } = req.params;

  db.get('SELECT likes FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching post',
        error: err.message
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const newLikes = post.likes + 1;

    db.run(
      'UPDATE posts SET likes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newLikes, id],
      function(err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error updating likes',
            error: err.message
          });
        }

        res.json({
          success: true,
          message: 'Post liked successfully',
          likes: newLikes
        });
      }
    );
  });
});

module.exports = router;
