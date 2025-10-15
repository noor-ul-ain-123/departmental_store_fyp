# PHP API (MySQL + JWT + Uploads)

## Setup
1) Create DB:
```sql
CREATE DATABASE dept_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2) Copy `.env.example` to `.env` and adjust DB creds & JWT secret.
3) Run migration `migrations/001_init.sql` in your MySQL client.
4) Start API:
```bash
php -S localhost:8080 -t server-php
```
(Ensure docroot is the **project root**, or serve `server-php` directly and keep upload paths consistent.)

### Auth
- POST `/api/auth/register` `{ name, email, password }`
- POST `/api/auth/login` → `{ token, user }`
- GET `/api/me` (Bearer token)

### Products
- GET `/api/products?q=...&category=...&page=1&page_size=12`
- GET `/api/products/{id}`
- POST `/api/products` (admin)
- PUT/PATCH `/api/products/{id}` (admin)
- DELETE `/api/products/{id}` (admin)

### Uploads
- POST `/api/uploads` (admin) — multipart form field `file` → `{ url }`

### Orders
- POST `/api/orders` (auth) `{ items:[{id,qty,price}], total }`
- GET `/api/orders` (admin)

CORS origin is controlled by `APP_ALLOWED_ORIGIN` in `.env`.
