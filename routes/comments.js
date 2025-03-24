const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const commentController = require('../controllers/commentController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');




// Все комментарии
router.get('/', async (req, res) => {
  const comments = await Comment.find().populate('userId', 'email'); // связываем с User
  res.json(comments.map(comment => ({
    _id: comment._id,
    text: comment.text,
    userId: comment.userId._id.toString(),
    userEmail: comment.userId.email
  })));
});

// Добавить комментарий
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id; // req.user добавляется после авторизации

    const comment = await Comment.create({ text, userId });
    const populated = await comment.populate('userId', 'email');
    
    res.status(201).json(populated); // отправляем назад с email
  } catch (err) {
    res.status(400).json({ error: 'Failed to add comment' });
  }
});


// Удалить комментарий
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Нет прав удалять этот комментарий' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Комментарий удален' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
