const express = require('express');
const { getArticles, getArticleById } = require('../controllers/article');
const { getUsers, getUserById } = require('../controllers/users');
const { getCategory, getCategoryById } = require('../controllers/category');
const { getRoles, getRoleById } = require('../controllers/roles');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars

// * route article
router.get(
  '/articles',
  getArticles,
);
router.get(
  '/articles/:id',
  getArticleById,
);

// * route user
router.get(
  '/users',
  getUsers,
);
router.get(
  '/user/:id',
  getUserById,
);

// * route category
router.get(
  '/category',
  getCategory,
);
router.get(
  '/category/:id',
  getCategoryById,
);

// * route roles
router.get(
  '/roles',
  getRoles,
);
router.get(
  '/role/:id',
  getRoleById,
);

module.exports = router;
