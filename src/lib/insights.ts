import { Transaction, TransactionType } from '@/types';
import { calculateCategoryBreakdown, formatCurrency } from '@/lib/utils';

export interface FinancialInsight {
  id: string;
  type: 'positive' | 'warning' | 'alert' | 'info';
  title: string;
  message: string;
}

export function generateFinancialInsights(params: {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}): FinancialInsight[] {
  const { transactions, totalIncome, totalExpenses, savingsRate } = params;
  const insights: FinancialInsight[] = [];

  if (transactions.length === 0) {
    insights.push({
      id: 'empty-state',
      type: 'info',
      title: 'Get Started',
      message: 'Add transactions to see personalized savings insights and spending trends.',
    });
    return insights;
  }

  // 1. Savings rate analysis
  if (savingsRate >= 20) {
    insights.push({
      id: 'savings-healthy',
      type: 'positive',
      title: 'Strong Savings Habit',
      message: `Your savings rate is ${savingsRate}%, outperforming the recommended 20% benchmark.`,
    });
  } else if (savingsRate < 10 && savingsRate >= 0) {
    insights.push({
      id: 'savings-low',
      type: 'warning',
      title: 'Savings Alert',
      message: `Your current savings rate is ${savingsRate}%. Target at least 10-20% by cutting non-essential expenses.`,
    });
  }

  // 2. High expenditure warnings
  if (totalIncome > 0 && totalExpenses > totalIncome * 0.9) {
    insights.push({
      id: 'burn-rate-high',
      type: 'alert',
      title: 'High Burn Rate',
      message: 'You have consumed over 90% of your incoming cashflow this period.',
    });
  }

  // 3. Category concentration analysis
  const expenseBreakdown = calculateCategoryBreakdown(transactions, TransactionType.EXPENSE);
  const categories = Object.entries(expenseBreakdown).sort(([, a], [, b]) => b - a);
  if (categories.length > 0) {
    const [topCategory, topAmount] = categories[0];
    const topPct = totalExpenses > 0 ? Math.round((topAmount / totalExpenses) * 100) : 0;
    if (topPct >= 35) {
      insights.push({
        id: 'category-concentration',
        type: 'warning',
        title: 'High Category Concentration',
        message: `${topCategory} accounts for ${topPct}% (${formatCurrency(topAmount)}) of all expenses.`,
      });
    }
  }

  return insights;
}
