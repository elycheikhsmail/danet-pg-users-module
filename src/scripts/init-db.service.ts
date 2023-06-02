import { DbConfig } from './db-config.ts';

export class InitDbService extends DbConfig {
  constructor() {
    super();
  }

  async createTable() {
    await this.onAppBootstrap();
    await this.client.queryObject(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS todo (
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR NOT NULL,
        content TEXT
      );`,
    );

    await this.client.queryObject(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS articles (
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR NOT NULL,
        content TEXT,
        price INTEGER
      );`,
      // later I will add the following colomuns
      // categorie Integer,
      // subcategorie Integer
      // image_link TEXT
    );

    await this.client.queryObject(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS users (
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT,
        password TEXT
      );`,
    );

    await this.onAppClose();
    console.log('task done');
  }
}
