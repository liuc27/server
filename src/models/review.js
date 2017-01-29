import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Review = new Schema({
  user_id: String,
  guider_id: String,
  comment: String,
  grade: String,
  created: { type: Date, default: Date.now }, 
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('review', Review);
