import { useState } from 'react';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Messages from './components/Messages';
import Reels from './components/Reels';
import Search from './components/Search';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [editingPost, setEditingPost] = useState(null);

  // Get current user from localStorage
  const currentUser = localStorage.getItem('currentUser') || 'guest';

  const handleCreateSuccess = () => {
    setCurrentView('feed');
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleEditSuccess = () => {
    setEditingPost(null);
    setCurrentView('feed');
  };

  const handleEditCancel = () => {
    setEditingPost(null);
    setCurrentView('feed');
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setEditingPost(null);
  };

  return (
    <div className="app">
      {/* Left Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigation}
        currentUser={currentUser}
      />

      {/* Main Content */}
      <main className="app-main">
        {currentView === 'feed' && (
          <Feed onEditClick={handleEditClick} />
        )}
        {currentView === 'create' && (
          <CreatePost onSuccess={handleCreateSuccess} onCancel={() => setCurrentView('feed')} />
        )}
        {currentView === 'edit' && editingPost && (
          <EditPost 
            post={editingPost} 
            onSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
          />
        )}
        {currentView === 'search' && (
          <Search />
        )}
        {currentView === 'reels' && (
          <Reels />
        )}
        {currentView === 'messages' && (
          <Messages />
        )}
        {currentView === 'notifications' && (
          <Notifications />
        )}
        {currentView === 'profile' && (
          <Profile currentUser={currentUser} onEditClick={handleEditClick} />
        )}
      </main>

      {/* Right Sidebar - Hide for certain views */}
      {!['messages', 'reels'].includes(currentView) && (
        <RightSidebar currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;
