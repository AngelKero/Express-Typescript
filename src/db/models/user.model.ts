import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from 'src/interfaces/user.interface';
const { Schema } = mongoose;

const validRoles = ['company', 'admin'];

const userSchema = new Schema<User>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: validRoles},
  avatar: {type: String},
  recoveryToken: {type: String, required: false}
}, {timestamps: true});

userSchema.methods.hashPassword = async (password: string | Buffer) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async (password: string | Buffer, user: { password: string; }) => {
  return await bcrypt.compare(password, user.password);
};

userSchema.path('email').validate( async (value: any) => {
  const emailCount = await mongoose.models.user.countDocuments({email: value});
  return !emailCount;
}, 'Email already exists');

export default mongoose.model('user', userSchema);
