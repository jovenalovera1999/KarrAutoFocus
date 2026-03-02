import { BuyerColumns } from "./BuyerInterface";
import { CarColumns } from "./CarInterface";
import { PaymentBreakdownColumns } from "./PaymentBreakdownInterface";

export interface PaymentColumns {
  payment_id: number;
  car: CarColumns;
  buyer: BuyerColumns;
  payment_breakdown: PaymentBreakdownColumns;
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
