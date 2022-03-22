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

  newUser: async (data: any) => {
    const result = await ipcRenderer.invoke('REGISTER_USER', data);
    return result;
  },

  updateUser: async (data: any, IdUser: number) => {
    const result = await ipcRenderer.invoke('UPDATE_USER', data, IdUser);
    return result;
  },

  newSystemUser: async (data: any) => {
    const result = await ipcRenderer.invoke('REGISTER_SYSTEM_USER', data);
    return result;
  },

  updateSystemUser: async (data: any, IdUser: number) => {
    const result = await ipcRenderer.invoke('UPDATE_SYSTEM_USER', data, IdUser);
    return result;
  },

  deactivateSystemUser: async (data: any) => {
    const result = await ipcRenderer.invoke('DEACTIVATE_SYSTEM_USER', data);
    return result;
  },

  deactivateUser: async (data: any) => {
    const result = await ipcRenderer.invoke('DEACTIVATE_USER', data);
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

  registerNewEquipment: (registerType: boolean, data: any) => {
    const result = ipcRenderer.invoke('Register_Equipment', registerType, data);
    return result;
  },

  updateEquipment: (
    registerType: boolean,
    data: any,
    IdEquipment: number,
    IdMaintenance: number
  ) => {
    const result = ipcRenderer.invoke(
      'Update_Equipment',
      registerType,
      data,
      IdEquipment,
      IdMaintenance
    );
    return result;
  },

  deactivateEquipment: (IdEquipment: number) => {
    const result = ipcRenderer.invoke('Deactivate_Equipment', IdEquipment);
    return result;
  },

  putEquipmentInInventory: (data: any) => {
    const result = ipcRenderer.invoke('put_Equipment_In_Inventory', data);
    return result;
  },

  putEquipmentInMaintenance: (data: any) => {
    const result = ipcRenderer.invoke('put_Equipment_In_Maintenance', data);
    return result;
  },

  getAllEquipmentLoans: () => {
    const EquipmentTypes = ipcRenderer.invoke('Get_All_EquipmentLoans');
    return EquipmentTypes;
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
