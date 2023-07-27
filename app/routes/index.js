/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const express = require('express');
const multer = require('multer');

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
const {
  createComment,
  deleteComment,
  editCommentByUser,
} = require('../controllers/comment');
const {
  verifyToken,
  isAuthor,
  isAdmin,
} = require('../middleware/verifyJwtToken');
const { viewForAdmin, viewAuthor } = require('../controllers/view');
const { createSEO, deleteSEO } = require('../controllers/seo');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory where files will be stored
    cb(null, './assets');
  },
  filename: (req, file, cb) => {
    // Customize the filename (optional)
    // In this example, we keep the original filename
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* GET home page. */
// eslint-disable-next-line no-unused-vars

// * route regis and login
router.post('/register', checkDuplicateEmail, register);
router.post('/login', login);

// * route article
router.get('/articles', getArticles);
router.get('/articles/:id', viewersIncrement, getArticlesId);
router.get('/articles/search/:q', searchArticle);
router.post('/addArticle', verifyToken, isAuthor, addArticles);

// * route user
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/userByAuth', verifyToken, getUsersByAuth);
router.get('/user/search/:q', searchUser);
router.put('/user/editAdmin/:id', verifyToken, isAdmin, upload.single('foto'), editUserByAdmin);
router.delete('/user/deleteAdmin', verifyToken, isAdmin, deleteUserByAdmin);
router.put('/user/edit', verifyToken, upload.single('foto'), editUserByUser);
router.delete('/user/delete', verifyToken, deleteUserByUser);

// * route category
router.post('/category', addCategory);
router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', updateCategoryById);
router.delete('/category/:id', deleteCategoryById);

// * route roles
router.get('/roles', getRoles);
router.get('/role/:id', getRoleById);

// * route comment
router.post('/article/:id/comment', verifyToken, createComment);

router.delete('/article/comment/:id', verifyToken, deleteComment);

router.put('/article/editcomment/:id', verifyToken, editCommentByUser);

// * route buat view
router.get('/author/view', verifyToken, isAuthor, viewAuthor);

router.get('/admin/view', verifyToken, isAdmin, viewForAdmin);

// * route buat SEO
router.post('/article/:id/seo', upload.single('logo'), createSEO);
router.delete('/seo/:id', deleteSEO);

module.exports = router;
