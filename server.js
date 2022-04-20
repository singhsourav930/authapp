const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const cors = require('cors');
const upload = require('express-fileupload');
const mongoose = require('mongoose');
mongoose.pluralize(null);
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const conn = mongoose.connection;

conn.on('open', async () => {
  console.log('server connected.');
});

const corsOptions = {
  origin: '*',
};
app.use(express.static(path.join(__dirname, '/web/build')));

app.use(cors(corsOptions));

app.use(express.json());
app.use(upload());

//Page routes
require('./routes')(app);

//Home page route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/web/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started.');
  console.log('process.env.DB_CONNECT',process.env.DB_CONNECT)
  console.log(`Server running at http://localhost:${process.env.PORT || 8080}`);
});
