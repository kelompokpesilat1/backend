const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

// inisiate sequelize
const { sequelize } = require('./models');
const router = require('./routes'); 

// inisiate tambahan
require('dotenv').config();

const port = process.env.PORT;

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));
app.use(router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
