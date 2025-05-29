import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Send, Mic, Image, Bot, User, MicOff, X } from 'lucide-react';
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
  imageUrl?: string;
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
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  useEffect(() => {
    // Add initial bot message
    if (messages.length === 0) {
      addBotMessage("Hello! I'm here to help with your company valuation. I'll ask you some questions about your business. Let's start!");
      setTimeout(() => {
        addBotMessage(currentQuestion.question);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (content: string) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'bot',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string, audioUrl?: string, imageUrl?: string) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content,
      timestamp: new Date(),
      audioUrl,
      imageUrl
    };
    setMessages(prev => [...prev, message]);
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
          setCurrentAnswer(simulatedText);
          
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

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setCurrentAnswer(`[Image uploaded: ${file.name}]`);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Image Uploaded",
        description: `${file.name} has been selected successfully.`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (currentAnswer.startsWith('[Image uploaded:')) {
      setCurrentAnswer('');
    }
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return;

    // Add user message with any attachments
    addUserMessage(currentAnswer, undefined, imagePreview || undefined);

    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentAnswer
    }));

    // Clear current answer and attachments
    setCurrentAnswer('');
    clearSelectedImage();

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
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
    } else {
      setTimeout(() => {
        addBotMessage("Thank you for completing the questionnaire! I'll now analyze your responses to help with your company valuation.");
        setIsCompleted(true);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  const renderInputField = () => {
    switch (currentQuestion?.type) {
      case 'number':
        return (
          <Input
            type="number"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a number..."
            className="flex-1"
          />
        );
      case 'select':
        return (
          <div className="flex flex-wrap gap-2">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                variant={currentAnswer === option ? "default" : "outline"}
                onClick={() => setCurrentAnswer(option)}
                className="text-sm"
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case 'textarea':
        return (
          <Textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your detailed answer..."
            className="min-h-[80px]"
          />
        );
      default:
        return (
          <Input
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer..."
            className="flex-1"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex} of {questions.length} questions
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-3",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg px-4 py-2",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.imageUrl && (
                    <img 
                      src={message.imageUrl} 
                      alt="Uploaded content" 
                      className="mt-2 max-w-full h-auto rounded border"
                    />
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {!isCompleted && currentQuestion && (
            <div className="border-t p-4 space-y-3">
              <div className="text-sm font-medium text-muted-foreground">
                {currentQuestion.category}
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-[200px] h-auto rounded border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={clearSelectedImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {currentQuestion.type === 'select' ? (
                <div className="space-y-3">
                  {renderInputField()}
                  {currentAnswer && (
                    <div className="flex justify-end">
                      <Button onClick={handleSubmitAnswer} size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  {renderInputField()}
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!currentAnswer.trim()}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex justify-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleVoiceNote}
                  className={cn(isRecording && "bg-red-100 text-red-600")}
                >
                  {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isRecording ? "Stop Recording" : "Voice Note"}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleImageUpload}>
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="border-t p-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Questionnaire completed! Your responses have been saved.
              </p>
              <Button>
                Continue to Revenue Projections
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotQuestionnaire;
