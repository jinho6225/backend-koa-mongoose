const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book 에서 사용할 서브다큐먼트의 스키마입니다.
const Author = new Schema({
  name: String,
  email: String,
});

const Book = new Schema({
  title: String,
  authors: [Author], // 위에서 만든 Author 스키마를 가진 객체들의 배열형태로 설정했습니다.
  publishedDate: Date,
  price: Number,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', Book);
