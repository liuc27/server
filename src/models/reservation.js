import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Reservation = new Schema({
  user_id: Array,
  guider_id: Array,
  time: String,
  credit: String,
  paid: String,
  created: { type: Date, default: Date.now }, 
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('reservation', Reservation);
