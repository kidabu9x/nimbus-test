const express = require('express');
const router = express.Router();

// Question Model
const Question = require('../../models/Question');

// @route   GET api/questions/:module
// @desc    Create an examl
// @access  Public
router.get('/:module', (req, res) => {
  let module = req.params.module;
  Question.find({
    module: module
  })
    .then(questions => {
      let queue = questions.filter(q => q.definitely_appear);
      let pending = questions.filter(q => !q.definitely_appear);
      for (let i = 0; i < questions.length; i++) {
        if (queue.length < 45 && pending.length > 0) {
          let randQuest = getRandomQuest(pending);
          pending.splice(pending.findIndex(e => e.id == randQuest.id), 1);
          queue.push(randQuest);
        }
      }
      queue = shuffleArr(queue);
      res.json(queue.map(quest => {
        quest.is_match = false;
        if (quest.answer_type == 'multi_choice') {
          quest.answers.map(ans => {
            ans.user_choice = false;
            ans.is_correct = false;
            return ans;
          })
          quest.answers = shuffleArr(quest.answers);
        } else if (quest.answer_type == 'drag_drop') {
          let dragItems   = quest.answers.filter(e => e.type == 'drag_item');
          let dropTargets = quest.answers.filter(e => e.type == 'drop_target');
          let dropZone = [];
          let i = 0;
          while (i < dropTargets.length) {
            i++;
            dropZone.push({
              id : null,
              content : null
            })
          }
          // Check if content of first item doesnt start with 'Bước',
          // Shuffle all content
          let firstItem = dragItems[0].content.trim().split(' ');
          if (firstItem[0].toLowerCase() != 'bước') {
            dragItems = shuffleArr(dragItems);
          }
          dragItems.push({
            id: null,
            content : null
          });
          dropTargets = shuffleArr(dropTargets);
          quest.answers = [dragItems, dropZone, dropTargets];
        }
        return quest;
      }));
    });

    function shuffleArr(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function getRandomQuest(arr) {
      return arr[Math.round(Math.random() * (arr.length - 1))];
    }
      
    function questExists(arr, quest) {
      return arr.indexOf(quest) > -1;
    }
});

// @route   POST api/questions/:id
// @desc    Check A Question
// @access  Public
router.post('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      let checkQuest = req.body;
      let count = 0;
      if (checkQuest.answer_type == 'multi_choice') {
        for (let ans of checkQuest.answers) {
          let rawAns = question.answers[question.answers.findIndex(e => e.id == ans.id)];
          if ((ans.user_choice && rawAns.is_correct) || (!ans.user_choice && !rawAns.is_correct)) {
            count ++;
          }
          ans.is_correct = rawAns.is_correct;
        }
        checkQuest.is_match = count == question.answers.length ? true : false;
      } else if (checkQuest.answer_type == 'drag_drop') {
        for (let i = 0; i < checkQuest.answers[2].length; i++) {
          if (checkQuest.answers[2][i].match_with == checkQuest.answers[1][i].id) {
            count ++;
          }
        }
        checkQuest.is_match = count == checkQuest.answers[1].length ? true : false;
      }
      // Update result to database
      if (!checkQuest.is_match) {
        question.incorrect_times += 1;
      }
      question.called_times += 1;
      question.save().then(() => {
        res.json(checkQuest);
      })
    })
});

module.exports = router;