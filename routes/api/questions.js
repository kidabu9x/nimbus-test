const express = require('express');
const router = express.Router();

// Question Model
const Question = require('../../models/Question');

// @route   GET api/questions
// @desc    Get All Questions
// @access  Public
router.get('/', (req, res) => {
  Question.find()
    .then(questions => res.json(questions));
});

// @route   GET api/questions/:module
// @desc    Create an examl
// @access  Public
router.get('/:module', (req, res) => {
  let module = req.params.module;
  if (module == 1) {
    Question.find(
      {
        module: 1
      }
    )
    .then(questions => {
      let totalQuests = Math.floor(Math.random() * 2) + 38;
      let response = questions.filter(q => q.definitely_appear);
      let pending = questions.filter(q => !q.definitely_appear);
      let forms = [];

      function getRandomQuest() {
        return pending[Math.round(Math.random() * (pending.length - 1))];
      }
      
      function questExists(quest) {
        return response.indexOf(quest) > -1;
      }
      while (response.length < totalQuests) {
        let randQuest = getRandomQuest();
        if (!questExists(randQuest) && randQuest.form != 1) {
          if (forms.length == 0 || !forms.some(form => form.form == randQuest.form)) {
            forms.push({
              form: randQuest.form,
              count: 1
            })
            response.push(randQuest)
          } else {
            forms.forEach(form => {
              if (form.form == randQuest.form && form.count < 2) {
                response.push(randQuest)
                form.count ++
              }
            })
          }
        }
      }
      function shuffleArr(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
      shuffleArr(response);
      response = response.map(quest => {
        quest['is_match'] = false;
        quest.answers.map(answer => {
          answer.is_correct = false;
          answer.user_choice = false;
        })
        return quest;
      })
      res.json(response.slice(0, 5));
    });
  } else if (module == 3) {
    Question.find(
      {
        module: 3,
        definitely_appear: true
      }
    )
    .then(questions => {
      function shuffleArr(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
      shuffleArr(questions);
      res.json(questions.map(quest => {
        quest['is_match'] = false;
        quest.answers.map(answer => {
          answer.is_correct = false;
          answer.user_choice = false;
        })
        return quest;
      }));
    });
  }
});

// @route   POST api/questions
// @desc    Create A Question
// @access  Public
router.post('/', (req, res) => {
  const newQuest = new Question({
    module      : req.body.module,
    type        : req.body.type,
    form        : req.body.form,
    content     : req.body.content,
    image       : req.body.image,
    answers     : req.body.answers,
    description : req.body.description,
    definitely_appear: req.body.definitely_appear
  });
  newQuest.save().then(question => res.json(question));
});

// @route   POST api/questions/:id
// @desc    Check A Question
// @access  Public
router.post('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      let checkQuest = req.body;
      let count = 0;
      for (let i = 0; i < checkQuest.answers.length; i++) {
        if (checkQuest.answers[i].user_choice == question.answers[i].is_correct) {
          count ++;
        }
          checkQuest.answers[i].is_correct = question.answers[i].is_correct;
      }
      checkQuest.is_match = count == question.answers.length ? true : false;
      res.json(checkQuest);
    })
});

// @route   UPDATE api/questions
// @desc    Update A Question
// @access  Public
router.put('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      question.module      = req.body.module,
      question.type        = req.body.type,
      question.form        = req.body.form,
      question.content     = req.body.content,
      question.image       = req.body.image,
      question.answers     = req.body.answers,
      question.description = req.body.description,
      question.definitely_appear = req.body.definitely_appear
      question.save()
        .then(() => res.json({success: true}))
        .catch(err => res.json({success: false}))
    })
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/questions/:id
// @desc    Delete A Question
// @access  Public
router.delete('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;