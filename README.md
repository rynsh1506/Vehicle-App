# Vehicle-App

## Instalasi

1. Clone repositori ini ke mesin Anda.
2. Buka terminal dan arahkan ke direktori repositori.
3. Jalankan perintah `npm/yarn install` untuk menginstal semua dependensi.
4. Setup database dan enviroment docker sesuaikan di file `.env`
5. Sync di database model di `src/config/syncDatabase.js` buka commentar
6. Setelah instalasi selesai, jalankan perintah `npm/yarn start` untuk menjalankan aplikasi.
8. Jika menggunakan Docker Hapus/Sesuaikan image di `docker.compose.yml dan Dockerfile` jika dibutuhkan
9. Dan jalankan perintah `docker compose up || docker compose -f docker.compose.yml up || npm run docker`
10. Saat menjalankan di postman nyalakan fitur `sync cookies` dan `clear` all cookies 
11. Jika tidak ada masalah selamat anda berhasil menjalankan aplikasi 😊

## Catatan
1. Untuk system logout masih menggunakan system clear cookie manual
2. Dan pada saat `Create Vehicle Entities` anda bisa `comment` field yang tidak ingin di tambahkan lagi ke database dan berlaku juga untuk `Update`
3. Dan juga jika ingin memasukan data satu persatu di harus kan menggikuti urutan `Field` dari atas kebawah

