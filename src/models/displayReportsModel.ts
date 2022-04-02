export type displayReportsModel = {
  Id: number;
  Code: string;
  IdEquipmentType: number;
  EquipmentCode: string;
  EquipmentId: string;
  EquipmentSerialNumber: string;
  EquipmentDescription: string;
  LoanDescription: string;
  Unique: string;
  EquipmentIsActive: string;
  QuantityLoan: string;
  EquipmentLoanLendDateTime: Date;
  EquipmentLoanDateReturn: Date;
  EquipmentTypeName: string;
  IdEquipmentQualityStatus: number;
  IdMaintenance: number;
  Frecuencia: string;
  UltimoMant: Date;
  ProximoMant: Date;
  IsUnique: number;
  EnMantenimiento: number;
  UserInstitutionalCode: string;
  UserFirstName: string;
  UserFatherLastname: string;
  UserMotherLastname: string;
  EquipmentLoanDateBorrow: string;
};
