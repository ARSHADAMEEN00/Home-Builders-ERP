import { HttpException } from '@/exceptions/HttpException';
import { LoginUser, SignupUser } from '../user/user.dto';
import { User } from '../user/user.interface';
import userModel from '../user/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  public userModel = userModel;
  public async userSingup(userData: SignupUser): Promise<User> {
    const findUser: User = await this.userModel.findOne({ username: userData?.username });
    if (findUser) throw new HttpException(400, 'User already exists with this username!');
    const findUserByEmail: User = await this.userModel.findOne({ email: userData.email });
    if (findUserByEmail) throw new HttpException(400, 'User already exists with this email!');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userData?.password, salt);
    const createUser: User = await this.userModel.create({ ...userData, password });
    return createUser;
  }
  public async userLogin(loginData: LoginUser): Promise<any> {
    const user: User = await this.userModel.findOne({ email: loginData.email });
    if (!user) throw new HttpException(409, 'Please check Credential !!');
    const isPasswordMatched = await bcrypt.compare(loginData?.password, user?.password);
    if (!isPasswordMatched) throw new HttpException(409, `Password doesn't match`);
    if (!user?.token) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      });
      user.token = token;
      await user.save({ validateBeforeSave: false });
    }
    return user;
  }
}

export default AuthService;
