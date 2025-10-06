# 🚀 Deployment Guide - QRIS Converter Pro

Panduan lengkap untuk deploy QRIS Converter Pro ke berbagai platform hosting.

---

## 📋 Table of Contents

- [Vercel (Recommended)](#vercel)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Custom Server](#custom-server)

---

## 🔷 Vercel

### Why Vercel?
- ⚡ Lightning fast deployment
- 🔄 Auto-deploy on git push
- 🌐 Global CDN
- 💯 Free tier yang generous

### Steps:

1. **Push ke GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/qris-converter-pro.git
git push -u origin main
```

2. **Deploy via Vercel Dashboard**
   - Buka [vercel.com](https://vercel.com)
   - Klik "New Project"
   - Import GitHub repository
   - Vercel auto-detect Vite config
   - Klik "Deploy"

3. **Deploy via Vercel CLI** (Alternative)
```bash
npm install -g vercel
vercel login
vercel
```

### Configuration
Vercel akan otomatis detect settings:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 🟢 Netlify

### Steps:

1. **Build Project**
```bash
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

3. **Deploy via Drag & Drop**
   - Buka [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag folder `dist/` ke area upload
   - Done!

### netlify.toml (Optional)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🐙 GitHub Pages

### Steps:

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/qris-converter-pro",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/qris-converter-pro/'
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **GitHub Settings**
   - Repo Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

## 🖥️ Custom Server (VPS/Dedicated)

### Requirements:
- Node.js 16+
- Nginx/Apache
- PM2 (optional, untuk production)

### Steps:

1. **Build Project**
```bash
npm run build
```

2. **Copy dist folder ke server**
```bash
scp -r dist/* user@your-server:/var/www/qris-converter
```

3. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/qris-converter;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    gzip_min_length 1000;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **Restart Nginx**
```bash
sudo systemctl restart nginx
```

---

## 🔒 HTTPS Setup

### Using Certbot (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Certbot akan otomatis:
- Generate SSL certificate
- Update Nginx config
- Setup auto-renewal

---

## 📊 Performance Optimization

### Build Optimization

1. **Analyze Bundle Size**
```bash
npm run build -- --mode=analyze
```

2. **Environment Variables**
Tidak ada env vars yang diperlukan karena semuanya client-side!

### CDN Configuration

Untuk performance maksimal, enable CDN untuk static assets:
- JS files
- CSS files
- Font files

---

## 🧪 Testing Deployment

Checklist setelah deploy:

- [ ] Homepage loads properly
- [ ] QR upload berfungsi
- [ ] Payload parsing works
- [ ] Conversion berjalan normal
- [ ] Download PNG/TXT works
- [ ] Dark mode toggle berfungsi
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Build Gagal
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### 404 on Page Refresh
Pastikan server configured untuk SPA:
- Netlify: `_redirects` file
- Vercel: Auto-handled
- Nginx: `try_files` directive

### Large Bundle Size
```bash
# Check bundle analysis
npm run build -- --mode=analyze
```

---

## 📱 PWA (Optional)

Untuk membuat app bisa di-install:

1. **Install vite-plugin-pwa**
```bash
npm install -D vite-plugin-pwa
```

2. **Update vite.config.ts**
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'QRIS Converter Pro',
        short_name: 'QRIS Pro',
        description: 'Convert dynamic QRIS to static',
        theme_color: '#10b981',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 💡 Tips & Best Practices

1. **Enable Gzip/Brotli** compression di server
2. **Use CDN** untuk static assets
3. **Minify** HTML, CSS, JS (Vite sudah handle)
4. **Enable caching** untuk assets yang jarang berubah
5. **Monitor performance** dengan Lighthouse

---

## 📞 Support

Butuh bantuan deployment?
- 📘 [Facebook](https://www.facebook.com/iqraa07)
- ✈️ [Telegram](https://t.me/arczyyy)

---

<div align="center">

**Happy Deploying! 🚀**

[⬆ Back to Main README](README.md)

</div>
