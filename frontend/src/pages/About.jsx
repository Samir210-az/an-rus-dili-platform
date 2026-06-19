import React from 'react';

export default function About() {
  return (
    <div>
      <h1>🏛️ Haqqımızda</h1>
      <div className="card">
        <h3>AN Psixoloji Dəstək və Reabilitasiya Mərkəzi</h3>
        <p style={{ marginTop: 10 }}>
          Mərkəzimiz uşaqların psixoloji inkişafına və dil bacarıqlarının formalaşmasına dəstək məqsədilə
          fəaliyyət göstərir. Rus dili hazırlıq proqramımız 7-12 yaş arası uşaqlar üçün nəzərdə tutulub və
          həftədə 3 dəfə keçirilir.
        </p>
        <p style={{ marginTop: 10 }}>
          Məqsədimiz uşaqlara dil öyrənməyi əyləncəli, maraqlı və effektiv şəkildə təqdim etməkdir.
          Hər dərs danışıq, oxu, yazı, qrammatika və oyun bloklarından ibarətdir.
        </p>
      </div>

      <div className="card">
        <h3>👩‍🏫 Müəllim Heyəti</h3>
        <p style={{ color: '#777' }}>Mərkəzimizin təcrübəli mütəxəssisləri uşaqlarla fərdi yanaşma əsasında işləyir.</p>
      </div>

      <div className="card">
        <h3>🎯 Missiyamız</h3>
        <ul style={{ marginLeft: 20, marginTop: 8 }}>
          <li>Uşaq dostu, dəstəkləyici təlim mühiti yaratmaq</li>
          <li>Fərdi inkişaf templəri ilə işləmək</li>
          <li>Valideynlərlə şəffaf əməkdaşlıq qurmaq</li>
        </ul>
      </div>
    </div>
  );
}
