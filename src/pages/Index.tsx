import React, { useState } from 'react';
import { Shield, Code, FileText, Download, Github, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileDropZone } from '@/components/FileDropZone';
import { JavaScriptEditor } from '@/components/JavaScriptEditor';
import { SecurityWarning } from '@/components/SecurityWarning';
import { ProcessingStatus, ProcessedFile } from '@/components/ProcessingStatus';
import { UpdateChecker } from '@/components/UpdateChecker';
import { PDFProcessor } from '@/utils/pdf';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-cyber.jpg';
import jsIcon from '@/assets/js-icon.png';
import pdfIcon from '@/assets/pdf-icon.png';

const Index = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [jsCode, setJsCode] = useState<string>('');
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handlePdfFilesSelected = (files: File[]) => {
    setPdfFiles(prev => [...prev, ...files]);
  };

  const handleRemovePdfFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcessFiles = async () => {
    if (pdfFiles.length === 0) {
      toast({
        title: "No PDFs Selected",
        description: "Please select at least one PDF file to process.",
        variant: "destructive",
      });
      return;
    }

    if (!jsCode.trim()) {
      toast({
        title: "No JavaScript Code",
        description: "Please enter JavaScript code to inject into the PDFs.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProcessedFiles([]);

    try {
      const processor = new PDFProcessor(jsCode);
      
      // Initialize processed files with processing status
      const initialFiles: ProcessedFile[] = pdfFiles.map(file => ({
        originalName: file.name,
        status: 'processing' as const,
      }));
      setProcessedFiles(initialFiles);

      const results = await processor.processMultiplePDFs(pdfFiles, setProgress);
      
      // Update processed files with results
      const finalFiles: ProcessedFile[] = results.map((result, index) => ({
        originalName: pdfFiles[index].name,
        status: result.success ? 'success' : 'error',
        error: result.error,
        downloadUrl: result.blob ? URL.createObjectURL(result.blob) : undefined,
      }));
      
      setProcessedFiles(finalFiles);

      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;

      toast({
        title: "Processing Complete",
        description: `${successCount} files processed successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}.`,
        variant: successCount > 0 ? "default" : "destructive",
      });

    } catch (error) {
      toast({
        title: "Processing Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    try {
      const successfulFiles = processedFiles
        .filter(f => f.status === 'success' && f.downloadUrl)
        .map((f, index) => ({
          success: true,
          fileName: `js_injected_${f.originalName}`,
          blob: null as any, // We'll need to fetch the blob from the URL
        }));

      // Convert URLs back to blobs for downloading
      const results = await Promise.all(
        successfulFiles.map(async (f, index) => {
          const processedFile = processedFiles.find(pf => pf.originalName === f.fileName.replace('js_injected_', ''));
          if (processedFile?.downloadUrl) {
            const response = await fetch(processedFile.downloadUrl);
            const blob = await response.blob();
            return { ...f, blob };
          }
          return f;
        })
      );

      await PDFProcessor.downloadMultipleFiles(results);
      
      toast({
        title: "Download Started",
        description: "Your processed PDF files are being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to download files. Please try downloading individually.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadFile = async (index: number) => {
    const file = processedFiles[index];
    if (file.downloadUrl) {
      const response = await fetch(file.downloadUrl);
      const blob = await response.blob();
      PDFProcessor.downloadFile(blob, `js_injected_${file.originalName}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-primary/20 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              PDF JS Injector
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional tool for embedding JavaScript into PDF documents. 
              Enhanced security features with batch processing capabilities.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button variant="cyber" size="lg" asChild>
                <a href="#tool" className="scroll-smooth">
                  <Code className="h-5 w-5 mr-2" />
                  Start Injecting
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="cyber-glow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Batch Processing</h3>
                  <p className="text-muted-foreground text-sm">
                    Process multiple PDFs simultaneously with progress tracking
                  </p>
                </CardContent>
              </Card>

              <Card className="cyber-glow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-accent/20 rounded-full w-fit mx-auto mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Security Aware</h3>
                  <p className="text-muted-foreground text-sm">
                    Built-in security warnings and code validation
                  </p>
                </CardContent>
              </Card>

              <Card className="cyber-glow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-warning/20 rounded-full w-fit mx-auto mb-4">
                    <Download className="h-8 w-8 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Easy Download</h3>
                  <p className="text-muted-foreground text-sm">
                    Download individual files or batch ZIP archives
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Main Tool Section */}
      <div id="tool" className="container mx-auto px-4 py-16 space-y-8">
        <SecurityWarning />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PDF Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src={pdfIcon} alt="PDF" className="h-6 w-6" />
                Select PDF Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileDropZone
                onFilesSelected={handlePdfFilesSelected}
                acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                multiple={true}
                title="Drop PDF files here"
                description="Select one or more PDF files to inject JavaScript into"
                selectedFiles={pdfFiles}
                onRemoveFile={handleRemovePdfFile}
                icon={<img src={pdfIcon} alt="PDF" className="h-8 w-8" />}
              />
            </CardContent>
          </Card>

          {/* JavaScript Editor */}
          <JavaScriptEditor value={jsCode} onChange={setJsCode} />
        </div>

        {/* Process Button */}
        <div className="text-center">
          <Button
            variant="hero"
            size="lg"
            onClick={handleProcessFiles}
            disabled={isProcessing || pdfFiles.length === 0 || !jsCode.trim()}
            className="px-12"
          >
            {isProcessing ? 'Processing...' : 'Inject JavaScript into PDFs'}
          </Button>
        </div>

        {/* Processing Status */}
        {(processedFiles.length > 0 || isProcessing) && (
          <ProcessingStatus
            files={processedFiles}
            progress={progress}
            isProcessing={isProcessing}
            onDownloadAll={handleDownloadAll}
            onDownloadFile={handleDownloadFile}
          />
        )}

        {/* Documentation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Documentation & Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Legitimate Uses</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Form validation and auto-completion</li>
                  <li>Dynamic content generation</li>
                  <li>Print customization and formatting</li>
                  <li>Accessibility enhancements</li>
                  <li>Automated workflows and calculations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Common Functions</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li><code>app.alert()</code> - Display messages</li>
                  <li><code>this.print()</code> - Control printing</li>
                  <li><code>this.getField()</code> - Access form fields</li>
                  <li><code>util.printf()</code> - Format strings</li>
                  <li><code>this.saveAs()</code> - Save document</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">PDF JS Injector</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Created by <strong>Ahmi - Security Researcher</strong>
            </p>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              For authorized security research and legitimate professional use only. 
              Users are responsible for compliance with all applicable laws.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#tool">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
      
      <UpdateChecker />
    </div>
  );
};

export default Index;
