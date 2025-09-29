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
          Security Notice & Authorization Warning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertTitle className="text-destructive text-lg">⚠️ AUTHORIZED USE ONLY</AlertTitle>
          <AlertDescription className="text-destructive-foreground">
            <strong>This tool must only be used for authorized purposes.</strong> Use this tool only on systems, documents, and environments where you have explicit permission. 
            Any unauthorized use is strictly prohibited. 
            <br /><br />
            <strong>DISCLAIMER:</strong> The author (Ahmi - Security Researcher) and contributors are NOT responsible for any misuse, damage, or illegal activities performed with this tool. 
            Users bear full responsibility for ensuring their use complies with all applicable laws and regulations.
          </AlertDescription>
        </Alert>

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

          <div className="p-3 bg-destructive/20 rounded-lg border border-destructive/30">
            <p className="text-destructive font-bold mb-2">
              🚨 LEGAL WARNING
            </p>
            <p className="text-destructive-foreground text-sm">
              By using this tool, you acknowledge that you have proper authorization and accept full responsibility for your actions. 
              Unauthorized access to computer systems is illegal under laws including the Computer Fraud and Abuse Act (CFAA) and similar international legislation.
            </p>
          </div>

          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-primary font-medium">
              ⚠️ Only use this tool with JavaScript code you trust and understand. 
              Never distribute generated PDFs without proper disclosure.
            </p>
          </div>
          
          <div className="text-center text-xs text-muted-foreground pt-2 border-t">
            <p>Created by <strong>Ahmi - Security Researcher</strong></p>
            <p>For educational and authorized security research purposes only</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};