import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CredibilityScoreProps {
  score: number;
  category: "trusted" | "neutral" | "suspicious";
  title: string;
  description: string;
}

export function CredibilityScore({ score, category, title, description }: CredibilityScoreProps) {
  const getVariant = () => {
    switch (category) {
      case "trusted":
        return "bg-gradient-trust text-trusted-foreground";
      case "suspicious":
        return "bg-gradient-suspicious text-suspicious-foreground";
      default:
        return "bg-neutral text-neutral-foreground";
    }
  };

  const getProgressColor = () => {
    switch (category) {
      case "trusted":
        return "bg-trusted";
      case "suspicious":
        return "bg-suspicious";
      default:
        return "bg-neutral";
    }
  };

  return (
    <Card className="border-analysis-border bg-analysis-bg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={`${getVariant()} font-bold px-3 py-1`}>
            {score}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Progress 
          value={score} 
          className="h-2 mb-3"
          // @ts-ignore - Custom CSS variable for progress color
          style={{ "--progress-background": `hsl(var(--${category === "trusted" ? "trusted" : category === "suspicious" ? "suspicious" : "neutral"}))` } as React.CSSProperties}
        />
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}