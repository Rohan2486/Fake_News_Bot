import { useState } from "react";
import { NewsInput } from "@/components/NewsInput";
import { CredibilityScore } from "@/components/CredibilityScore";
import { AnalysisMetrics } from "@/components/AnalysisMetrics";
import { SourceCredibility } from "@/components/SourceCredibility";
import { Separator } from "@/components/ui/separator";
import { Shield, Brain, Network } from "lucide-react";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Mock analysis function - in real implementation this would call GCN + BERT models
  const handleAnalyze = async (content: string, source: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results based on content keywords for demonstration
    const isSuspicious = content.toLowerCase().includes("shocking") || 
                        content.toLowerCase().includes("unbelievable") ||
                        content.toLowerCase().includes("doctors hate this");
    
    const mockResults = {
      overallScore: isSuspicious ? 25 : 85,
      overallCategory: isSuspicious ? "suspicious" : "trusted",
      contentScore: isSuspicious ? 30 : 88,
      sourceInfo: source ? {
        domain: new URL(source).hostname,
        reputation: isSuspicious ? "low" : "high",
        biasRating: isSuspicious ? "Mixed Factual Reporting" : "High Factual Reporting",
        factualReporting: isSuspicious ? "Mostly Factual" : "Very High",
        mediaType: "News Website"
      } : null,
      metrics: [
        {
          label: "Content Consistency",
          value: isSuspicious ? 35 : 92,
          description: "Coherence and factual alignment analysis"
        },
        {
          label: "Language Patterns",
          value: isSuspicious ? 28 : 85,
          description: "Emotional manipulation and bias detection"
        },
        {
          label: "Source Cross-reference",
          value: isSuspicious ? 15 : 78,
          description: "Verification against trusted sources"
        },
        {
          label: "Graph Network Analysis",
          value: isSuspicious ? 22 : 89,
          description: "GCN-based relationship modeling"
        }
      ]
    };
    
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-trusted" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-trusted to-foreground bg-clip-text text-transparent">
              Fake News Detection
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered fact-checking using Graph Convolutional Networks and BERT for comprehensive credibility analysis
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>BERT Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>GCN Networks</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Source Credibility</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <NewsInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          
          {/* Results Section */}
          {results && (
            <>
              <Separator className="my-8" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Credibility Score */}
                <CredibilityScore
                  score={results.overallScore}
                  category={results.overallCategory}
                  title="Overall Credibility"
                  description="Combined analysis of content and source credibility using advanced AI models"
                />
                
                {/* Content Analysis Score */}
                <CredibilityScore
                  score={results.contentScore}
                  category={results.overallCategory}
                  title="Content Analysis"
                  description="BERT-based semantic analysis and fact-checking against verified sources"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Analysis Metrics */}
                <AnalysisMetrics metrics={results.metrics} />
                
                {/* Source Credibility */}
                <SourceCredibility sourceInfo={results.sourceInfo} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
