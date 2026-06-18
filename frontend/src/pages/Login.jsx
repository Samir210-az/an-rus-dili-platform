import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş xətası');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>🎓 AN Mərkəzi</h2>
        <p style={{ textAlign: 'center', marginBottom: 20, color: '#777' }}>
          Rus dili hazırlıq platforması
        </p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="İstifadəçi adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
            Daxil ol
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: 13, color: '#999', textAlign: 'center' }}>
          Qeydiyyat yoxdur — hesabınızı Admin yaradır.
        </p>
      </div>
    </div>
  );
}
