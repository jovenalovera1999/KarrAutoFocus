export interface DepositColumns {
  deposit_id: number;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DepositFieldsErrors {
  amount?: string[];
  description?: string[];
}
