import './Sidebar.css';

function Sidebar({ currentView, onNavigate }) {
  const items = [
    { id: 'feed', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'feed', icon: '🧭', label: 'Explore' },
    { id: 'reels', icon: '🎬', label: 'Reels' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'create', icon: '➕', label: 'Create' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <aside className="sidebar">
      <h1 className="sidebar-logo">InstagramFeed</h1>

      {items.map((item, i) => (
        <button
          key={i}
          className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span>{item.icon}</span>
          <span className="label">{item.label}</span>
        </button>
      ))}

      <button className="sidebar-item">
        <span>☰</span>
        <span className="label">More</span>
      </button>
    </aside>
  );
}

export default Sidebar;
