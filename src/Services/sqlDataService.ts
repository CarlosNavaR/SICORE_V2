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

export const getUserById = async (
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
