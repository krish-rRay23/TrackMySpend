import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { generateFinancialInsights } from "@/lib/insights";
import { BrainCircuitIcon, CheckCircle2Icon, AlertTriangleIcon, InfoIcon, AlertCircleIcon } from "lucide-react";

export function SmartInsights() {
  const { state, getTotalIncome, getTotalExpenses, getSavingsRate } = useFinance();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const savingsRate = getSavingsRate();
  
  const generatedInsights = generateFinancialInsights({
    transactions: state.transactions,
    totalIncome,
    totalExpenses,
    savingsRate,
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle2Icon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuitIcon className="h-5 w-5" />
          <span>Smart Insights</span>
        </CardTitle>
        <CardDescription>Automated spending trends and budget observations</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {generatedInsights.map((insight) => (
            <li key={insight.id} className="flex items-start gap-3">
              <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
              <div>
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-sm text-muted-foreground">{insight.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
