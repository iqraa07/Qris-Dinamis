# 💳 QRIS Converter Pro

![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?logo=typescript)

> **Konversi QRIS Dinamis ke Statik dengan Mudah!** ⚡

Tool modern untuk mengubah QR Code QRIS dinamis menjadi statik tanpa nominal, atau dengan nominal tetap. Semua proses berjalan di browser Anda secara lokal - **tidak ada data yang dikirim ke server**.

[![Demo](https://img.shields.io/badge/🚀-Live_Demo-success?style=for-the-badge)](https://your-demo-url-here.com)

---

## ✨ Fitur Unggulan

### 🎯 Core Features
- ⚡ **Konversi Instant** - Upload gambar QR atau paste payload, hasil langsung
- 🔒 **100% Client-Side** - Semua proses di browser, data Anda aman
- 🌙 **Dark Mode** - Mode gelap yang nyaman untuk mata
- 📱 **Responsive** - Bekerja sempurna di desktop dan mobile
- 🎨 **Modern UI** - Interface yang indah dengan animasi smooth

### 💎 Advanced Features
- 🔄 **Multi-Mode Conversion**
  - Static tanpa nominal (user input sendiri)
  - Static dengan nominal tetap
- ✏️ **Edit Merchant Info** - Ubah nama, kota, kode pos
- 📋 **Additional Data** - Tambah Bill Number dan Reference Label
- 📥 **Multiple Export** - Download PNG, TXT, atau copy ke clipboard
- 🎓 **Interactive Tutorial** - Panduan yang mudah dipahami

### 🛠️ Technical Features
- 📊 **EMV TLV Parser** - Parse dan tampilkan detail EMV tags
- 🔐 **CRC Validation** - Hitung ulang CRC-16/CCITT-FALSE
- 🔍 **QR Decoder** - Baca QR code dari gambar dengan akurasi tinggi
- 📈 **Payload Comparison** - Bandingkan payload asli vs hasil

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ dan npm/yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/qris-converter-pro.git
cd qris-converter-pro

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Development
```bash
npm run dev     # Start dev server di http://localhost:5173
npm run build   # Build untuk production
npm run preview # Preview production build
```

---

## 📖 Cara Menggunakan

### Method 1: Upload Gambar QR
1. **Klik atau drag-drop** gambar QRIS ke area upload
2. Tool otomatis membaca dan menampilkan info merchant
3. **Pilih mode konversi** yang Anda inginkan
4. **Klik "Konversi"** dan QR statis siap!
5. **Download** hasil dalam format PNG atau TXT

### Method 2: Paste Payload (Tercepat! ⚡)
**Scan dengan Google Lens - Tidak perlu upload gambar!**

1. **Buka Google Lens** atau screenshot QR lalu buka di Google Photos
2. **Tap icon Lens** (kamera dengan titik)
3. **Tap area QR code** → pilih "Copy text"
4. **Paste ke textarea** di website
5. **Klik "Parse Payload"**
6. Lanjutkan dengan konversi seperti biasa

**Contoh payload:**
```
00020101021226580016ID.CO.SHOPEE.WWW01189360091800000895050205895050303UBE51440014ID.CO.QRIS.WWW0215ID20200313807080303UBE520454115303360540819000.005802ID5912CK Toddopuli6013KOTA MAKASSAR610590233622205181232226444645951556304A28C
```

📘 **[Tutorial lengkap scan Google Lens](SCAN_TUTORIAL.md)**

### Advanced: Edit Custom Fields
1. Klik **"⚙️ Edit Lanjutan"**
2. Edit field yang tersedia:
   - Nama Merchant
   - Kota
   - Kode Pos
   - Bill Number (Tag 62.01)
   - Reference Label (Tag 62.05)
3. **Konversi** dan semua perubahan akan diterapkan

---

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **TypeScript** | 5.3.3 | Type Safety |
| **Vite** | 5.0.8 | Build Tool |
| **jsQR** | 1.4.0 | QR Decoder |
| **qrcode** | 1.5.3 | QR Generator |

---

## 📂 Project Structure

```
qris-converter-pro/
├── src/
│   ├── components/       # (Integrated dalam App.tsx)
│   ├── hooks/
│   │   ├── useConversion.ts    # Conversion logic
│   │   └── useDarkMode.ts      # Dark mode toggle
│   ├── lib/
│   │   ├── emv.ts              # EMV TLV parser & converter
│   │   └── qr.ts               # QR encode/decode
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── App.tsx                 # Main application
│   ├── App.css                 # Styles & animations
│   └── main.tsx                # Entry point
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔧 How It Works

### EMV TLV Parsing
```typescript
// Parse payload EMVCo menjadi array of tags
const items = parseTLV(payload);
// Tag 01: Point of Initiation (11=static, 12=dynamic)
// Tag 54: Transaction Amount
// Tag 59: Merchant Name
// Tag 63: CRC
```

### Conversion Process
1. **Parse** payload asli
2. **Ubah Tag 01** dari `12` (dynamic) ke `11` (static)
3. **Hapus/Set Tag 54** (amount) sesuai mode
4. **Apply edits** jika ada (merchant info, additional data)
5. **Hitung ulang CRC** menggunakan CRC-16/CCITT-FALSE
6. **Generate QR** code baru

### CRC Calculation
```typescript
function crc16ccitt(data: Uint8Array): number {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= (data[i] << 8);
    for (let b = 0; b < 8; b++) {
      crc = (crc & 0x8000)
        ? ((crc << 1) ^ 0x1021) & 0xFFFF
        : (crc << 1) & 0xFFFF;
    }
  }
  return crc & 0xFFFF;
}
```

---

## 🎨 Features Showcase

### Mode Konversi

#### 1. Static Tanpa Nominal
```
Input:  01=12, 54=10000 (Dynamic, Rp 10.000)
Output: 01=11, 54=<dihapus> (Static, user input sendiri)
```

#### 2. Static dengan Nominal Tetap
```
Input:  01=12, 54=10000 (Dynamic, Rp 10.000)
Output: 01=11, 54=50000 (Static, fix Rp 50.000)
```

### Additional Data (Tag 62)
```
62: Additional Data Field Template
  ├── 01: Bill Number (e.g., INV-2024-001)
  ├── 05: Reference Label (e.g., ORDER-123)
  ├── 06: Customer Label
  └── 07: Terminal Label
```

---

## 🌟 Animations & UX

### Smooth Animations
- ✨ **Fade In** - Cards dan sections muncul smooth
- 🎭 **Scale In** - QR result dengan efek zoom
- 📐 **Slide In** - Tutorial dan info cards
- 💫 **Pulse** - Step indicators dan highlights
- 🎨 **Hover Effects** - Button dan card interactions

### User-Friendly Features
- 🎓 Dismissible tutorial untuk first-time users
- 📊 Real-time payload comparison
- 🔍 Collapsible EMV tags detail
- 💾 One-click download & copy
- ⚡ Instant preview sebelum konversi

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Opera | 76+ | ✅ Full Support |

---

## 🤝 Contributing

Contributions are welcome! Silakan:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines
- Gunakan TypeScript untuk type safety
- Follow existing code style
- Test di berbagai browser
- Update README jika menambah fitur

---

## 🐛 Known Issues & Limitations

- ❗ QR code harus clear dan readable untuk best result
- ❗ Beberapa payload spesifik mungkin perlu handling khusus
- ❗ Additional data (Tag 62) support terbatas pada sub-tags umum

### Reporting Bugs
Jika menemukan bug, silakan buat issue dengan detail:
- Browser & version
- Screenshot error
- Payload yang bermasalah (jika bisa)
- Steps to reproduce

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👨‍💻 Created By

**Iqra**

- 📘 Facebook: [@iqraa07](https://www.facebook.com/iqraa07)
- ✈️ Telegram: [@arczyyy](https://t.me/arczyyy)

---

## 🙏 Acknowledgments

- EMVCo untuk spesifikasi QRIS/QR Code Payment
- Bank Indonesia untuk standar QRIS
- React & Vite teams untuk amazing tools
- jsQR & qrcode library contributors

---

## 📈 Changelog

### v2.0.0 (Current)
- ✨ Complete UI/UX redesign
- 🎨 Added smooth animations
- 🎓 Interactive tutorial
- 🌙 Dark mode support
- 📱 Mobile-responsive
- ⚡ Improved performance
- 🔧 Better error handling

### v1.0.0
- 🎉 Initial release
- Basic conversion functionality
- Supabase integration (removed in v2.0)

---

## 💡 Tips & Tricks

### Untuk Merchant
1. Gunakan mode **"Static Tanpa Nominal"** untuk QR yang fleksibel
2. Mode **"Nominal Tetap"** cocok untuk produk dengan harga pasti
3. Tambahkan **Bill Number** untuk tracking transaksi

### Untuk Developer
1. Check `src/lib/emv.ts` untuk logic conversion
2. Customize theme di `src/App.css` (CSS variables)
3. Extend `EditorState` type untuk field tambahan

---

## 🔐 Security & Privacy

✅ **100% Client-Side Processing** - Tidak ada data dikirim ke server
✅ **No Analytics/Tracking** - Privacy Anda terjamin
✅ **Open Source** - Code transparan dan bisa diaudit
✅ **No Dependencies on External APIs** - Fully offline capable

---

## 📞 Support

Butuh bantuan? Ada pertanyaan?

- 💬 Hubungi via [Telegram](https://t.me/arczyyy)
- 📘 DM di [Facebook](https://www.facebook.com/iqraa07)
- 🐛 Report bugs via [GitHub Issues](https://github.com/YOUR_USERNAME/qris-converter-pro/issues)

---

## ⭐ Show Your Support

Jika project ini membantu Anda, berikan ⭐ di GitHub!

```
⭐ Star this repo
🔄 Share dengan teman-teman
🐛 Report bugs kalau ada
💡 Suggest new features
```

---

<div align="center">

### Made with ❤️ by [Iqra](https://facebook.com/iqraa07)

**QRIS Converter Pro v2.0.0**

[⬆ Back to Top](#-qris-converter-pro)

</div>
