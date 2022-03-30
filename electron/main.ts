import { app, BrowserWindow, ipcMain, dialog } from 'electron';
const path = require('path');
const fs = require('fs');
const Excel = require('exceljs');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const dotenv = require('dotenv').config();
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
  getAllEquipmentLoans,
  getEquipmentByCode,
  getEquipmentByCodeForLoan,
  newEquipmentLoan,
  newCategory,
  getLoanDetails,
  deactivateEquipmentLoan,
  deactivateFullEquipmentLoan,
  getAllStudentsUsers,
  getQuantityOfUsers,
  registerNewSystemActivity,
} from '../src/Services/sqlDataService';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath();

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, './assets/icons.ico'),
    height: 1000,
    width: 800,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      enableRemoteModule: true,
      devTools: !app.isPackaged,
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

ipcMain.handle('HANDLE_ACTIVITY_SYSTEM', async (event, IdSystemUser) => {
  const result = await registerNewSystemActivity(IdSystemUser, 2);
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

ipcMain.handle('REGISTER_USER', async (event, data, IdSystemUser) => {
  const result = await registerNewUser(data);
  await registerNewSystemActivity(IdSystemUser, 11);
  return result;
});

ipcMain.handle('UPDATE_USER', async (event, data, IdUser, IdSystemUser) => {
  const result = await updateUser(data, IdUser);
  await registerNewSystemActivity(IdSystemUser, 12);

  return result;
});

ipcMain.handle('DEACTIVATE_USER', async (event, data, IdSystemUser) => {
  const result = await deactivateUser(data);
  await registerNewSystemActivity(IdSystemUser, 13);

  return result;
});

ipcMain.handle('REGISTER_SYSTEM_USER', async (event, data, IdSystemUser) => {
  const result = await registerNewSystemUser(data);
  await registerNewSystemActivity(IdSystemUser, 8);

  return result;
});

ipcMain.handle(
  'UPDATE_SYSTEM_USER',
  async (event, data, IdUser, IdSystemUser) => {
    const result = await updateSystemUser(data, IdUser);
    await registerNewSystemActivity(IdSystemUser, 9);

    return result;
  }
);

ipcMain.handle('DEACTIVATE_SYSTEM_USER', async (event, data, IdSystemUser) => {
  const result = await deactivateSystemUser(data);
  await registerNewSystemActivity(IdSystemUser, 10);

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

ipcMain.handle(
  'Register_Equipment',
  async (event, registerType, data, IdSystemUser) => {
    const result = await registerNewEquipment(registerType, data);

    await registerNewSystemActivity(IdSystemUser, 5);

    return result;
  }
);

ipcMain.handle(
  'Update_Equipment',
  async (
    event,
    registerType,
    data,
    IdEquipment,
    IdMaintenance,
    IdSystemUser
  ) => {
    const result = await updateEquipment(
      registerType,
      data,
      IdEquipment,
      IdMaintenance
    );
    await registerNewSystemActivity(IdSystemUser, 6);

    return result;
  }
);

ipcMain.handle(
  'Deactivate_Equipment',
  async (event, IdEquipment, IdSystemUser) => {
    const result = await deactivateEquipment(IdEquipment);
    await registerNewSystemActivity(IdSystemUser, 7);

    return result;
  }
);

ipcMain.handle(
  'put_Equipment_In_Inventory',
  async (event, data, IdSystemUser) => {
    const result = await putEquipmentInInventory(data);
    await registerNewSystemActivity(IdSystemUser, 15);

    return result;
  }
);

ipcMain.handle(
  'put_Equipment_In_Maintenance',
  async (event, data, IdSystemUser) => {
    const result = await putEquipmentInMaintenance(data);
    await registerNewSystemActivity(IdSystemUser, 14);

    return result;
  }
);

ipcMain.handle('Get_All_EquipmentLoans', async () => {
  const result = await getAllEquipmentLoans();
  return result;
});

ipcMain.handle('Get_Loan_Equipment_By_Code', async (event, Code) => {
  const result = await getEquipmentByCodeForLoan(Code);

  return result;
});

ipcMain.handle('Get_Equipment_By_Code', async (event, Code) => {
  const result = await getEquipmentByCode(Code);

  return result;
});

ipcMain.handle(
  'New_Equipment_Loan',
  async (event, InstitutionalCode, data, IdSystemUser) => {
    const result = await newEquipmentLoan(InstitutionalCode, data);
    await registerNewSystemActivity(IdSystemUser, 3);

    return result;
  }
);

ipcMain.handle('New_Equipment_Type', async (event, data, IdSystemUser) => {
  const result = await newCategory(data);
  await registerNewSystemActivity(IdSystemUser, 16);

  return result;
});

ipcMain.handle('Get_Loan_Details', async (event, Iduser, IdLoan) => {
  const result = await getLoanDetails(Iduser, IdLoan);

  return result;
});

function SendIt() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_KEY,
      pass: process.env.EMAIL_PASS_KEY,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_KEY,
    to: 'carlos.nava17@tectijuana.edu.mx',
    subject: 'Subject of your email',
    html: '<p>Your html here</p>',
  };

  transporter.sendMail(mailOptions, function (err: any, info: any) {
    if (err) console.log(err);
    else console.log(info);
  });
}

ipcMain.handle('generate_Code', async (event, data, IdSystemUser) => {
  let returnNumber = 0;
  await dialog
    .showSaveDialog({
      title: 'Selecciona donde quieres guardar el archivo',
      defaultPath: path.join(
        __dirname,
        '../assets/' +
          data.EquipmentTypeName +
          '-' +
          data.Location +
          '-' +
          data.Code +
          '.png'
      ),
      buttonLabel: 'Guardar',
      // Restricting the user to only Files can accept.
      filters: [
        {
          name: 'Image Files',
          extensions: ['png', 'jpg'],
        },
      ],
      properties: [],
    })
    .then(async (file) => {
      if (!file.canceled) {
        // Creating and Writing to the sample file
        await QRCode.toFile(
          file?.filePath?.toString(),
          data.Code,
          {
            color: {
              dark: '#00F', // Blue modules
              light: '#0000', // Transparent background
            },
          },
          function (err: any) {
            if (err) throw err;
            console.log('saved.');
          }
        );
        await registerNewSystemActivity(IdSystemUser, 17);
        returnNumber = 2;
      } else {
        returnNumber = 1;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return returnNumber;
});

ipcMain.handle(
  'deactivate_Equipment_Loan',
  async (event, IdEquipmentLoan, IdEquipment, IdSystemUser) => {
    const result = await deactivateEquipmentLoan(IdEquipmentLoan, IdEquipment);
    await registerNewSystemActivity(IdSystemUser, 18);

    return result;
  }
);

ipcMain.handle(
  'deactivate_full_equipment_loan',
  async (event, IdLoan, Description, IdSystemUser) => {
    const result = await deactivateFullEquipmentLoan(IdLoan, Description);
    SendIt();
    await registerNewSystemActivity(IdSystemUser, 4);
    return result;
  }
);

ipcMain.handle('generate_Report_students', async () => {
  const rows = await getAllStudentsUsers();

  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Reporte de estudiantes');

  worksheet.columns = [
    { header: 'Código institucional', key: 'code', width: 30 },
    { header: 'Nombre', key: 'name', width: 30 },
    { header: 'Apellido paterno', key: 'FatherL', width: 30 },
    { header: 'Apellido mateno', key: 'MotherL', width: 30 },
    { header: 'Correo', key: 'email', width: 30 },
    { header: 'Fecha de registro', key: 'EnrollmentDate', width: 30 },
    { header: 'Tipo de usuario', key: 'UserType', width: 30 },
  ];

  rows.map((row: any) => {
    worksheet.addRow({
      code: row.InstitutionalCode,
      name: row.FirstName,
      FatherL: row.FatherLastname,
      MotherL: row.MotherLastname,
      email: row.InstitutionalEmail,
      EnrollmentDate: row.EnrollmentDate,
      UserType: row.RoleType,
    });
  });

  const directory = await selectDirectory();
  if (directory) {
    await workbook.xlsx.writeFile(
      directory +
        '/Reporte de estudiantes-' +
        dayjs(new Date()).format('DD MMM, YYYY').toString() +
        '.xlsx'
    );
  }
});

const selectDirectory = async () => {
  if (mainWindow) {
    const directory = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    return directory.filePaths[0];
  }
};

ipcMain.handle('get_Quantity_students', async () => {
  const result = await getQuantityOfUsers();
  return result;
});
