# PDF JavaScript Injector

A professional, user-friendly tool for embedding JavaScript code into PDF documents with enhanced security features and batch processing capabilities.

**Author**: Ahmi - Security Researcher

---

## ⚡ Quick Start (One Command)

### Linux/Mac:
```bash
git clone https://github.com/ahmi26267/pdf-js-injector.git && cd pdf-js-injector && chmod +x install.sh && ./install.sh
```

### Windows:
```cmd
git clone https://github.com/ahmi26267/pdf-js-injector.git && cd pdf-js-injector && install.bat
```


Or download the repository and run `install.sh` (Linux/Mac) or `install.bat` (Windows).

### With Docker Compose (Even Easier):
```bash
git clone https://github.com/ahmi26267/pdf-js-injector.git
cd pdf-js-injector
docker-compose up -d
```

Access at: **http://localhost:8080**

---

## ⚠️ AUTHORIZATION WARNING

**USE THIS TOOL FOR AUTHORIZED PURPOSES ONLY**

This tool is designed for legitimate security research, testing, and authorized PDF modification purposes. You must have explicit permission to modify and test PDFs on any system or application.

**DISCLAIMER:** The author (**Ahmi - Security Researcher**) and all contributors are **NOT RESPONSIBLE** for any misuse, unauthorized access, damage, or illegal activities performed with this tool. Users bear full legal responsibility for their actions.

**LEGAL NOTICE:** Unauthorized access to computer systems, applications, or documents is illegal under:
- Computer Fraud and Abuse Act (CFAA) - United States
- Computer Misuse Act - United Kingdom  
- Similar laws in other jurisdictions

By downloading, installing, or using this tool, you acknowledge that:
1. You have proper authorization for your intended use
2. You accept full responsibility for your actions
3. You will comply with all applicable laws and regulations
4. You understand the security implications of PDF JavaScript injection

**Use responsibly. Stay legal. Get permission first.**

---

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

## 🚀 Getting Started - Choose Your Method

This tool can be installed and run in multiple ways. Choose the method that works best for you:

### Method 1: Docker Container (Easiest - Recommended)
✅ No dependencies needed  
✅ Works on any OS  
✅ Auto-updates available  
✅ Isolated and secure

### Method 2: Podman Container (Docker Alternative)
✅ Rootless container support  
✅ Same commands as Docker  
✅ Great for security-conscious users

### Method 3: Direct Installation (Traditional)
✅ Full control over the application  
✅ Good for development  
✅ Native performance

---

## 📦 Installation Instructions


---

### Automated Installation (Easiest)

We provide install scripts for quick setup:

#### Linux/Mac:
```bash
chmod +x install.sh
./install.sh
```

#### Windows:
Double-click `install.bat` or run in Command Prompt:
```cmd
install.bat
```

The script will:
1. Check if Docker/Podman is installed
2. Build the container
3. Start the application
4. Show you the access URL

---

### Method 1: Docker Container (Recommended)

#### Step 1: Install Docker
If you don't have Docker installed:
- **Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: Run `curl -fsSL https://get.docker.com | sh`

#### Step 2: Download the Repository
```bash
git clone https://github.com/ahmi/pdf-js-injector.git
cd pdf-js-injector
```

Or download as ZIP from GitHub and extract it.

#### Step 3: Build the Container
```bash
docker build -t pdf-js-injector .
```

This will take 1-2 minutes the first time.

#### Step 4: Run the Application
```bash
docker run -d -p 8080:80 --name pdf-injector --restart unless-stopped pdf-js-injector
```

#### Step 5: Access the Tool
Open your browser and go to: **http://localhost:8080**

That's it! The tool is now running.

#### Managing the Container

**Check if it's running:**
```bash
docker ps
```

**Stop the application:**
```bash
docker stop pdf-injector
```

**Start it again:**
```bash
docker start pdf-injector
```

**View logs:**
```bash
docker logs pdf-injector
```

**Remove the container:**
```bash
docker stop pdf-injector
docker rm pdf-injector
```

**Update to latest version:**
```bash
docker stop pdf-injector
docker rm pdf-injector
git pull
docker build -t pdf-js-injector .
docker run -d -p 8080:80 --name pdf-injector --restart unless-stopped pdf-js-injector
```

---

### Method 2: Podman Container (Docker Alternative)

Podman is a Docker alternative that doesn't require root access.

#### Step 1: Install Podman
- **Windows**: Download from [Podman Desktop](https://podman-desktop.io/)
- **Mac**: `brew install podman`
- **Linux**: Check [Podman Installation Guide](https://podman.io/getting-started/installation)

#### Step 2-5: Same as Docker
Just replace `docker` with `podman` in all commands:

```bash
# Download repository
git clone https://github.com/ahmi/pdf-js-injector.git
cd pdf-js-injector

# Build
podman build -t pdf-js-injector .

# Run
podman run -d -p 8080:80 --name pdf-injector --restart unless-stopped pdf-js-injector

# Access at: http://localhost:8080
```

**Managing with Podman:**
```bash
# Check status
podman ps

# Stop
podman stop pdf-injector

# Start
podman start pdf-injector

# View logs
podman logs pdf-injector

# Remove
podman stop pdf-injector
podman rm pdf-injector

# Update
podman stop pdf-injector
podman rm pdf-injector
git pull
podman build -t pdf-js-injector .
podman run -d -p 8080:80 --name pdf-injector --restart unless-stopped pdf-js-injector
```

---

### Method 3: Direct Installation (Traditional)

The easiest way to run this tool locally is using Docker or Podman containers.

#### Prerequisites
- **Docker** ([Install Docker](https://docs.docker.com/get-docker/)) OR
- **Podman** ([Install Podman](https://podman.io/getting-started/installation))

#### Option 1: Using Docker

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd pdf-js-injector
   ```

2. **Build the Docker image**
   ```bash
   docker build -t pdf-js-injector .
   ```

3. **Run the container**
   ```bash
   docker run -d -p 8080:80 --name pdf-injector pdf-js-injector
   ```

4. **Open in browser**
   
   Navigate to: `http://localhost:8080`

5. **Stop the container**
   ```bash
   docker stop pdf-injector
   ```

6. **Restart the container**
   ```bash
   docker start pdf-injector
   ```

7. **Remove the container**
   ```bash
   docker stop pdf-injector
   docker rm pdf-injector
   ```

#### Option 2: Using Podman

Podman uses the same commands as Docker, just replace `docker` with `podman`:

1. **Build the image**
   ```bash
   podman build -t pdf-js-injector .
   ```

2. **Run the container**
   ```bash
   podman run -d -p 8080:80 --name pdf-injector pdf-js-injector
   ```

3. **Open in browser**
   
   Navigate to: `http://localhost:8080`

#### Auto-Update Container

To always run the latest version with auto-updates:

**Docker:**
```bash
docker run -d -p 8080:80 --name pdf-injector --restart unless-stopped \
  --pull always ghcr.io/ahmi/pdf-js-injector:latest
```

**Podman:**
```bash
podman run -d -p 8080:80 --name pdf-injector --restart unless-stopped \
  --pull always ghcr.io/ahmi/pdf-js-injector:latest
```

The `--pull always` flag ensures the container checks for updates on every restart.

#### Manual Update

To manually update to the latest version:

**Docker:**
```bash
docker pull ghcr.io/ahmi/pdf-js-injector:latest
docker stop pdf-injector
docker rm pdf-injector
docker run -d -p 8080:80 --name pdf-injector ghcr.io/ahmi/pdf-js-injector:latest
```

**Podman:**
```bash
podman pull ghcr.io/ahmi/pdf-js-injector:latest
podman stop pdf-injector
podman rm pdf-injector
podman run -d -p 8080:80 --name pdf-injector ghcr.io/ahmi/pdf-js-injector:latest
```

#### Docker/Podman Benefits
- ✅ No need to install Node.js or npm
- ✅ Isolated environment - doesn't affect your system
- ✅ Consistent setup across all platforms (Windows, Mac, Linux)
- ✅ Easy to start, stop, and remove
- ✅ Production-ready configuration with nginx

### Download & Install Locally (Traditional Method)

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

For educational and authorized security research purposes only.

---

## ⚠️ Final Disclaimer

**This tool is designed for security research and legitimate professional use only.**

The author and contributors provide this tool "as-is" without any warranties. Users are solely responsible for ensuring compliance with security policies, organizational rules, and legal requirements when using PDFs with embedded JavaScript.

**Never use this tool for:**
- Unauthorized access to systems or applications
- Malicious attacks or exploits
- Distribution of harmful content
- Any illegal activities

**Always:**
- Obtain proper authorization before testing
- Use in controlled, legal environments
- Comply with responsible disclosure practices
- Follow applicable laws and regulations

**By using this tool, you agree to use it responsibly and legally.**

---

## 🎯 Quick Test

Want to verify the tool works? Use this payload:
```javascript
app.alert('you are hacked');
```

Upload any PDF, inject this code, open the result in Adobe Acrobat/Reader, and you should see the alert.

---

**Created by Ahmi - Security Researcher**

This tool is provided for educational and authorized security research purposes only. The author and contributors are NOT responsible for any misuse, unauthorized access, or illegal activities. Users must comply with all applicable laws and obtain proper authorization before use.
