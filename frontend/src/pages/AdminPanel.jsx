import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', role: 'student', firstName: '', lastName: '' });
  const [createdInfo, setCreatedInfo] = useState(null);

  const loadUsers = () => api.get('/users').then(res => setUsers(res.data));

  useEffect(() => { loadUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await api.post('/users', form);
    setCreatedInfo(res.data);
    setForm({ username: '', role: 'student', firstName: '', lastName: '' });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm('İstifadəçini silmək istədiyinizə əminsiniz?')) return;
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  const handleReset = async (id) => {
    const res = await api.post(`/users/${id}/reset-password`);
    alert(`Yeni müvəqqəti şifrə: ${res.data.temporaryPassword}`);
  };

  return (
    <div>
      <h1>🛠️ Admin Paneli</h1>

      <div className="card">
        <h3>Yeni istifadəçi əlavə et (Müəllim / Şagird)</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          <input placeholder="İstifadəçi adı" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input placeholder="Ad" value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })} required />
          <input placeholder="Soyad" value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })} required />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="student">Şagird</option>
            <option value="teacher">Müəllim</option>
            <option value="parent">Valideyn</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-primary">Yarat</button>
        </form>
        {createdInfo && (
          <div className="card" style={{ background: '#FFF3CD', marginTop: 12 }}>
            ✅ İstifadəçi yaradıldı! <br />
            Login: <strong>{createdInfo.username}</strong> | Müvəqqəti şifrə: <strong>{createdInfo.temporaryPassword}</strong>
            <br /><small>Bu məlumatı müvafiq istifadəçiyə/valideynə çatdırın.</small>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Bütün istifadəçilər</h3>
        <table style={{ width: '100%', marginTop: 10 }}>
          <thead>
            <tr><th>Ad Soyad</th><th>Username</th><th>Rol</th><th>Əməliyyatlar</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleReset(u.id)}>Şifrəni sıfırla</button>{' '}
                  {u.role !== 'super_admin' && (
                    <button className="btn" style={{ background: '#f44336', color: 'white' }} onClick={() => handleDelete(u.id)}>Sil</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
