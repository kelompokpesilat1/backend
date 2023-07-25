/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const express = require('express');
const { addArticles, getArticles, getArticlesById, putArticles, deleteArticles, searchArticle, viewersIncrement } = require('../controllers/article');
const {
  getUsers,
  getUserById,
  editUserByAdmin,
  deleteUserByAdmin,
  editUserByUser,
  deleteUserByUser,
  searchUser,
} = require('../controllers/users');
const { addCategory, getCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/category');
const { getRoles, getRoleById } = require('../controllers/roles');
const { checkDuplicateEmail, register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { createComment, deleteComment, editCommentByUser } = require('../controllers/comment');
const { verifyToken, isAuthor, isAdmin, } = require('../middleware/verifyJwtToken');

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
router.post(
  '/articles',
  verifyToken,
  isAuthor,
  addArticles,
);
router.get(
  '/articles',
  verifyToken,
  isAuthor,
  getArticles,
);
router.get(
  '/articles/:id',
  verifyToken,
  isAuthor,
  getArticlesById,
);
router.put(
  '/articles/edit/:id',
  verifyToken,
  isAuthor,
  putArticles,
);
router.delete(
  '/articles/delete/:id',
  verifyToken,
  isAuthor,
  deleteArticles,
);
router.get(
  '/articles/search/:q',
  searchArticle,
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
  '/user/search/:q',
  searchUser,
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
  verifyToken,
  isAuthor,
  addCategory,
);
router.get(
  '/category',
  verifyToken,
  isAuthor,
  getCategory,
);
router.get(
  '/category/:id',
  verifyToken,
  isAuthor,
  getCategoryById,
);
router.put(
  '/category/edit/:id',
  verifyToken,
  isAuthor,
  updateCategoryById,
);
router.delete(
  '/category/delete/:id',
  verifyToken,
  isAuthor,
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

module.exports = router;