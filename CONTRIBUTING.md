# Contributing to TaskFlow

Thank you for considering contributing to TaskFlow! This document outlines the process and guidelines.

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, versions)

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with "feature request" label
3. Describe:
   - The problem it solves
   - Proposed solution
   - Alternative solutions considered
   - Use cases

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📋 Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

## 🎨 Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints
- Write docstrings for functions
- Keep functions focused and small

### TypeScript (Frontend)
- Use functional components with hooks
- Use TypeScript types, avoid `any`
- Follow React best practices
- Use meaningful variable names

### Git Commits
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when applicable

## ✅ Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Documentation

- Update README.md if needed
- Add JSDoc/docstrings for new functions
- Update FEATURES.md for new features
- Include inline comments for complex logic

## 🔍 Code Review Process

1. Automated checks must pass
2. At least one maintainer approval required
3. Address review feedback
4. Keep PR focused on one feature/fix

## 🌟 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Celebrated in our community!

## 📬 Questions?

Open a discussion on GitHub or reach out to maintainers.

---

Thank you for making TaskFlow better! 🚀

