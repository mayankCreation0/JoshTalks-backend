const TodoModel = require("../models/todoModel");

// Add a new todo
const addTodo = async (req, res) => {
  const { name, description } = req.body;
  const {_id}=req.user;

  try {
    const todo = new TodoModel({
      name,
      description,
      createdBy:_id,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('createdBy');
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a specific todo by id
const getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a todo by id
const updateTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a todo by id
const deleteTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add an object to the lists array in a todo
const addObjectToLists = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const listObject = {
      name,
      status: "incomplete",
    };

    todo.lists.push(listObject);
    await todo.save();

    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an object in the lists array in a todo by id
const updateObjectInLists = async (req, res) => {
  const { id, listId } = req.params;

  try {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const listObject = todo.lists.id(listId);
    if (!listObject) {
      return res.status(404).json({ message: "List object not found" });
    }
    listObject.name = req.body.name || listObject.name;
listObject.status = req.body.status || listObject.status;
await todo.save();

res.status(200).json(todo);
} catch (err) {
    res.status(400).json({ error: err.message });
    }
    };


    // Delete an object from the lists array in a todo by id
const deleteObjectFromLists = async (req, res) => {
    const { id, listId } = req.params;
    
    try {
    const todo = await TodoModel.findById(id);
    if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
    }
    const listObject = todo.lists.id(listId);
if (!listObject) {
  return res.status(404).json({ message: "List object not found" });
}

listObject.remove();
await todo.save();

res.status(200).json(todo);
} catch (err) {
    res.status(400).json({ error: err.message });
    }
    };
    
    module.exports = {
    addTodo,
    getTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById,
    addObjectToLists,
    updateObjectInLists,
    deleteObjectFromLists,
    };
    
