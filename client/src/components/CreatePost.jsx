import { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

function CreatePost({ onSuccess, onCancel }) {
  // Get current user ID from localStorage
  const currentUser = localStorage.getItem('currentUser') || `user_${Date.now()}`;
  
  const [formData, setFormData] = useState({
    author: '',
    caption: '',
    image: '',
    creator_id: currentUser
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update image preview
    if (name === 'image' && value) {
      setPreviewImage(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (formData.author.length < 3) {
      newErrors.author = 'Author name must be at least 3 characters';
    } else if (formData.author.length > 50) {
      newErrors.author = 'Author name must not exceed 50 characters';
    }

    if (!formData.caption.trim()) {
      newErrors.caption = 'Caption is required';
    } else if (formData.caption.length > 2000) {
      newErrors.caption = 'Caption must not exceed 2000 characters';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.image) && !formData.image.startsWith('data:image')) {
        newErrors.image = 'Please enter a valid image URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/posts', formData);
      console.log('Post created:', response.data);
      onSuccess();
    } catch (err) {
      console.error('Error creating post:', err);
      
      if (err.response?.data?.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach(error => {
          const field = error.toLowerCase().includes('author') ? 'author' :
                       error.toLowerCase().includes('caption') ? 'caption' :
                       error.toLowerCase().includes('image') ? 'image' : 'general';
          serverErrors[field] = error;
        });
        setErrors(serverErrors);
      } else {
        setErrors({ general: err.response?.data?.message || 'Failed to create post' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create New Post</h2>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          {errors.general && (
            <div className="error-banner">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="author">
              Author <span className="required">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.author ? 'error' : ''}
              disabled={loading}
            />
            {errors.author && (
              <span className="error-message">{errors.author}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="caption">
              Caption <span className="required">*</span>
            </label>
            <textarea
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Write a caption..."
              rows="4"
              className={errors.caption ? 'error' : ''}
              disabled={loading}
            />
            <div className="char-count">
              {formData.caption.length}/2000
            </div>
            {errors.caption && (
              <span className="error-message">{errors.caption}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">
              Image URL <span className="required">*</span>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={errors.image ? 'error' : ''}
              disabled={loading}
            />
            {errors.image && (
              <span className="error-message">{errors.image}</span>
            )}
            <small className="help-text">
              Tip: You can use Unsplash URLs for free images
            </small>
          </div>

          {previewImage && !errors.image && (
            <div className="image-preview">
              <p className="preview-label">Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                onError={() => {
                  setErrors(prev => ({
                    ...prev,
                    image: 'Failed to load image. Please check the URL.'
                  }));
                  setPreviewImage('');
                }}
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
