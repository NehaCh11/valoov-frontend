
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  Calendar, 
  MessageSquare, 
  User, 
  Bot,
  Clock
} from 'lucide-react';

interface GeneratedReport {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  size: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messagesCount: number;
  messages: ChatMessage[];
}

export function History() {
  const [activeTab, setActiveTab] = useState('reports');

  // Mock data for generated reports
  const generatedReports: GeneratedReport[] = [
    {
      id: '1',
      title: 'TechCorp Solutions - Full Valuation Report',
      type: 'Full Report',
      createdAt: '2024-01-15',
      status: 'completed',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'TechCorp Solutions - Scorecard Method',
      type: 'Method Analysis',
      createdAt: '2024-01-14',
      status: 'completed',
      size: '1.1 MB'
    },
    {
      id: '3',
      title: 'TechCorp Solutions - DCF Analysis',
      type: 'DCF Report',
      createdAt: '2024-01-12',
      status: 'processing',
      size: 'Pending'
    }
  ];

  // Mock data for chat sessions
  const chatSessions: ChatSession[] = [
    {
      id: '1',
      title: 'Initial Company Assessment',
      createdAt: '2024-01-15',
      messagesCount: 12,
      messages: [
        {
          id: '1',
          sender: 'ai',
          message: 'Hello! I\'m here to help you with your company valuation. Let\'s start by understanding your business better. What industry does your company operate in?',
          timestamp: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          sender: 'user',
          message: 'We\'re a fintech startup focused on payment solutions for small businesses.',
          timestamp: '2024-01-15T10:01:00Z'
        },
        {
          id: '3',
          sender: 'ai',
          message: 'Great! Fintech is a dynamic sector. Can you tell me about your current annual revenue and when your company was founded?',
          timestamp: '2024-01-15T10:02:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'Financial Projections Discussion',
      createdAt: '2024-01-14',
      messagesCount: 8,
      messages: [
        {
          id: '1',
          sender: 'ai',
          message: 'Let\'s discuss your financial projections for the next 3-5 years. What growth rate do you expect?',
          timestamp: '2024-01-14T14:30:00Z'
        },
        {
          id: '2',
          sender: 'user',
          message: 'We\'re projecting 25% year-over-year growth for the next 3 years.',
          timestamp: '2024-01-14T14:32:00Z'
        }
      ]
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'processing':
        return 'bg-yellow-600';
      case 'failed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">History</h1>
        <p className="text-gray-600 mt-1">View your generated reports and chat sessions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="chat">Chat History</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-valoov-teal" />
                <span>Generated Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-card/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-valoov-teal" />
                      <div>
                        <h3 className="font-semibold text-black">{report.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">{report.type}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className="text-sm text-gray-600">{formatDate(report.createdAt)}</span>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-sm text-gray-600">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={`${getStatusColor(report.status)} text-white text-xs`}
                      >
                        {report.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={report.status !== 'completed'}
                        className="flex items-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
                {generatedReports.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No reports generated yet</p>
                    <p className="text-sm text-gray-500 mt-1">Complete a valuation to generate your first report</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-valoov-orange" />
                <span>Chat History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chatSessions.map((session) => (
                  <Card key={session.id} className="bg-card/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span className="text-sm text-gray-600">{formatDate(session.createdAt)}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-sm text-gray-600">{session.messagesCount} messages</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Full Chat
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {session.messages.slice(0, 3).map((message) => (
                          <div key={message.id} className={`flex items-start space-x-3 ${
                            message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === 'user' 
                                ? 'bg-valoov-teal text-white' 
                                : 'bg-valoov-orange text-white'
                            }`}>
                              {message.sender === 'user' ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </div>
                            <div className={`flex-1 ${
                              message.sender === 'user' ? 'text-right' : ''
                            }`}>
                              <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                                message.sender === 'user'
                                  ? 'bg-valoov-teal text-white'
                                  : 'bg-gray-100 text-black'
                              }`}>
                                <p className="text-sm">{message.message}</p>
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                <Clock className="h-3 w-3 text-gray-500" />
                                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {session.messages.length > 3 && (
                          <div className="text-center">
                            <Button size="sm" variant="ghost" className="text-valoov-teal">
                              View {session.messages.length - 3} more messages
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {chatSessions.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No chat history yet</p>
                    <p className="text-sm text-gray-500 mt-1">Start a conversation with the AI to see your chat history</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
