import { HttpException } from '@/exceptions/HttpException';
import { User } from '../user.interface';
import userModel from '../user.model';
import { isEmpty } from '@/utils/util';
import { UpdateUser, UpdateUserDto } from '../user.dto';
import { ClientSession } from 'mongoose';
class UserUserService {
  public userModel = userModel;
  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'id Not Found !!');
    const findUser: User = await this.userModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");
    return findUser;
  }

  // UpdateUserById
  public async UpdateUserById(_id: string, updateDatas: UpdateUserDto): Promise<User> {
    const updateUser = await this.userModel.findByIdAndUpdate(_id, updateDatas, { new: true });
    if (!updateUser) throw new HttpException(409, "You're not user");
    return updateUser;
  }

  public async userBookingAmountDistribution(userId: string, amount: number, session: ClientSession): Promise<any> {
    let user: User = await this.userModel.findOne({ _id: userId }).session(session);
    if (amount <= 0) {
      return { balanceAmount: 0, haveBalance: false };
    }
    // Finding top line 10 users
    let toplineUsers: User[] = await this.userModel
      .find({ node: { $lt: user.node } })
      .sort({ node: -1 })
      .limit(10)
      .session(session); // Include session for transaction
    // Finding bottom line 10 users
    let bottomLineUsers: User[] = await this.userModel
      .find({ node: { $gt: user.node } })
      .sort({ node: 1 })
      .limit(10)
      .session(session); // Include session for transaction
    let singleDistributionAmount = amount / 20;
    // Distribute the amount to each user in top line users
    if (toplineUsers.length > 0) {
      for (let toplineUser of toplineUsers) {
        toplineUser.walletAmount += singleDistributionAmount;
        await toplineUser.save({ validateBeforeSave: false, session }); // Include session
      }
    }
    // Distribute the amount to each user in bottom line users
    if (bottomLineUsers.length > 0) {
      for (let bottomLineUser of bottomLineUsers) {
        bottomLineUser.walletAmount += singleDistributionAmount;
        await bottomLineUser.save({ validateBeforeSave: false, session }); // Include session
      }
    }
    let balanceAmount = amount - (toplineUsers.length + bottomLineUsers.length) * singleDistributionAmount;
    let haveBalance: boolean = balanceAmount > 0;
    return { balanceAmount, haveBalance };
  }
}

export default UserUserService;
