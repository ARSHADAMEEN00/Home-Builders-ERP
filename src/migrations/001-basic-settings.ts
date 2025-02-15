import { MigrationInterface } from 'mongo-migrate-ts';
import { Db } from 'mongodb';
import bcrypt from "bcryptjs";

async function bcryptPassword (password: string) {
  const salt = await bcrypt.genSalt(10);
  const bcryptedPassword = await bcrypt.hash(password, salt);
  return bcryptedPassword;
}

export class BasicSettings implements MigrationInterface {

  async up(db: Db): Promise<any> {

  }

  async down(): Promise<any> {
    //
  }
}
