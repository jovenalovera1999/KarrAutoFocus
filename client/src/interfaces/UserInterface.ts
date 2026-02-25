import { BranchColumns } from "./BranchInterface";
import { RoleColumns } from "./RoleInterface";

export interface UserColumns {
  user_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix_name?: string;
  birth_date: string;
  contact_number: string;
  email?: string;
  username: string;
  password: string;
  role: RoleColumns;
  branch: BranchColumns;
  created_at: string;
  updated_at: string;
}

export interface UserFieldsErrors {
  first_name?: string[];
  middle_name?: string[];
  last_name?: string[];
  suffix_name?: string[];
  birth_date?: string[];
  contact_number?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
  password_confirmation?: string[];
  branch_assigned?: string[];
  role?: string[];
}
