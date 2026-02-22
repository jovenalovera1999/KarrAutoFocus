export interface ExpenseColumns {
  expense_id: number;
  incurrence_date: string;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFieldsErrors {
  incurrence_date?: string[];
  amount?: string[];
  description?: string[];
}
