import { BuyerColumns } from "./BuyerInterface";
import { CarStatusColumns } from "./CarStatusInterface";
import { ColorColumns } from "./ColorInterface";
import { EncumberedColumns } from "./EncumberedInterface";
import { EngineCcColumns } from "./EngineCcInterface";
import { MakeColumns } from "./MakeInterface";
import { MotherFileColumns } from "./MotherFileInterface";
import { TransferStatusColumns } from "./TransferStatusInterface";
import { TransmissionColumns } from "./TransmissionInterface";

export interface CarColumns {
  car_id: number;
  encode_date: string;
  year_model: string;
  make: MakeColumns;
  series: string;
  transmission: TransmissionColumns;
  color: ColorColumns;
  price: string;
  plate_number: string;
  mother_file: MotherFileColumns;
  mv_file_number: string;
  engine_number: string;
  chassis_number: string;
  engine_cc: EngineCcColumns;
  car_status: CarStatusColumns;
  original_or_cr_received?: string;
  encumbered?: EncumberedColumns;
  rod_received?: string;
  rod_paid?: string;
  last_registered?: string;
  confirmation_request?: string;
  confirmation_received?: string;
  hpg_clearance?: string;
  transfer_status: TransferStatusColumns;
  first_owner: string;
  address: string;
  buyer?: BuyerColumns;
  created_at: string;
  updated_at: string;
}

export interface CarFieldsErrors {
  encode_date?: string[];
  year_model?: string[];
  make?: string[];
  series?: string[];
  transmission?: string[];
  color?: string[];
  price?: string[];
  plate_number?: string[];
  mother_file?: string[];
  mv_file_number?: string[];
  engine_number?: string[];
  chassis_number?: string[];
  engine_cc?: string[];
  status?: string[];
  original_or_cr_received?: string[];
  encumbered?: string[];
  rod_received?: string[];
  rod_paid?: string[];
  last_registered?: string[];
  confirmation_request?: string[];
  confirmation_received?: string[];
  hpg_clearnance?: string[];
  transfer_status?: string[];
  first_owner?: string[];
  address?: string[];
}
