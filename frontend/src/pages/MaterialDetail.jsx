import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Crossword from '../components/Crossword';

export default function MaterialDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/materials/${id}`).then(res => setData(res.data));
  }, [id]);

  const handleSubmit = async () => {
    const res = await api.post(`/materials/${id}/submit-quiz`, { answers });
    setResult(res.data);
  };

  if (!data) return <p>Yüklənir...</p>;

  return (
    <div>
      <h1>{data.material.title}</h1>
      <div className="card">
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.material.content}</p>
        {data.material.audioUrl && <audio controls src={data.material.audioUrl} style={{ width: '100%', marginTop: 10 }} />}
        {data.material.imageUrl && <img src={data.material.imageUrl} alt="" style={{ maxWidth: '100%', borderRadius: 12, marginTop: 10 }} />}
      </div>

      {data.material.crosswordData?.length > 0 && (
        <Crossword
          words={data.material.crosswordData}
          onComplete={(correct, total) => setGameResult({ correct, total })}
        />
      )}
      {gameResult && (
        <div className="card" style={{ background: '#E8F5E9' }}>
          🎉 Nəticə: {gameResult.correct}/{gameResult.total} düzgün!
        </div>
      )}

      {data.questions.length > 0 && (
        <div className="card">
          <h3>🧩 Tapşırıqlar</h3>
          {data.questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: 16 }}>
              <p><strong>{i + 1}. {q.questionText}</strong></p>
              {q.type === 'multiple_choice' && q.options?.map(opt => (
                <label key={opt} style={{ display: 'block', margin: '4px 0' }}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                  /> {opt}
                </label>
              ))}
              {(q.type === 'open_answer' || q.type === 'fill_blank') && (
                <input
                  placeholder="Cavabınız"
                  onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
                />
              )}
            </div>
          ))}
          {user?.role === 'student' && (
            <button className="btn btn-primary" onClick={handleSubmit}>Cavabları göndər</button>
          )}
          {result && (
            <div className="card" style={{ background: '#E8F5E9', marginTop: 12 }}>
              🎉 Nəticə: {result.attempt.score} xal toplandı! Ümumi ulduzlar: ⭐ {result.newStars} ({result.rank})
            </div>
          )}
        </div>
      )}
    </div>
  );
}
