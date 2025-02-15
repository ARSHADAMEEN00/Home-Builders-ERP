import { Document } from 'mongoose';

export interface User extends Document {
  node: any;
  name: string;
  username: string;
  email: string;
  password: string;
  walletAmount: number;
  token?: string;
  role?: string;
}
