# AN Mərkəzi — Rus Dili Hazırlıq Platforması

AN Psixoloji Dəstək və Reabilitasiya Mərkəzi üçün 7-12 yaş arası uşaqlara rus dili tədrisi idarə edən tam funksiyalı veb platforma.

## Texnologiya Stacki
- **Frontend:** React (Vite) + React Router + Axios
- **Backend:** Node.js + Express + Sequelize
- **DB:** PostgreSQL
- **Auth:** JWT (yalnız Admin tərəfindən yaradılan istifadəçilər daxil ola bilər — sign-up yoxdur)

## Quraşdırma

### Backend
```bash
cd backend
cp .env.example .env   # DB məlumatlarını doldur
npm install
node src/utils/seed.js  # Super Admin yaradır: admin / admin123
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Rol sistemi
- **super_admin / admin** — istifadəçi yaratma/silmə/redaktə, dərs, tapşırıq, elan idarəsi
- **teacher** — dərs, tapşırıq, qiymətləndirmə
- **student** — tapşırıq icra, profil görmə
- **parent** — uşağının nəticələrini izləmə

## Modullar
- 🔐 Giriş (sign-up yoxdur, login Admin tərəfindən yaradılır)
- 📅 Dərs Cədvəli + İştirak qeydi
- 📚 Kurs Materialları (Danışıq, Oxu, Yazı, Qrammatika, Oyun) + interaktiv testlər (auto-qiymətləndirmə)
- 📝 Ev Tapşırıqları + Qiymətləndirmə
- ⭐ Bal/Rütbə sistemi (Tələbə → Mütəxəssis → Ustad)
- 📢 Elanlar
- 📊 Tərəqqi qrafiki (recharts)
- 👨‍👩‍👧 Valideyn üçün "Evdə necə kömək etməli?" bölməsi
- 💬 Müəllim-Valideyn mesajlaşma
- 🔔 Avtomatik bildirişlər (dərs xatırlatması, tapşırıq son tarixi)
- 🌍 İkidillilik (AZ/RU)
- 🛠️ Admin Paneli (istifadəçi CRUD, avtomatik şifrə generasiyası)
- 🏛️ Haqqımızda / 📞 Əlaqə (ictimai səhifələr)
- 📂 Hazır şablonlar (test/diktant/fleş-kart yükləmə)
- 🧩 Krossvord oyunu
- 📄 PDF hesabat ixracı (valideyn üçün)

## API Endpoint-lər (əsas)
| Metod | Endpoint | Təsvir |
|---|---|---|
| POST | /api/auth/login | Giriş |
| POST | /api/users | Yeni istifadəçi (Admin) |
| DELETE | /api/users/:id | İstifadəçi sil (Admin) |
| GET/POST | /api/lessons | Dərs cədvəli |
| GET/POST | /api/homeworks | Ev tapşırıqları |
| GET/POST | /api/announcements | Elanlar |

## 🚀 Tam İşlək Sayt üçün Deploy (Pulsuz)

Frontend artıq GitHub Pages-də: https://samir210-az.github.io/an-rus-dili-platform/

Backend + Verilənlər bazasını işə salmaq üçün:

1. https://render.com saytında **pulsuz hesab** yarat (GitHub ilə daxil ol)
2. Dashboard-da **"New" → "Blueprint"** seç
3. Bu repo-nu seç: `Samir210-az/an-rus-dili-platform` (kök qovluqdakı `render.yaml` avtomatik tanınacaq)
4. "Apply" düyməsinə bas — Render avtomatik olaraq backend + PostgreSQL yaradacaq (5-10 dəqiqə çəkir)
5. Backend URL-i alacaqsan (məs: `https://an-rus-dili-backend.onrender.com`)
6. Mənə bu URL-i göndər — frontend-i bu URL-ə qoşub yenidən deploy edəcəm

İlk Super Admin avtomatik yaranır: **admin / admin123** (ilk girişdə şifrəni dəyişin!)

> Qeyd: Render-in pulsuz planı 15 dəqiqə fəaliyyətsizlikdən sonra "yuxuya" keçir, ilk sorğu 30-60 saniyə çəkə bilər.


By s_akhundoff
