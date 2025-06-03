import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, Paperclip, Bot, User, MicOff, X, Upload, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  category: string;
  question: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: string[];
  required: boolean;
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  pdfUrl?: string;
  pdfName?: string;
}

interface UploadedTaxReturn {
  id: string;
  file: File;
  uploadedAt: Date;
}

const questions: Question[] = [
  // Team & Founders
  { id: 'founders_total', category: 'Team & Founders', question: 'What is the total number of founders?', type: 'number', required: true },
  { id: 'founders_fulltime', category: 'Team & Founders', question: 'How many founders work full-time on the project?', type: 'number', required: true },
  { id: 'previous_experience', category: 'Team & Founders', question: 'Do the founders have previous startup or entrepreneurial experience?', type: 'select', options: ['Yes', 'No', 'Some'], required: true },
  { id: 'technical_founder', category: 'Team & Founders', question: 'Is there a technical founder on the team?', type: 'select', options: ['Yes', 'No'], required: true },
  { id: 'team_duration', category: 'Team & Founders', question: 'How long has the founding team been working together?', type: 'select', options: ['Less than 6 months', '6-12 months', '1-2 years', '2+ years'], required: true },
  
  // Business Model & Strategy
  { id: 'revenue_source', category: 'Business Model & Strategy', question: 'What is your main source of revenue?', type: 'textarea', required: true },
  { id: 'customer_acquisition', category: 'Business Model & Strategy', question: 'How do you acquire customers?', type: 'textarea', required: true },
  { id: 'cac', category: 'Business Model & Strategy', question: 'What is your average customer acquisition cost (CAC)?', type: 'number', required: false },
  { id: 'ltv', category: 'Business Model & Strategy', question: 'What is your customer lifetime value (LTV)?', type: 'number', required: false },
  { id: 'business_model', category: 'Business Model & Strategy', question: 'Do you operate in a B2B, B2C, or B2B2C model?', type: 'select', options: ['B2B', 'B2C', 'B2B2C', 'Mixed'], required: true },
  
  // Product or Service
  { id: 'product_stage', category: 'Product or Service', question: 'What is the current stage of your product?', type: 'select', options: ['Idea', 'MVP', 'Launched', 'Generating Revenue'], required: true },
  { id: 'user_count', category: 'Product or Service', question: 'Do you have users or customers? If yes, how many?', type: 'text', required: true },
  { id: 'problem_solved', category: 'Product or Service', question: 'What problem does your product solve?', type: 'textarea', required: true },
  
  // Market & Industry
  { id: 'market_size', category: 'Market & Industry', question: 'What is the estimated size of your target market?', type: 'text', required: true },
  { id: 'competitors', category: 'Market & Industry', question: 'Who are your main competitors?', type: 'textarea', required: true },
  
  // Legal, IP & Risk
  { id: 'ip_registered', category: 'Legal, IP & Risk', question: 'Have you registered any intellectual property (IP), trademarks, or patents?', type: 'select', options: ['Yes', 'No', 'In Progress'], required: true },
  { id: 'top_risks', category: 'Legal, IP & Risk', question: 'What are the top 3 risks facing your business today?', type: 'textarea', required: true }
];

const ChatbotQuestionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [taxReturnsUploaded, setTaxReturnsUploaded] = useState<UploadedTaxReturn[]>([]);
  const [questionnaireStarted, setQuestionnaireStarted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const taxReturnInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Add initial bot message for tax return upload
    if (messages.length === 0) {
      addBotMessage("Hello! I'm here to help with your company valuation. Before we begin, please upload your tax return files in PDF format (covering the past 3 years). This information is essential for an accurate valuation assessment.");
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentMessage]);

  const addBotMessage = (content: string) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'bot',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string, audioUrl?: string, pdfUrl?: string, pdfName?: string) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content,
      timestamp: new Date(),
      audioUrl,
      pdfUrl,
      pdfName
    };
    setMessages(prev => [...prev, message]);
  };

  const handleTaxReturnUpload = () => {
    taxReturnInputRef.current?.click();
  };

  const handleTaxReturnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        const newTaxReturn: UploadedTaxReturn = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          uploadedAt: new Date()
        };
        
        setTaxReturnsUploaded(prev => [...prev, newTaxReturn]);
        
        // Add user message showing the upload
        addUserMessage(`📄 Tax return uploaded: ${file.name}`);
        
        // Start questionnaire immediately after first upload
        if (!questionnaireStarted) {
          setTimeout(() => {
            addBotMessage("Thank you for uploading your tax return! Now let's begin with the business questions to help with your valuation analysis.");
            setTimeout(() => {
              addBotMessage(currentQuestion.question);
              setQuestionnaireStarted(true);
            }, 1000);
          }, 1000);
        }
        
        toast({
          title: "Tax Return Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        // Show error message for non-PDF files
        addBotMessage("Only PDF format is supported. Please upload a valid tax return file in PDF format.");
        
        toast({
          title: "Invalid File Format",
          description: "Only PDF format is supported. Please upload a valid tax return file in PDF format.",
          variant: "destructive",
        });
      }
    }
    
    // Clear the input so the same file can be selected again if needed
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      const newTaxReturn: UploadedTaxReturn = {
        id: Math.random().toString(36).substr(2, 9),
        file: pdfFile,
        uploadedAt: new Date()
      };
      
      setTaxReturnsUploaded(prev => [...prev, newTaxReturn]);
      addUserMessage(`📄 Tax return uploaded: ${pdfFile.name}`);
      
      // Start questionnaire immediately after first upload
      if (!questionnaireStarted) {
        setTimeout(() => {
          addBotMessage("Thank you for uploading your tax return! Now let's begin with the business questions to help with your valuation analysis.");
          setTimeout(() => {
            addBotMessage(currentQuestion.question);
            setQuestionnaireStarted(true);
          }, 1000);
        }, 1000);
      }
      
      toast({
        title: "Tax Return Uploaded",
        description: `${pdfFile.name} has been uploaded successfully.`,
      });
    } else {
      addBotMessage("Only PDF format is supported. Please upload a valid tax return file in PDF format.");
      
      toast({
        title: "Invalid File Format",
        description: "Only PDF format is supported. Please upload a valid tax return file in PDF format.",
        variant: "destructive",
      });
    }
  };

  const removeTaxReturn = (id: string) => {
    setTaxReturnsUploaded(prev => prev.filter(tr => tr.id !== id));
  };

  const handleVoiceNote = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          
          // For demo purposes, we'll simulate speech-to-text
          const simulatedText = "Voice note recorded (speech-to-text would convert this to actual text)";
          setCurrentMessage(simulatedText);
          
          toast({
            title: "Voice Note Recorded",
            description: "Your voice note has been processed successfully.",
          });
        };

        mediaRecorder.start();
        setIsRecording(true);
        toast({
          title: "Recording Started",
          description: "Speak now. Click the microphone again to stop recording.",
        });
      } catch (error) {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to record voice notes.",
          variant: "destructive",
        });
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      }
    }
  };

  const handlePdfUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
      const pdfUrl = URL.createObjectURL(file);
      setCurrentMessage(`[PDF uploaded: ${file.name}]`);
      
      toast({
        title: "PDF Uploaded",
        description: `${file.name} has been selected successfully.`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid PDF file.",
        variant: "destructive",
      });
    }
  };

  const clearSelectedPdf = () => {
    setSelectedPdf(null);
    if (currentMessage.startsWith('[PDF uploaded:')) {
      setCurrentMessage('');
    }
  };

  const handleSubmitMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message with any attachments
    const pdfUrl = selectedPdf ? URL.createObjectURL(selectedPdf) : undefined;
    const pdfName = selectedPdf?.name;
    
    addUserMessage(currentMessage, undefined, pdfUrl, pdfName);

    // Save answer if it's for a question
    if (isCompleted === false && currentQuestion && questionnaireStarted) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: currentMessage
      }));
    }

    // Clear current message and attachments
    setCurrentMessage('');
    setSelectedPdf(null);

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1 && !isCompleted && questionnaireStarted) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        const nextQuestion = questions[currentQuestionIndex + 1];
        
        // Add category change message if needed
        if (nextQuestion.category !== currentQuestion.category) {
          addBotMessage(`Great! Now let's talk about ${nextQuestion.category}.`);
          setTimeout(() => {
            addBotMessage(nextQuestion.question);
          }, 1000);
        } else {
          addBotMessage(nextQuestion.question);
        }
      }, 1000);
    } else if (!isCompleted && questionnaireStarted) {
      setTimeout(() => {
        addBotMessage("Thank you for completing the questionnaire! I'll now analyze your responses to help with your company valuation.");
        setIsCompleted(true);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-semibold text-black">AI Valuation Assistant</h1>
        <p className="text-gray-600">Let me help you with your company valuation</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-3 max-w-4xl",
              message.type === 'user' ? "ml-auto justify-end" : "justify-start"
            )}
          >
            {message.type === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
            )}
            
            <div
              className={cn(
                "rounded-2xl px-4 py-3 max-w-[70%]",
                message.type === 'user'
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              
              {message.pdfUrl && message.pdfName && (
                <div className="mt-2 p-2 bg-gray-100 rounded-lg border">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Paperclip className="h-4 w-4" />
                    <span>{message.pdfName}</span>
                  </div>
                </div>
              )}
              
              <div className={cn(
                "text-xs mt-2 opacity-70",
                message.type === 'user' ? "text-blue-100" : "text-gray-500"
              )}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Upload Button - Only show if no files uploaded yet AND questionnaire hasn't started */}
        {!questionnaireStarted && taxReturnsUploaded.length === 0 && (
          <div className="flex justify-start max-w-4xl">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-3">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
            <div className="bg-white border border-gray-200 text-gray-900 rounded-2xl px-4 py-3">
              <p className="text-sm mb-3">Click the button below to upload your tax return PDF:</p>
              <Button 
                onClick={handleTaxReturnUpload}
                className="bg-blue-600 hover:bg-blue-700 text-sm"
                size="sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Tax Return PDF
              </Button>
            </div>
          </div>
        )}

        {/* Show uploaded files in a compact way */}
        {taxReturnsUploaded.length > 0 && (
          <div className="flex justify-start max-w-4xl">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-3">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
            <div className="bg-white border border-gray-200 text-gray-900 rounded-2xl px-4 py-3">
              <p className="text-sm font-medium mb-2">📄 Uploaded Tax Returns:</p>
              <div className="space-y-2">
                {taxReturnsUploaded.map((taxReturn) => (
                  <div
                    key={taxReturn.id}
                    className="flex items-center justify-between text-sm bg-gray-50 rounded px-2 py-1"
                  >
                    <span className="text-green-600">✓ {taxReturn.file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTaxReturn(taxReturn.id)}
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {questionnaireStarted && (
                <div className="mt-3">
                  <Button
                    variant="outline"
                    onClick={handleTaxReturnUpload}
                    size="sm"
                    className="text-xs"
                  >
                    Add More Tax Returns
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Always show */}
      <div className="border-t bg-white px-6 py-4">
        {/* PDF Preview */}
        {selectedPdf && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Paperclip className="h-4 w-4" />
              <span>{selectedPdf.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelectedPdf}
              className="h-6 w-6 p-0 hover:bg-red-100"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        <div className="flex items-end space-x-3">
          {/* Voice Input Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceNote}
            className={cn(
              "flex-shrink-0 h-10 w-10 p-0 rounded-full",
              isRecording ? "bg-red-100 text-red-600 hover:bg-red-200" : "hover:bg-gray-100"
            )}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          {/* PDF Upload Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePdfUpload}
            className="flex-shrink-0 h-10 w-10 p-0 rounded-full hover:bg-gray-100"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="min-h-[40px] max-h-[120px] resize-none border-gray-300 rounded-2xl pr-12 py-3"
              rows={1}
            />
            <Button
              onClick={handleSubmitMessage}
              disabled={!currentMessage.trim()}
              size="sm"
              className="absolute right-2 bottom-2 h-8 w-8 p-0 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={taxReturnInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleTaxReturnFileChange}
            className="hidden"
          />
        </div>

        {isRecording && (
          <div className="mt-2 text-center">
            <span className="text-sm text-red-600 animate-pulse">Recording... Click microphone to stop</span>
          </div>
        )}
      </div>

      {isCompleted && (
        <div className="border-t bg-blue-50 px-6 py-4 text-center">
          <p className="text-sm text-blue-800 mb-3">
            Questionnaire completed! Your responses and tax returns have been saved.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Continue to Revenue Projections
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatbotQuestionnaire;
