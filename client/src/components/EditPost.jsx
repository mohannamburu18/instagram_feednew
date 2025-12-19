import { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

function EditPost({ post, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    caption: post.caption,
    image: post.image
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(post.image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'image' && value) {
      setPreviewImage(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.caption.trim()) {
      newErrors.caption = 'Caption cannot be empty';
    } else if (formData.caption.length > 2000) {
      newErrors.caption = 'Caption must not exceed 2000 characters';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL cannot be empty';
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
      const response = await axios.put(`/api/posts/${post.id}`, formData);
      console.log('Post updated:', response.data);
      onSuccess();
    } catch (err) {
      console.error('Error updating post:', err);
      
      if (err.response?.data?.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach(error => {
          const field = error.toLowerCase().includes('caption') ? 'caption' :
                       error.toLowerCase().includes('image') ? 'image' : 'general';
          serverErrors[field] = error;
        });
        setErrors(serverErrors);
      } else {
        setErrors({ general: err.response?.data?.message || 'Failed to update post' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Edit Post</h2>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          {errors.general && (
            <div className="error-banner">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={post.author}
              disabled
              className="disabled-input"
            />
            <small className="help-text">Author cannot be changed</small>
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
                  Updating...
                </>
              ) : (
                'Update Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
