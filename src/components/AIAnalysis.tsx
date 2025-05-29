
import { useState } from 'react';
import { Bot, Brain, TrendingUp, AlertTriangle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const AIAnalysis = () => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const insights = [
    {
      type: 'bullish',
      confidence: 'High',
      title: 'Technology Sector Momentum',
      description: 'Strong quarterly earnings and AI adoption driving tech stocks higher. Expected 15-20% growth in next quarter.',
      impact: 'Positive'
    },
    {
      type: 'bearish',
      confidence: 'Medium',
      title: 'Interest Rate Concerns',
      description: 'Federal Reserve signals potential rate hikes could impact growth stocks. Monitor bond yields closely.',
      impact: 'Negative'
    },
    {
      type: 'neutral',
      confidence: 'High',
      title: 'Market Volatility Analysis',
      description: 'Current VIX levels suggest normal market conditions. Options activity indicates balanced sentiment.',
      impact: 'Neutral'
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Bot className="h-6 w-6 text-financial-cyan animate-pulse-glow" />
        <h2 className="text-2xl font-bold">AI Financial Analysis</h2>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-financial-cyan" />
            <span>Ask the AI Analyst</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask me anything about market conditions, stock analysis, portfolio optimization..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px] bg-background/50"
          />
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !query.trim()}
            className="w-full bg-financial-cyan hover:bg-financial-cyan/80"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  {insight.type === 'bullish' && <TrendingUp className="h-4 w-4 text-financial-green" />}
                  {insight.type === 'bearish' && <AlertTriangle className="h-4 w-4 text-financial-red" />}
                  {insight.type === 'neutral' && <Bot className="h-4 w-4 text-financial-cyan" />}
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className={`
                  ${insight.impact === 'Positive' ? 'bg-financial-green/20 text-financial-green border-financial-green/30' : ''}
                  ${insight.impact === 'Negative' ? 'bg-financial-red/20 text-financial-red border-financial-red/30' : ''}
                  ${insight.impact === 'Neutral' ? 'bg-financial-cyan/20 text-financial-cyan border-financial-cyan/30' : ''}
                `}>
                  {insight.impact}
                </Badge>
                <Badge variant="outline" className="bg-financial-gold/20 text-financial-gold border-financial-gold/30">
                  {insight.confidence} Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIAnalysis;
