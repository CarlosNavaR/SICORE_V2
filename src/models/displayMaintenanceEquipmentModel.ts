export type displayMaintenanceEquipmentModel = {
  Id: number;
  Code: string;
  IdEquipmentType: number;
  EquipmentTypeName: string;
  SerialNumber: string;
  Description: string;
  Location: string;
  IdEquipmentQualityStatus: number;
  EquipmentQualityStatusName: string;
  IdMaintenance: number;
  Frecuencia: string;
  UltimoMant: Date;
  ProximoMant: Date;
  EnMantenimiento: number;
};
