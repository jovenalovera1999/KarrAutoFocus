export interface PaymentColumns {
  payment_id: number;
  payment_date: string;
  amount: string;
  description: string;
  payment_method: PaymentMethodColumns;
  created_at: string;
  updated_at: string;
}

export interface PaymentFieldsErrors {
  payment_date?: string[];
  amount?: string[];
  description?: string[];
  payment_method?: string[];
}
