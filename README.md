# Vehicle-App

## Instalasi

1. Clone repositori ini ke mesin Anda.
2. Buka terminal dan arahkan ke direktori repositori.
3. Jalankan perintah `npm/yarn install` untuk menginstal semua dependensi.
4. Setup database dan enviroment docker sesuaikan di file `.env`
5. Sync di database model di `src/config/syncDatabase.js` buka commentar
6. Setelah instalasi selesai, jalankan perintah `npm/yarn dev/start` untuk menjalankan aplikasi.
8. Jika menggunakan Docker hapus/Sesuaikan image di `docker.compose.yml dan Dockerfile` jika dibutuhkan
9. Dan jalankan perintah `docker compose up OR docker compose -f docker.compose.yml up OR npm run docker`
10. Saat menjalankan di postman nyalakan fitur sync cookies dan clear all cookie 
11. Jika tidak ada masalah selamat menggunakan aplikasi 😊

`NB: untuk system logout masih menggunakan system clear cookie manual`
