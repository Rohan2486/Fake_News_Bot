import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, Globe } from "lucide-react";

interface NewsInputProps {
  onAnalyze: (content: string, source: string) => void;
  isAnalyzing: boolean;
}

export function NewsInput({ onAnalyze, isAnalyzing }: NewsInputProps) {
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onAnalyze(content.trim(), source.trim());
    }
  };

  return (
    <Card className="border-analysis-border bg-gradient-hero">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Search className="h-6 w-6" />
          Fact Check Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="content" className="text-base font-medium">
            News Content or Headline
          </Label>
          <Textarea
            id="content"
            placeholder="Paste the news article, headline, or claim you want to fact-check..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="source" className="text-base font-medium flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Source URL (Optional)
          </Label>
          <Input
            id="source"
            type="url"
            placeholder="https://example.com/news-article"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Providing the source URL helps assess publisher credibility
          </p>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim() || isAnalyzing}
          className="w-full bg-gradient-trust hover:opacity-90 text-trusted-foreground font-semibold py-3"
          size="lg"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Credibility"}
        </Button>
      </CardContent>
    </Card>
  );
}