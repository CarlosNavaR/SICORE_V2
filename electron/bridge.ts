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

  newSystemUser: async (data: any) => {
    const result = await ipcRenderer.invoke('REGISTER_SYSTEM_USER', data);
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

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
