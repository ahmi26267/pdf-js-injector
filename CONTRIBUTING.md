# Contributing to PDF JavaScript Injector

Thank you for your interest in contributing to the PDF JavaScript Injector! This document provides guidelines for contributing to this security-focused tool.

## 🛡️ Security First

Since this tool deals with potentially dangerous functionality (JavaScript injection), all contributions must prioritize security:

### Security Requirements
- **Never** add features that could make the tool more dangerous without clear warnings
- **Always** validate and warn about potentially dangerous JavaScript patterns
- **Document** security implications of any new features
- **Test** thoroughly with various PDF viewers and JavaScript engines

## 🚀 Development Setup

1. **Fork and Clone**
   ```bash
   git clone <your-fork-url>
   cd pdf-js-injector
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Run Tests** (when available)
   ```bash
   npm test
   ```

## 📋 Contribution Types

### 🐛 Bug Reports
- Use the GitHub issue template
- Include browser version and steps to reproduce
- Provide sample PDFs and JavaScript code (if safe)
- Describe expected vs actual behavior

### ✨ Feature Requests
- Describe the use case and benefits
- Consider security implications
- Provide examples of legitimate usage
- Discuss potential risks and mitigations

### 🔧 Code Contributions
- Follow the existing code style and patterns
- Add appropriate TypeScript types
- Include security validation where needed
- Update documentation and examples

## 🎯 Development Guidelines

### Code Quality
- **TypeScript**: Use strict typing and modern ES features
- **React**: Follow React best practices and hooks patterns
- **UI/UX**: Maintain cybersecurity aesthetic and professional feel
- **Performance**: Consider memory usage for large PDF files

### Security Guidelines
- **Input Validation**: Always validate user inputs
- **Warning Systems**: Maintain and enhance security warnings
- **Safe Defaults**: Default to safer options
- **Documentation**: Clearly document security implications

### Design System
- Use design tokens from `src/index.css`
- Follow the cybersecurity color scheme (green/orange accents)
- Maintain responsive design principles
- Use shadcn/ui components when possible

## 🧪 Testing

### Manual Testing Checklist
- [ ] Upload various PDF types and sizes
- [ ] Test batch processing with multiple files
- [ ] Verify JavaScript validation catches dangerous patterns
- [ ] Test download functionality (individual and batch)
- [ ] Check responsive design on mobile devices
- [ ] Validate accessibility with screen readers

### Security Testing
- [ ] Inject various JavaScript patterns and verify warnings
- [ ] Test with PDFs containing existing JavaScript
- [ ] Verify that dangerous code patterns are flagged
- [ ] Test with malformed or corrupted PDFs

## 📝 Documentation

### Required Documentation Updates
- Update README.md for new features
- Add JSDoc comments to new functions
- Include security considerations
- Provide usage examples

### Example Code Standards
```typescript
/**
 * Validates JavaScript code for security risks
 * @param code - The JavaScript code to validate
 * @returns Validation result with warnings
 */
export function validateJavaScript(code: string): ValidationResult {
  // Implementation with security checks
}
```

## 🔄 Pull Request Process

### Before Submitting
1. **Test thoroughly** with various PDFs and browsers
2. **Run linting** and fix any issues
3. **Update documentation** as needed
4. **Consider security** implications

### PR Requirements
- **Clear description** of changes and motivation
- **Security assessment** for any new functionality
- **Testing evidence** that changes work correctly
- **Breaking changes** clearly documented

### Review Process
1. Automated checks must pass
2. Security review for any JavaScript processing changes
3. Code review focusing on security and quality
4. Manual testing of PDF processing functionality

## 🎨 Design Contributions

### UI/UX Improvements
- Maintain the cybersecurity/professional aesthetic
- Use the established color palette (green/orange accents)
- Ensure accessibility compliance
- Test on various screen sizes

### Asset Guidelines
- Use high-quality SVGs for icons when possible
- Maintain consistent visual style
- Optimize images for web delivery
- Follow naming conventions

## 🚫 What We Don't Accept

### Prohibited Contributions
- Features that make dangerous JavaScript easier to inject
- Removal of security warnings without replacement
- Code that bypasses existing security measures
- Features that could facilitate malicious use

### Code Quality Issues
- Untyped JavaScript (use TypeScript)
- Direct DOM manipulation (use React patterns)
- Hardcoded values that should be configurable
- Code without proper error handling

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Pull Request Comments**: For code-specific discussions

### Response Times
- We aim to respond to issues within 48 hours
- Pull requests are typically reviewed within a week
- Security issues receive priority attention

## 🏆 Recognition

Contributors will be:
- Listed in the project's contributors section
- Credited in release notes for significant contributions
- Invited to participate in major design decisions

## 📄 License Agreement

By contributing, you agree that:
- Your contributions will be licensed under the project's license
- You have the right to submit the contribution
- You understand the security implications of your changes

---

**Thank you for helping make PDF JavaScript Injector a better, safer tool for everyone! 🙏**