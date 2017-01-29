import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Guider = new Schema({
  id: String,
  password: String,
  nickname: String,
  contact: Array,
  country: String,
  language: Array,
  sex: String,
  age: String,
  image: String,
  occupation: String,
  pay: String,
  certificate: String,
  created: { type: Date, default: Date.now }, 
  updated: { type: Date, default: Date.now }
});

Guider.methods.generateHash = (password) => {
  return bcrtpt.hashSync(password, 8);
};

Guider.methods.validateHash = (password) => {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('guider', Guider);
