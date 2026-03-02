import { AgentColumns } from "./AgentInterface";
import { PaymentBreakdownColumns } from "./PaymentBreakdownInterface";
import { PaymentColumns } from "./PaymentInterface";

export interface BuyerColumns {
  buyer_id: number;
  buyer: string;
  address: string;
  agreed_price?: string;
  date_reserved?: string;
  agent: AgentColumns;
  payment_breakdowns: PaymentBreakdownColumns[];
  payments: PaymentColumns[];
  created_at: string;
  updated_at: string;
}

export interface BuyerFieldsErrors {
  buyer?: string[];
  address?: string[];
  agreed_price?: string[];
  date_reserved?: string[];
  agent?: string[];
}
