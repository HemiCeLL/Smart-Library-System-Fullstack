# Smart Library System (Fullstack)

Aplikasi manajemen dan katalog perpustakaan. Pengguna dapat menambah, melihat, mengubah, dan menghapus data buku. Frontend dibangun dengan React (Vite), backend berupa REST API NestJS yang terhubung ke PostgreSQL melalui Prisma ORM, sehingga data tersimpan permanen (tetap ada setelah server di-restart).

**Dibuat oleh:** Aruna Jannu Rezasyah (103022430015)

## Teknologi

| Bagian | Teknologi |
|---|---|
| Frontend | React 19, Vite |
| Backend | NestJS 11, TypeScript, class-validator |
| Database | PostgreSQL |
| ORM | Prisma 6 |

## Struktur Repository

```
.
├── Frontend/                 # Aplikasi React (Vite)
├── Backend/
│   └── smart-library-api/    # REST API NestJS + Prisma
│       ├── prisma/           # schema.prisma + migrations
│       └── src/
│           ├── prisma/       # PrismaService (provider)
│           └── books/        # controller, service, DTO
├── docs/screenshots/         # Screenshot setiap tahapan
└── README.md
```

## Model Data

Model utama `Book` (`Backend/smart-library-api/prisma/schema.prisma`):

| Field | Tipe | Keterangan |
|---|---|---|
| id | Int | Primary key, auto increment |
| title | String | Judul buku |
| author | String | Penulis |
| category | String | Kategori |
| status | String | `Tersedia` (default) atau `Dipinjam` |
| createdAt | DateTime | Waktu dibuat |
| updatedAt | DateTime | Waktu diubah |

## Cara Menjalankan

### Prasyarat
- Node.js 20 atau lebih baru
- PostgreSQL lokal yang sedang berjalan

### 1. Backend

```bash
cd Backend/smart-library-api
```

Buat database:

```sql
CREATE DATABASE smart_library;
```

Salin `.env.example` menjadi `.env`, lalu sesuaikan `DATABASE_URL` (user, password, port):

```
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/smart_library?schema=public"
```

Install dependensi, jalankan migrasi, lalu start server:

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

API berjalan di `http://localhost:3000`.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

## Endpoint API

Base URL: `http://localhost:3000`

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/books` | Tambah buku |
| GET | `/books` | Ambil semua buku |
| GET | `/books?category=&status=&search=` | Filter buku (kategori, status, pencarian judul) |
| GET | `/books/stats` | Statistik koleksi |
| GET | `/books/:id` | Detail satu buku |
| PATCH | `/books/:id` | Ubah buku |
| DELETE | `/books/:id` | Hapus buku |

### Contoh body `POST /books`

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Software Engineering"
}
```

### Contoh respons `GET /books/stats`

```json
{
  "totalBooks": 2,
  "availableBooks": 1,
  "borrowedBooks": 1,
  "perCategory": [
    { "category": "Software Engineering", "count": 1 },
    { "category": "Frontend", "count": 1 }
  ]
}
```

## Fitur Lanjutan (Nilai Tambah)

- **Filter (`where`)**: `GET /books` menerima query `category`, `status`, dan `search`. Lihat `findAll()` di `books.service.ts`.
- **Statistik (`count` + `groupBy`)**: `GET /books/stats` mengembalikan total, jumlah tersedia, jumlah dipinjam, dan jumlah per kategori. Lihat `stats()` di `books.service.ts`.

## Screenshot

### Tahapan Pengerjaan

| Tahap | Screenshot |
|---|---|
| 1. Database PostgreSQL dibuat | <img width="668" height="616" alt="image" src="https://github.com/user-attachments/assets/af4789c1-b86e-49cc-b3c5-9a15cff96d23" /> |
| 2. Menyesuaikan schema.prisma | <img width="673" height="580" alt="image" src="https://github.com/user-attachments/assets/e443a22c-90b9-4923-ad5c-7b79783b104d" /> |
| 3. Migrasi Prisma berhasil & Tabel `books` terbentuk |  <img width="742" height="311" alt="image" src="https://github.com/user-attachments/assets/1d4d391f-f3c1-4fa0-9222-0bcb1c05ca24" /> |
| 4a. POST: tambah buku | <img width="601" height="490" alt="image" src="https://github.com/user-attachments/assets/b3b98860-8af5-4090-a918-b91014c9bab3" /> |
| 4b. Data tersimpan di tabel postgre | <img width="940" height="112" alt="image" src="https://github.com/user-attachments/assets/0d503987-b143-4dbc-b521-47db6f116c79" /> |
| 5a. GET: lihat daftar buku | <img width="563" height="827" alt="image" src="https://github.com/user-attachments/assets/00b98a68-9a5d-4608-9ead-a9a21ca8df58" /> |
| 5b. GET: lihat daftar buku dengan id:1 | <img width="474" height="526" alt="image" src="https://github.com/user-attachments/assets/07367092-7729-40aa-ab94-8848ab52817b" /> |
| 6a. PATCH: ubah buku | <img width="495" height="252" alt="image" src="https://github.com/user-attachments/assets/7f1511e1-6ca4-47a4-b32f-b89e4ce29881" /> |
| 6b. Data tersimpan di tabel postgre | <img width="1030" height="203" alt="image" src="https://github.com/user-attachments/assets/7e6f90f0-c0d3-476e-bc88-00dc2c9b685d" /> |
| 7a. DELETE: hapus buku dengan id:1 | <img width="503" height="258" alt="image" src="https://github.com/user-attachments/assets/23dfe9ba-367c-42ff-981b-1e0b75fa7d42" /> |
| 7b. Data tersimpan di tabel postgre | <img width="1032" height="201" alt="image" src="https://github.com/user-attachments/assets/9d37a9f4-af3f-419d-a75c-abb88fde6be1" /> |
| 8a. Data sebelum restart server | <img width="573" height="662" alt="image" src="https://github.com/user-attachments/assets/06720cd0-a818-4114-b80a-694a11c9dd64" /> |
| 8b. Server dimatikan  | <img width="1074" height="700" alt="image" src="https://github.com/user-attachments/assets/ecf9ab17-f3e6-4db0-b691-8925c5487032" /> |
| 8c. Data setelah restart server | <img width="556" height="663" alt="image" src="https://github.com/user-attachments/assets/3c76ff12-ae7c-4b10-8d68-4e7f029ee1f1" /> |
| 9a. Filter (data baru) | <img width="607" height="469" alt="image" src="https://github.com/user-attachments/assets/aebd326d-38e9-4cff-b47a-fe0ad61ce552" /> |
| 9b. Statistics (data baru) | <img width="588" height="693" alt="image" src="https://github.com/user-attachments/assets/a4e9b9d6-c335-4cd4-a50d-bfd553f8fb96" /> |

### Tampilan Aplikasi

| Desktop | <img width="1063" height="744" alt="image" src="https://github.com/user-attachments/assets/ead06692-0f56-470d-8ac2-d09bd0a6431f" /> |
