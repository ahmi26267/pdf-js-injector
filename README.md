# PDF JavaScript Injector

A professional, user-friendly web-based tool for embedding JavaScript code into PDF documents with enhanced security features and batch processing capabilities.

**Author**: Ahmi - Security Researcher

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
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Works on any static hosting (Netlify, Vercel, GitHub Pages, etc.)

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

**Quick Test Payload**
```javascript
// Simple test to verify injection works
app.alert('you are hacked');
```

**More Examples**
```javascript
// Welcome message when PDF opens
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

### Online Tool (No Installation Required)
Visit the live application at: [PDF JS Injector](https://lovable.dev/projects/daa3db90-362d-41b2-95b7-2264075d9231)

No downloads, no setup - just open and use!

### Download & Install Locally

#### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun**
- A modern web browser (Chrome, Firefox, Edge, Safari)

#### Installation Steps

1. **Download the repository**
   
   **Option A: Download ZIP**
   - Click the green "Code" button on GitHub
   - Select "Download ZIP"
   - Extract the ZIP file to your desired location
   
   **Option B: Clone with Git**
   ```bash
   git clone <repository-url>
   cd pdf-js-injector
   ```

2. **Install dependencies**
   
   Open terminal/command prompt in the project folder and run:
   ```bash
   npm install
   ```
   
   Or if using bun:
   ```bash
   bun install
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```
   
   Or with bun:
   ```bash
   bun run dev
   ```

4. **Open in browser**
   
   The tool will automatically open at: `http://localhost:8080`
   
   If it doesn't open automatically, just paste this URL in your browser.

5. **Build for production (optional)**
   
   To create an optimized production build:
   ```bash
   npm run build
   ```
   
   The built files will be in the `dist` folder.

## 📖 Usage Guide

### Quick Start - Test the Tool

Want to quickly test if the tool works? Use this simple test payload:

```javascript
app.alert('you are hacked');
```

This will display an alert when the PDF is opened, perfect for testing on vulnerable sites or your own PDFs.

### Step-by-Step Instructions

#### Step 1: Upload PDF Files
- **Drag and drop** PDF files into the upload zone, OR
- Click **"Choose Files"** to select PDFs from your device
- ✅ Multiple files are supported for batch processing

#### Step 2: Write or Select JavaScript Code

**Option A: Use a Quick Test**
```javascript
app.alert('you are hacked');
```

**Option B: Choose from Examples**
- Click the **dropdown menu** to see pre-built examples
- Select any example (auto-print, form validation, etc.)
- The code will automatically populate

**Option C: Write Custom JavaScript**
- Type or paste your JavaScript code in the editor
- Real-time character count shown at bottom
- Click **"Preview Code"** to see your formatted code

#### Step 3: Process Files
- Click **"Inject JavaScript into PDFs"** button
- Watch the real-time progress bar (especially for batch operations)
- See success/error messages for each file

#### Step 4: Download Results
- **Single file**: Click download button next to each processed file
- **Batch download**: Click "Download All" to get a ZIP archive
- All files are prefixed with `js_injected_` for easy identification
- A processing summary text file is included in batch downloads

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

## 🆘 Support & Troubleshooting

### Common Issues

**JavaScript not executing in PDF?**
- Ensure JavaScript is enabled in your PDF viewer (Adobe Acrobat/Reader)
- Check if the PDF viewer shows security warnings - you may need to allow the script
- Test with the simple payload: `app.alert('you are hacked');`

**Upload not working?**
- Check file format - must be valid PDF files
- Try a smaller PDF file first
- Ensure your browser supports modern JavaScript (File API)

**Need Help?**
- Open an issue on GitHub
- Check existing documentation
- Review security guidelines before use
- Contact: Ahmi (Security Researcher)

## 🔗 Related Resources

- [PDF-lib Documentation](https://pdf-lib.js.org/)
- [Adobe Acrobat JavaScript Reference](https://www.adobe.com/devnet/acrobat/javascript.html)
- [PDF Security Best Practices](https://www.adobe.com/devnet/acrobat/security.html)

---

## 👤 Author

**Ahmi** - Security Researcher

Specializing in PDF security research and JavaScript injection techniques.

---

## 🎯 Quick Test

Want to verify the tool works? Use this payload:
```javascript
app.alert('you are hacked');
```

Upload any PDF, inject this code, open the result in Adobe Acrobat/Reader, and you should see the alert.

---

**⚠️ Disclaimer**: This tool is designed for security research and legitimate professional use. Users are responsible for ensuring compliance with security policies and legal requirements when distributing PDFs with embedded JavaScript. Always obtain proper authorization before testing on systems you don't own.