import { app, BrowserWindow, ipcMain } from 'electron';
import {
  login,
  getAllUsers,
  registerNewUser,
  getAllSystemUsers,
  registerNewSystemUser,
  deactivateSystemUser,
  deactivateUser,
  getAllEquipment,
  getAllMaintenanceEquipment,
  getAllEquipmentTypes,
  getAllEquipmentQualityStatus,
  registerNewEquipment,
  updateUser,
  updateSystemUser,
  updateEquipment,
  deactivateEquipment,
  getAllEquipmentInMaintenance,
  putEquipmentInMaintenance,
  putEquipmentInInventory,
} from '../src/Services/sqlDataService';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const path = require('path');

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath();

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: '/assets/images/icons-sicore-gray.ico',
    height: 1000,
    width: 800,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('VALIDATE_LOGIN', async (event, data) => {
  const result = await login(data);

  return result;
});

ipcMain.handle('Get_all_users', async () => {
  const result = await getAllUsers();
  return result;
});

ipcMain.handle('Get_all_system_users', async () => {
  const result = await getAllSystemUsers();
  return result;
});

ipcMain.handle('REGISTER_USER', async (event, data) => {
  const result = await registerNewUser(data);

  return result;
});

ipcMain.handle('UPDATE_USER', async (event, data, IdUser) => {
  const result = await updateUser(data, IdUser);

  return result;
});

ipcMain.handle('DEACTIVATE_USER', async (event, data) => {
  const result = await deactivateUser(data);

  return result;
});

ipcMain.handle('REGISTER_SYSTEM_USER', async (event, data) => {
  const result = await registerNewSystemUser(data);

  return result;
});

ipcMain.handle('UPDATE_SYSTEM_USER', async (event, data, IdUser) => {
  const result = await updateSystemUser(data, IdUser);

  return result;
});

ipcMain.handle('DEACTIVATE_SYSTEM_USER', async (event, data) => {
  const result = await deactivateSystemUser(data);

  return result;
});

ipcMain.handle('Get_all_equipment', async () => {
  const result = await getAllEquipment();
  return result;
});

ipcMain.handle('Get_all_maintenance_equipment', async () => {
  const result = await getAllMaintenanceEquipment();
  return result;
});

ipcMain.handle('Get_all_equipment_in_maintenance', async () => {
  const result = await getAllEquipmentInMaintenance();
  return result;
});

ipcMain.handle('Get_All_EquipmentTypes', async () => {
  const result = await getAllEquipmentTypes();
  return result;
});

ipcMain.handle('Get_All_EquipmentQualityStatus', async () => {
  const result = await getAllEquipmentQualityStatus();
  return result;
});

ipcMain.handle('Register_Equipment', async (event, registerType, data) => {
  const result = await registerNewEquipment(registerType, data);
  return result;
});

ipcMain.handle(
  'Update_Equipment',
  async (event, registerType, data, IdEquipment, IdMaintenance) => {
    const result = await updateEquipment(
      registerType,
      data,
      IdEquipment,
      IdMaintenance
    );
    return result;
  }
);

ipcMain.handle('Deactivate_Equipment', async (event, IdEquipment) => {
  const result = await deactivateEquipment(IdEquipment);
  return result;
});

ipcMain.handle('put_Equipment_In_Inventory', async (event, data) => {
  const result = await putEquipmentInInventory(data);
  return result;
});

ipcMain.handle('put_Equipment_In_Maintenance', async (event, data) => {
  const result = await putEquipmentInMaintenance(data);
  return result;
});
