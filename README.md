# PDF JavaScript Injector

A professional web-based tool for embedding JavaScript code into PDF documents with enhanced security features and batch processing capabilities.

## 🚀 Features

- **Batch Processing**: Process multiple PDF files simultaneously
- **Security Validation**: Built-in JavaScript code validation with security warnings
- **Modern Interface**: Beautiful, responsive design with drag-and-drop functionality
- **Real-time Progress**: Track processing status with detailed progress indicators
- **Flexible Downloads**: Download individual files or batch ZIP archives
- **Example Library**: Pre-built JavaScript examples for common use cases
- **Cross-platform**: Works in any modern web browser

## 🔧 Technology Stack

- **Frontend**: React 18 + TypeScript
- **PDF Processing**: PDF-lib for client-side PDF manipulation
- **UI Framework**: shadcn/ui with Tailwind CSS
- **Build Tool**: Vite
- **File Handling**: React Dropzone for drag-and-drop functionality

## 🛡️ Security Features

### Built-in Validation
- Syntax checking for JavaScript code
- Detection of potentially dangerous functions
- Network activity warnings
- File system access alerts

### Security Warnings
- Clear documentation of risks and legitimate uses
- Prominent security notices throughout the interface
- Best practices guidance for safe usage

## 🎯 Use Cases

### Legitimate Applications
- **Form Validation**: Add client-side validation to PDF forms
- **Auto-printing**: Configure PDFs to print automatically when opened
- **Dynamic Content**: Generate timestamps, user info, or calculated fields
- **Accessibility**: Enhance PDFs with screen reader support
- **Workflow Automation**: Streamline document processing workflows

### Example JavaScript Functions
```javascript
// Simple alert when PDF opens
app.alert("Welcome! This PDF contains embedded JavaScript.", 3);

// Auto-print functionality
this.print({
  bUI: false,
  bSilent: true,
  bShrinkToFit: true
});

// Form field validation
var nameField = this.getField("name");
if (nameField && nameField.value === "") {
  app.alert("Please enter your name.", 1);
  nameField.setFocus();
}
```

## 🚀 Getting Started

### Online Tool
Visit the live application at: [PDF JS Injector](https://lovable.dev/projects/daa3db90-362d-41b2-95b7-2264075d9231)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pdf-js-injector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📖 Usage Guide

### Step 1: Upload PDF Files
- Drag and drop PDF files into the upload zone
- Or click "Choose Files" to select PDFs from your device
- Multiple files are supported for batch processing

### Step 2: Write or Select JavaScript Code
- Use the built-in code editor to write custom JavaScript
- Select from pre-built examples using the dropdown menu
- Preview your code with the toggle button
- View validation results and security warnings

### Step 3: Process Files
- Click "Inject JavaScript into PDFs" to start processing
- Monitor real-time progress for batch operations
- Review processing results and error messages

### Step 4: Download Results
- Download individual processed files
- Or download all successful files as a ZIP archive
- Files are prefixed with "js_injected_" for easy identification

## ⚠️ Security Considerations

### Important Warnings
- **Potentially Dangerous**: This tool can create PDFs that execute code when opened
- **Use Responsibly**: Only inject JavaScript code you trust and understand
- **Disclosure Required**: Always inform recipients about embedded JavaScript
- **Test Thoroughly**: Verify functionality in target PDF viewers

### Risk Mitigation
- Code validation helps identify potentially dangerous functions
- Security warnings alert users to risks
- Example library provides safe, tested code snippets
- Documentation emphasizes responsible usage

## 🔧 Technical Implementation

### PDF Processing Pipeline
1. **File Reading**: Convert uploaded PDFs to ArrayBuffer
2. **PDF Parsing**: Use PDF-lib to load and parse PDF structure
3. **JavaScript Injection**: Add code as document open action
4. **PDF Generation**: Save modified PDF with embedded JavaScript
5. **Download Preparation**: Create downloadable blob with proper MIME type

### JavaScript Validation
- Syntax checking for basic errors
- Pattern matching for dangerous functions
- Network activity detection
- File system access warnings

### Browser Compatibility
- Modern browsers with ES2020+ support
- File API and ArrayBuffer support required
- Blob download functionality needed

## 📊 Performance Characteristics

- **Client-side Processing**: No server uploads required
- **Memory Efficient**: Streaming processing for large files
- **Batch Optimized**: Parallel processing with progress tracking
- **Responsive Design**: Works on desktop and mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
- Follow TypeScript best practices
- Maintain security-first approach
- Include tests for new features
- Update documentation as needed

## 📄 License

This project is provided as-is for educational and professional use. Users are responsible for complying with all applicable laws and regulations regarding PDF modification and JavaScript execution.

## 🆘 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check existing documentation
- Review security guidelines before use

## 🔗 Related Resources

- [PDF-lib Documentation](https://pdf-lib.js.org/)
- [Adobe Acrobat JavaScript Reference](https://www.adobe.com/devnet/acrobat/javascript.html)
- [PDF Security Best Practices](https://www.adobe.com/devnet/acrobat/security.html)

---

**⚠️ Disclaimer**: This tool is designed for legitimate professional use. Users are responsible for ensuring compliance with security policies and legal requirements when distributing PDFs with embedded JavaScript.