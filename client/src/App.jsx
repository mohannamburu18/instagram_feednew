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

  const currentUser = localStorage.getItem('currentUser') || 'guest';

  const handleEditClick = (post) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  return (
    <div className="app">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
      />

      <main className="app-main">
        {currentView === 'feed' && <Feed onEditClick={handleEditClick} />}
        {currentView === 'create' && <CreatePost onSuccess={() => setCurrentView('feed')} />}
        {currentView === 'edit' && editingPost && (
          <EditPost post={editingPost} onSuccess={() => setCurrentView('feed')} />
        )}
        {currentView === 'search' && <Search />}
        {currentView === 'reels' && <Reels />}
        {currentView === 'messages' && <Messages />}
        {currentView === 'notifications' && <Notifications />}
        {currentView === 'profile' && (
          <Profile currentUser={currentUser} onEditClick={handleEditClick} />
        )}
      </main>

      {!['messages', 'reels'].includes(currentView) && (
        <RightSidebar currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;
