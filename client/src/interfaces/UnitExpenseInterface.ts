import { CarColumns } from "./CarInterface";

export interface UnitExpenseColumns {
  unit_expense_id: number;
  car: CarColumns;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface UnitExpenseFieldsErrors {
  amount?: string[];
  description?: string[];
}
