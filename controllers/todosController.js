const { Todo, User } = require("../models");
const jwt = require("jsonwebtoken");



async function getAllTodo(req, res, next) {
  try {
    // console.log(req.header);
    const todos = await Todo.findAll();
    res.status(200).send(todos);
    
  } catch (err) {
    next(err);
  }
}

async function getTodoById(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id, userId: 1 } });
    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
}

async function createTodo(req, res, next) {
  try {
    

    const { title, status } = req.body;
    const newTodo = await Todo.create({
      title,
      status,
      userId: user.id,
      
    });
    res.status(201).send(newTodo);
  } catch (err) {
    next(err);
  }
}

async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const findTodo = await Todo.findOne({ where: { id, userId: 1 } });
    if (!findTodo) return res.status(400).send({ msg: "todo id is not exist" });
    await Todo.update({ title, status }, { where: { id } });
    res.status(200).send({ msg: `update todo id ${id} success` });
  } catch (err) {
    next(err);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;
    const result = Todo.destroy({ where: { id } });
    console.log(result);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
