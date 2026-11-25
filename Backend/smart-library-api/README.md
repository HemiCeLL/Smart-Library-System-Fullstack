# Smart Library API (NestJS + Prisma + PostgreSQL)

## 1. Siapkan database
Buat database di PostgreSQL lokal:
```sql
CREATE DATABASE smart_library;
```
Edit `.env` → sesuaikan `DATABASE_URL` (user, password, port).

## 2. Install & migrasi
```bash
npm install
npx prisma migrate dev --name init   # membuat tabel "books" + generate Prisma Client
npm run start:dev                    # http://localhost:3000
```
Cek tabel: `npx prisma studio` atau `\dt` di psql.

## 3. Endpoint
| Method | URL | Keterangan |
|---|---|---|
| POST | /books | Tambah buku |
| GET | /books | Semua buku (opsional `?category=&status=&search=`) |
| GET | /books/stats | Statistik (count + groupBy) |
| GET | /books/:id | Detail |
| PATCH | /books/:id | Ubah |
| DELETE | /books/:id | Hapus |

## 4. Uji
```bash
curl -X POST localhost:3000/books -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin","category":"Software Engineering"}'
curl localhost:3000/books
curl "localhost:3000/books?category=software engineering"
curl localhost:3000/books/stats
curl -X PATCH localhost:3000/books/1 -H "Content-Type: application/json" -d '{"status":"Dipinjam"}'
curl -X DELETE localhost:3000/books/1
```
Restart server (Ctrl+C lalu `npm run start:dev`) lalu `curl localhost:3000/books` → data tetap ada.
