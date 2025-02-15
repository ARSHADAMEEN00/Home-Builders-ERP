import { HttpException } from '@/exceptions/HttpException';
import { SignupUser, UpdateUserDto } from '../user.dto';
import userModel from '../user.model';
import { User } from '../user.interface';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import { ROLE } from '../user.enum';

class AdminUserService {
  public userModel = userModel;

  public async createUser(userData: SignupUser): Promise<User> {
    // const findUser: User = await this.userModel.findOne({ username: userData?.username });
    // if (findUser) throw new HttpException(400, 'User already exists with this username!');
    const findUserByEmail: User = await this.userModel.findOne({ email: userData.email });
    if (findUserByEmail) throw new HttpException(400, 'User already exists with this email!');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userData?.password, salt);
    const createUser: User = await this.userModel.create({ ...userData, password });
    return createUser;
  }

  public async getAllUsers(query: any, limit: string, page: string): Promise<User[]> {
    // console.log(query.search);
    let queryData = {};

    if (query.start_date && query.end_date) {
      const from = moment(query.start_date, 'YYYY/MM/DD').startOf('day');
      const to = moment(query.end_date, 'YYYY/MM/DD').endOf('day');
      queryData['createdAt'] = { $gte: from, $lte: to };
      console.log(queryData);
    }
    const users = await this.userModel.find(queryData);
    if (!users) throw new HttpException(400, 'Something Wrong !!');
    return users;
  }

  public async UpdateUserById(_id: string, updateDatas: UpdateUserDto): Promise<User> {
    const updateUser: User = await this.userModel.findByIdAndUpdate(_id, updateDatas, { new: true });
    if (!updateUser) throw new HttpException(409, "You're not user");
    return updateUser;
  }

  public async deleteUser(userId: Types.ObjectId | string): Promise<any> {
    const deleteUserById = await this.userModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, 'You are not user !');
    return deleteUserById;
  }

  public async getUserByToken(token: string): Promise<User> {
    const user: User = await this.userModel.findOne({ token });
    if (!user) throw new HttpException(400, 'Not a user');
    return user;
  }

  public async isAdmin(userId: any): Promise<boolean> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) throw new HttpException(400, 'Not a user');

    return user.role === ROLE.ADMIN;
  }
}

export default AdminUserService;
