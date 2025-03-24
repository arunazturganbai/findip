const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const commentRoutes = require('./routes/comments');


// middleware
app.use(express.json());
app.use(express.static('public'));

app.use(cookieParser());  
app.use(checkUser);  
app.use('/comments', commentRoutes);

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// database connection
const dbURI = 'mongodb+srv://arunaz:aru2005@kazsign.9o93vkw.mongodb.net/kazsign?retryWrites=true&w=majority&appName=kazsign';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
  

app.get('/quiz', async (req, res) => {
  res.render('quiz', { questions, user: req.user });
});
const questions = [
  {
    text: "Как на языке жестов 'Алматы'?",
    options: [
      { video: "https://storage.googleapis.com/kazsign/country/africa.mp4" },
      { video: "https://storage.googleapis.com/kazsign/country/africa.mp4" },
      { video: "https://storage.googleapis.com/kazsign/country/africa.mp4" },
    ],
    correctIndex: 1
  },
  {
    text: "Как на языке жестов 'Спасибо'?",
    options: [
      { video: "/videos/q2_opt1.mp4" },
      { video: "/videos/q2_opt2.mp4" },
      { video: "/videos/q2_opt3.mp4" },
    ],
    correctIndex: 0
  },
  // Добавьте ещё 8 аналогичных вопросов
];




// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index', { user: req.session.user }));
app.get('/map', (req, res) => res.render('map'));
app.get('/forum', requireAuth, (req, res) => res.render('forum'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.use(authRoutes);
