# 🚀 Quick Start Guide

**Panduan Super Cepat untuk Orang Awam!**

Tidak perlu jago coding - ikuti langkah simple ini untuk pakai QRIS Converter Pro.

---

## 📱 Cara Pakai (5 Menit!)

### Langkah 1: Buka Website
Kunjungi: [URL_WEBSITE_ANDA]

### Langkah 2: Upload QR Code
Kamu punya 2 cara:

#### Cara A: Upload Gambar (Paling Mudah!)
1. Screenshot atau foto QR code QRIS dinamis kamu
2. **Drag file gambar** ke kotak ungu yang ada tulisan "📸 Seret gambar ke sini"
3. Atau klik kotak itu terus pilih file dari komputer/HP
4. Tunggu sebentar - info merchant akan muncul otomatis!

#### Cara B: Copy-Paste Kode
1. Kalau kamu sudah punya **kode angka panjang** (payload EMVCo)
2. Paste ke kotak yang ada tulisan "Atau Tempel Payload EMVCo"
3. Klik tombol **"Parse Payload"**
4. Done!

### Langkah 3: Pilih Mode
Pilih salah satu:

#### Mode 1: Static Tanpa Nominal (Recommended!)
- **Kapan pakai:** Untuk bisnis dengan harga yang bervariasi
- **Cara kerja:** Pembeli yang scan QR bisa input nominal sendiri
- **Contoh:** Toko online, jastip, freelancer

#### Mode 2: Static dengan Nominal Tetap
- **Kapan pakai:** Untuk produk dengan harga pasti
- **Cara kerja:** Nominal sudah fix, pembeli tinggal bayar
- **Contoh:** Menu restoran Rp 25.000, parkir Rp 5.000
- **Cara:** Ketik nominal di kotak "Nominal Tetap (IDR)"

### Langkah 4: (Opsional) Edit Info
Kalau mau ganti nama toko atau tambah info:
1. Klik **"⚙️ Edit Lanjutan (Opsional)"**
2. Edit field yang kamu mau:
   - Nama Merchant (nama toko)
   - Kota
   - Bill Number (nomor invoice)
   - Reference (nomor order)
3. Kalau nggak mau edit, skip aja langkah ini!

### Langkah 5: Konversi!
1. Klik tombol hijau besar **"⚡ Konversi ke QR Static Sekarang"**
2. Tunggu 2-3 detik
3. Tadaaaa! QR code baru sudah jadi! 🎉

### Langkah 6: Download & Pakai
Pilih cara download:
- 📥 **Download PNG** - Save sebagai gambar (buat di-print atau share)
- 📄 **Download TXT** - Save kode textnya (buat developer)
- 📋 **Copy Payload** - Copy kode ke clipboard

---

## 💡 FAQ - Pertanyaan Sering Ditanya

### Q: Apa itu QRIS Dinamis vs Statik?
**A:**
- **Dinamis:** QR yang sudah include nominal, sekali pakai
- **Statik:** QR yang bisa dipake berkali-kali, pembeli input nominal

### Q: Kenapa perlu convert ke static?
**A:**
- Lebih praktis - satu QR untuk semua transaksi
- Bisa di-print dan ditempel di toko
- Hemat waktu - nggak perlu generate QR tiap transaksi
- Pembeli bisa langsung scan dan bayar

### Q: Apakah data saya aman?
**A:**
**100% AMAN!** Semua proses terjadi di browser kamu.
Tidak ada data yang dikirim ke server manapun.

### Q: Berapa biaya pakai tool ini?
**A:**
**GRATIS!** Nggak ada biaya sama sekali.

### Q: Apa bisa pakai di HP?
**A:**
**BISA!** Website responsive, works di semua device.

### Q: QR hasil konversi apa bisa langsung dipakai?
**A:**
**BISA!** QR yang dihasilkan adalah QR QRIS valid yang bisa langsung dipake untuk terima pembayaran.

### Q: Apa bedanya sama tool QRIS generator di banking app?
**A:**
Tool ini khusus untuk **convert QR dinamis yang sudah ada** jadi statik. Kalau mau buat QR dari nol, tetap pakai app banknya.

### Q: Kalau QR tidak terbaca, kenapa?
**A:**
Kemungkinan:
- Gambar kurang jelas/blur
- File corrupt
- Bukan QR QRIS (QR biasa tidak bisa)

**Solusi:**
- Foto/screenshot ulang dengan kualitas lebih baik
- Pastikan lighting cukup
- Atau pakai cara copy-paste payload

### Q: Hasil download formatnya apa?
**A:**
- **PNG:** File gambar standard, bisa dibuka di semua device
- **TXT:** File text berisi kode payload
Pilih sesuai kebutuhan!

---

## 🎯 Use Cases - Kapan Pakai Tool Ini?

### 1. Punya Toko/Warung
**Problem:** QR dari bank expired atau sekali pakai
**Solution:** Convert jadi static, print, tempel di kasir!

### 2. Freelancer/Jastip
**Problem:** Tiap client beda nominal, repot bikin QR baru terus
**Solution:** Satu QR static, client input nominal sendiri!

### 3. Event Organizer
**Problem:** Butuh QR untuk payment gate, tapi nominal bervariasi
**Solution:** Print QR static, tempel di booth!

### 4. Online Seller
**Problem:** Setiap order harus generate QR baru
**Solution:** Pakai QR static dengan nominal tetap per produk!

### 5. Parkir/Warung Kopi
**Problem:** Harga fix, tapi QR bank cuma sekali pakai
**Solution:** QR static dengan nominal tetap, print sekali pakai selamanya!

---

## 📋 Checklist Setelah Convert

Setelah dapat QR hasil, pastikan:

- [ ] QR bisa di-scan (test pakai app bank/e-wallet)
- [ ] Nama merchant benar
- [ ] Nominal sesuai (kalau pakai mode fixed)
- [ ] Download dan save file PNG
- [ ] Print dengan kualitas bagus (kalau mau ditempel)
- [ ] Test transaksi kecil dulu sebelum pakai ke customer

---

## 🆘 Troubleshooting Cepat

### Masalah 1: Website tidak bisa dibuka
- Check koneksi internet
- Coba browser lain (Chrome, Firefox, Safari)
- Clear cache browser
- Restart browser/device

### Masalah 2: Upload gagal
- Pastikan file adalah gambar (PNG/JPG)
- Ukuran file jangan terlalu besar (max 10MB recommended)
- Gambar QR harus jelas, tidak blur

### Masalah 3: QR hasil tidak bisa di-scan
- Download ulang file PNG
- Pastikan print dengan kualitas tinggi
- Jangan resize gambar terlalu kecil
- Test scan dari jarak berbeda

### Masalah 4: Konversi gagal
- Pastikan QR yang di-upload adalah QRIS (bukan QR biasa)
- Coba pakai cara copy-paste payload
- Refresh halaman dan coba lagi

### Masalah 5: Dark mode tidak nyaman
- Klik icon matahari/bulan di kanan atas
- Toggle ke mode yang kamu suka
- Mode akan tersimpan otomatis

---

## 📞 Butuh Bantuan?

Kalau masih bingung atau ada masalah:

1. **Baca tutorial** di website (ada di halaman atas)
2. **Hubungi creator:**
   - 📘 Facebook: [Iqra](https://www.facebook.com/iqraa07)
   - ✈️ Telegram: [@arczyyy](https://t.me/arczyyy)

Response biasanya dalam 24 jam!

---

## 🎓 Tutorial Video

Coming soon! Subscribe untuk update:
- YouTube: [Link]
- Instagram: [Link]

---

## 💎 Tips Pro

### Tip 1: Save Template
Setelah convert, save file PNG dengan nama yang jelas:
- ❌ Jangan: `download.png`
- ✅ Bagus: `QR_Toko_Maju_Statik_2024.png`

### Tip 2: Print Quality
Kalau mau print untuk tempel di toko:
- Pakai printer inkjet/laser (bukan thermal)
- Print size minimal 5x5 cm
- Pakai kertas sticker glossy
- Laminating untuk tahan lama

### Tip 3: Multiple QR
Punya beberapa menu dengan harga beda?
- Convert masing-masing dengan nominal fixed
- Label setiap QR: "Paket A", "Paket B", dll
- Tempel side by side

### Tip 4: Backup
- Save file PNG di cloud (Google Drive, Dropbox)
- Save juga payload (file TXT) buat backup
- Kalau QR rusak/hilang, tinggal print ulang!

### Tip 5: Update Info
Kalau ganti nomor HP atau nama toko:
- Generate QR baru dari banking app
- Convert lagi pakai tool ini
- Ganti QR yang lama

---

## ⚡ Shortcut Keyboard (untuk yang suka cepat)

- `Tab` - Navigate antar field
- `Enter` - Submit form
- `Esc` - Close modal/tutorial
- `Ctrl/Cmd + V` - Paste payload
- `Ctrl/Cmd + C` - Copy (setelah klik Copy Payload)

---

## 🎉 Selamat!

Kamu sudah tahu cara pakai QRIS Converter Pro!

**Next Steps:**
1. Bookmark website ini
2. Share ke teman yang butuh
3. Follow untuk update terbaru

**Feedback:**
Kalau tool ini helpful, share ke social media ya!
Tag creator: [@iqraa07](https://facebook.com/iqraa07)

---

<div align="center">

### 💳 Happy Converting!

Semoga tool ini memudahkan bisnis kamu 🚀

[📖 Baca README Lengkap](README.md) | [🚀 Deployment Guide](DEPLOYMENT.md)

</div>
