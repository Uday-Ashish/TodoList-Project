const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createTodoController, getTodoController, deleteTodoController, updateTodoController } = require("../controllers/todoController");


const router = express.Router();


// create todo
router.post("/create", authMiddleware, createTodoController);


//get todo
router.post("/getAll/:userId", authMiddleware, getTodoController);

//delete todo
router.delete("/delete/:id", authMiddleware, deleteTodoController);

//updatetodo
router.patch("/update/:id", authMiddleware , updateTodoController);


module.exports = router;