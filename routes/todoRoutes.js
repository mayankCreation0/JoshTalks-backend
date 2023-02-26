
const express = require('express');
const { addTodo, getTodos, getTodoById, updateTodoById, deleteTodoById, addObjectToLists, updateObjectInLists, deleteObjectFromLists } = require('../controller/todoController');
const checkUserAuth = require('../Middleware/auth');

const routes = express.Router();
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

routes.post('/add',checkUserAuth,asyncHandler(addTodo));
routes.get('/',asyncHandler(getTodos));
routes.get('/:id',asyncHandler(getTodoById));
routes.put('/:id',checkUserAuth,asyncHandler(updateTodoById));
routes.delete('/:id',checkUserAuth,asyncHandler(deleteTodoById));
routes.post('/lists/:id',checkUserAuth,asyncHandler(addObjectToLists));
routes.put('/lists/:id',checkUserAuth,asyncHandler(updateObjectInLists));
routes.delete('/lists/:id',checkUserAuth,asyncHandler(deleteObjectFromLists));

module.exports=routes;
