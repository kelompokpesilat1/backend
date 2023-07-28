/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const express = require('express');
const {
   addArticles,
   getArticles,
   getArticlesById,
   putArticlesById,
   deleteArticlesById,
   searchArticle,
   viewersIncrement
} = require('../controllers/article');
const {
   getUsers,
   getUserById,
   editUserByAdmin,
   deleteUserByAdmin,
   editUserByUser,
   deleteUserByUser,
   searchUser,
   getUsersByAuth
} = require('../controllers/users');
const {
   addCategory,
   getCategory,
   getCategoryById,
   updateCategoryById,
   deleteCategoryById
} = require('../controllers/category');
const { getRoles, getRoleById } = require('../controllers/roles');
const { checkDuplicateEmail, register } = require('../controllers/register');
const { login } = require('../controllers/login');
const {
   createComment,
   deleteComment,
   editCommentByUser
} = require('../controllers/comment');
const {
   verifyToken,
   isAuthor,
   isAdmin,
   isAuthorOrAdmin
} = require('../middleware/verifyJwtToken');
const { viewForAdmin, viewAuthor } = require('../controllers/view');
const { createSEO, updateSEO, getSEO } = require('../controllers/seo');

const router = express.Router();
const multer = require('multer');
const { getViewersPerMonth } = require('../controllers/analytic');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      // Specify the destination directory where files will be stored
      cb(null, './assets');
   },
   filename: (req, file, cb) => {
      // Customize the filename (optional)
      // In this example, we keep the original filename
      cb(null, file.originalname);
   }
});

const upload = multer({ storage });

router.post('/register', checkDuplicateEmail, register);
router.post('/login', login);

// * route article
router.post(
   '/articles',
   upload.single('cover'),
   verifyToken,
   isAuthor,
   addArticles
);
router.get('/articles', getArticles);
router.get('/articles/:id', viewersIncrement, getArticlesById);
router.get('/articles/search/:q', searchArticle);
router.delete(
   '/articles/delete/:id',
   verifyToken,
   isAuthorOrAdmin,
   deleteArticlesById
);
router.put(
   '/articles/update/:id',
   upload.single('cover'),
   verifyToken,
   isAuthorOrAdmin,
   putArticlesById
);

// * route user
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/userByAuth', verifyToken, getUsersByAuth);
router.get('/user/search/:q', searchUser);
router.put('/user/editAdmin/:id', verifyToken, isAdmin, editUserByAdmin);
router.delete('/user/deleteAdmin/:id', verifyToken, isAdmin, deleteUserByAdmin);
router.put(
   '/user/edit/:id',
   verifyToken,
   upload.single('foto'),
   editUserByUser
);
router.delete('/user/delete/:id', verifyToken, deleteUserByUser);

// * route category
router.post('/category', addCategory);
router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);
router.put('/category/update/:id', updateCategoryById);
router.delete('/category/delete/:id', deleteCategoryById);

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
router.post('/addseo', verifyToken, isAuthor, upload.single('logo'), createSEO);
router.get('/seo', getSEO, verifyToken, isAuthor);
router.put('/updateseo/:id', verifyToken, upload.single('logo'), isAuthor, updateSEO);

router.get('/view', getViewersPerMonth)

module.exports = router;
