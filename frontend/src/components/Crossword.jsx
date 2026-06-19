import React, { useState } from 'react';

/**
 * Sadə krossvord komponenti.
 * words: [{ word: 'ДОМ', clue: 'Yaşayış yeri' }, ...]
 * Hər söz üfüqi yerləşir, şagird hərfləri doldurur.
 */
export default function Crossword({ words = [], onComplete }) {
  const [answers, setAnswers] = useState(
    words.map(w => Array(w.word.length).fill(''))
  );
  const [checked, setChecked] = useState(false);

  const handleChange = (wordIdx, letterIdx, value) => {
    const updated = [...answers];
    updated[wordIdx][letterIdx] = value.toUpperCase().slice(-1);
    setAnswers(updated);
  };

  const checkAnswers = () => {
    setChecked(true);
    const correctCount = words.filter((w, i) =>
      answers[i].join('') === w.word.toUpperCase()
    ).length;
    if (onComplete) onComplete(correctCount, words.length);
  };

  return (
    <div className="card">
      <h3>🧩 Krossvord</h3>
      {words.map((w, wi) => {
        const isCorrect = answers[wi].join('') === w.word.toUpperCase();
        return (
          <div key={wi} style={{ marginBottom: 16 }}>
            <p style={{ marginBottom: 6 }}>{wi + 1}. {w.clue}</p>
            <div style={{ display: 'flex', gap: 4 }}>
              {w.word.split('').map((_, li) => (
                <input
                  key={li}
                  maxLength={1}
                  value={answers[wi][li]}
                  onChange={e => handleChange(wi, li, e.target.value)}
                  style={{
                    width: 36, height: 36, textAlign: 'center', fontSize: 18,
                    borderRadius: 8,
                    border: checked
                      ? `2px solid ${isCorrect ? '#4CAF50' : '#f44336'}`
                      : '2px solid #ddd',
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
      <button className="btn btn-primary" onClick={checkAnswers}>Yoxla</button>
    </div>
  );
}
