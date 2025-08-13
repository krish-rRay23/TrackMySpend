import { describe, it, expect } from 'vitest';
import { generateFinancialInsights } from '@/lib/insights';
import { RecurrenceType, Transaction, TransactionType } from '@/types';

describe('Financial Insights Generator', () => {
  it('returns guidance when no transactions exist', () => {
    const insights = generateFinancialInsights({
      transactions: [],
      totalIncome: 0,
      totalExpenses: 0,
      savingsRate: 0,
    });

    expect(insights).toHaveLength(1);
    expect(insights[0].id).toBe('empty-state');
  });

  it('detects healthy savings rates (>= 20%)', () => {
    const tx: Transaction[] = [
      {
        id: '1',
        amount: 100000,
        description: 'Salary',
        category: 'Income',
        date: '2025-08-01',
        type: TransactionType.INCOME,
        recurrence: RecurrenceType.MONTHLY,
      },
      {
        id: '2',
        amount: 60000,
        description: 'Living',
        category: 'Essentials',
        date: '2025-08-05',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.NONE,
      },
    ];

    const insights = generateFinancialInsights({
      transactions: tx,
      totalIncome: 100000,
      totalExpenses: 60000,
      savingsRate: 40,
    });

    const healthyInsight = insights.find((i) => i.id === 'savings-healthy');
    expect(healthyInsight).toBeDefined();
    expect(healthyInsight?.title).toBe('Strong Savings Habit');
  });

  it('triggers warning when burn rate exceeds 90%', () => {
    const tx: Transaction[] = [
      {
        id: '1',
        amount: 50000,
        description: 'Paycheck',
        category: 'Income',
        date: '2025-08-01',
        type: TransactionType.INCOME,
        recurrence: RecurrenceType.MONTHLY,
      },
      {
        id: '2',
        amount: 48000,
        description: 'Bills and Shopping',
        category: 'Shopping',
        date: '2025-08-10',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.NONE,
      },
    ];

    const insights = generateFinancialInsights({
      transactions: tx,
      totalIncome: 50000,
      totalExpenses: 48000,
      savingsRate: 4,
    });

    const burnAlert = insights.find((i) => i.id === 'burn-rate-high');
    expect(burnAlert).toBeDefined();
    expect(burnAlert?.title).toBe('High Burn Rate');
  });

  it('flags high category concentration when one category >= 35% of spending', () => {
    const tx: Transaction[] = [
      {
        id: '1',
        amount: 25000,
        description: 'Rent',
        category: 'Housing',
        date: '2025-08-01',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.MONTHLY,
      },
      {
        id: '2',
        amount: 5000,
        description: 'Groceries',
        category: 'Food',
        date: '2025-08-02',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.NONE,
      },
    ];

    const insights = generateFinancialInsights({
      transactions: tx,
      totalIncome: 60000,
      totalExpenses: 30000,
      savingsRate: 50,
    });

    const categoryAlert = insights.find((i) => i.id === 'category-concentration');
    expect(categoryAlert).toBeDefined();
    expect(categoryAlert?.message).toContain('Housing');
  });
});
