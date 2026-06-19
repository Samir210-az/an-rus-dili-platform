import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/users').then(res => {
      const filtered = res.data.filter(u =>
        user?.role === 'teacher' ? u.role === 'parent' : u.role === 'teacher'
      );
      setContacts(filtered);
    }).catch(() => {});
  }, [user]);

  useEffect(() => {
    if (activeId) {
      api.get(`/messages/${activeId}`).then(res => setMessages(res.data));
    }
  }, [activeId]);

  const send = async () => {
    if (!text.trim()) return;
    const res = await api.post('/messages', { receiverId: activeId, text });
    setMessages([...messages, res.data]);
    setText('');
  };

  return (
    <div>
      <h1>💬 Mesajlar</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        <div className="card" style={{ width: 220 }}>
          <h4>Kontaktlar</h4>
          {contacts.map(c => (
            <div
              key={c.id}
              onClick={() => setActiveId(c.id)}
              style={{
                padding: 8, cursor: 'pointer', borderRadius: 8,
                background: activeId === c.id ? '#FFF3CD' : 'transparent',
              }}
            >
              {c.firstName} {c.lastName}
            </div>
          ))}
        </div>
        <div className="card" style={{ flex: 1, minHeight: 300, display: 'flex', flexDirection: 'column' }}>
          {!activeId && <p>Söhbət başlatmaq üçün kontakt seçin.</p>}
          {activeId && (
            <>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: 10 }}>
                {messages.map(m => (
                  <div key={m.id} style={{
                    textAlign: m.senderId === user.id ? 'right' : 'left', margin: '6px 0',
                  }}>
                    <span style={{
                      background: m.senderId === user.id ? '#2196F3' : '#eee',
                      color: m.senderId === user.id ? 'white' : 'black',
                      padding: '6px 12px', borderRadius: 12, display: 'inline-block',
                    }}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Mesaj yazın..."
                  onKeyDown={e => e.key === 'Enter' && send()}
                />
                <button className="btn btn-primary" onClick={send}>Göndər</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
