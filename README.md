# 🎬 Çukur Fan App

Türk serialı **Çukur** (2017–2021) üçün tam stack fan veb tətbiqi.  
React + Redux frontend, Django REST Framework backend, SQLite verilənlər bazası.

---

## 📋 Layihə haqqında

Çukur Fan App istifadəçilərə serialın personajlarını, mövsümlərini kəşf etməyə,  
bəyəndiklərini saxlamağa və bilik yarışmasında iştirak etməyə imkan verir.

### Əsas xüsusiyyətlər

| Xüsusiyyət | Təsvir |
|---|---|
| 🎭 Personajlar | 35 personaj — şəkil, rol məlumatı, Wikipedia linki |
| 📺 Mövsümlər | 4 mövsüm kartı — YouTube playlist linkləri ilə |
| 🎠 Slider | Ana səhifə mövsüm slider-i |
| ❤️ Bəyənilənlər | Login olmuş istifadəçilərin bəyəndikləri backend-də saxlanır |
| 🛒 Səbət | Personajları səbətə əlavə et |
| 🔐 Auth | Qeydiyyat / Giriş — Django Token auth |
| 👤 Profil | Avatar seçici, bio redaktəsi, statistika |
| 🧠 Quiz | Serialda baş verən hadisələr haqqında suallar — asan/orta/çətin |
| 💬 Fan Review | Hər personaja şərh və ulduz reytinqi (localStorage) |
| 🌗 Dark/Light | Tema dəyişdirici |
| 🔍 Filtr | Mövsüm və rol tipi (qəhrəman/antagonist) filterləri |
| 🔧 Admin | Django admin panelindən bütün məlumatları idarə et |

---

## 🛠 İstifadə olunan texnologiyalar

### Frontend
| Texnologiya | Versiya | Məqsəd |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool / Dev server |
| Redux Toolkit | 2.2 | State management |
| React Redux | 9.1 | Redux-React inteqrasiyası |
| React Router DOM | 6.26 | Client-side routing |

### Backend
| Texnologiya | Versiya | Məqsəd |
|---|---|---|
| Python | 3.14 | Proqramlaşdırma dili |
| Django | 6.0 | Web framework |
| Django REST Framework | 3.17 | REST API |
| django-cors-headers | 4.9 | CORS idarəsi |
| SQLite | built-in | Verilənlər bazası |

---

## 📁 Layihə strukturu

```
Çukur/
├── src/                        # React frontend
│   ├── components/             # Yenidən istifadə olunan komponentlər
│   │   ├── card/               # Personaj kartı + modal
│   │   ├── cardList/           # Filtrlənən personaj siyahısı
│   │   ├── navbar/             # Naviqasiya paneli
│   │   ├── slider/             # Ana səhifə slider-i
│   │   ├── review/             # Fan şərh komponenti
│   │   ├── items/              # Bəyənilənlər / Səbət siyahıları
│   │   └── ProtectedRoute/     # Auth guard
│   ├── pages/                  # Səhifə komponentləri
│   │   ├── Home/               # Ana səhifə
│   │   ├── Products/           # Mövsümlər
│   │   ├── Quiz/               # Bilik yarışması
│   │   ├── Profile/            # İstifadəçi profili
│   │   ├── Login/              # Giriş formu
│   │   ├── Register/           # Qeydiyyat formu
│   │   ├── Likes/              # Bəyənilənlər səhifəsi
│   │   ├── Basket/             # Səbət səhifəsi
│   │   ├── About/              # Haqqında
│   │   └── Contact/            # Əlaqə
│   ├── store/                  # Redux store
│   │   ├── auth/               # Auth reducer (login/register/logout)
│   │   ├── card/               # Likes/basket reducer
│   │   ├── content/            # Persons/seasons/slides reducer
│   │   ├── navbar/             # Navbar state
│   │   └── theme/              # Dark/light mode
│   ├── services/
│   │   └── api.js              # Bütün API çağırışları
│   └── layout/                 # Layout komponenti
│
├── backend/                    # Django backend
│   ├── api/                    # Əsas app
│   │   ├── models.py           # Season, Person, SliderSlide, QuizQuestion, LikedItem, BasketItem
│   │   ├── views.py            # API view-ları
│   │   ├── serializers.py      # DRF serializer-ları
│   │   ├── urls.py             # API URL-ləri
│   │   ├── admin.py            # Admin panel konfiqurasiyası
│   │   └── management/
│   │       └── commands/
│   │           ├── seed.py         # Personaj/mövsüm/slide seeder
│   │           └── seed_quiz.py    # Quiz sualları seeder
│   ├── backend/
│   │   ├── settings.py         # Django ayarları
│   │   └── urls.py             # Root URL konfiqurasiyası
│   ├── venv/                   # Python virtual environment (git-ə daxil deyil)
│   ├── requirements.txt        # Python asılılıqları
│   └── db.sqlite3              # SQLite DB (git-ə daxil deyil)
│
├── public/
│   └── img/                    # Personaj şəkilləri
├── package.json                # Node.js asılılıqları
└── README.md
```

---

## 🚀 Quraşdırma və işə salma

### Tələblər
- **Node.js** 18+
- **Python** 3.10+

---

### 1. Layihəni klon et

```bash
git clone https://github.com/istifadeci_adi/cukur-fan-app.git
cd cukur-fan-app
```

---

### 2. Frontend quraşdırması

```bash
# Asılılıqları yüklə
npm install

# Dev serveri başlat (http://localhost:5173)
npm run dev
```

---

### 3. Backend quraşdırması

```bash
cd backend

# Virtual environment yarat
python -m venv venv

# Virtual environment-i aktivləşdir
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Asılılıqları yüklə
pip install -r requirements.txt

# Verilənlər bazasını yarat
python manage.py migrate

# İlkin məlumatları DB-yə yüklə
python manage.py seed
python manage.py seed_quiz

# Admin istifadəçi yarat
python manage.py createsuperuser

# Serveri başlat (http://127.0.0.1:8000)
python manage.py runserver
```

---

## 🔌 API Endpointləri

### Public (auth tələb etmir)
| Method | URL | Təsvir |
|---|---|---|
| GET | `/api/persons/` | Bütün personajlar |
| GET | `/api/seasons/` | Bütün mövsümlər |
| GET | `/api/slides/` | Slider məlumatları |
| GET | `/api/quiz/questions/` | Quiz sualları (`?difficulty=easy&category=events&limit=10`) |

### Auth
| Method | URL | Təsvir |
|---|---|---|
| POST | `/api/auth/register/` | Qeydiyyat |
| POST | `/api/auth/login/` | Giriş → Token |
| POST | `/api/auth/logout/` | Çıxış |
| GET | `/api/auth/me/` | Cari istifadəçi |

### Protected (Token tələb edir)
| Method | URL | Təsvir |
|---|---|---|
| GET | `/api/likes/` | Bəyənilənlər siyahısı |
| POST | `/api/likes/toggle/` | Bəyən / bəyənməni ləğv et |
| GET | `/api/basket/` | Səbət siyahısı |
| POST | `/api/basket/toggle/` | Səbətə əlavə et / çıxar |

---

## 🔧 Admin panel

`http://127.0.0.1:8000/admin/` — superuser ilə daxil ol.

Admin panelindən:
- **Personajlar** — əlavə et, redaktə et, mövsüm bağlantıları qur
- **Mövsümlər** — il, bölüm sayı, YouTube linki
- **Slider** — slayd şəkilləri və linkləri
- **Quiz sualları** — çətinlik, kateqoriya, variantlar, izahat
- **Bəyənilənlər / Səbət** — istifadəçi aktivliyini izlə

---

## ⚙️ Mühit dəyişənləri (opsional)

Frontend üçün `.env` faylı yarat:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 📝 Seeder əmrləri

```bash
# Bütün məlumatları sıfırla və yenidən yüklə
python manage.py seed --clear
python manage.py seed_quiz --clear

# Yalnız quiz suallarını yenilə
python manage.py seed_quiz
```
