# 📱 Tutorial: Scan QR dengan Google Lens

## 🎯 Cara Paling Mudah - Tanpa Upload Gambar!

Kamu bisa langsung **paste hasil scan Google Lens** ke website, tanpa perlu upload gambar QR! Ini cara tercepat! ⚡

---

## 📸 Langkah 1: Scan QR dengan Google Lens

### Method A: Pakai HP Android/iPhone

1. **Buka Google Lens:**
   - Android: Buka app Google Lens (atau dari Google Photos)
   - iPhone: Buka app Google atau Google Photos, tap icon Lens

2. **Scan QR Code:**
   - Arahkan kamera ke QR code QRIS
   - Tunggu sampai Google Lens detect

3. **Copy Text:**
   - Tap hasil scan
   - Pilih "Copy text" atau "Salin teks"
   - Text berupa kode panjang angka akan tersalin

### Method B: Pakai Screenshot

1. **Screenshot QR code** (Power + Volume Down)

2. **Buka Google Photos:**
   - Pilih screenshot tadi
   - Tap icon **Lens** (di bawah gambar)

3. **Copy Text:**
   - Tap area QR code
   - Tap "Copy text"
   - Done!

### Method C: Pakai Google Assistant

1. Buka Google Assistant (long press home button)
2. Tap icon kamera
3. Scan QR code
4. Copy text yang muncul

---

## 📋 Langkah 2: Paste ke Website

1. **Buka QRIS Converter Pro**

2. **Scroll ke bawah** sampai ketemu textarea dengan tulisan:
   ```
   "Atau Tempel Payload EMVCo"
   ```

3. **Tap di textarea** tersebut

4. **Paste** hasil scan tadi (Long press → Paste)
   - Text akan muncul seperti ini:
   ```
   00020101021226580016ID.CO.SHOPEE.WWW...
   ```

5. **Klik tombol "Parse Payload"**

6. **Info merchant akan muncul** otomatis!

7. **Lanjut konversi** seperti biasa

---

## 💡 Format Hasil Scan

**Format umum payload QRIS:**
```
00020101021226XX016ID.CO.XXXXXX.WWW...5802ID59XX...63XXXX
```

**Karakteristik:**
- ✅ Selalu dimulai dengan `0002010102`
- ✅ Panjang biasanya 200-400 karakter
- ✅ Hanya berisi angka dan huruf kapital (A-Z, 0-9)
- ✅ **TIDAK ADA SPASI** di tengah payload
- ✅ Diakhiri dengan CRC 4 digit (Tag 63)

**⚠️ PENTING - Privacy:**
- **Jangan share payload asli** di public/social media
- Payload berisi info merchant yang sensitif
- Gunakan payload sendiri untuk testing

**💡 Auto-Clean Spasi:**
Website akan otomatis membersihkan spasi saat parse, jadi tenang aja kalau hasil scan ada spasi!

---

## 🔍 Cara Bedain Payload QRIS

### ✅ Ini QRIS yang Benar:
```
00020101021226...      ← Dimulai dengan 0002
...5802ID...           ← Ada kode ID (Indonesia)
...63047E2A            ← Diakhiri dengan CRC (4 digit)
```

### ❌ Bukan QRIS:
```
https://qr.code/xyz     ← URL biasa
WIFI:S:MyWifi;P:pass;;  ← QR WiFi
+628123456789           ← QR nomor HP
```

---

## 🎓 Tips & Tricks

### Tip 1: Pastikan Lighting Cukup
- Scan di tempat terang
- Jangan ada bayangan di QR
- Jangan blur/goyang

### Tip 2: Bersihkan QR
- Kalau QR kotor/lecet, bersihkan dulu
- Scan dari jarak 10-20 cm

### Tip 3: Coba Beberapa Kali
- Kalau gagal, coba scan lagi
- Coba dari angle berbeda
- Coba zoom in/out

### Tip 4: Check Hasil Copy
Setelah copy, check apakah:
- Text dimulai dengan `0002`
- Panjangnya 200+ karakter
- Tidak ada enter/newline di tengah

### Tip 5: Langsung Paste
- Jangan edit hasil copy
- Paste as-is
- Let the tool handle parsing

---

## 🆘 Troubleshooting

### Problem 1: Google Lens Tidak Detect QR
**Solution:**
- Pastikan QR jelas, tidak blur
- Coba di tempat lebih terang
- Atau pakai Method B (screenshot dulu)

### Problem 2: Text yang Ter-copy Tidak Lengkap
**Solution:**
- Coba scan ulang
- Pastikan semua QR masuk frame
- Zoom in kalau QR kecil

### Problem 3: Hasil Copy Ada Spasi/Enter
**Solution:**
- ✅ **Tenang!** Website otomatis clean spasi saat parse
- Langsung paste aja, tidak perlu edit manual
- Tool akan handle cleaning otomatis

### Problem 4: "Format Tidak Valid" Error
**Solution:**
- Check apakah dimulai dengan `0002`
- Check ada angka/huruf aneh
- Coba scan ulang dari QR asli

### Problem 5: Google Lens Copy Text Disabled
**Solution:**
- Update Google app ke versi terbaru
- Atau pakai Method B (via Google Photos)
- Atau pakai app QR scanner lain

---

## 📱 Alternative Apps untuk Scan

Kalau Google Lens tidak work, pakai:

### Android:
1. **QR & Barcode Scanner** (Free)
2. **QR Code Reader** by Scan
3. **Google Lens** (built-in)

### iPhone:
1. **Camera app bawaan** (iOS 11+)
2. **Google Lens**
3. **QR Reader** by TapMedia

### Browser (Desktop):
1. Upload screenshot ke Google Lens web
2. Atau pakai extension Chrome "QR Code Reader"

---

## 🎯 Quick Reference

### Cara Super Cepat (30 detik):
```
1. Screenshot QR → 5 detik
2. Buka Google Photos → 3 detik
3. Tap Lens icon → 2 detik
4. Tap QR area → 2 detik
5. Copy text → 2 detik
6. Buka QRIS Converter → 3 detik
7. Paste di textarea → 2 detik
8. Klik Parse Payload → 2 detik
9. Pilih mode konversi → 5 detik
10. Klik Konversi → 2 detik
11. Download PNG → 2 detik

Total: 30 detik!
```

---

## 💎 Pro Tips

### Tip 1: Bookmark Website
Save link QRIS Converter di browser untuk akses cepat!

### Tip 2: Practice Makes Perfect
Coba 2-3 kali biar terbiasa. Nanti jadi otomatis!

### Tip 3: Save Template Payload
Kalau sering convert QR yang sama:
- Save payload di notepad
- Next time tinggal paste

### Tip 4: Share dengan Tim
Kalau kerja tim:
- Share payload via chat
- Team lain bisa paste langsung
- Tidak perlu share gambar

### Tip 5: Batch Processing
Punya banyak QR?
- Scan semua dulu
- Save payloads di spreadsheet
- Convert satu-satu

---

## 📊 Comparison: Upload vs Paste

| Method | Waktu | Mudah | Akurasi |
|--------|-------|-------|---------|
| **Upload Gambar** | ~1 menit | ⭐⭐⭐⭐ | 95% |
| **Paste Payload** | ~30 detik | ⭐⭐⭐⭐⭐ | 99% |

**Rekomendasi:** Pakai **Paste Payload** untuk speed! ⚡

---

## 🎬 Video Tutorial (Coming Soon!)

Subscribe untuk tutorial video:
- YouTube: [Link]
- Instagram: [Link]
- TikTok: [Link]

---

## ❓ FAQ

**Q: Apakah aman scan QR orang lain?**
A: Aman! Kamu hanya ambil data publik yang memang ditampilkan QR.

**Q: Bisakah orang lain pakai payload yang sama?**
A: Ya! Payload QRIS adalah data publik untuk payment.

**Q: Apakah hasil scan bisa expired?**
A: QR static tidak expired. QR dynamic bisa expired tergantung issuer.

**Q: Kenapa harus pakai Google Lens?**
A: Google Lens paling akurat. Tapi bisa pakai app lain juga.

**Q: Bisa scan dari foto/screenshot lama?**
A: Bisa! Selama QR masih jelas terbaca.

**Q: Maksimal berapa QR bisa di-scan?**
A: Unlimited! Scan sebanyak yang kamu mau.

---

## 📞 Butuh Bantuan?

Masih bingung? Hubungi:
- 📘 Facebook: [Iqra](https://www.facebook.com/iqraa07)
- ✈️ Telegram: [@arczyyy](https://t.me/arczyyy)

---

<div align="center">

**Happy Scanning! 📱✨**

[⬆ Back to README](README.md) | [🚀 Quick Start](QUICK_START.md)

</div>
