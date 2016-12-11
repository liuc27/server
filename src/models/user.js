import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const User = new Schema({
  id: String,
  passowrd: String,
  name: String,
  country: String,
  language: Array,
  occupation: String,
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
