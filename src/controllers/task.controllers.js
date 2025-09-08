import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async.handler.js";
import { Task } from "../models/task.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose, { mongo } from "mongoose";

const taskCommonAggregation = (req) => {
  return [
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
        pipeline: [{ $project: { username: 1, avatar: 1 } }],
      },
    },
    {
      $unwind: "$assignedTo",
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedBy",
        foreignField: "_id",
        as: "assignedBy",
        pipeline: [{ $project: { username: 1, avatar: 1 } }],
      },
    },
    { $unwind: "$assignedBy" },
  ];
};

// get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const { taskId, projectId } = req.params;

  if (!taskId || !projectId) {
    throw new ApiError(400, "task and project id requires");
  }

  const tasks = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    ...taskCommonAggregation(req),
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// get task by id
const getTaskById = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  if (!projectId || !taskId) {
    throw new ApiError(400, "Project and task id required");
  }

  const getTask = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    ...taskCommonAggregation(req),
  ]);

  if (!getTask) {
    throw new ApiError(400, "Task does not exist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, getTask, "Task fetched successfully"));
});

// create task
const createTask = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;

  if (!projectId || !userId) {
    throw new ApiError(400, "Project and User ID are required");
  }

  const { title, description, assignedTo, status } = req.body;

  if (
    [title, description, assignedTo, , status].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  let attachments = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        attachments.push({
          url: result.secure_url,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }
  }

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: new mongoose.Types.ObjectId(assignedTo),
    assignedBy: new mongoose.Types.ObjectId(userId),
    status,
    attachments,
  });

  if (!task) {
    throw new ApiError(500, "Failed to create task");
  }

  const createdTask = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(task._id),
      },
    },
    ...taskCommonAggregation(req),
  ]);

  res
    .status(201)
    .json(new ApiResponse(201, createdTask[0], "Task created successfully"));
});

// update task
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId, userId } = req.params;

  if (!projectId || !userId) {
    throw new ApiError(400, "Project and User ID are required");
  }

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(req.params.taskId),
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  let attachments = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        attachments.push({
          url: result.secure_url,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }
  }

  const updatetask = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: new mongoose.Types.ObjectId(assignedTo),
    assignedBy: new mongoose.Types.ObjectId(userId),
    status,
    attachments,
  });

  if (!updatetask) {
    throw new ApiError(500, "Failed to update task");
  }

  const aggregateTask = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(updatetask._id),
      },
    },
    ...taskCommonAggregation(req),
  ]);

  res
    .status(201)
    .json(new ApiResponse(201, aggregateTask[0], "Task updated successfully"));
});

// delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    ...taskCommonAggregation(req),
  ]);

  if (!task[0] || task.length === 0) {
    throw new ApiError(404, "Task not found");
  }

  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    project: projectId,
  });

  if (!deletedTask) {
    throw new ApiError(500, "Failed to delete task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

// create subtask
const createSubTask = asyncHandler(async (req, res) => {
  // const {title, }
});

// update subtask
const updateSubTask = async (req, res) => {
  // update subtask
};

// delete subtask
const deleteSubTask = async (req, res) => {
  // delete subtask
};

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
