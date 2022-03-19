import { RowDataPacket } from 'mysql2';
import { db } from './database';
import { SystemUserModel } from '../models/SystemUserModel';
import { userModel } from '../models/userModel';
import { AuthModel } from '_/models/authModel';
import { displayEquipmentModel } from '../models/displayEquipmentModel';
import { displayMaintenanceEquipmentModel } from '../models/displayMaintenanceEquipmentModel';
import { EquipmentTypeModel } from '../models/equipmentTypeModel';
import { EquipmentQualityStatusModel } from '../models/equipmentQualityStatus';
import { EquipmentModel } from '../models/EquipmentModel';

const connection = db.dbConnection();

export const login = async (data: any) => {
  try {
    const { institutionalCode, password } = data;
    const result = false;
    const sqlQuery =
      'SELECT * FROM SystemUser WHERE InstitutionalCode=? AND Password=? AND isActive=1';

    const [rows, fields] = await (
      await connection
    ).query(sqlQuery, [institutionalCode, password]);

    //@ts-ignore
    if (rows.length > 0) {
      return rows;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const registerNewUser = async (data: any) => {
  try {
    const userExist = await getUserByInstitutionalCode(data.InstitutionalCode);

    //@ts-ignore
    if (userExist.length > 0) {
      return 1;
    } else {
      const sqlQuery =
        'INSERT INTO User (FirstName,FatherLastname,MotherLastname,InstitutionalCode,InstitutionalEmail,IdUserRole) VALUES(?,?,?,?,?,?)';
      const [rows, fields] = await (
        await connection
      ).query(sqlQuery, [
        data.FirstName,
        data.FatherLastname,
        data.MotherLastname,
        data.InstitutionalCode,
        data.InstitutionalEmail,
        data.IdUserRole,
      ]);

      //@ts-ignore
      if (rows.affectedRows > 0) {
        return 2;
      } else return 3;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const registerNewSystemUser = async (data: any) => {
  try {
    const userExist = await getSystemUserByInstitutionalCode(
      data.InstitutionalCode
    );

    //@ts-ignore
    if (userExist.length > 0) {
      return 1;
    } else {
      const sqlQuery =
        'INSERT INTO systemuser (FirstName,FatherLastname,MotherLastname,InstitutionalCode,Password,IdSystemUserRole) VALUES(?,?,?,?,?,?)';
      const [rows, fields] = await (
        await connection
      ).query(sqlQuery, [
        data.FirstName,
        data.FatherLastname,
        data.MotherLastname,
        data.InstitutionalCode,
        data.Password,
        data.IdUserRole,
      ]);

      //@ts-ignore
      if (rows.affectedRows > 0) {
        return 2;
      } else return 3;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deactivateSystemUser = async (data: any) => {
  try {
    const userExist = await getSystemUserByInstitutionalCode(
      data.InstitutionalCode
    );

    //@ts-ignore
    if (userExist.length > 0) {
      const sqlQuery = 'UPDATE systemuser SET IsActive=0 WHERE Id=?';
      const [rows, fields] = await (
        await connection
      ).query(sqlQuery, [data.Id]);

      //@ts-ignore
      if (rows.affectedRows > 0) {
        return 2;
      } else return 3;
    } else {
      return 1;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deactivateUser = async (data: any) => {
  try {
    const userExist = await getUserByInstitutionalCode(data.InstitutionalCode);

    //@ts-ignore
    if (userExist.length > 0) {
      const sqlQuery = 'UPDATE User SET IsActive=0 WHERE Id=?';
      const [rows, fields] = await (
        await connection
      ).query(sqlQuery, [data.Id]);

      //@ts-ignore
      if (rows.affectedRows > 0) {
        return 2;
      } else return 3;
    } else {
      return 1;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserByInstitutionalCode = async (
  institutionalCode: string
): Promise<userModel> => {
  const sqlQuery =
    'SELECT * FROM user WHERE InstitutionalCode=? AND isActive=1';

  const [result, fields] = await (
    await connection
  ).query<userModel & RowDataPacket[][]>(sqlQuery, [institutionalCode]);

  return result;
};

export const getSystemUserByInstitutionalCode = async (
  institutionalCode: string
): Promise<SystemUserModel> => {
  const sqlQuery =
    'SELECT * FROM SystemUser WHERE InstitutionalCode=? AND isActive=1';

  const [result, fields] = await (
    await connection
  ).query<SystemUserModel & RowDataPacket[][]>(sqlQuery, [institutionalCode]);

  return result;
};

export const getAllUsers = async (): Promise<userModel> => {
  const sqlQuery =
    'SELECT u.Id, u.InstitutionalCode, u.FirstName, u.FatherLastname,  u.MotherLastname,u.InstitutionalEmail, u.EnrollmentDate,  ur.Name as RoleType FROM User u INNER JOIN UserRole ur ON u.IdUserRole = ur.Id WHERE u.IsActive = 1';
  const [result, fields] = await (
    await connection
  ).query<userModel & RowDataPacket[][]>(sqlQuery);

  return result;
};

export const getAllSystemUsers = async (): Promise<SystemUserModel> => {
  const sqlQuery =
    'SELECT u.Id, u.InstitutionalCode, u.FirstName, u.FatherLastname,  u.MotherLastname,IF(u.Password IS NULL, u.Password, "******") AS Password, u.EnrollmentDate,  ur.Name as RoleType FROM systemuser u INNER JOIN systemuserRole ur ON u.IdSystemUserRole = ur.Id WHERE u.IsActive = 1';

  const [result, fields] = await (
    await connection
  ).query<SystemUserModel & RowDataPacket[][]>(sqlQuery);

  return result;
};

export const getAllEquipment = async (): Promise<displayEquipmentModel> => {
  const sqlQuery =
    'SELECT `e`.`Id`, `e`.`IdEquipmentType`, `et`.`Name` `EquipmentTypeName`, `e`.`IdEquipmentQualityStatus`, `eqs`.`Name` `EquipmentQualityStatusName`, `e`.`SerialNumber`, `e`.`Description`, `e`.`Location`, `e`.`Code` FROM `Equipment` `e` INNER JOIN `EquipmentType` `et` ON `e`.`IdEquipmentType` = `et`.`Id` INNER JOIN `EquipmentQualityStatus` `eqs` ON `e`.`IdEquipmentQualityStatus` = `eqs`.`Id` WHERE `e`.`IsActive` = 1;';

  const [result, fields] = await (
    await connection
  ).query<displayEquipmentModel & RowDataPacket[][]>(sqlQuery);

  return result;
};

export const getAllMaintenanceEquipment =
  async (): Promise<displayMaintenanceEquipmentModel> => {
    const sqlQuery =
      'Select	`Equipment`.`Id`, `Equipment`.`SerialNumber`, `Equipment`.`IdEquipmentType`, `ET`.`Name`                             `EquipmentTypeName`, `Equipment`.`Location`, `Equipment`.`IdEquipmentQualityStatus` , `eqs`.`Name`                            `EquipmentQualityStatusName`, `Equipment`.`Description`, `Equipment`.`Code`, `Mantenimiento`.`ID`		`IdMaintenance`, `Mantenimiento`.`Frecuencia`, `Mantenimiento`.`UltimoMant`, `Mantenimiento`.`ProximoMant`, `Mantenimiento`.`EnMantenimiento` from `Equipment` inner join `Mantenimiento` on `Equipment`.`ID` = `Mantenimiento`.`IdEquipment` INNER JOIN `EquipmentType` `ET` ON `IdEquipmentType` = `ET`.`Id` INNER JOIN `EquipmentQualityStatus` `eqs` ON `Equipment`.`IdEquipmentQualityStatus` = `eqs`.`Id` where `Equipment`.`IsActive` = 1 and `Mantenimiento`.`EnMantenimiento` = 0 ORDER BY `Mantenimiento`.`ProximoMant`;';

    const [result, fields] = await (
      await connection
    ).query<displayMaintenanceEquipmentModel & RowDataPacket[][]>(sqlQuery);

    return result;
  };

export const getAllEquipmentTypes = async (): Promise<EquipmentTypeModel> => {
  const sqlQuery =
    'Select Id, Name, Description from EquipmentType where IsActive = 1';

  const [result, fields] = await (
    await connection
  ).query<EquipmentTypeModel & RowDataPacket[][]>(sqlQuery);

  return result;
};

export const getAllEquipmentQualityStatus =
  async (): Promise<EquipmentQualityStatusModel> => {
    const sqlQuery =
      'Select Id, Name, Description from equipmentqualitystatus where IsActive = 1';

    const [result, fields] = await (
      await connection
    ).query<EquipmentQualityStatusModel & RowDataPacket[][]>(sqlQuery);

    return result;
  };

export const getEquipmentByCode = async (
  code: any
): Promise<EquipmentModel> => {
  const sqlQuery = 'SELECT * FROM equipment WHERE Code=? AND isActive=1';

  const [result, fields] = await (
    await connection
  ).query<EquipmentModel & RowDataPacket[][]>(sqlQuery, code);

  return result;
};

export const registerNewEquipment = async (
  registerType: boolean,
  data: any
) => {
  console.log('🚀 ~ file: sqlDataService.ts ~ line 260 ~ data', data);
  try {
    const equipmentExist = await getEquipmentByCode(data.Code);

    //@ts-ignore
    if (equipmentExist.length > 0) {
      return 1;
    } else {
      if (registerType === true) {
        const sqlQuery =
          'CALL `sicore`.`RegisterEquipment`(1, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?);';
        const [rows, fields] = await (
          await connection
        ).query(sqlQuery, [
          data.IdEquipmentType,
          data.IdEquipmentQualityStatus,
          data.SerialNumber,
          data.Code,
          data.Description,
          data.Location,
          data.Frecuencia,
          data.UltimoMant,
          data.IsUnique,
        ]);

        //@ts-ignore
        if (rows.affectedRows > 0) {
          return 2;
        } else return 3;
      } else {
        const sqlQuery =
          'INSERT INTO Equipment(IdEquipmentType, IdEquipmentQualityStatus, SerialNumber, Code, Description, Location) values(?, ?, ?, ?, ?, ?);';
        const [rows, fields] = await (
          await connection
        ).query(sqlQuery, [
          data.IdEquipmentType,
          data.IdEquipmentQualityStatus,
          data.SerialNumber,
          data.Code,
          data.Description,
          data.Location,
          data.IsUnique,
        ]);

        //@ts-ignore
        if (rows.affectedRows > 0) {
          return 2;
        } else return 3;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
