import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Metric {
  label: string;
  value: number;
  description: string;
}

interface AnalysisMetricsProps {
  metrics: Metric[];
}

export function AnalysisMetrics({ metrics }: AnalysisMetricsProps) {
  const getMetricColor = (value: number) => {
    if (value >= 70) return "metric-high";
    if (value >= 40) return "metric-medium";
    return "metric-low";
  };

  return (
    <Card className="border-analysis-border bg-analysis-bg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Analysis Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{metric.label}</span>
              <span className="font-bold text-foreground">{metric.value}%</span>
            </div>
            <Progress 
              value={metric.value} 
              className="h-2"
              // @ts-ignore - Custom CSS variable for progress color
              style={{ "--progress-background": `hsl(var(--${getMetricColor(metric.value)}))` } as React.CSSProperties}
            />
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}