export type MaintenanceEquipmentModel = {
  Id: number;
  Code: string;
  SerialNumber: string;
  Description: string;
  Location: string;
  IdEquipmentType: number;
  IdEquipmentQualityStatus: number;
  Frecuencia: number;
  UltimoMant: Date;
};
