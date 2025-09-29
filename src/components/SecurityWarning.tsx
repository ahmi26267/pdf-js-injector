import React from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SecurityWarning: React.FC = () => {
  return (
    <Card className="border-warning/50 bg-warning/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-warning">
          <Shield className="h-5 w-5" />
          Security Notice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-warning/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Potentially Dangerous Tool</AlertTitle>
          <AlertDescription>
            This tool embeds JavaScript code into PDF files that will execute when the PDF is opened. 
            This can be used for legitimate purposes but also has security implications.
          </AlertDescription>
        </Alert>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Legitimate Uses:</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>Form validation and interactivity</li>
                <li>Dynamic content generation</li>
                <li>Print customization</li>
                <li>Accessibility enhancements</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Security Risks:</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>Malicious JavaScript can access system resources</li>
                <li>Data exfiltration possibilities</li>
                <li>Potential for social engineering attacks</li>
                <li>Execution in trusted PDF viewers</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-primary font-medium">
              ⚠️ Only use this tool with JavaScript code you trust and understand. 
              Never distribute generated PDFs without proper disclosure.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};