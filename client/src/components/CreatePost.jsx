import { useState } from 'react';
import api from '../api';
import './CreatePost.css';

function CreatePost({ onSuccess, onCancel }) {
  const currentUser =
    localStorage.getItem('currentUser') || `user_${Date.now()}`;

  const [formData, setFormData] = useState({
    author: '',
    caption: '',
    image: '',
    creator_id: currentUser
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  /* ------------------ HANDLERS ------------------ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (name === 'image') {
      setPreviewImage(value);
    }
  };

  /* ------------------ VALIDATION ------------------ */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.caption.trim()) {
      newErrors.caption = 'Caption is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (
      !formData.image.startsWith('http') &&
      !formData.image.startsWith('data:image')
    ) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ------------------ SUBMIT ------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post('/posts', formData);
      onSuccess(); // go back to feed
    } catch (err) {
      console.error('Create post error:', err);
      setErrors({
        general:
          err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to create post'
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create New Post</h2>

        {errors.general && (
          <div className="error-banner">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.author && (
              <span className="error-message">{errors.author}</span>
            )}
          </div>

          <div className="form-group">
            <label>Caption *</label>
            <textarea
              name="caption"
              rows="4"
              value={formData.caption}
              onChange={handleChange}
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
            <label>Image URL *</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              disabled={loading}
            />
            {errors.image && (
              <span className="error-message">{errors.image}</span>
            )}
          </div>

          {previewImage && !errors.image && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Preview"
                onError={() =>
                  setErrors({ image: 'Invalid image URL' })
                }
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
