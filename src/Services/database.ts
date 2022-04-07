import mySql, { Connection, Pool } from 'mysql2/promise';

export class db {
  public static connection: Connection | Pool;

  public static async dbConnection(): Promise<Connection | Pool> {
    if (this.connection) {
      return this.connection;
    }
    await this.createConnection();
    return this.connection;
  }
  private static async createConnection() {
    this.connection = await mySql.createPool({
      host: '192.168.151.10',
      port: 3306,
      user: 'sicore_app',
      password: 'sicore_app',
      database: 'sicore',
    });
  }
}
