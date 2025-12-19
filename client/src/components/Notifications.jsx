import { useState } from 'react';
import './Notifications.css';

function Notifications() {
  const [followRequests, setFollowRequests] = useState({});
  
  const notifications = {
    followRequests: [
      { id: 1, username: 'user1', avatar: 'U', time: '1 other', type: 'follow_request' }
    ],
    thisWeek: [
      { 
        id: 2, 
        username: 'luckybloke24', 
        avatar: 'L', 
        action: 'followed 15,073m on Instagram',
        type: 'milestone',
        actionButton: 'Follow',
        time: '4d'
      },
    ],
    thisMonth: [
      { 
        id: 3, 
        username: 'jeong_jeff69', 
        avatar: 'J', 
        action: 'requested to follow you.', 
        type: 'follow_request',
        time: '2w'
      },
      { 
        id: 4, 
        username: 'catieconcorded4', 
        avatar: 'C', 
        action: 'requested to follow', 
        type: 'follow_request',
        time: '2w'
      },
      { 
        id: 5, 
        username: 'luvbohule and longgboy', 
        avatar: 'L', 
        action: 'liked your post.', 
        type: 'like',
        thumbnail: '🖼️',
        time: '2w'
      },
      { 
        id: 6, 
        username: 'bollaranthankday, miamimove0712 and others', 
        avatar: 'B', 
        action: 'shared 17 photos.', 
        type: 'share',
        time: '2w'
      },
      { 
        id: 7, 
        username: '15.07ka is on Instagram', 
        avatar: '1', 
        action: 'ahh.1ih and 1 other follow them', 
        type: 'suggestion',
        actionButton: 'Follow',
        time: '2w'
      },
      { 
        id: 8, 
        username: 'hooquang23', 
        avatar: 'H', 
        action: 'commented: 👍', 
        type: 'comment',
        thumbnail: '🖼️',
        time: '3w'
      },
      { 
        id: 9, 
        username: 'hooquang23 and longgboy', 
        avatar: 'H', 
        action: 'liked your post.', 
        type: 'like',
        thumbnail: '🖼️',
        time: '3w'
      },
    ],
    earlier: [
      { 
        id: 10, 
        username: 'tommynu liked your post', 
        avatar: 'T', 
        action: '', 
        type: 'like',
        thumbnail: '🖼️',
        time: '4w'
      },
    ]
  };

  const handleFollow = (userId) => {
    setFollowRequests(prev => ({
      ...prev,
      [userId]: 'following'
    }));
  };

  const handleConfirm = (userId) => {
    setFollowRequests(prev => ({
      ...prev,
      [userId]: 'confirmed'
    }));
  };

  const handleDelete = (userId) => {
    setFollowRequests(prev => ({
      ...prev,
      [userId]: 'deleted'
    }));
  };

  const renderNotification = (notif) => {
    return (
      <div key={notif.id} className="notification-item">
        <div className="notif-left">
          <div className="notif-avatar">{notif.avatar}</div>
          <div className="notif-content">
            <span className="notif-text">
              <strong>{notif.username}</strong> {notif.action}
            </span>
            <span className="notif-time">{notif.time}</span>
          </div>
        </div>
        <div className="notif-right">
          {notif.type === 'follow_request' && !followRequests[notif.id] && (
            <div className="notif-actions">
              <button 
                className="confirm-btn"
                onClick={() => handleConfirm(notif.id)}
              >
                Confirm
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(notif.id)}
              >
                Delete
              </button>
            </div>
          )}
          {notif.type === 'milestone' && !followRequests[notif.id] && (
            <button 
              className="follow-notif-btn"
              onClick={() => handleFollow(notif.id)}
            >
              {notif.actionButton}
            </button>
          )}
          {notif.type === 'suggestion' && !followRequests[notif.id] && (
            <button 
              className="follow-notif-btn"
              onClick={() => handleFollow(notif.id)}
            >
              {notif.actionButton}
            </button>
          )}
          {followRequests[notif.id] === 'following' && (
            <span className="following-label">Following</span>
          )}
          {followRequests[notif.id] === 'confirmed' && (
            <span className="confirmed-label">✓</span>
          )}
          {notif.thumbnail && (
            <div className="notif-thumbnail">{notif.thumbnail}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
      </div>

      <div className="notifications-list">
        {/* Follow Requests */}
        {notifications.followRequests.length > 0 && (
          <div className="notif-section">
            <div className="notif-section-header">
              <h3>Follow requests</h3>
              <button className="see-all-notif">→</button>
            </div>
            {notifications.followRequests.map(renderNotification)}
          </div>
        )}

        {/* This Week */}
        {notifications.thisWeek.length > 0 && (
          <div className="notif-section">
            <h3 className="notif-section-title">This Week</h3>
            {notifications.thisWeek.map(renderNotification)}
          </div>
        )}

        {/* This Month */}
        {notifications.thisMonth.length > 0 && (
          <div className="notif-section">
            <h3 className="notif-section-title">This Month</h3>
            {notifications.thisMonth.map(renderNotification)}
          </div>
        )}

        {/* Earlier */}
        {notifications.earlier.length > 0 && (
          <div className="notif-section">
            <h3 className="notif-section-title">Earlier</h3>
            {notifications.earlier.map(renderNotification)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
