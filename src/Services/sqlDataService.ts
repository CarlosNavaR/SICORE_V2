import { RowDataPacket } from 'mysql2';
import { db } from './database';
import { SystemUserModel } from '../models/SystemUserModel';
import { userModel } from '../models/userModel';
import { AuthModel } from '_/models/authModel';
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
