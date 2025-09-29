// Main exports
export { EnhancedPDFProcessor as PDFProcessor, type ProcessingResult, type ProcessingOptions } from './pdfProcessor';
export { PDFJavaScriptInjectionMethods, type InjectionMethod } from './injectionMethods';
export { JavaScriptValidator, type ValidationResult, ENHANCED_EXAMPLE_CODES } from './validationUtils';

// Backward compatibility exports
export * from './pdfProcessor';