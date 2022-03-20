import mySql, { Connection } from 'mysql2/promise';

export class db {
  public static connection: Connection;

  public static async dbConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }
    await this.createConnection();
    return this.connection;
  }
  private static async createConnection() {
    this.connection = await mySql.createConnection({
      host: '192.168.3.3',
      port: 3306,
      user: 'sicore_app',
      password: 'sicore_app',
      database: 'sicore',
    });
  }
}
