export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  suggestions: string[];
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
}

export class JavaScriptValidator {
  
  static validateJavaScript(code: string): ValidationResult {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let securityLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    // Basic validation
    if (!code.trim()) {
      return { 
        valid: false, 
        warnings: ['JavaScript code cannot be empty'], 
        suggestions: ['Add some JavaScript code to inject'],
        securityLevel: 'low'
      };
    }

    // Check for potentially dangerous functions
    const criticalFunctions = [
      'eval(',
      'Function(',
      'setTimeout(',
      'setInterval(',
      'importScripts(',
    ];

    const highRiskFunctions = [
      'document.write(',
      'innerHTML',
      'outerHTML',
      'insertAdjacentHTML',
      'execCommand'
    ];

    const mediumRiskFunctions = [
      'fetch(',
      'XMLHttpRequest',
      'ajax',
      'WebSocket',
      'EventSource'
    ];

    // Check critical functions first
    for (const func of criticalFunctions) {
      if (code.includes(func)) {
        warnings.push(`CRITICAL: Dangerous function detected: ${func}`);
        securityLevel = 'critical';
        suggestions.push(`Consider avoiding ${func} as it can execute arbitrary code`);
      }
    }

    // Check high risk functions if not already critical
    if (securityLevel !== 'critical') {
      for (const func of highRiskFunctions) {
        if (code.includes(func)) {
          warnings.push(`HIGH RISK: DOM manipulation detected: ${func}`);
          securityLevel = 'high';
          suggestions.push(`${func} can be dangerous in certain contexts`);
        }
      }
    }

    // Check medium risk functions if still low risk
    if (securityLevel === 'low') {
      for (const func of mediumRiskFunctions) {
        if (code.includes(func)) {
          warnings.push(`MEDIUM RISK: Network activity detected: ${func}`);
          securityLevel = 'medium';
          suggestions.push(`${func} will make network requests`);
        }
      }
    }

    // Check for URLs
    const urlPatterns = [
      /https?:\/\/[^\s'"]+/g,
      /ftp:\/\/[^\s'"]+/g,
      /ws:\/\/[^\s'"]+/g,
      /wss:\/\/[^\s'"]+/g
    ];

    urlPatterns.forEach((pattern, index) => {
      const matches = code.match(pattern);
      if (matches) {
        const protocol = ['HTTP/HTTPS', 'FTP', 'WebSocket', 'Secure WebSocket'][index];
        warnings.push(`Network endpoint detected: ${protocol} URLs found`);
        suggestions.push(`Found ${matches.length} ${protocol} URL(s): ${matches.slice(0, 3).join(', ')}`);
        if (securityLevel === 'low') securityLevel = 'medium';
      }
    });

    // Check for file system access patterns
    const fileSystemPatterns = [
      'fs.',
      'require(',
      'import(',
      'process.',
      'Buffer',
      '__dirname',
      '__filename',
      'global.',
      'window.location'
    ];

    fileSystemPatterns.forEach(pattern => {
      if (code.includes(pattern)) {
        warnings.push(`System access detected: ${pattern}`);
        suggestions.push(`${pattern} may not work in PDF context or could be dangerous`);
        if (securityLevel === 'low') securityLevel = 'medium';
      }
    });

    // Check for Adobe Acrobat specific functions (these are good)
    const adobeFunctions = [
      'app.alert',
      'this.print',
      'this.getField',
      'this.saveAs',
      'util.printf',
      'console.println',
      'app.response',
      'app.getNthPlugInName',
      'app.getPath'
    ];

    let hasAdobeFunctions = false;
    adobeFunctions.forEach(func => {
      if (code.includes(func)) {
        hasAdobeFunctions = true;
      }
    });

    if (hasAdobeFunctions) {
      suggestions.push('✓ Uses Adobe Acrobat JavaScript API - good for PDF compatibility');
    } else {
      suggestions.push('Consider using Adobe Acrobat JavaScript API for better PDF compatibility');
    }

    // Syntax check (basic)
    try {
      new Function(code);
      suggestions.push('✓ JavaScript syntax appears valid');
    } catch (error) {
      warnings.push(`Syntax error detected: ${error.message}`);
      suggestions.push('Fix JavaScript syntax errors before injection');
    }

    return {
      valid: true,
      warnings,
      suggestions,
      securityLevel
    };
  }

  static getSecurityLevelColor(level: 'low' | 'medium' | 'high' | 'critical'): string {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  static getSecurityLevelText(level: 'low' | 'medium' | 'high' | 'critical'): string {
    switch (level) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
      case 'critical': return 'Critical Risk';
      default: return 'Unknown';
    }
  }
}

// Enhanced example JavaScript codes with better descriptions
export const ENHANCED_EXAMPLE_CODES = {
  simple_alert: {
    code: `// Simple welcome message
app.alert({
  cMsg: "Welcome! This PDF has been enhanced with JavaScript.",
  nIcon: 3,
  cTitle: "PDF Enhanced"
});`,
    description: "Shows a welcome message when PDF opens",
    risk: "low" as const
  },

  auto_print: {
    code: `// Auto-print PDF silently
this.print({
  bUI: false,
  bSilent: true,
  bShrinkToFit: true
});`,
    description: "Automatically prints the PDF when opened",
    risk: "low" as const
  },

  form_validation: {
    code: `// Form field validation
function validateRequiredFields() {
  var nameField = this.getField("name");
  var emailField = this.getField("email");
  
  if (nameField && nameField.value === "") {
    app.alert("Name field is required!", 1);
    nameField.setFocus();
    return false;
  }
  
  if (emailField && emailField.value === "") {
    app.alert("Email field is required!", 1);
    emailField.setFocus();
    return false;
  }
  
  return true;
}

// Run validation
validateRequiredFields();`,
    description: "Validates form fields and shows warnings for empty required fields",
    risk: "low" as const
  },

  date_timestamp: {
    code: `// Add current timestamp
var now = new Date();
var timestamp = util.printd("yyyy-mm-dd HH:MM:ss", now);

var timestampField = this.getField("timestamp");
if (timestampField) {
  timestampField.value = "Document opened: " + timestamp;
}

console.println("PDF accessed at: " + timestamp);`,
    description: "Adds current date/time to a form field and logs access",
    risk: "low" as const
  },

  security_warning: {
    code: `// Confidentiality warning
app.alert({
  cMsg: "⚠️ CONFIDENTIAL DOCUMENT\\n\\n" +
        "This document contains sensitive information.\\n" +
        "Unauthorized distribution is prohibited.\\n\\n" +
        "By clicking OK, you acknowledge you are authorized to view this content.",
  nIcon: 2,
  cTitle: "Security Notice"
});

// Log access for audit trail
console.println("Confidential document accessed: " + new Date());`,
    description: "Shows security warning and logs document access",
    risk: "low" as const
  },

  advanced_form_logic: {
    code: `// Advanced form calculations
function calculateTotal() {
  var quantity = this.getField("quantity").value || 0;
  var price = this.getField("price").value || 0;
  var tax = this.getField("tax").value || 0;
  
  var subtotal = quantity * price;
  var total = subtotal + (subtotal * tax / 100);
  
  this.getField("subtotal").value = subtotal.toFixed(2);
  this.getField("total").value = total.toFixed(2);
}

// Set up field calculations
this.getField("quantity").setAction("OnBlur", "calculateTotal()");
this.getField("price").setAction("OnBlur", "calculateTotal()");
this.getField("tax").setAction("OnBlur", "calculateTotal()");

// Initial calculation
calculateTotal();`,
    description: "Sets up automatic calculations for invoice/order forms",
    risk: "low" as const
  },

  data_extraction: {
    code: `// Extract and display PDF metadata
var info = this.info;
var metadata = "PDF Information:\\n";
metadata += "Title: " + (info.Title || "Not set") + "\\n";
metadata += "Author: " + (info.Author || "Not set") + "\\n";
metadata += "Subject: " + (info.Subject || "Not set") + "\\n";
metadata += "Creator: " + (info.Creator || "Not set") + "\\n";
metadata += "Pages: " + this.numPages + "\\n";
metadata += "Created: " + (info.CreationDate || "Unknown") + "\\n";

// Show metadata in alert
app.alert({
  cMsg: metadata,
  cTitle: "Document Information"
});`,
    description: "Extracts and displays PDF metadata information",
    risk: "low" as const
  }
};