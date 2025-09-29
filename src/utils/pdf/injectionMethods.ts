import { PDFDocument, PDFName, PDFString, PDFDict } from 'pdf-lib';

export interface InjectionMethod {
  name: string;
  description: string;
  inject: (pdfDoc: PDFDocument, jsCode: string) => Promise<void>;
}

export class PDFJavaScriptInjectionMethods {
  
  // Method 1: Standard pdf-lib addJavaScript
  static standardInjection: InjectionMethod = {
    name: 'Standard Injection',
    description: 'Uses pdf-lib addJavaScript method',
    inject: async (pdfDoc: PDFDocument, jsCode: string) => {
      pdfDoc.addJavaScript('EmbeddedScript', jsCode);
    }
  };

  // Method 2: OpenAction with JavaScript Action
  static openActionInjection: InjectionMethod = {
    name: 'OpenAction Injection',
    description: 'Executes JavaScript when document opens',
    inject: async (pdfDoc: PDFDocument, jsCode: string) => {
      const context = pdfDoc.context;
      const catalog = pdfDoc.catalog;
      
      const jsAction = context.obj({
        Type: PDFName.of('Action'),
        S: PDFName.of('JavaScript'),
        JS: PDFString.of(jsCode)
      });
      
      catalog.set(PDFName.of('OpenAction'), jsAction);
    }
  };

  // Method 3: Additional Actions (AA) Dictionary
  static additionalActionsInjection: InjectionMethod = {
    name: 'Additional Actions',
    description: 'Uses AA dictionary for document-level actions',
    inject: async (pdfDoc: PDFDocument, jsCode: string) => {
      const context = pdfDoc.context;
      const catalog = pdfDoc.catalog;
      
      const jsAction = context.obj({
        Type: PDFName.of('Action'),
        S: PDFName.of('JavaScript'),
        JS: PDFString.of(jsCode)
      });
      
      const additionalActions = context.obj({
        O: jsAction,  // O = Open action
        DC: jsAction, // DC = Document Close
        WS: jsAction, // WS = Will Save
        DS: jsAction, // DS = Did Save
        WP: jsAction, // WP = Will Print
        DP: jsAction  // DP = Did Print
      });
      
      catalog.set(PDFName.of('AA'), additionalActions);
    }
  };

  // Method 4: Names Dictionary JavaScript
  static namesDictionaryInjection: InjectionMethod = {
    name: 'Names Dictionary',
    description: 'Embeds in Names dictionary for named actions',
    inject: async (pdfDoc: PDFDocument, jsCode: string) => {
      const context = pdfDoc.context;
      const catalog = pdfDoc.catalog;
      
      const jsAction = context.obj({
        Type: PDFName.of('Action'),
        S: PDFName.of('JavaScript'),
        JS: PDFString.of(jsCode)
      });
      
      // Get or create Names dictionary
      let namesDict = catalog.get(PDFName.of('Names'));
      if (!(namesDict instanceof PDFDict)) {
        namesDict = context.obj({});
        catalog.set(PDFName.of('Names'), namesDict);
      }
      
      // Create JavaScript names tree
      const jsNamesArray = context.obj([
        PDFString.of('EmbeddedScript'),
        jsAction,
        PDFString.of('AutoExecute'),
        jsAction
      ]);
      
      const jsNamesDict = context.obj({
        Names: jsNamesArray
      });
      
      (namesDict as PDFDict).set(PDFName.of('JavaScript'), jsNamesDict);
    }
  };

  // Method 5: Page-level JavaScript injection
  static pageActionInjection: InjectionMethod = {
    name: 'Page Actions',
    description: 'Injects JavaScript at page level',
    inject: async (pdfDoc: PDFDocument, jsCode: string) => {
      const context = pdfDoc.context;
      const pages = pdfDoc.getPages();
      
      if (pages.length === 0) return;
      
      const jsAction = context.obj({
        Type: PDFName.of('Action'),
        S: PDFName.of('JavaScript'),
        JS: PDFString.of(jsCode)
      });
      
      // Add to first page
      const firstPageRef = pages[0].ref;
      const firstPageDict = context.lookup(firstPageRef);
      
      if (firstPageDict instanceof PDFDict) {
        const pageAA = context.obj({
          O: jsAction,  // Page Open
          C: jsAction   // Page Close
        });
        
        firstPageDict.set(PDFName.of('AA'), pageAA);
      }
    }
  };

  // Method 6: Form-level JavaScript (if forms exist)
  static formActionInjection: InjectionMethod = {
    name: 'Form Actions',
    description: 'Embeds JavaScript in form fields if present',
    inject: async (pdfDoc: PDFDocument, jsCode: string) => {
      const context = pdfDoc.context;
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      if (fields.length === 0) return;
      
      const jsAction = context.obj({
        Type: PDFName.of('Action'),
        S: PDFName.of('JavaScript'),
        JS: PDFString.of(jsCode)
      });
      
      // Add to first field if available
      try {
        const firstField = fields[0];
        const fieldRef = (firstField as any).ref;
        if (fieldRef) {
          const fieldDict = context.lookup(fieldRef);
          if (fieldDict instanceof PDFDict) {
            const fieldAA = context.obj({
              F: jsAction,   // Format
              K: jsAction,   // Keystroke
              V: jsAction,   // Validate
              C: jsAction    // Calculate
            });
            
            fieldDict.set(PDFName.of('AA'), fieldAA);
          }
        }
      } catch (error) {
        // Silently fail if form injection doesn't work
        console.warn('Form injection failed:', error);
      }
    }
  };

  // Get all injection methods
  static getAllMethods(): InjectionMethod[] {
    return [
      this.standardInjection,
      this.openActionInjection,
      this.additionalActionsInjection,
      this.namesDictionaryInjection,
      this.pageActionInjection,
      this.formActionInjection
    ];
  }

  // Apply all methods for maximum compatibility
  static async applyAllMethods(pdfDoc: PDFDocument, jsCode: string): Promise<void> {
    const methods = this.getAllMethods();
    
    for (const method of methods) {
      try {
        await method.inject(pdfDoc, jsCode);
        console.log(`✓ Applied ${method.name}`);
      } catch (error) {
        console.warn(`⚠ Failed to apply ${method.name}:`, error);
      }
    }
  }
}