import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { PDFJavaScriptInjectionMethods } from './injectionMethods';
import { JavaScriptValidator, type ValidationResult } from './validationUtils';

export interface ProcessingResult {
  success: boolean;
  fileName: string;
  error?: string;
  blob?: Blob;
  injectionMethods?: string[];
  validationResult?: ValidationResult;
}

export interface ProcessingOptions {
  useAllMethods?: boolean;
  selectedMethods?: string[];
  validateBeforeInjection?: boolean;
  optimizeForCompatibility?: boolean;
}

export class EnhancedPDFProcessor {
  private javascriptCode: string;
  private options: ProcessingOptions;

  constructor(javascriptCode: string, options: ProcessingOptions = {}) {
    this.javascriptCode = javascriptCode;
    this.options = {
      useAllMethods: true,
      validateBeforeInjection: true,
      optimizeForCompatibility: true,
      ...options
    };
  }

  async processSinglePDF(file: File): Promise<ProcessingResult> {
    try {
      // Validate JavaScript if requested
      let validationResult: ValidationResult | undefined;
      if (this.options.validateBeforeInjection) {
        validationResult = JavaScriptValidator.validateJavaScript(this.javascriptCode);
        
        if (!validationResult.valid) {
          return {
            success: false,
            fileName: file.name,
            error: 'JavaScript validation failed: ' + validationResult.warnings.join(', '),
            validationResult
          };
        }
      }

      // Read and load PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Track which methods were applied
      const appliedMethods: string[] = [];

      if (this.options.useAllMethods) {
        // Apply all injection methods for maximum compatibility
        const methods = PDFJavaScriptInjectionMethods.getAllMethods();
        
        for (const method of methods) {
          try {
            await method.inject(pdfDoc, this.javascriptCode);
            appliedMethods.push(method.name);
            console.log(`✓ Applied ${method.name}`);
          } catch (error) {
            console.warn(`⚠ Failed to apply ${method.name}:`, error);
          }
        }
      } else {
        // Apply only selected methods
        const allMethods = PDFJavaScriptInjectionMethods.getAllMethods();
        const selectedMethodNames = this.options.selectedMethods || ['Standard Injection'];
        
        for (const methodName of selectedMethodNames) {
          const method = allMethods.find(m => m.name === methodName);
          if (method) {
            try {
              await method.inject(pdfDoc, this.javascriptCode);
              appliedMethods.push(method.name);
            } catch (error) {
              console.warn(`Failed to apply ${method.name}:`, error);
            }
          }
        }
      }

      // Configure save options for maximum compatibility
      const saveOptions = this.options.optimizeForCompatibility ? {
        useObjectStreams: false,
        addDefaultPage: false,
        updateFieldAppearances: true,
        objectsPerTick: 50 // Prevent timeout on large PDFs
      } : {
        useObjectStreams: false,
        addDefaultPage: false
      };

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save(saveOptions);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      return {
        success: true,
        fileName: `js_injected_${file.name}`,
        blob,
        injectionMethods: appliedMethods,
        validationResult
      };
      
    } catch (error) {
      return {
        success: false,
        fileName: file.name,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        injectionMethods: []
      };
    }
  }

  async processMultiplePDFs(
    files: File[], 
    onProgress?: (progress: number, currentFile?: string) => void
  ): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (onProgress) {
        onProgress((i / files.length) * 100, file.name);
      }
      
      const result = await this.processSinglePDF(file);
      results.push(result);
      
      if (onProgress) {
        onProgress(((i + 1) / files.length) * 100, undefined);
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

    // Add processing summary
    const summary = this.generateProcessingSummary(results);
    zip.file('processing_summary.txt', summary);

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    saveAs(zipBlob, `js_injected_pdfs_${timestamp}.zip`);
  }

  private static generateProcessingSummary(results: ProcessingResult[]): string {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    let summary = `PDF JavaScript Injection Summary\n`;
    summary += `Generated: ${new Date().toISOString()}\n\n`;
    summary += `Total files processed: ${results.length}\n`;
    summary += `Successful: ${successful.length}\n`;
    summary += `Failed: ${failed.length}\n\n`;
    
    if (successful.length > 0) {
      summary += `SUCCESSFUL FILES:\n`;
      successful.forEach(result => {
        summary += `✓ ${result.fileName}\n`;
        if (result.injectionMethods?.length) {
          summary += `  Injection methods: ${result.injectionMethods.join(', ')}\n`;
        }
      });
      summary += `\n`;
    }
    
    if (failed.length > 0) {
      summary += `FAILED FILES:\n`;
      failed.forEach(result => {
        summary += `✗ ${result.fileName}\n`;
        summary += `  Error: ${result.error}\n`;
      });
    }
    
    return summary;
  }

  // Get available injection methods
  static getAvailableMethods() {
    return PDFJavaScriptInjectionMethods.getAllMethods().map(method => ({
      name: method.name,
      description: method.description
    }));
  }

  // Validate JavaScript code
  static validateJavaScript(code: string): ValidationResult {
    return JavaScriptValidator.validateJavaScript(code);
  }
}

// Export the original class name for backward compatibility
export { EnhancedPDFProcessor as PDFProcessor };