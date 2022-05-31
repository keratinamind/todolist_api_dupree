const express = require("express");
const { getAllTodo, createTodo, updateTodo, deleteTodo, getTodoById } = require("../controllers/todosController");
const { authenticate} = require('../controllers/authController');
const router = express.Router();

router.get("/", authenticate , getAllTodo);
router.get("/:id", authenticate, getTodoById);
router.post("/", authenticate, createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

module.exports = router;
