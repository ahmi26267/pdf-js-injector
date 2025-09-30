import React from 'react';
import { CheckCircle2, XCircle, Loader2, FileText, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface ProcessedFile {
  originalName: string;
  status: 'processing' | 'success' | 'error';
  error?: string;
  downloadUrl?: string;
}

interface ProcessingStatusProps {
  files: ProcessedFile[];
  progress: number;
  isProcessing: boolean;
  onDownloadAll: () => void;
  onDownloadFile: (index: number) => void;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  files,
  progress,
  isProcessing,
  onDownloadAll,
  onDownloadFile,
}) => {
  const successCount = files.filter(f => f.status === 'success').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Processing Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">{files.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">{successCount}</div>
            <div className="text-sm text-muted-foreground">Success</div>
          </div>
          <div className="p-3 bg-destructive/10 rounded-lg">
            <div className="text-2xl font-bold text-destructive">{errorCount}</div>
            <div className="text-sm text-muted-foreground">Errors</div>
          </div>
        </div>

        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-card rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                {file.status === 'processing' && (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                )}
                {file.status === 'success' && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
                {file.status === 'error' && (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <div>
                  <span className="text-sm font-medium text-foreground">
                    js_injected_{file.originalName}
                  </span>
                  {file.error && (
                    <p className="text-xs text-destructive mt-1">{file.error}</p>
                  )}
                </div>
              </div>
              {file.status === 'success' && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    console.log('🖱️ Download button clicked for file:', index, file.originalName);
                    onDownloadFile(index);
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          ))}
        </div>

        {successCount > 0 && !isProcessing && (
          <Button
            variant="hero"
            size="lg"
            onClick={() => {
              console.log('🖱️ Download All button clicked');
              onDownloadAll();
            }}
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download All ({successCount} file{successCount > 1 ? 's' : ''})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};