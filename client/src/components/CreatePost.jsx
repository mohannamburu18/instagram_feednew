import { useState } from 'react';
import api from '../api';
import './CreatePost.css';

function CreatePost({ onSuccess, onCancel }) {
  const currentUser =
    localStorage.getItem('currentUser') || 'guest';

  const [formData, setFormData] = useState({
    author: currentUser,
    caption: '',
    image: '',
    creator_id: currentUser,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.author || !formData.caption || !formData.image) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/posts', {
        ...formData,
        type: 'image',
      });

      if (res.status === 200 || res.status === 201) {
        onSuccess(); // close modal & refresh feed
      } else {
        throw new Error('Post not created');
      }

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        'Backend not reachable'
      );
    } finally {
      setLoading(false); // 🔥 critical fix
    }
  };

  return (
    <div className="create-post-overlay" onClick={onCancel}>
      <div
        className="create-post-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create New Post</h2>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Author *</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            disabled={loading}
          />

          <label>Caption *</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            disabled={loading}
          />

          <label>Image URL *</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            disabled={loading}
            placeholder="https://images.unsplash.com/..."
          />

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
