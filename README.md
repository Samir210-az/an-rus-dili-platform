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
- 📝 Ev Tapşırıqları + Qiymətləndirmə
- ⭐ Bal/Rütbə sistemi (Tələbə → Mütəxəssis → Ustad)
- 📢 Elanlar
- 🛠️ Admin Paneli (istifadəçi CRUD, avtomatik şifrə generasiyası)

## API Endpoint-lər (əsas)
| Metod | Endpoint | Təsvir |
|---|---|---|
| POST | /api/auth/login | Giriş |
| POST | /api/users | Yeni istifadəçi (Admin) |
| DELETE | /api/users/:id | İstifadəçi sil (Admin) |
| GET/POST | /api/lessons | Dərs cədvəli |
| GET/POST | /api/homeworks | Ev tapşırıqları |
| GET/POST | /api/announcements | Elanlar |

---
By **s_akhundoff**
