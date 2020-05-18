require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/todos');
const app = express();
const port = process.env.PORT || 4000;

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

app.use('/todos', router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
