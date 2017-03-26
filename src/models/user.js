import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const User = new Schema({
  id: String,
  passowrd: String,
  nickname: String,
  contact: Array,
  country: String,
  province: String,
  city: String,
  language: Array,
  sex: String,
  age: String,
  image: String,
  credit: String,
  created: { type: Date, default: Date.now }, 
  updated: { type: Date, default: Date.now }
});

User.methods.generateHash = (password) => {
  return bcrtpt.hashSync(password, 8);
};

User.methods.validateHash = (password) => {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', User);
