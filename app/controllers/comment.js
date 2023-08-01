const { Comments, Article } = require('../models');

const createComment = async (req, res) => {
   const { commentar } = req.body;

   const article = await Article.findOne({
      where: { title: req.params.title }
   });

   Comments.create({
      id_user: req.userId,
      id_article: article.id,
      commentar
   })
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil membuat commentar',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

const deleteComment = async (req, res) => {
   const { id } = req.params;
   const { userId } = req;

   const comment = await Comments.findByPk(id);

   if (comment.id_user !== userId) {
      return res.status(500).send({
         status: 'fail',
         message: 'maaf anda tidak bisa menghapus komentar ini'
      });
   }

   const deleteComment = await comment.destroy();

   if (deleteComment) {
      return res.status(200).send({
         status: 'success',
         message: 'Berhasil Menghapus komentar'
      });
   }

   return res.status(500).send({
      status: 'fail',
      message: 'Gagal Menghapus komentar'
   });
};

const editCommentByUser = (req, res) => {
   const { id } = req.params;
   const { commentar } = req.body;
   const { userId } = req;
   Comments.findByPk(id)
      .then((comment) => {
         if (comment.id_user !== userId) {
            res.status(500).send({
               status: 'fail',
               message: 'maaf anda tidak bisa mengubah komentar ini'
            });
            return;
         }
         comment
            .update({
               commentar
            })
            .then((data) => {
               res.send({
                  status: 'success',
                  message: 'berhasil mengupdata commentar',
                  commentar: data.commentar
               });
            })
            .catch((err) => {
               res.status(500).send(err.message);
            });
      })
      .catch((err) => {
         res.status(500).send(err.message);
      });
};

module.exports = { createComment, deleteComment, editCommentByUser };
