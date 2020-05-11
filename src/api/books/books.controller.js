const Book = require('models/book');
const {
  Types: { ObjectId },
} = require('mongoose');

//findAll
exports.list = async (ctx) => {
  let books;

  try {
    books = await Book.find().exec();
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = books;
};

// exports.list = async (ctx) => {
//   let books;
//   try {
//     books = await Book.find()
//       .sort({ _id: -1 }) //_id reverse direction
//       .limit(3) // showing only 3
//       .exec(); // request data to server
//   } catch (e) {
//     return ctx.throw(500, e);
//   }
//   ctx.body = books;
// };

exports.create = async (ctx) => {
  const { title, authors, publishedDate, price, tags } = ctx.request.body;

  const book = new Book({
    title,
    authors,
    publishedDate,
    price,
    tags,
  });

  try {
    await book.save();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = book;
};

//findOne
exports.get = async (ctx) => {
  const { id } = ctx.params;

  let book;

  try {
    book = await Book.findById(id).exec();
  } catch (e) {
    if (e.name === 'CastError') {
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e);
  }

  if (!book) {
    ctx.status = 404;
    ctx.body = { message: 'book not found' };
    return;
  }

  ctx.body = book;
};

//.remove: 특정 조건을 만족하는 데이터들을 모두 지웁니다.
//.findByIdAndRemove: id 를 찾아서 지웁니다.
//.findOneAndRemove: 특정 조건을 만족하는 데이터 하나를 찾아서 지웁니다.
exports.delete = async (ctx) => {
  const { id } = ctx.params;

  try {
    await Book.findByIdAndRemove(id).exec();
  } catch (e) {
    if (e.name === 'CastError') {
      ctx.status = 400;
      return;
    }
  }

  ctx.status = 204; // No Content
};

exports.replace = async (ctx) => {
  let book;

  try {
    book = await Book.findByIdAndUpdate(id, ctx.request.body, {
      upsert: true,
      new: true,
    });
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = book;
};

exports.update = async (ctx) => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  let book;

  try {
    book = await Book.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    });
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = book;
};
