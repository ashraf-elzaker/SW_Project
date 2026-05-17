import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, Send, Search, Inbox, Star, 
  Clock, Check, CheckCheck, ChevronRight, Filter,
  Sparkles, Mail, Phone, Video, MoreVertical,
  Smile, Paperclip, Image, Mic, Trash2,
  Archive, AlertCircle, Users, PlusCircle,
  Download, Eye, Reply, Forward, Flag,
  Bell, BellOff, Volume2, VolumeX,
  Pin, PinOff, Settings, HelpCircle
} from 'lucide-react';

export default function Messages(){
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState([]);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, starred
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typingStatus, setTypingStatus] = useState({});

  // Mock data for demo - replace with real data later
  useEffect(() => {
    const mockChats = [
      {
        id: 1,
        name: 'Ahmed Hassan',
        avatar: '👨‍💼',
        lastMessage: 'Is this still available?',
        time: '2 min ago',
        unread: 2,
        online: true,
        starred: true,
        messages: [
          { id: 1, sender: 'them', text: 'Hi, is this item still available?', time: '10:30 AM', status: 'read' },
          { id: 2, sender: 'them', text: 'I would like to purchase it', time: '10:31 AM', status: 'read' },
          { id: 3, sender: 'me', text: 'Yes, it is! When would you like to pick it up?', time: '10:35 AM', status: 'delivered' },
          { id: 4, sender: 'them', text: 'Is this still available?', time: '2 min ago', status: 'sent' },
        ]
      },
      {
        id: 2,
        name: 'Sara Mohamed',
        avatar: '👩‍🎨',
        lastMessage: 'Thank you!',
        time: '1 hour ago',
        unread: 0,
        online: false,
        lastSeen: '1 hour ago',
        starred: false,
        messages: [
          { id: 1, sender: 'me', text: 'The product is ready for pickup', time: '2:00 PM', status: 'read' },
          { id: 2, sender: 'them', text: 'Thank you! I will come tomorrow', time: '2:15 PM', status: 'read' },
        ]
      },
      {
        id: 3,
        name: 'Omar Ali',
        avatar: '👨‍🔧',
        lastMessage: 'Can you deliver?',
        time: '3 hours ago',
        unread: 1,
        online: true,
        starred: true,
        messages: [
          { id: 1, sender: 'them', text: 'Can you deliver to Maadi?', time: '11:00 AM', status: 'read' },
        ]
      },
      {
        id: 4,
        name: 'Nora Ahmed',
        avatar: '👩‍💻',
        lastMessage: 'Price is negotiable?',
        time: 'Yesterday',
        unread: 0,
        online: false,
        lastSeen: '2 hours ago',
        starred: false,
        messages: [
          { id: 1, sender: 'them', text: 'Is the price negotiable?', time: '5:00 PM', status: 'read' },
          { id: 2, sender: 'me', text: 'I can give you a discount for bulk purchase', time: '5:30 PM', status: 'read' },
        ]
      },
      {
        id: 5,
        name: 'Karim Said',
        avatar: '👨‍🏫',
        lastMessage: 'I love it!',
        time: '2 days ago',
        unread: 0,
        online: false,
        lastSeen: '1 day ago',
        starred: false,
        messages: [
          { id: 1, sender: 'them', text: 'The product is amazing!', time: '3:00 PM', status: 'read' },
        ]
      }
    ];
    setChats(mockChats);
  }, []);

  const filteredChats = chats.filter(chat => {
    if (filter === 'unread') return chat.unread > 0;
    if (filter === 'starred') return chat.starred;
    if (searchTerm) return chat.name.toLowerCase().includes(searchTerm.toLowerCase());
    return true;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'sent': return <Check size={14} color="#A0AEC0" />;
      case 'delivered': return <CheckCheck size={14} color="#A0AEC0" />;
      case 'read': return <CheckCheck size={14} color="#34D399" />;
      default: return null;
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: messageInput,
          time: 'Just now'
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, newMessage] });
    setMessageInput('');
    
    // Simulate typing indicator
    setTypingStatus({ [selectedChat.id]: true });
    setTimeout(() => {
      setTypingStatus({ [selectedChat.id]: false });
    }, 2000);
  };

  return (
    <div className="main-area">
      <style>{styles}</style>
      
      {/* Decorative Background Elements */}
      <div className="bg-pattern"></div>
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      
      <div className="messages-container">
        {/* Left Panel - Chats List */}
        <div className="chats-panel">
          {/* Header */}
          <div className="panel-header">
            <div className="header-title">
              <MessageCircle size={24} color="#D2691E" />
              <div>
                <h2>Messages</h2>
                <span className="chat-count">{chats.length} conversations</span>
              </div>
            </div>
            <button className="new-chat-btn">
              <PlusCircle size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <Inbox size={16} />
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                onClick={() => setFilter('unread')}
              >
                <Mail size={16} />
                Unread
              </button>
              <button 
                className={`filter-btn ${filter === 'starred' ? 'active' : ''}`}
                onClick={() => setFilter('starred')}
              >
                <Star size={16} />
                Starred
              </button>
            </div>
          </div>

          {/* Chats List */}
          <div className="chats-list">
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''} ${chat.unread > 0 ? 'unread' : ''}`}
                  onClick={() => setSelectedChat(chat)}
                  onMouseEnter={() => setHoveredMessage(chat.id)}
                  onMouseLeave={() => setHoveredMessage(null)}
                >
                  <div className="chat-avatar">
                    <span className="avatar-emoji">{chat.avatar}</span>
                    {chat.online && <span className="online-indicator"></span>}
                  </div>
                  
                  <div className="chat-info">
                    <div className="chat-header">
                      <h4>{chat.name}</h4>
                      <span className="chat-time">{chat.time}</span>
                    </div>
                    
                    <div className="chat-preview">
                      <p className="last-message">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="unread-badge">{chat.unread}</span>
                      )}
                    </div>
                    
                    <div className="chat-meta">
                      {chat.starred && <Star size={12} color="#FBBF24" />}
                      {!chat.online && chat.lastSeen && (
                        <span className="last-seen">Seen {chat.lastSeen}</span>
                      )}
                    </div>
                  </div>
                  
                  {hoveredMessage === chat.id && (
                    <div className="chat-actions">
                      <button className="action-icon"><Star size={14} /></button>
                      <button className="action-icon"><Archive size={14} /></button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <MessageCircle size={48} color="#DEB887" />
                <p>No conversations found</p>
                <button className="start-chat-btn">Start new chat</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="chat-panel">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-header-panel">
                <div className="chat-user-info">
                  <div className="user-avatar">
                    <span className="avatar-emoji">{selectedChat.avatar}</span>
                    {selectedChat.online && <span className="online-indicator"></span>}
                  </div>
                  <div>
                    <h3>{selectedChat.name}</h3>
                    <div className="user-status">
                      {selectedChat.online ? (
                        <span className="online-status">Online</span>
                      ) : (
                        <span className="offline-status">Last seen {selectedChat.lastSeen}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="chat-actions-panel">
                  <button className="action-btn"><Phone size={18} /></button>
                  <button className="action-btn"><Video size={18} /></button>
                  <button className="action-btn"><MoreVertical size={18} /></button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`message-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`}
                  >
                    {msg.sender !== 'me' && (
                      <div className="message-avatar small">
                        <span>{selectedChat.avatar}</span>
                      </div>
                    )}
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                      <div className="message-footer">
                        <span className="message-time">{msg.time}</span>
                        {msg.sender === 'me' && getStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {typingStatus[selectedChat.id] && (
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>typing...</span>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                <div className="input-tools">
                  <button className="tool-btn"><Smile size={20} /></button>
                  <button className="tool-btn"><Paperclip size={20} /></button>
                  <button className="tool-btn"><Image size={20} /></button>
                </div>
                
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                
                <button 
                  className={`send-btn ${messageInput.trim() ? 'active' : ''}`}
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="welcome-icon">
                <Sparkles size={48} color="#D2691E" />
              </div>
              <h3>Welcome to Messages</h3>
              <p>Select a conversation to start chatting</p>
              <div className="quick-actions">
                <button className="quick-action">
                  <MessageCircle size={16} />
                  <span>Browse listings</span>
                </button>
                <button className="quick-action">
                  <Users size={16} />
                  <span>View all contacts</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Creative CSS Styles
const styles = `
  .main-area {
    padding: 2rem;
    background: linear-gradient(135deg, #f8f5ec 0%, #f0e9db 100%);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  /* Decorative Background */
  .bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 1px 1px, rgba(210,180,140,0.1) 1px, transparent 0);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .floating-shape {
    position: absolute;
    background: radial-gradient(circle, rgba(210,180,140,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
    animation: float 20s infinite;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    bottom: -150px;
    left: -150px;
    animation: float 25s infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(5deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
  }

  /* Main Container */
  .messages-container {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 1.5rem;
    height: calc(100vh - 4rem);
    background: white;
    border-radius: 2rem;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(139,69,19,0.15);
    position: relative;
    z-index: 10;
  }

  /* Left Panel */
  .chats-panel {
    background: #FDF6E3;
    border-right: 2px solid #F0EDE4;
    display: flex;
    flex-direction: column;
  }

  .panel-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #F0EDE4;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-title h2 {
    color: #654321;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .chat-count {
    color: #A0522D;
    font-size: 0.8rem;
  }

  .new-chat-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #DEB887;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .new-chat-btn:hover {
    background: #D2691E;
    transform: rotate(90deg);
  }

  /* Search Section */
  .search-section {
    padding: 1rem 1.5rem;
    border-bottom: 2px solid #F0EDE4;
  }

  .search-wrapper {
    position: relative;
    margin-bottom: 1rem;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #A0522D;
  }

  .search-wrapper input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #F0EDE4;
    border-radius: 1rem;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;
  }

  .search-wrapper input:focus {
    outline: none;
    border-color: #D2691E;
    box-shadow: 0 0 0 3px rgba(210,105,30,0.1);
  }

  /* Filters */
  .filters {
    display: flex;
    gap: 0.5rem;
  }

  .filter-btn {
    flex: 1;
    padding: 0.5rem;
    border: 2px solid #F0EDE4;
    border-radius: 2rem;
    background: white;
    color: #A0522D;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-btn.active {
    background: #D2691E;
    border-color: #D2691E;
    color: white;
  }

  .filter-btn:hover:not(.active) {
    background: #F0EDE4;
    transform: translateY(-2px);
  }

  /* Chats List */
  .chats-list {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.5rem;
  }

  .chats-list::-webkit-scrollbar {
    width: 6px;
  }

  .chats-list::-webkit-scrollbar-track {
    background: #F0EDE4;
    border-radius: 3px;
  }

  .chats-list::-webkit-scrollbar-thumb {
    background: #DEB887;
    border-radius: 3px;
  }

  .chat-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    margin-bottom: 0.5rem;
  }

  .chat-item:hover {
    background: rgba(222,184,135,0.2);
    transform: translateX(5px);
  }

  .chat-item.active {
    background: rgba(210,105,30,0.1);
    border-left: 4px solid #D2691E;
  }

  .chat-item.unread {
    background: rgba(210,105,30,0.05);
  }

  .chat-avatar {
    position: relative;
    width: 48px;
    height: 48px;
  }

  .avatar-emoji {
    width: 100%;
    height: 100%;
    background: #DEB887;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .online-indicator {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    background: #10B981;
    border: 2px solid white;
    border-radius: 50%;
  }

  .chat-info {
    flex: 1;
    min-width: 0;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .chat-header h4 {
    color: #654321;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
  }

  .chat-time {
    color: #A0522D;
    font-size: 0.7rem;
  }

  .chat-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .last-message {
    color: #8B7355;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .unread-badge {
    background: #D2691E;
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    border-radius: 1rem;
    min-width: 20px;
    text-align: center;
  }

  .chat-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .last-seen {
    color: #A0522D;
    font-size: 0.65rem;
  }

  .chat-actions {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 0.5rem;
    background: white;
    padding: 0.5rem;
    border-radius: 2rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    animation: slideIn 0.2s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(10px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }

  .action-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: #F5F5DC;
    color: #8B4513;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-icon:hover {
    background: #DEB887;
    color: white;
    transform: scale(1.1);
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
  }

  .empty-state p {
    color: #A0522D;
    margin: 1rem 0;
  }

  .start-chat-btn {
    padding: 0.75rem 1.5rem;
    background: #D2691E;
    border: none;
    border-radius: 2rem;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .start-chat-btn:hover {
    background: #8B4513;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(210,105,30,0.3);
  }

  /* Right Panel - Chat */
  .chat-panel {
    display: flex;
    flex-direction: column;
    background: white;
  }

  .chat-header-panel {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #F0EDE4;
  }

  .chat-user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-avatar {
    position: relative;
    width: 48px;
    height: 48px;
  }

  .user-avatar .avatar-emoji {
    background: #D2691E;
    color: white;
  }

  .chat-user-info h3 {
    color: #654321;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .user-status {
    font-size: 0.8rem;
  }

  .online-status {
    color: #10B981;
    font-weight: 600;
  }

  .offline-status {
    color: #A0522D;
  }

  .chat-actions-panel {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 2px solid #F0EDE4;
    background: transparent;
    color: #8B4513;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-btn:hover {
    background: #D2691E;
    border-color: #D2691E;
    color: white;
    transform: translateY(-2px);
  }

  /* Messages Area */
  .messages-area {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .messages-area::-webkit-scrollbar {
    width: 6px;
  }

  .messages-area::-webkit-scrollbar-track {
    background: #F0EDE4;
    border-radius: 3px;
  }

  .messages-area::-webkit-scrollbar-thumb {
    background: #DEB887;
    border-radius: 3px;
  }

  .message-wrapper {
    display: flex;
    gap: 0.75rem;
    max-width: 80%;
  }

  .message-wrapper.sent {
    margin-left: auto;
    flex-direction: row-reverse;
  }

  .message-avatar.small {
    width: 32px;
    height: 32px;
  }

  .message-avatar.small span {
    font-size: 1rem;
  }

  .message-bubble {
    padding: 0.75rem 1rem;
    border-radius: 1.25rem;
    position: relative;
    animation: messagePop 0.3s ease;
  }

  @keyframes messagePop {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .message-wrapper.received .message-bubble {
    background: #F5F5DC;
    border-bottom-left-radius: 4px;
  }

  .message-wrapper.sent .message-bubble {
    background: #D2691E;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .message-bubble p {
    margin: 0 0 0.25rem;
    line-height: 1.4;
  }

  .message-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.25rem;
  }

  .message-time {
    font-size: 0.65rem;
    opacity: 0.7;
  }

  .message-wrapper.sent .message-time {
    color: rgba(255,255,255,0.8);
  }

  .message-wrapper.received .message-time {
    color: #8B7355;
  }

  /* Typing Indicator */
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #F5F5DC;
    border-radius: 2rem;
    width: fit-content;
  }

  .typing-dots {
    display: flex;
    gap: 0.25rem;
  }

  .typing-dots span {
    width: 8px;
    height: 8px;
    background: #8B4513;
    border-radius: 50%;
    animation: typingBounce 1.4s infinite;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-8px); }
  }

  /* Message Input */
  .message-input-area {
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    border-top: 2px solid #F0EDE4;
  }

  .input-tools {
    display: flex;
    gap: 0.5rem;
  }

  .tool-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 2px solid #F0EDE4;
    background: transparent;
    color: #8B4513;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tool-btn:hover {
    background: #F5F5DC;
    transform: scale(1.1);
  }

  .message-input-area input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #F0EDE4;
    border-radius: 1.5rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .message-input-area input:focus {
    outline: none;
    border-color: #D2691E;
    box-shadow: 0 0 0 3px rgba(210,105,30,0.1);
  }

  .send-btn {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    border: none;
    background: #F0EDE4;
    color: #8B4513;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .send-btn.active {
    background: #D2691E;
    color: white;
    transform: scale(1.1);
  }

  .send-btn.active:hover {
    background: #8B4513;
    transform: scale(1.15) rotate(-10deg);
  }

  /* No Chat Selected */
  .no-chat-selected {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .welcome-icon {
    width: 100px;
    height: 100px;
    background: #FDF6E3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    animation: float 3s infinite;
  }

  .no-chat-selected h3 {
    color: #654321;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .no-chat-selected p {
    color: #A0522D;
    margin-bottom: 2rem;
  }

  .quick-actions {
    display: flex;
    gap: 1rem;
  }

  .quick-action {
    padding: 0.75rem 1.5rem;
    background: #F5F5DC;
    border: 2px solid #DEB887;
    border-radius: 2rem;
    color: #8B4513;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .quick-action:hover {
    background: #DEB887;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(139,69,19,0.2);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .messages-container {
      grid-template-columns: 300px 1fr;
    }
  }

  @media (max-width: 768px) {
    .main-area {
      padding: 1rem;
    }

    .messages-container {
      grid-template-columns: 1fr;
      height: calc(100vh - 2rem);
    }

    .chats-panel {
      display: none;
    }

    .chats-panel.active {
      display: flex;
    }

    .quick-actions {
      flex-direction: column;
    }
  }

  /* Animations */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .new-chat-btn {
    animation: pulse 2s infinite;
  }
`;