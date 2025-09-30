import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes: { [key: string]: string[] };
  multiple?: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesSelected,
  acceptedFileTypes,
  multiple = false,
  title,
  description,
  icon,
  selectedFiles,
  onRemoveFile,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
    setIsDragActive(false);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
          "hover:border-primary hover:bg-primary/5",
          isDragActive && "border-primary bg-primary/10 scale-105",
          isDragReject && "border-destructive bg-destructive/10",
          "cyber-glow"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-primary/10">
            {icon || <Upload className="h-8 w-8 text-primary" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <Button variant="default" size="sm">
            Choose Files
          </Button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Selected Files:</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-card rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <File className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};