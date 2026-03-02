import { BuyerColumns } from "./BuyerInterface";
import { CarColumns } from "./CarInterface";
import { FinanceColumns } from "./FinanceInterface";
import { PaymentColumns } from "./PaymentInterface";

export interface PaymentBreakdownColumns {
  payment_breakdown_id: number;
  car_id: CarColumns;
  buyer_id: BuyerColumns;
  downpayment: string;
  processing_fee: string;
  service_fee: string;
  transfer: string;
  finance: FinanceColumns;
  term: TermColumns;
  payments: PaymentColumns[];
  created_at: string;
  updated_at: string;
}

export interface PaymentBreakdownFieldsErrors {
  downpayment?: string[];
  processing_fee?: string[];
  service_fee?: string[];
  transfer?: string[];
  finance?: string[];
  term?: string[];
}
