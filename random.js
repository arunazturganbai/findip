// Примерные вопросы
const sampleQuestionsSet1 = [
  {
    text: "Как на языке жестов 'Алматы'?",
    options: [
      { video: "/videos/q1_opt1.mp4" },
      { video: "/videos/q1_opt2.mp4" },
      { video: "/videos/q1_opt3.mp4" },
    ],
    correctIndex: 1
  },
  {
    text: "Как показать 'Спасибо'?",
    options: [
      { video: "/videos/q2_opt1.mp4" },
      { video: "/videos/q2_opt2.mp4" },
      { video: "/videos/q2_opt3.mp4" },
    ],
    correctIndex: 0
  },
  // добавь ещё 8 вопросов по такой же структуре
];

app.get('/quiz', (req, res) => {
  // В будущем можно рандомизировать вопросы
  res.render('quiz', { questions: sampleQuestionsSet1 });
});
