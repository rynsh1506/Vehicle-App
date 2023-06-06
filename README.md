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
1. Pada saat `Create Vehicle Entities` anda bisa `comment` field yang tidak ingin di tambahkan lagi ke database dan berlaku juga untuk `update`
2. Dan juga jika ingin memasukan data satu persatu diharuskan menggikuti urutan `field` dari atas kebawah
3. Untuk update dan delete user harus dilakukan oleh user yang id nya sama dengan user yang sedang login atau isAdmin `true`
4. Untuk update jika user isAdmin `false` maka tidak dapat Access untuk `update field` isAdmin

