# Vehicle App

Aplikasi Vehicle App adalah aplikasi untuk menajement data kendaraan dengan fitur GET POST UPDATE DELETE, dan juga memiliki fitur auhtentikasi multi lavel user access

## Instalasi

1. Clone repositori ini ke mesin Anda.
2. Buka terminal dan arahkan ke direktori repositori.
3. Jalankan perintah `npm/yarn install` untuk menginstal semua dependensi.
4. Konfigurasikan database dan environment Docker pada file `.env` sesuai kebutuhan.
5. Setelah instalasi selesai, jalankan perintah `npm/yarn start` untuk menjalankan aplikasi.
6. Jika menggunakan Docker, sesuaikan atau hapus image pada file `docker.compose.yml` dan `Dockerfile` jika diperlukan.
7. Jalankan perintah `docker compose up || docker compose -f docker.compose.yml up || npm run docker`.
8. Saat menggunakan Postman, aktifkan fitur `sync cookies` dan `clear all cookies`.
9. Jika tidak ada masalah, selamat! Anda berhasil menjalankan aplikasi. 😊

## Catatan
1. Pada proses `Create Vehicle Entities`, Anda dapat mengomentari field yang tidak ingin ditambahkan ke database. Hal ini juga berlaku untuk proses `update`.
2. Jika ingin memasukkan data satu per satu, pastikan mengikuti urutan field dari atas ke bawah.
3. Untuk mengupdate dan menghapus pengguna, itu harus dilakukan oleh pengguna dengan ID yang sama dengan pengguna yang sedang login atau oleh otoritas dengan `isAdmin` yang bernilai `true`.
4. Pada proses update, jika pengguna yang memiliki `isAdmin` bernilai `false`, mereka tidak dapat mengakses field `isAdmin` untuk diupdate.
5. Sangat disarankan untuk menunggu proses `syncronisasi` model database terlebih dahulu agar tidak terjadi error pada aplikasi.

## Update
1. Mengubah desain model database 
2. Mengubah parameter `id` pada `POST, GET, PATCH, DELETE` Users dengan `username`
3. Memisahkan entripoin untuk `POST, GET, PATCH, DELETE` pada Vehicle
4. Mengubah parameter `id` pada `POST, PATCH, DELETE` Vehicle menjadi contoh: `http://localhost:8000/vehicle/type/SUV/Toyota`, DLL
5. Mengubah query pada request `GET` Vehicle menjadi `http://localhost:8000/vehicle/vehicle-types?brand_name=Toyota`, DLL
6. Memperbaiki documentasi di postman
