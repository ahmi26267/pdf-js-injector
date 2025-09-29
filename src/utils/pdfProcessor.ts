import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export interface ProcessingResult {
  success: boolean;
  fileName: string;
  error?: string;
  blob?: Blob;
}

export class PDFProcessor {
  private javascriptCode: string;

  constructor(javascriptCode: string) {
    this.javascriptCode = javascriptCode;
  }

  async processSinglePDF(file: File): Promise<ProcessingResult> {
    try {
      // Read the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Add JavaScript as an open action
      pdfDoc.addJavaScript(
        'openAction',
        this.javascriptCode
      );

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      return {
        success: true,
        fileName: `js_injected_${file.name}`,
        blob
      };
    } catch (error) {
      return {
        success: false,
        fileName: file.name,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async processMultiplePDFs(
    files: File[], 
    onProgress?: (progress: number) => void
  ): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const result = await this.processSinglePDF(files[i]);
      results.push(result);
      
      if (onProgress) {
        onProgress(((i + 1) / files.length) * 100);
      }
    }
    
    return results;
  }

  static async downloadFile(blob: Blob, fileName: string) {
    saveAs(blob, fileName);
  }

  static async downloadMultipleFiles(results: ProcessingResult[]) {
    const successfulResults = results.filter(r => r.success && r.blob);
    
    if (successfulResults.length === 0) {
      throw new Error('No files to download');
    }

    if (successfulResults.length === 1) {
      // Download single file directly
      const result = successfulResults[0];
      saveAs(result.blob!, result.fileName);
      return;
    }

    // Create ZIP file for multiple files
    const zip = new JSZip();
    
    successfulResults.forEach(result => {
      if (result.blob) {
        zip.file(result.fileName, result.blob);
      }
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `js_injected_pdfs_${new Date().toISOString().slice(0, 10)}.zip`);
  }

  static validateJavaScript(code: string): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Basic validation
    if (!code.trim()) {
      return { valid: false, warnings: ['JavaScript code cannot be empty'] };
    }

    // Check for potentially dangerous functions
    const dangerousFunctions = [
      'eval(',
      'Function(',
      'document.write(',
      'innerHTML',
      'outerHTML'
    ];

    dangerousFunctions.forEach(func => {
      if (code.includes(func)) {
        warnings.push(`Potentially dangerous function detected: ${func}`);
      }
    });

    // Check for network requests
    const networkPatterns = [
      'fetch(',
      'XMLHttpRequest',
      'ajax',
      'http://',
      'https://',
      'ftp://'
    ];

    networkPatterns.forEach(pattern => {
      if (code.includes(pattern)) {
        warnings.push(`Network activity detected: ${pattern}`);
      }
    });

    // Check for file system access
    const fileSystemPatterns = [
      'fs.',
      'require(',
      'import(',
      'process.',
      'Buffer'
    ];

    fileSystemPatterns.forEach(pattern => {
      if (code.includes(pattern)) {
        warnings.push(`File system access detected: ${pattern}`);
      }
    });

    return { valid: true, warnings };
  }
}

export const EXAMPLE_JAVASCRIPT_CODES = {
  simple_alert: `// Simple alert when PDF opens
this.print({
  bUI: true,
  bSilent: false,
  bShrinkToFit: true
});

app.alert("Welcome! This PDF contains embedded JavaScript.", 3);`,

  form_validation: `// Form validation example
// This code validates form fields when the PDF opens

function validateForm() {
  var name = this.getField("name");
  var email = this.getField("email");
  
  if (name && name.value === "") {
    app.alert("Please enter your name.", 1);
    name.setFocus();
    return false;
  }
  
  if (email && email.value === "") {
    app.alert("Please enter your email.", 1);
    email.setFocus();
    return false;
  }
  
  return true;
}

// Run validation when PDF opens
validateForm();`,

  auto_print: `// Automatically print the PDF when opened
this.print({
  bUI: false,
  bSilent: true,
  bShrinkToFit: true
});`,

  date_timestamp: `// Add current date and time to a field
var now = new Date();
var dateString = now.getFullYear() + "-" + 
                 String(now.getMonth() + 1).padStart(2, '0') + "-" + 
                 String(now.getDate()).padStart(2, '0') + " " +
                 String(now.getHours()).padStart(2, '0') + ":" +
                 String(now.getMinutes()).padStart(2, '0');

var timestampField = this.getField("timestamp");
if (timestampField) {
  timestampField.value = "Opened: " + dateString;
}`,

  security_warning: `// Security warning for sensitive documents
app.alert({
  cMsg: "CONFIDENTIAL DOCUMENT\\n\\nThis document contains sensitive information.\\nUnauthorized distribution is prohibited.\\n\\nBy clicking OK, you acknowledge that you are authorized to view this content.",
  nIcon: 2,
  cTitle: "Security Notice"
});

// Optional: Log access attempt (for audit purposes)
console.println("Document accessed at: " + new Date());`
};