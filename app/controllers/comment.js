const { Comments } = require('../models');

const createComment = (req, res) => {
  const { commentar } = req.body;
  Comments.create({
    id_user: req.userId,
    id_article: req.params.id,
    commentar,
  }).then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil membuat commentar',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const deleteComment = (req, res) => {
  const { id } = req.params;
  Comments.destroy({
    where: {
      id,
    },
  }).then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menghapus commentar',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

module.exports = { createComment, deleteComment };
