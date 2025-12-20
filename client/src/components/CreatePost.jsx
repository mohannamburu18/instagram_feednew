import { useState } from 'react';
import api from '../api';
import './CreatePost.css';

function CreatePost({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    author: '',
    caption: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/posts', {
        author: formData.author,
        caption: formData.caption,
        image: formData.image,
        type: 'image'
      });

      onSuccess();
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-card">
        <h2>Create New Post</h2>

        {error && <div className="error-banner">{error}</div>}

        <input
          placeholder="Author"
          value={formData.author}
          onChange={e => setFormData({ ...formData, author: e.target.value })}
        />

        <textarea
          placeholder="Caption"
          value={formData.caption}
          onChange={e => setFormData({ ...formData, caption: e.target.value })}
        />

        <input
          placeholder="Image URL"
          value={formData.image}
          onChange={e => setFormData({ ...formData, image: e.target.value })}
        />

        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
