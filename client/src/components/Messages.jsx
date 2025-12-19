import { useState } from 'react';
import './Messages.css';

function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Sample stories for top
  const stories = [
    { id: 1, name: 'Leave a note', avatar: '📝', isNote: true },
    { id: 2, name: 'Kyra Marie', avatar: 'K', active: true },
    { id: 3, name: 'Drew Young', avatar: 'D', active: true },
    { id: 4, name: 'James', avatar: 'J', active: false },
  ];

  // Sample conversations
  const conversations = [
    { id: 1, username: 'jaded.elephant17', avatar: 'J', message: 'OK', time: '2m', unread: true, online: true },
    { id: 2, username: 'kyla_kayaks', avatar: 'K', message: 'Did you leave yet?', time: '2m', unread: true, online: true },
    { id: 3, username: 'ted_graham321', avatar: 'T', message: "Sounds good! Let's do it", time: '45m', unread: false, online: false },
    { id: 4, username: 'Study Group', avatar: 'S', message: 'pia.in.a.pod: hahaha', time: '2h', unread: false, online: false },
    { id: 5, username: 'heaven.is.nevaeh', avatar: 'H', message: 'It was great!', time: '3h', unread: false, online: false },
    { id: 6, username: 'lil_wyatt838', avatar: 'L', message: "That's awesome!", time: '3d', unread: false, online: false },
    { id: 7, username: 'paisley.print.48', avatar: 'P', message: 'Whaaaat?', time: '6h', unread: false, online: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        {/* Header */}
        <div className="messages-header">
          <h2>Messages</h2>
          <button className="requests-btn">Requests</button>
        </div>

        {/* Search */}
        <div className="messages-search">
          <input type="text" placeholder="Search" />
        </div>

        {/* Stories */}
        <div className="messages-stories">
          {stories.map((story) => (
            <div key={story.id} className="story-item-msg">
              <div className={`story-avatar-msg ${story.isNote ? 'note' : ''}`}>
                {story.avatar}
              </div>
              <span className="story-name-msg">{story.name}</span>
            </div>
          ))}
        </div>

        {/* Conversations List */}
        <div className="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedChat === conv.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(conv.id)}
            >
              <div className="conv-avatar-wrapper">
                <div className="conv-avatar">{conv.avatar}</div>
                {conv.online && <span className="online-dot"></span>}
              </div>
              <div className="conv-details">
                <div className="conv-top">
                  <span className="conv-username">{conv.username}</span>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <div className="conv-bottom">
                  <span className={`conv-message ${conv.unread ? 'unread' : ''}`}>
                    {conv.message}
                  </span>
                  {conv.unread && <span className="unread-dot"></span>}
                </div>
              </div>
              <button className="conv-camera-btn">📷</button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-header-user">
                <div className="chat-avatar">
                  {conversations.find(c => c.id === selectedChat)?.avatar}
                </div>
                <span className="chat-username">
                  {conversations.find(c => c.id === selectedChat)?.username}
                </span>
              </div>
              <div className="chat-header-actions">
                <button className="chat-action-btn">📞</button>
                <button className="chat-action-btn">📹</button>
                <button className="chat-action-btn">ⓘ</button>
              </div>
            </div>

            <div className="chat-messages">
              <div className="chat-placeholder">
                <p>Start chatting with {conversations.find(c => c.id === selectedChat)?.username}</p>
              </div>
            </div>

            <div className="chat-input-area">
              <button className="chat-emoji-btn">😊</button>
              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              {message.trim() ? (
                <button className="send-btn" onClick={handleSendMessage}>Send</button>
              ) : (
                <>
                  <button className="chat-icon-btn">🎤</button>
                  <button className="chat-icon-btn">🖼️</button>
                  <button className="chat-icon-btn">❤️</button>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-icon">💬</div>
            <h3>Your Messages</h3>
            <p>Send private photos and messages to a friend or group</p>
            <button className="send-message-btn">Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
