// controllers/todo.controller.ts
import { Request, Response } from 'express';
import { Todo } from '../models/model.todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;

    let todos;

    if (filter === 'completed') {
      todos = await Todo.find({ completed: true });
    } else if (filter === 'pending') {
      todos = await Todo.find({ completed: false });
    } else {
      todos = await Todo.find();
    }

    res.json(todos);
  } catch {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      completed: false,
    });

    res.status(201).json(todo);
  } catch {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Not found' });

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};