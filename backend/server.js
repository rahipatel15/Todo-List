const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require("./models/todoList");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your connection URL)
mongoose.connect("mongodb://127.0.0.1/todo", { useNewUrlParser: true, useUnifiedTopology: true });

// Check for database connection errors
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Get saved tasks from the database
app.get("/getTodoList", async (req, res) => {
    try {
        const todoList = await TodoModel.find({});
        res.json(todoList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new task to the database
app.post("/addTodoList", async (req, res) => {
    const todo = new TodoModel({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update task fields (including deadline)
app.patch("/updateTodoList/:id", async (req, res) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete task from the database
app.delete("/deleteTodoList/:id", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
