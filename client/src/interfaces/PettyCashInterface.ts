export interface PettyCashColumns {
  petty_cash_id: number;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PettyCashFieldsErrors {
  amount?: string[];
  description?: string[];
}
