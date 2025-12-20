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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.author || !formData.caption || !formData.image) {
      setErrors({ general: 'All fields are required' });
      return;
    }

    setLoading(true);

    try {
      await api.post('/posts', {
        ...formData,
        type: 'image'
      });

      onSuccess();
    } catch (err) {
      setErrors({
        general:
          err.response?.data?.message || 'Failed to create post'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-overlay">
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
              placeholder="Your username"
            />
          </div>

          <div className="form-group">
            <label>Caption *</label>
            <textarea
              name="caption"
              rows="4"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Write a caption..."
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
