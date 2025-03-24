const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().lean();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id; // предположим, у тебя есть аутентификация и req.user

    const comment = new Comment({ text, userId });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при сохранении комментария' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Нет прав удалять этот комментарий' });
    }

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Комментарий успешно удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
