# 🤝 Contributing to QRIS Converter Pro

Terima kasih atas minat Anda untuk berkontribusi! Setiap kontribusi, besar atau kecil, sangat dihargai.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 📜 Code of Conduct

Project ini mengikuti prinsip:
- 🤝 Respect dan sopan kepada semua contributor
- 💡 Open-minded terhadap ide baru
- 📚 Helpful dan supportive
- 🎯 Focus pada improvement

---

## 🚀 Getting Started

### Prerequisites
```bash
node >= 16.0.0
npm >= 8.0.0
```

### Fork & Clone
```bash
# Fork repo via GitHub UI
# Clone your fork
git clone https://github.com/YOUR_USERNAME/qris-converter-pro.git
cd qris-converter-pro

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/qris-converter-pro.git
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
# App akan berjalan di http://localhost:5173
```

---

## 💻 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - untuk fitur baru
- `fix/` - untuk bug fixes
- `docs/` - untuk documentation
- `refactor/` - untuk refactoring
- `test/` - untuk testing

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments untuk logic yang kompleks
- Test perubahan Anda

### 3. Test Locally
```bash
# Development mode
npm run dev

# Build test
npm run build
npm run preview
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add new feature X"
# atau
git commit -m "fix: resolve bug Y"
```

Commit message format:
- `feat:` - fitur baru
- `fix:` - bug fix
- `docs:` - perubahan documentation
- `style:` - formatting, missing semicolons, dll
- `refactor:` - code refactoring
- `test:` - menambah tests
- `chore:` - update dependencies, dll

### 5. Push & Create PR
```bash
git push origin feature/your-feature-name
```

Kemudian buka GitHub dan create Pull Request.

---

## 📝 Coding Standards

### TypeScript
```typescript
// ✅ Good
interface ConversionResult {
  original: QRISPayload;
  converted: {
    payload: string;
    items: TLVItem[];
  };
}

// ❌ Avoid
let result: any;
```

### Component Structure
```typescript
// ✅ Good - Clear, readable
function MyComponent() {
  const [state, setState] = useState<string>('');

  const handleClick = () => {
    // Logic here
  };

  return (
    <div>
      {/* JSX here */}
    </div>
  );
}

// ❌ Avoid - Inline logic, unclear structure
function MyComponent() {
  return <div onClick={() => { /* complex logic */ }}></div>;
}
```

### CSS
```css
/* ✅ Good - Use CSS variables */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
}

/* ❌ Avoid - Hardcoded colors */
.card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
```

### File Organization
```
src/
├── components/      # Reusable components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── types/           # TypeScript types
└── App.tsx          # Main app
```

---

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code builds without errors
- [ ] Tested di minimal 2 browsers
- [ ] No console errors/warnings
- [ ] Code follows project style
- [ ] Documentation updated jika perlu

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
Describe testing yang sudah dilakukan

## Screenshots (jika UI changes)
Add screenshots here

## Checklist
- [ ] Code builds successfully
- [ ] Tested in multiple browsers
- [ ] Documentation updated
```

### Review Process
1. Maintainer akan review PR Anda
2. Mungkin ada request untuk changes
3. Setelah approved, PR akan di-merge
4. Branch akan di-delete otomatis

---

## 🐛 Reporting Bugs

### Before Reporting
Pastikan bug belum pernah dilaporkan:
- Check existing issues
- Search closed issues

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Version: 2.0.0

## Additional Context
Any other context
```

---

## 💡 Suggesting Features

### Feature Request Template
```markdown
## Feature Description
Clear description of proposed feature

## Use Case
Explain why this feature is needed

## Proposed Solution
How you envision this working

## Alternatives Considered
Other approaches you've thought of

## Additional Context
Mockups, examples, etc.
```

---

## 🎨 UI/UX Guidelines

### Design Principles
1. **Simplicity** - Keep it simple dan intuitive
2. **Consistency** - Follow existing patterns
3. **Accessibility** - Ensure usable by everyone
4. **Performance** - Optimize untuk speed

### Animation Guidelines
- Use smooth, purposeful animations
- Duration: 200-400ms untuk most animations
- Use `cubic-bezier(0.4, 0, 0.2, 1)` easing
- Avoid jank - test on slower devices

### Responsive Design
Test perubahan di:
- Mobile (320px - 768px)
- Tablet (768px - 1024px)
- Desktop (1024px+)

---

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] QR upload works (drag & drop, click)
- [ ] Payload parsing correct
- [ ] Conversion accurate
- [ ] Download PNG works
- [ ] Download TXT works
- [ ] Copy to clipboard works
- [ ] Dark mode toggle works
- [ ] Responsive di mobile
- [ ] No console errors

### Browser Testing
Test minimal di:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

## 📚 Resources

### Helpful Links
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [EMVCo Specs](https://www.emvco.com/emv-technologies/qrcodes/)

### Tools
- **ESLint** - Linting (coming soon)
- **Prettier** - Code formatting (coming soon)
- **TypeScript** - Type checking

---

## 🏆 Recognition

Contributors akan di-list di:
- README.md Contributors section
- GitHub Contributors page
- Release notes (for significant contributions)

---

## 📞 Need Help?

Stuck? Ada pertanyaan?

- 💬 Ask di GitHub Discussions
- ✈️ DM di [Telegram](https://t.me/arczyyy)
- 📘 Message di [Facebook](https://www.facebook.com/iqraa07)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing! 🙏**

Every contribution makes this project better.

[⬆ Back to Main README](README.md)

</div>
