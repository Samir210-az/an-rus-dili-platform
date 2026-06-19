import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <div>
      <h1>📞 Əlaqə</h1>
      <div className="card">
        <p><strong>Ünvan:</strong> Bakı şəhəri (mərkəzin dəqiq ünvanı)</p>
        <p><strong>Telefon:</strong> +994 XX XXX XX XX</p>
        <p><strong>Iş saatları:</strong> Bazar ertəsi - Cümə, 09:00 - 18:00</p>
      </div>

      <div className="card">
        <h3>Bizə yazın</h3>
        {sent && <p style={{ color: 'green' }}>✅ Mesajınız göndərildi, tezliklə sizinlə əlaqə saxlayacağıq!</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          <input placeholder="Ad Soyad" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} required />
          <input placeholder="Telefon" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} required />
          <textarea placeholder="Mesajınız" value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', minHeight: 100 }} required />
          <button className="btn btn-primary">Göndər</button>
        </form>
      </div>
    </div>
  );
}
