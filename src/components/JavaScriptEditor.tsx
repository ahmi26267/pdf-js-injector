import React, { useState } from 'react';
import { Code, AlertCircle, CheckCircle, Copy, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PDFProcessor, ENHANCED_EXAMPLE_CODES } from '@/utils/pdf';
import { useToast } from '@/hooks/use-toast';

interface JavaScriptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const JavaScriptEditor: React.FC<JavaScriptEditorProps> = ({
  value,
  onChange,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const validation = PDFProcessor.validateJavaScript(value);

  const handleExampleSelect = (exampleKey: string) => {
    if (exampleKey in ENHANCED_EXAMPLE_CODES) {
      const example = ENHANCED_EXAMPLE_CODES[exampleKey as keyof typeof ENHANCED_EXAMPLE_CODES];
      onChange(example.code);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: "JavaScript code copied to clipboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          JavaScript Code Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select onValueChange={handleExampleSelect}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Load example code..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple_alert">Simple Alert</SelectItem>
              <SelectItem value="form_validation">Form Validation</SelectItem>
              <SelectItem value="auto_print">Auto Print</SelectItem>
              <SelectItem value="date_timestamp">Date Timestamp</SelectItem>
              <SelectItem value="security_warning">Security Warning</SelectItem>
              <SelectItem value="advanced_form_logic">Advanced Form Logic</SelectItem>
              <SelectItem value="data_extraction">Data Extraction</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!value}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your JavaScript code here..."
            className="w-full h-64 p-4 text-sm font-mono bg-muted border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
            {value.length} characters
          </div>
        </div>

        {showPreview && value && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Preview:</h4>
            <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
              {value}
            </pre>
          </div>
        )}

        {/* Validation Results */}
        {value && (
          <div className="space-y-2">
            {validation.valid ? (
              <Alert className="border-primary/50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  JavaScript code is syntactically valid and ready for injection.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-destructive/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  JavaScript code validation failed. Please check your syntax.
                </AlertDescription>
              </Alert>
            )}

            {validation.warnings.length > 0 && (
              <Alert className="border-warning/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <strong>Security Warnings:</strong>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {validation.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-card p-3 rounded-lg border">
          <strong>Tip:</strong> JavaScript in PDFs runs in the Acrobat/Reader environment. 
          Use <code>app.alert()</code> for user messages, <code>this.print()</code> for printing, 
          and <code>this.getField()</code> for form interactions.
        </div>
      </CardContent>
    </Card>
  );
};