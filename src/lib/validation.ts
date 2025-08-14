import { RecurrenceType, Transaction, TransactionType } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Sanitizes cell values for CSV export to mitigate formula injection attacks
 * where malicious input starts with '=', '+', '-', or '@'.
 */
export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let str = String(value).trim();
  
  // Neutralize formula injection risk in spreadsheet viewers
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  
  return str.replace(/"/g, '""');
}

/**
 * Serializes transaction records into RFC 4180-compliant CSV text with header.
 */
export function formatTransactionsCsv(transactions: Transaction[]): string {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount', 'Recurrence'];
  const rows = transactions.map((t) => [
    sanitizeCsvCell(t.id),
    sanitizeCsvCell(t.date),
    `"${sanitizeCsvCell(t.description)}"`,
    `"${sanitizeCsvCell(t.category)}"`,
    sanitizeCsvCell(t.type),
    t.amount.toFixed(2),
    sanitizeCsvCell(t.recurrence),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Validates transaction payload prior to submission or ingestion.
 */
export function validateTransactionInput(input: Partial<Transaction>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.description || input.description.trim().length === 0) {
    errors.description = 'Description is required';
  }

  if (input.amount === undefined || input.amount === null || isNaN(input.amount) || input.amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!input.category || input.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  if (!input.date || isNaN(Date.parse(input.date))) {
    errors.date = 'Valid date string is required';
  }

  if (!input.type || !Object.values(TransactionType).includes(input.type)) {
    errors.type = 'Transaction type must be income or expense';
  }

  if (input.recurrence && !Object.values(RecurrenceType).includes(input.recurrence)) {
    errors.recurrence = 'Invalid recurrence specification';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
