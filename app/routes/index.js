/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const express = require('express');
const {
  getArticles,
  searchArticle,
  viewersIncrement,
  getArticlesId,
  addArticles,
} = require('../controllers/article');

const {
  getUsers,
  getUserById,
  editUserByAdmin,
  deleteUserByAdmin,
  editUserByUser,
  deleteUserByUser,
  searchUser,
  getUsersByAuth,
} = require('../controllers/users');

const {
  addCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategory,
  getCategoryById,
} = require('../controllers/category');

const { getRoles, getRoleById } = require('../controllers/roles');
const { checkDuplicateEmail, register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { createComment, deleteComment, editCommentByUser } = require('../controllers/comment');
const { verifyToken, isAuthor, isAdmin } = require('../middleware/verifyJwtToken');
const { viewForAdmin, viewAuthor } = require('../controllers/view');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars

// * route regis and login
router.post(
  '/register',
  checkDuplicateEmail,
  register,

);
router.post(
  '/login',
  login,

);

// * route article
router.get(
  '/articles',
  getArticles,
);
router.get(
  '/articles/:id',
  viewersIncrement,
  getArticlesId,
);
router.get(
  '/articles/search/:q',
  searchArticle,
);
router.post(
  '/addArticle',
  addArticles,
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
router.get(
  '/userByAuth',
  verifyToken,
  getUsersByAuth,
);
router.get(
  '/user/search/:q',
  searchUser,
);
router.put(
  '/user/editAdmin/:id',
  verifyToken,
  isAdmin,
  editUserByAdmin,
);
router.delete(
  '/user/deleteAdmin',
  verifyToken,
  isAdmin,
  deleteUserByAdmin,
);
router.put(
  '/user/edit',
  verifyToken,
  editUserByUser,
);
router.delete(
  '/user/delete',
  verifyToken,
  deleteUserByUser,
);

// * route category
router.post(
  '/category',
  addCategory,
);
router.get(
  '/category',
  getCategory,
);
router.get(
  '/category/:id',
  getCategoryById,
);
router.put(
  '/category/:id',
  updateCategoryById,
);
router.delete(
  '/category/:id',
  deleteCategoryById,
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

// * route comment
router.post(
  '/article/:id/comment',
  verifyToken,
  createComment,
);

router.delete(
  '/article/comment/:id',
  verifyToken,
  deleteComment,
);

router.put(
  '/article/editcomment/:id',
  verifyToken,
  editCommentByUser,
);

// * route buat view
router.get(
  '/author/view',
  verifyToken,
  isAuthor,
  viewAuthor,
);

router.get(
  '/admin/view',
  verifyToken,
  isAdmin,
  viewForAdmin,
);

module.exports = router;
