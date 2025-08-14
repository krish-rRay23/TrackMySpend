import { describe, it, expect } from 'vitest';
import {
  sanitizeCsvCell,
  formatTransactionsCsv,
  validateTransactionInput,
} from '@/lib/validation';
import { RecurrenceType, Transaction, TransactionType } from '@/types';

describe('Transaction & CSV Validation Helpers', () => {
  describe('sanitizeCsvCell', () => {
    it('handles normal strings and numbers', () => {
      expect(sanitizeCsvCell('Grocery Store')).toBe('Grocery Store');
      expect(sanitizeCsvCell(1250.5)).toBe('1250.5');
      expect(sanitizeCsvCell(null)).toBe('');
      expect(sanitizeCsvCell(undefined)).toBe('');
    });

    it('neutralizes potential CSV injection characters (=, +, -, @)', () => {
      expect(sanitizeCsvCell('=1+1')).toBe("'=1+1");
      expect(sanitizeCsvCell('+cmd|')).toBe("'+cmd|");
      expect(sanitizeCsvCell('-5+2')).toBe("'-5+2");
      expect(sanitizeCsvCell('@SUM(A1:A10)')).toBe("'@SUM(A1:A10)");
    });

    it('escapes embedded double quotes properly', () => {
      expect(sanitizeCsvCell('Coffee "Roast"')).toBe('Coffee ""Roast""');
    });
  });

  describe('formatTransactionsCsv', () => {
    it('produces properly escaped CSV rows', () => {
      const mockTx: Transaction[] = [
        {
          id: 'tx-1',
          date: '2025-08-14',
          description: 'Team Lunch',
          category: 'Dining',
          type: TransactionType.EXPENSE,
          amount: 1450.5,
          recurrence: RecurrenceType.NONE,
        },
      ];

      const csv = formatTransactionsCsv(mockTx);
      expect(csv).toContain('ID,Date,Description,Category,Type,Amount,Recurrence');
      expect(csv).toContain('tx-1,2025-08-14,"Team Lunch","Dining",expense,1450.50,none');
    });
  });

  describe('validateTransactionInput', () => {
    it('passes for valid transaction object', () => {
      const result = validateTransactionInput({
        description: 'Office Supplies',
        amount: 250,
        category: 'Work',
        date: '2025-08-14',
        type: TransactionType.EXPENSE,
        recurrence: RecurrenceType.NONE,
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('flags missing or invalid fields correctly', () => {
      const result = validateTransactionInput({
        description: '',
        amount: -100,
        category: '',
        date: 'invalid-date',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.description).toBe('Description is required');
      expect(result.errors.amount).toBe('Amount must be a positive number');
      expect(result.errors.category).toBe('Category is required');
      expect(result.errors.date).toBe('Valid date string is required');
      expect(result.errors.type).toBe('Transaction type must be income or expense');
    });
  });
});
