import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface SourceInfo {
  domain: string;
  reputation: "high" | "medium" | "low" | "unknown";
  biasRating: string;
  factualReporting: string;
  mediaType: string;
}

interface SourceCredibilityProps {
  sourceInfo: SourceInfo | null;
}

export function SourceCredibility({ sourceInfo }: SourceCredibilityProps) {
  if (!sourceInfo) {
    return (
      <Card className="border-analysis-border bg-analysis-bg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Source Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No source URL provided for analysis</p>
        </CardContent>
      </Card>
    );
  }

  const getReputationIcon = () => {
    switch (sourceInfo.reputation) {
      case "high":
        return <CheckCircle className="h-5 w-5 text-trusted" />;
      case "medium":
        return <Shield className="h-5 w-5 text-neutral" />;
      case "low":
        return <AlertTriangle className="h-5 w-5 text-suspicious" />;
      default:
        return <Globe className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getReputationBadge = () => {
    switch (sourceInfo.reputation) {
      case "high":
        return <Badge className="bg-gradient-trust text-trusted-foreground">Highly Credible</Badge>;
      case "medium":
        return <Badge className="bg-neutral text-neutral-foreground">Moderately Credible</Badge>;
      case "low":
        return <Badge className="bg-gradient-suspicious text-suspicious-foreground">Low Credibility</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="border-analysis-border bg-analysis-bg">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Source Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getReputationIcon()}
            <span className="font-medium">{sourceInfo.domain}</span>
          </div>
          {getReputationBadge()}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Bias Rating</div>
            <div className="text-sm text-muted-foreground">{sourceInfo.biasRating}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Factual Reporting</div>
            <div className="text-sm text-muted-foreground">{sourceInfo.factualReporting}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Media Type</div>
            <div className="text-sm text-muted-foreground">{sourceInfo.mediaType}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}