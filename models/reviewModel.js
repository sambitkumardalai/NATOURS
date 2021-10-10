const mongoose = require('mogoose');

const reviewSchema = new mognoose.Schema({
  review: {
    type: String,
    required: [true, "Review can't be empty"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});

const Review = mongoose.model('Review', reviewSchem);
module.exports = Review;
