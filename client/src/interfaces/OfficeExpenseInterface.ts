export interface OfficeExpenseColumns {
  office_expense_id: number;
  incurrence_date: string;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface OfficeExpenseFieldsErrors {
  incurrence_date?: string[];
  amount?: string[];
  description?: string[];
}
