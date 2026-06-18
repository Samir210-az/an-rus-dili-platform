import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Progress() {
  const [data, setData] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/students/me').then(res => {
      setStudentProfile(res.data);
      if (res.data?.id) {
        api.get(`/students/${res.data.id}/progress`).then(r => setData(r.data));
      }
    });
  }, []);

  const chartData = data?.grades.map(g => ({
    date: new Date(g.date).toLocaleDateString('az-AZ'),
    qiymət: g.grade,
  })) || [];

  return (
    <div>
      <h1>📊 Tərəqqi</h1>
      {studentProfile && (
        <div className="card">
          <h3>{studentProfile.firstName} {studentProfile.lastName}</h3>
          <p>Səviyyə: {studentProfile.level} | Ulduzlar: ⭐ {studentProfile.totalStars} | Rütbə: {studentProfile.rank}</p>
        </div>
      )}
      {data && (
        <>
          <div className="card">
            <p>İştirak faizi: <strong>{data.attendanceRate}%</strong></p>
            <p>Tamamlanmış tapşırıqlar: <strong>{data.totalSubmissions}</strong></p>
          </div>
          <div className="card" style={{ height: 320 }}>
            <h3>Qiymət inkişafı</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="qiymət" stroke="#FF9800" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
