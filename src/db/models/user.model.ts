import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const validRoles = ['user', 'admin'];

const userSchema = new Schema({
  name: String,
  phone: String,
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: validRoles}
}, {timestamps: true});

userSchema.methods.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};

userSchema.path('email').validate( async (value) => {
  const emailCount = await mongoose.models.user.countDocuments({email: value});
  return !emailCount;
}, 'Email already exists');

export default mongoose.model('user', userSchema);
