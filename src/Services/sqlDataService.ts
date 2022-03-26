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
import { displayEquipmentLoanModel } from '../models/displayEquipmentLoanModel';

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

export const updateUser = async (data: any, IdUser: number) => {
  try {
    //@ts-ignore

    const sqlQuery =
      'UPDATE User SET FirstName=?,FatherLastname=?,MotherLastname=?,InstitutionalCode=?,InstitutionalEmail=?,IdUserRole=? WHERE Id=?';
    const [rows, fields] = await (
      await connection
    ).query(sqlQuery, [
      data.FirstName,
      data.FatherLastname,
      data.MotherLastname,
      data.InstitutionalCode,
      data.InstitutionalEmail,
      data.IdUserRole,
      IdUser,
    ]);

    //@ts-ignore
    if (rows.affectedRows > 0) {
      return 2;
    } else return 3;
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
        data.IdSystemUserRole,
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

export const updateSystemUser = async (data: any, IdUser: number) => {
  try {
    //@ts-ignore

    const sqlQuery =
      'UPDATE systemuser SET FirstName=?,FatherLastname=?,MotherLastname=?,InstitutionalCode=?,Password=?,IdSystemUserRole=? WHERE Id=?';
    const [rows, fields] = await (
      await connection
    ).query(sqlQuery, [
      data.FirstName,
      data.FatherLastname,
      data.MotherLastname,
      data.InstitutionalCode,
      data.Password,
      data.IdSystemUserRole,
      IdUser,
    ]);

    //@ts-ignore
    if (rows.affectedRows > 0) {
      return 2;
    } else return 3;
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

export const getUserByInstitutionalCode = async (
  institutionalCode: string
): Promise<userModel> => {
  const sqlQuery =
    'SELECT * FROM user WHERE InstitutionalCode= ? AND isActive=1';

  const [result, fields] = await (
    await connection
  ).query<userModel & RowDataPacket[][]>(sqlQuery, institutionalCode);

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
    'SELECT `e`.`Id`, `e`.`IdEquipmentType`, `et`.`Name` `EquipmentTypeName`, `e`.`IdEquipmentQualityStatus`,`e`.`IsUnique`, `eqs`.`Name` `EquipmentQualityStatusName`, `e`.`SerialNumber`, `e`.`Description`, `e`.`Location`, `e`.`Code` FROM `Equipment` `e` INNER JOIN `EquipmentType` `et` ON `e`.`IdEquipmentType` = `et`.`Id` INNER JOIN `EquipmentQualityStatus` `eqs` ON `e`.`IdEquipmentQualityStatus` = `eqs`.`Id` WHERE `e`.`IsActive` = 1  and  `e`.`Id` NOT IN(select IdEquipment from Mantenimiento);';

  const [result, fields] = await (
    await connection
  ).query<displayEquipmentModel & RowDataPacket[][]>(sqlQuery);

  return result;
};

export const getEquipmentByCode = async (
  code: any
): Promise<displayEquipmentModel> => {
  const sqlQuery =
    'SELECT `Equipment`.`Id`,`Equipment`.`IdEquipmentType`,`EquipmentType`.`Name` `EquipmentTypeName`,`Equipment`.`IdEquipmentQualityStatus`,`Equipment`.`IsUnique`,`EquipmentQualityStatus`.`Name` `EquipmentQualityStatusName`,`Equipment`.`SerialNumber`,`Equipment`.`Description`,`Equipment`.`Location`,`Equipment`.`Code` FROM `Equipment` INNER JOIN `EquipmentType` ON `Equipment`.`IdEquipmentType` =`EquipmentType`.`Id` INNER JOIN `EquipmentQualityStatus` ON `Equipment`.`IdEquipmentQualityStatus` =`EquipmentQualityStatus`.`Id` WHERE `Equipment`.`IsActive`=1 and `Equipment`.`Id` NOT IN(select IdEquipment from Mantenimiento) and `Equipment`.Code=?;';

  const [result, fields] = await (
    await connection
  ).query<displayEquipmentModel & RowDataPacket[][]>(sqlQuery, [code]);

  return result;
};

export const getEquipmentByCodeForLoan = async (
  code: any
): Promise<displayEquipmentModel> => {
  const sqlQuery =
    'SELECT `Equipment`.`Id`,`Equipment`.`IdEquipmentType`,`EquipmentType`.`Name` `EquipmentTypeName`,`Equipment`.`IdEquipmentQualityStatus`,`Equipment`.`IsUnique`,`EquipmentQualityStatus`.`Name` `EquipmentQualityStatusName`,`Equipment`.`SerialNumber`,`Equipment`.`Description`,`Equipment`.`Location`,`Equipment`.`Code` FROM `Equipment` INNER JOIN `EquipmentType` ON`Equipment`.`IdEquipmentType` =`EquipmentType`.`Id` INNER JOIN `EquipmentQualityStatus`ON`Equipment`.`IdEquipmentQualityStatus` =`EquipmentQualityStatus`.`Id`INNER JOIN `equipmentloandetail`ON`Equipment`.`Id` =`equipmentloandetail`.`IdEquipment`INNER JOIN `equipmentloan`ON `equipmentloandetail`.`IdEquipmentLoan` =`equipmentloan`.`Id`WHERE `Equipment`.`IsActive` =1 and `Equipment`.`Code`=?  and `Equipment`.`Id` NOT IN(select IdEquipment from Mantenimiento) AND  `Equipment`.`Id` NOT IN (Select Id from Equipment where `Equipment`.`IsUnique` = 0) AND  `equipmentloan`.`IsActive`=1;';

  const [result, fields] = await (
    await connection
  ).query<displayEquipmentModel & RowDataPacket[][]>(sqlQuery, [code]);

  return result;
};

export const getAllMaintenanceEquipment =
  async (): Promise<displayMaintenanceEquipmentModel> => {
    const sqlQuery =
      'Select	`Equipment`.`Id`, `Equipment`.`SerialNumber`, `Equipment`.`IdEquipmentType`,`Equipment`.`IsUnique`, `ET`.`Name` `EquipmentTypeName`, `Equipment`.`Location`, `Equipment`.`IdEquipmentQualityStatus` , `eqs`.`Name` `EquipmentQualityStatusName`, `Equipment`.`Description`, `Equipment`.`Code`, `Mantenimiento`.`ID` `IdMaintenance`, `Mantenimiento`.`Frecuencia`, `Mantenimiento`.`UltimoMant`, `Mantenimiento`.`ProximoMant`, `Mantenimiento`.`EnMantenimiento` from `Equipment` inner join `Mantenimiento` on `Equipment`.`ID` = `Mantenimiento`.`IdEquipment` INNER JOIN `EquipmentType` `ET` ON `IdEquipmentType` = `ET`.`Id` INNER JOIN `EquipmentQualityStatus` `eqs` ON `Equipment`.`IdEquipmentQualityStatus` = `eqs`.`Id` where `Equipment`.`IsActive` = 1 and `Mantenimiento`.`EnMantenimiento` = 0 ORDER BY `Mantenimiento`.`ProximoMant`;';

    const [result, fields] = await (
      await connection
    ).query<displayMaintenanceEquipmentModel & RowDataPacket[][]>(sqlQuery);

    return result;
  };

export const getAllEquipmentTypes = async (): Promise<EquipmentTypeModel> => {
  const sqlQuery =
    'Select Id, Name, Description from EquipmentType where IsActive = 1 order by Name';

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

// export const getEquipmentByCode = async (
//   code: any
// ): Promise<EquipmentModel> => {
//   const sqlQuery = 'SELECT * FROM equipment WHERE Code=? AND isActive=1';

//   const [result, fields] = await (
//     await connection
//   ).query<EquipmentModel & RowDataPacket[][]>(sqlQuery, code);

//   return result;
// };

export const registerNewEquipment = async (
  registerType: boolean,
  data: any
) => {
  try {
    const equipmentExist = await getEquipmentByCode(data.Code);

    //@ts-ignore
    if (equipmentExist.length > 0) {
      return 1;
    } else {
      if (registerType === true) {
        const sqlQuery =
          'CALL `sicore`.`RegisterEquipment`(1, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0);';
        const [rows, fields] = await (
          await connection
        ).query(sqlQuery, [
          data.IdEquipmentType,
          data.IdEquipmentQualityStatus,
          data.SerialNumber,
          data.Description,
          data.Code,
          data.Location,
          data.IsUnique,
          data.Frecuencia,
          data.UltimoMant,
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

export const updateEquipment = async (
  registerType: boolean,
  data: any,
  IdEquipment: number,
  IdMaintenance: number
) => {
  try {
    if (registerType === true) {
      const sqlQuery =
        'CALL `sicore`.`UpdateEquipment`( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,0);';
      const [rows, fields] = await (
        await connection
      ).query(sqlQuery, [
        IdEquipment,
        IdMaintenance,
        data.IdEquipmentType,
        data.IdEquipmentQualityStatus,
        data.SerialNumber,
        data.Description,
        data.Code,
        data.Location,
        data.IsUnique,
        data.Frecuencia,
        data.UltimoMant,
      ]);

      //@ts-ignore
      if (rows.affectedRows > 0) {
        return 2;
      } else return 3;
    } else {
      const sqlQuery =
        'UPDATE Equipment SET IdEquipmentType=?, IdEquipmentQualityStatus=?, SerialNumber=?, Code=?, Description=?, Location=? WHERE `Id`=?;';
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
        IdEquipment,
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

export const deactivateEquipment = async (idEquipment: number) => {
  const sqlQuery = 'UPDATE Equipment set IsActive = 0 WHERE Id=?';
  const [rows, fields] = await (await connection).query(sqlQuery, idEquipment);

  //@ts-ignore
  if (rows.affectedRows > 0) {
    return 2;
  } else return 3;
};

export const getAllEquipmentInMaintenance =
  async (): Promise<displayMaintenanceEquipmentModel> => {
    const sqlQuery =
      'Select	`Equipment`.`Id`, `Equipment`.`SerialNumber`, `Equipment`.`IdEquipmentType`,`Equipment`.`IsUnique`, `ET`.`Name` `EquipmentTypeName`, `Equipment`.`Location`, `Equipment`.`IdEquipmentQualityStatus` , `eqs`.`Name` `EquipmentQualityStatusName`, `Equipment`.`Description`, `Equipment`.`Code`, `Mantenimiento`.`ID` `IdMaintenance`, `Mantenimiento`.`Frecuencia`, `Mantenimiento`.`UltimoMant`, `Mantenimiento`.`ProximoMant`, `Mantenimiento`.`EnMantenimiento` from `Equipment` inner join `Mantenimiento` on `Equipment`.`ID` = `Mantenimiento`.`IdEquipment` INNER JOIN `EquipmentType` `ET` ON `IdEquipmentType` = `ET`.`Id` INNER JOIN `EquipmentQualityStatus` `eqs` ON `Equipment`.`IdEquipmentQualityStatus` = `eqs`.`Id` where `Equipment`.`IsActive` = 0 and `Mantenimiento`.`EnMantenimiento` = 1 ORDER BY `Mantenimiento`.`ProximoMant`;';

    const [result, fields] = await (
      await connection
    ).query<displayMaintenanceEquipmentModel & RowDataPacket[][]>(sqlQuery);

    return result;
  };

export const putEquipmentInMaintenance = async (data: any) => {
  const sqlChangeEquipment = 'UPDATE Equipment SET IsActive = 0 WHERE Id=?';
  const sqlChangeMaintenance =
    'UPDATE Mantenimiento SET EnMantenimiento = 1 WHERE Id=?';

  const [result, fields] = await (
    await connection
  ).query(sqlChangeEquipment, data.Id);

  //@ts-ignore
  if (result.affectedRows > 0) {
    const [result2, fields] = await (
      await connection
    ).query(sqlChangeMaintenance, data.IdMaintenance);

    //@ts-ignore
    if (result2.affectedRows > 0) return 2;
  } else return 3;
};

export const putEquipmentInInventory = async (data: any) => {
  const today = new Date();
  const UMantenimiento =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const sqlQuery =
    'CALL `sicore`.`UpdateEquipment`( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,0);';
  const [rows, fields] = await (
    await connection
  ).query(sqlQuery, [
    data.Id,
    data.IdMaintenance,
    data.IdEquipmentType,
    data.IdEquipmentQualityStatus,
    data.SerialNumber,
    data.Description,
    data.Code,
    data.Location,
    data.IsUnique,
    data.Frecuencia,
    UMantenimiento,
  ]);

  //@ts-ignore
  if (rows.affectedRows > 0) {
    return 2;
  } else return 3;
};

export const getAllEquipmentLoans =
  async (): Promise<displayEquipmentLoanModel> => {
    const sqlQuery =
      'SELECT `equipmentloan`.`Id` as `IdLoan`,	`user`.`Id` as `IdUser`, `user`.`FirstName`, `user`.`FatherLastname`, `user`.`MotherLastname`, `user`.`InstitutionalCode`, `equipmentloan`.`LendDateTime`, `equipmentloan`.`IsActive`FROM `equipmentloan`INNER JOIN `user` ON `equipmentloan`.`IdUser` = `User`.`Id`WHERE `equipmentloan`.`IsActive` = 1;';

    const [result, fields] = await (
      await connection
    ).query<displayEquipmentLoanModel & RowDataPacket[][]>(sqlQuery);

    return result;
  };

export const newEquipmentLoan = async (
  InstitutionalCode: string,
  data: any
) => {
  const userExist = await getUserByInstitutionalCode(InstitutionalCode);
  //@ts-ignore
  if (userExist.length > 0) {
    const sqlQuery = 'INSERT INTO `EquipmentLoan` (`IdUser`) VALUES (?); ';
    const sqlQueryLoan =
      'INSERT INTO `EquipmentLoanDetail` (`IdEquipmentLoan`, `IdEquipment`) VALUES (?, ?);';

    const [row, fields] = await (
      await connection
    )
      //@ts-ignore
      .query(sqlQuery, userExist[0].Id);

    //@ts-ignore
    const insertedRow = row.insertId;

    try {
      data.forEach(async (element: any) => {
        const [rows, fields] = await (
          await connection
        ).query(sqlQueryLoan, [insertedRow, element.Id]);
      });
      return 2;
    } catch (error) {
      return 0;
    }
  } else {
    return 1;
  }
};

export const newCategory = async (data: any) => {
  const sqlQueryVerify = 'select * from equipmenttype where Name =?;';
  const sqlQuery = 'INSERT INTO `equipmenttype` (`Name`) VALUES (?);';

  const [rows, fields] = await (await connection).query(sqlQueryVerify, data);
  //@ts-ignore
  if (rows.length > 0) {
    return 1;
  } else {
    const [rows1, fields] = await (await connection).query(sqlQuery, data);

    //@ts-ignore
    if (rows1.affectedRows > 0) return 2;
    else return 0;
  }
};

export const getLoanDetails = async (
  IdUser: any,
  IdLoan: any
): Promise<EquipmentModel> => {
  const sqlQuery =
    'SELECT `equipment`.`Id`, `EquipmentType`.`Name` `EquipmentTypeName`,`equipment`.`Description`, `Code`, `Location`,`EquipmentQualityStatus`.`Name` `EquipmentQualityStatusName` FROM equipment INNER JOIN `EquipmentType` ON`Equipment`.`IdEquipmentType` =`EquipmentType`.`Id` INNER JOIN `EquipmentQualityStatus` ON `Equipment`.`IdEquipmentQualityStatus` =`EquipmentQualityStatus`.`Id` INNER JOIN equipmentloandetail ON equipment.Id = equipmentloandetail.IdEquipment INNER JOIN equipmentloan ON equipmentloandetail.IdEquipmentLoan = equipmentloan.Id WHERE equipmentloandetail.IsActive =1 and equipmentloan.isActive =1 and equipmentloan.IdUser = ? and equipmentloan.Id =?;';

  const [result, fields] = await (
    await connection
  ).query<EquipmentModel & RowDataPacket[][]>(sqlQuery, [IdUser, IdLoan]);

  return result;
};
