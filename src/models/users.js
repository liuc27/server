import mongoose from 'mogoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
  id: String,
  passowrd: String,
  name: String,
  country: String,
  language: Array,
  occupation: String,
  created: { type: Date, default: Date.now }, 
  updated: { type: Date, default: Date.now }
});

Account.methods.generateHash = (password) => {
  return bcrtpt.hashSync(password, 8);
};

Account.methods.validateHash = (password) => {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);
