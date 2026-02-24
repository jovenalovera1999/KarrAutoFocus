import { AgentColumns } from "./AgentInterface";

export interface BuyerColumns {
  buyer_id: number;
  buyer: string;
  address: string;
  agreed_price?: string;
  date_reserved?: string;
  agent: AgentColumns;
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
