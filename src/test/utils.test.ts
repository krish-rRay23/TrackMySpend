import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  getRecurrenceLabel,
  calculateCategoryBreakdown,
  calculateNetBalance,
  calculateSavingsRate,
  getTransactionTypeSymbol,
  getTransactionTypeColor,
} from '@/lib/utils';
import { RecurrenceType, Transaction, TransactionType } from '@/types';

describe('Utils Functions', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1000)).toBe('₹1,000.00');
      expect(formatCurrency(50.5)).toBe('₹50.50');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('₹0.00');
    });

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-500)).toBe('-₹500.00');
    });

    it('handles large numbers', () => {
      // Indian numbering system uses lakhs (1,00,000 = 1 lakh)
      expect(formatCurrency(1000000)).toBe('₹10,00,000.00');
    });
  });

  describe('formatDate', () => {
    it('formats valid ISO date strings', () => {
      expect(formatDate('2025-08-12T00:00:00.000Z')).toBe('Aug 12, 2025');
    });

    it('falls back gracefully on invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('invalid-date');
    });
  });

  describe('getRecurrenceLabel', () => {
    it('returns human-readable labels for recurrence frequencies', () => {
      expect(getRecurrenceLabel(RecurrenceType.NONE)).toBe('One-time');
      expect(getRecurrenceLabel(RecurrenceType.DAILY)).toBe('Daily');
      expect(getRecurrenceLabel(RecurrenceType.WEEKLY)).toBe('Weekly');
      expect(getRecurrenceLabel(RecurrenceType.MONTHLY)).toBe('Monthly');
      expect(getRecurrenceLabel(RecurrenceType.YEARLY)).toBe('Yearly');
    });
  });

  describe('Transaction Type Formatting', () => {
    it('returns correct symbol and color classes', () => {
      expect(getTransactionTypeSymbol(TransactionType.INCOME)).toBe('+');
      expect(getTransactionTypeSymbol(TransactionType.EXPENSE)).toBe('-');
      expect(getTransactionTypeColor(TransactionType.INCOME)).toBe('text-green-500');
      expect(getTransactionTypeColor(TransactionType.EXPENSE)).toBe('text-red-500');
    });
  });

  describe('Financial Calculation Helpers', () => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        amount: 50000,
        description: 'Salary',
        category: 'Income',
        date: '2025-08-01',
        type: TransactionType.INCOME,
        recurrence: RecurrenceType.MONTHLY,
      },
      {
        id: '2',
        amount: 15000,
        description: 'Rent',
        category: 'Housing',
        date: '2025-08-02',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.MONTHLY,
      },
      {
        id: '3',
        amount: 5000,
        description: 'Groceries',
        category: 'Food',
        date: '2025-08-05',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.NONE,
      },
      {
        id: '4',
        amount: 3000,
        description: 'Dining Out',
        category: 'Food',
        date: '2025-08-10',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.NONE,
      },
    ];

    it('calculates category breakdown accurately for expenses', () => {
      const breakdown = calculateCategoryBreakdown(mockTransactions, TransactionType.EXPENSE);
      expect(breakdown).toEqual({
        Housing: 15000,
        Food: 8000,
      });
    });

    it('calculates net balance correctly', () => {
      // 50000 - (15000 + 5000 + 3000) = 27000
      expect(calculateNetBalance(mockTransactions)).toBe(27000);
    });

    it('calculates savings rate percentage correctly', () => {
      // (50000 - 23000) / 50000 * 100 = 54%
      expect(calculateSavingsRate(50000, 23000)).toBe(54);
      expect(calculateSavingsRate(0, 5000)).toBe(0);
      expect(calculateSavingsRate(10000, 10000)).toBe(0);
    });
  });
});
