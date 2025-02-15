import { model, Schema, Document, Types } from 'mongoose';
import { User } from './user.interface';
import { ROLE } from './user.enum';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // username: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(ROLE),
        message: 'Please select correct role',
      },
      default: ROLE.USER,
    },
    // node: {
    //   type: Number,
    // },
    // walletAmount: {
    //   type: Number,
    //   default: 0,
    // },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// pre save
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastUser = await this.constructor.findOne({}, {}, { sort: { node: -1 } });
    this.node = lastUser ? lastUser.node + 1 : 1; // Increment node or start at 1
  }
  next();
});

const userModel = model<User & Document>('User', userSchema);
export default userModel;
