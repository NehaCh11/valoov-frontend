
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error';
}

const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach(uploadedFile => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, status: 'success' }
              : f
          )
        );
      }, 2000);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">4. Document Upload</h1>
        <p className="text-gray-400 mt-1">Upload tax returns (PDF)</p>
      </div>

      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Upload className="h-5 w-5" />
            <span>Upload Tax Returns</span>
          </CardTitle>
          <CardDescription>
            Upload your tax return documents in PDF format
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver ? "border-valoov-teal bg-valoov-teal/5" : "border-border",
              "hover:border-valoov-teal hover:bg-valoov-teal/5 cursor-pointer"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2 text-white">
              Drag and drop your tax returns here
            </h3>
            <p className="text-muted-foreground mb-4">
              or click to browse PDF files
            </p>
            <Button variant="outline" className="border-valoov-teal text-valoov-teal hover:bg-valoov-teal hover:text-white">
              Browse PDF Files
            </Button>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Secure Storage Notice */}
          <div className="mt-6 p-4 bg-valoov-teal/10 border border-valoov-teal/30 rounded-lg">
            <h4 className="font-medium mb-2 text-valoov-teal">Secure Cloud Storage</h4>
            <p className="text-sm text-gray-300">
              Your documents are stored securely in the cloud. Future upgrade includes OCR + automatic parsing for enhanced data extraction.
            </p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-white">Uploaded Tax Returns:</h4>
              <div className="space-y-2">
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="h-5 w-5 text-valoov-teal" />
                      <div>
                        <p className="font-medium text-white">{uploadedFile.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadedFile.status === 'uploading' && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-valoov-teal"></div>
                      )}
                      {uploadedFile.status === 'success' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="hover:bg-red-500/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
