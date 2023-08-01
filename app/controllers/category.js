/* eslint-disable consistent-return */
const { Category } = require('../models');
const { Article } = require('../models');
const { User } = require('../models');

const addCategory = async (req, res) => {
   try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });

      res.status(200).json({
         status: 'success',
         data: {
            name: newCategory.name
         }
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: 'Gagal menambahkan kategori',
         errors: err.message
      });
   }
};

const getCategory = async (req, res) => {
   try {
      const data = await Category.findAll();
      res.send({
         status: 'success',
         message: 'berhasil menampilkan data',
         data
      });
   } catch (error) {
      res.status(500).send({
         message: 'Terjadi kesalahan saat menampilkan',
         error: error.message
      });
   }
};

const getCategoryById = async (req, res) => {
   try {
      const category = await Category.findByPk(req.params.id);
      const article = await Article.findAll({
         where: { id_category: category.id },
         include: User
      });

      res.status(200).send({
         status: 'success',
         message: 'berhasil menampilkan data',
         data: {
            kategory: category.name,
            article
         }
      });
   } catch (error) {
      res.status(500).send({
         message: 'Terjadi kesalahan saat menampilkan',
         error: error.message
      });
   }
};

const getCategoryByName = async (req, res) => {
   try {
      const category = await Category.findOne({
         where: { name: req.params.name }
      });
      const article = await Article.findAll({
         where: { id_category: category.id },
         include: User
      });

      res.status(200).send({
         status: 'success',
         message: 'berhasil menampilkan data',
         data: {
            kategory: category.name,
            article
         }
      });
   } catch (error) {
      res.status(500).send({
         message: 'Terjadi kesalahan saat menampilkan',
         error: error.message
      });
   }
};

const updateCategoryById = (req, res) => {
   const categoryId = req.params.id;
   const { name } = req.body;

   Category.findByPk(categoryId)
      .then((foundCategory) => {
         if (!foundCategory) {
            return res.status(404).send({
               message: 'Kategori tidak ditemukan'
            });
         }

         foundCategory
            .update({ name })
            .then((updatedCategory) => {
               res.status(200).send({
                  status: 'success',
                  message: 'Kategori berhasil diupdate',
                  name: updatedCategory
               });
            })
            .catch((err) => {
               res.status(500).send({
                  message: 'Error',
                  errors: err.message
               });
            });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error',
            errors: err.message
         });
      });
};

const deleteCategoryById = async (req, res) => {
   try {
      const categoryId = req.params.id;

      const name = await Category.findByPk(categoryId);
      if (!name) {
         return res.status(404).send({
            message: 'Kategori tidak ditemukan'
         });
      }

      await name.destroy();

      res.status(200).send({
         status: 'success',
         message: 'Kategori berhasil dihapus'
      });
   } catch (err) {
      res.status(500).send({
         message: 'Terjadi kesalahan saat menghapus kategori',
         error: err.message
      });
   }
};
module.exports = {
   addCategory,
   getCategory,
   getCategoryById,
   updateCategoryById,
   deleteCategoryById,
   getCategoryByName
};
