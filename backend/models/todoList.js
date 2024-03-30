const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  }
});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
