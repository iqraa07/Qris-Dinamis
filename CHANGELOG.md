# Changelog

All notable changes to QRIS Converter Pro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2024-10-06

### 🎉 Major Release - Complete Redesign

### ✨ Added
- **Interactive Tutorial** - Onboarding yang mudah dipahami untuk first-time users
- **Smooth Animations** - Fade-in, scale-in, slide-in, dan pulse animations
- **Dark Mode** - Toggle dark/light mode dengan auto-detect system preference
- **Step Indicators** - Visual progress indicators untuk setiap langkah
- **Advanced Editing Panel** - Collapsible panel untuk edit merchant info dan additional data
- **Payload Comparison** - Side-by-side comparison original vs converted
- **EMV Tags Detail** - Collapsible table dengan detail semua EMV tags
- **Multiple Download Options** - PNG, TXT, dan copy to clipboard
- **Success Feedback** - Clear visual feedback setelah konversi berhasil
- **Error Handling** - Improved error messages yang user-friendly
- **Mobile Responsive** - Full support untuk mobile devices
- **Gradient Backgrounds** - Subtle animated gradients
- **Hover Effects** - Interactive hover states untuk buttons dan cards
- **Social Links** - Facebook dan Telegram links di footer

### 🎨 UI/UX Improvements
- **Complete UI Redesign** - Modern, clean, dan professional
- **Better Typography** - Improved font hierarchy dan readability
- **Color System** - Consistent color variables untuk light/dark modes
- **Spacing System** - Better padding dan margins
- **Card Designs** - Enhanced card styles dengan borders dan shadows
- **Button Styles** - Improved button designs dengan animations
- **Form Inputs** - Better input fields dengan focus states
- **Badge Designs** - Gradient badges untuk status indicators
- **QR Container** - Enhanced QR display dengan checkmark icon
- **Drop Zone** - Interactive drag-and-drop dengan visual feedback

### 🔧 Technical Improvements
- **Removed Database** - Simplified architecture tanpa Supabase
- **Optimized Bundle** - Reduced dependencies dan bundle size
- **Better Type Safety** - Improved TypeScript types
- **Code Organization** - Cleaner file structure
- **Performance** - Faster load times dan smoother interactions
- **SEO Ready** - Better meta tags dan semantic HTML
- **Accessibility** - Improved keyboard navigation dan screen reader support

### 📚 Documentation
- **Comprehensive README** - Complete documentation dengan screenshots
- **Deployment Guide** - Step-by-step deployment untuk berbagai platforms
- **Contributing Guidelines** - Clear guidelines untuk contributors
- **Changelog** - Detailed version history
- **License** - MIT License file

### 🛠️ Developer Experience
- **Cleaner Code** - Refactored untuk better maintainability
- **Better Comments** - Improved code documentation
- **TypeScript** - Full type coverage
- **Vite** - Fast build tool dengan HMR
- **Modern React** - Using latest React patterns

### 🔄 Changed
- **Conversion Flow** - Streamlined 3-step process
- **Mode Selection** - Simplified conversion mode options
- **Advanced Options** - Now collapsible untuk cleaner UI
- **Result Display** - Better organized result section
- **Footer** - Enhanced dengan creator info dan social links

### 🗑️ Removed
- **Database Integration** - Removed Supabase dependency
- **History Feature** - Removed history tracking (can be added back as local storage)
- **Session Management** - Removed session-based tracking
- **Zustand** - Removed state management library (using React hooks)
- **Complex Dependencies** - Removed unused packages

### 🐛 Fixed
- **QR Decoding** - Improved accuracy untuk low-quality images
- **CRC Calculation** - More reliable CRC computation
- **Payload Parsing** - Better error handling untuk malformed payloads
- **Mobile Layout** - Fixed responsive issues
- **Dark Mode** - Fixed color contrast issues
- **Animation Performance** - Optimized untuk smoother animations

---

## [1.0.0] - 2024-01-01

### Initial Release

### Added
- Basic QRIS conversion functionality
- QR code upload via drag-and-drop
- Manual payload input
- EMV TLV parsing
- CRC calculation
- QR code generation
- Download results as PNG/TXT
- Supabase integration
- History tracking
- Basic UI

---

## Roadmap

### [2.1.0] - Planned
- [ ] Batch conversion (multiple QR at once)
- [ ] Export history to CSV
- [ ] PWA support (offline capable)
- [ ] QR code scanner via camera
- [ ] Custom QR code styles/colors
- [ ] More additional data fields
- [ ] Multi-language support (EN/ID)
- [ ] Print QR functionality
- [ ] QR code validation tool

### [3.0.0] - Future
- [ ] API integration
- [ ] Merchant dashboard
- [ ] Transaction analytics
- [ ] Bulk QR generation
- [ ] Template system
- [ ] Admin panel
- [ ] White-label solution

---

## How to Upgrade

### From 1.0.0 to 2.0.0

**Breaking Changes:**
- Database/history features removed
- Different file structure
- Updated dependencies

**Migration Steps:**
1. Backup your data (if using v1.0.0 database)
2. Pull latest code
3. Run `npm install` (clean install recommended)
4. Remove `.env` if you had Supabase credentials
5. Run `npm run build`

**What You Need to Know:**
- No more database - all processing client-side only
- Simpler deployment (no backend needed)
- Faster performance
- Better UX dengan tutorial dan animations

---

## Support

- **Bug Reports:** [GitHub Issues](https://github.com/YOUR_USERNAME/qris-converter-pro/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/YOUR_USERNAME/qris-converter-pro/discussions)
- **Questions:** [Telegram](https://t.me/arczyyy) or [Facebook](https://www.facebook.com/iqraa07)

---

<div align="center">

**Created with ❤️ by [Iqra](https://facebook.com/iqraa07)**

[⬆ Back to README](README.md)

</div>
