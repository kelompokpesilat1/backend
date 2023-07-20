/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const express = require('express');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
		  'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUpController.checkDuplicateUserNameOrEmail,
      verifySignUpController.checkRolesExisted,
    ],
    verifySignController.signup,
  );

  app.post('/api/auth/signin', (req, res) => {
    verifySignController.signIn(req, res);
  });

  // Status
  app.get('/api/status', (req, res) => {
    statusController.list(req, res);
  });
  app.get('/api/statususer', [verifyJwtTokenController.verifyToken], (req, res) => {
    statusController.listStatusUser(req, res);
  });
  app.get(
    '/api/status/:id',
    [
      verifyJwtTokenController.verifyToken,
      verifyJwtTokenController.isAdmin,
    ],
    (req, res) => {
      statusController.getById(req, res);
    },
  );
  app.post(
    '/api/status',
    [
      verifyJwtTokenController.verifyToken,
      verifyJwtTokenController.isAdmin,
    ],
    (req, res) => {
      statusController.add(req, res);
    },
  );
  app.put(
    '/api/status/:id',
    [
      verifyJwtTokenController.verifyToken,
      verifyJwtTokenController.isAdmin,
    ],
    (req, res) => {
      statusController.update(req, res);
    },
  );
  app.delete(
    '/api/status/:id',
    [
      verifyJwtTokenController.verifyToken,
      verifyJwtTokenController.isAdmin,
    ],
    (req, res) => {
      statusController.delete(req, res);
    },
  );
};
