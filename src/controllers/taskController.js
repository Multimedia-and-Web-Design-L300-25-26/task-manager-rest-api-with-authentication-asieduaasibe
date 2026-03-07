import Task from '../models/Task.js';
import mongoose from 'mongoose';

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const task = await Task.create({
      title,
      description,
      userId: req.userId
    });
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get all tasks for authenticated user
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
      .sort('-createdAt');
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        message: 'Invalid task ID format' 
      });
    }

    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }
    
    // Check if user owns the task
    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ 
        message: 'Not authorized to delete this task' 
      });
    }
    
    await task.deleteOne();
    
    res.json({ 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};