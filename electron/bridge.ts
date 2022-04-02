import { contextBridge, ipcRenderer } from 'electron';
export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  validateLogin: async (data: any) => {
    const result = await ipcRenderer.invoke('VALIDATE_LOGIN', data);
    return result;
  },

  handleActivitySystem: async (IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'HANDLE_ACTIVITY_SYSTEM',
      IdSystemUser
    );
    return result;
  },

  newUser: async (data: any, IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'REGISTER_USER',
      data,
      IdSystemUser
    );
    return result;
  },

  updateUser: async (data: any, IdUser: number, IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'UPDATE_USER',
      data,
      IdUser,
      IdSystemUser
    );
    return result;
  },

  deactivateUser: async (data: any, IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'DEACTIVATE_USER',
      data,
      IdSystemUser
    );
    return result;
  },

  newSystemUser: async (data: any, IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'REGISTER_SYSTEM_USER',
      data,
      IdSystemUser
    );
    return result;
  },

  updateSystemUser: async (data: any, IdUser: number, IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'UPDATE_SYSTEM_USER',
      data,
      IdUser,
      IdSystemUser
    );
    return result;
  },

  deactivateSystemUser: async (data: any, IdSystemUser: any) => {
    const result = await ipcRenderer.invoke(
      'DEACTIVATE_SYSTEM_USER',
      data,
      IdSystemUser
    );
    return result;
  },

  getAllUsers: () => {
    const users = ipcRenderer.invoke('Get_all_users');
    return users;
  },

  getAllSystemUsers: () => {
    const users = ipcRenderer.invoke('Get_all_system_users');
    return users;
  },

  getAllEquipment: () => {
    const Equipment = ipcRenderer.invoke('Get_all_equipment');
    return Equipment;
  },

  getAllMaintenanceEquipment: () => {
    const Equipment = ipcRenderer.invoke('Get_all_maintenance_equipment');
    return Equipment;
  },

  getAllEquipmentInMaintenance: () => {
    const Equipment = ipcRenderer.invoke('Get_all_equipment_in_maintenance');
    return Equipment;
  },

  getAllEquipmentTypes: () => {
    const EquipmentTypes = ipcRenderer.invoke('Get_All_EquipmentTypes');
    return EquipmentTypes;
  },

  getAllEquipmentQualityStatus: () => {
    const EquipmentTypes = ipcRenderer.invoke('Get_All_EquipmentQualityStatus');
    return EquipmentTypes;
  },

  registerNewEquipment: (
    registerType: boolean,
    data: any,
    IdSystemUser: any
  ) => {
    const result = ipcRenderer.invoke(
      'Register_Equipment',
      registerType,
      data,
      IdSystemUser
    );
    return result;
  },

  updateEquipment: (
    registerType: boolean,
    data: any,
    IdEquipment: number,
    IdMaintenance: number,
    IdSystemUser: any
  ) => {
    const result = ipcRenderer.invoke(
      'Update_Equipment',
      registerType,
      data,
      IdEquipment,
      IdMaintenance,
      IdSystemUser
    );
    return result;
  },

  deactivateEquipment: (IdEquipment: number, IdSystemUser: any) => {
    const result = ipcRenderer.invoke(
      'Deactivate_Equipment',
      IdEquipment,
      IdSystemUser
    );
    return result;
  },

  putEquipmentInInventory: (data: any, IdSystemUser: any) => {
    const result = ipcRenderer.invoke(
      'put_Equipment_In_Inventory',
      data,
      IdSystemUser
    );
    return result;
  },

  putEquipmentInMaintenance: (data: any, IdSystemUser: any) => {
    const result = ipcRenderer.invoke(
      'put_Equipment_In_Maintenance',
      data,
      IdSystemUser
    );
    return result;
  },

  getAllEquipmentLoans: () => {
    const EquipmentTypes = ipcRenderer.invoke('Get_All_EquipmentLoans');
    return EquipmentTypes;
  },

  getEquipmentByCode: (Code: string) => {
    const EquipmentTypes = ipcRenderer.invoke('Get_Equipment_By_Code', Code);
    return EquipmentTypes;
  },

  getLoanEquipmentByCode: (Code: string) => {
    const EquipmentTypes = ipcRenderer.invoke(
      'Get_Loan_Equipment_By_Code',
      Code
    );
    return EquipmentTypes;
  },

  newLoanEquipment: (InstitutionalCode: any, data: any, IdSystemUser: any) => {
    const result = ipcRenderer.invoke(
      'New_Equipment_Loan',
      InstitutionalCode,
      data,
      IdSystemUser
    );
    return result;
  },

  newEquipmentType: (data: any, IdSystemUser: any) => {
    const result = ipcRenderer.invoke('New_Equipment_Type', data, IdSystemUser);
    return result;
  },

  getLoanDetails: (Iduser: any, IdLoan: any) => {
    const result = ipcRenderer.invoke('Get_Loan_Details', Iduser, IdLoan);
    return result;
  },

  generateQrCode: (data: any, IdSystemUser: any) => {
    const result = ipcRenderer.invoke('generate_Code', data, IdSystemUser);
    return result;
  },

  deactivateEquipmentLoan: (
    IdEquipmentLoan: any,
    IdEquipment: any,
    IdSystemUser: any
  ) => {
    const result = ipcRenderer.invoke(
      'deactivate_Equipment_Loan',
      IdEquipmentLoan,
      IdEquipment,
      IdSystemUser
    );
    return result;
  },

  deactivateFullEquipmentLoan: (
    IdLoan: any,
    Description: any,
    IdSystemUser: any
  ) => {
    const result = ipcRenderer.invoke(
      'deactivate_full_equipment_loan',
      IdLoan,
      Description,
      IdSystemUser
    );
    return result;
  },

  //* Stats from charts *//
  getQtyStudents: () => {
    const result = ipcRenderer.invoke('get_Quantity_students');
    return result;
  },

  getQtyLoans: () => {
    const result = ipcRenderer.invoke('get_Quantity_Loan');
    return result;
  },

  getQtyEquipments: () => {
    const result = ipcRenderer.invoke('get_Quantity_Equipments');
    return result;
  },

  getQtyMaintenanceEquipment: () => {
    const result = ipcRenderer.invoke('get_Quantity_Maintenance_Equipments');
    return result;
  },

  //* this is for generate reports *//

  generateStudentsReport: () => {
    const result = ipcRenderer.invoke('generate_Report_students');
    return result;
  },

  generateTeachersReport: () => {
    const result = ipcRenderer.invoke('generate_Report_Teachers');
    return result;
  },

  generateLogUser: (InstitutionalCode: any, StartDate: any, EndDate: any) => {
    const result = ipcRenderer.invoke(
      'generate_Report_Log_User',
      InstitutionalCode,
      StartDate,
      EndDate
    );
    return result;
  },

  generateLoanMaintenanceEquipment: (StartDate: any, EndDate: any) => {
    const result = ipcRenderer.invoke(
      'generate_Maintenance_Equipment_Loans_Report',
      StartDate,
      EndDate
    );

    return result;
  },

  generateLoanEquipment: (StartDate: any, EndDate: any) => {
    const result = ipcRenderer.invoke(
      'generate_Equipment_Loans_Report',
      StartDate,
      EndDate
    );

    return result;
  },

  generateInventoryEquipment: () => {
    const result = ipcRenderer.invoke('generate_inventory_equipment_report');
    return result;
  },

  generateUseEquipment: () => {
    const result = ipcRenderer.invoke('generate_use_equipment_report');
    return result;
  },

  generateInventoryMaintenanceEquipment: () => {
    const result = ipcRenderer.invoke(
      'generate_inventory_maintenance_equipment_report'
    );
    return result;
  },

  generateInventoryInMaintenanceEquipment: () => {
    const result = ipcRenderer.invoke(
      'generate_in_maintenance_equipment_report'
    );
    return result;
  },

  generateUseMaintenanceEquipment: () => {
    const result = ipcRenderer.invoke(
      'generate_use_maintenance_equipment_report'
    );
    return result;
  },

  generateNexMaintenanceEquipment: (StartDate: any, EndDate: any) => {
    const result = ipcRenderer.invoke(
      'generate_Next_maintenance_equipment_report',
      StartDate,
      EndDate
    );

    return result;
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
