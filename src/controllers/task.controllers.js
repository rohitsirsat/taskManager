import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async.handler.js";
import { Task } from "../models/task.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { SubTask } from "../models/subtask.models.js";

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
const getAllTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    ...taskCommonAggregation(req),
  ]);

  if (tasks.length === 0) {
    throw new ApiError(401, "No task exist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId, projectId } = req.params;

  if (!taskId || !projectId) {
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

  if (!getTask.length) {
    throw new ApiError(404, "Task does not exist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, getTask[0], "Task fetched successfully"));
});

// create task
const createTask = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project ID  required");
  }

  const { title, description, assignedTo, status } = req.body;

  if (
    [title, description, assignedTo, status].some(
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
    assignedBy: new mongoose.Types.ObjectId(req.user?._id),
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
  const { projectId, taskId } = req.params;
  const { title, description, assignedTo, status } = req.body;

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
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

  const updatedtask = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: {
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: new mongoose.Types.ObjectId(assignedTo),
        assignedBy: new mongoose.Types.ObjectId(req._id),
        status,
        attachments,
      },
    },
    { new: true },
  );

  if (!updatedtask) {
    throw new ApiError(500, "Failed to update task");
  }

  const aggregateTask = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(updatedtask._id),
        project: new mongoose.Types.ObjectId(projectId),
      },
    },

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
      $lookup: {
        from: "users",
        localField: "assignedBy",
        foreignField: "_id",
        as: "assignedBy",
        pipeline: [{ $project: { username: 1, avatar: 1 } }],
      },
    },
  ]);

  res
    .status(201)
    .json(new ApiResponse(201, aggregateTask[0], "Task updated successfully"));
});

// delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
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
  const { taskId } = req.params;
  const { title } = req.body;

  if (!taskId) {
    throw new ApiError(400, "Task id required");
  }

  if (!title) {
    throw new ApiError(400, "title id required");
  }

  const createsubTask = await SubTask.create({
    title,
    task: new mongoose.Types.ObjectId(taskId),
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  if (!createsubTask) {
    throw new ApiError(500, "somethig went wrong");
  }

  const createdSubTask = await SubTask.findById(createsubTask._id);

  return res
    .status(200)
    .json(new ApiResponse(200, createdSubTask, "sub task added successfully"));
});

const toggleSubTaskDoneStatus = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params;

  if (!subTaskId) {
    throw new ApiError(400, "Id is required");
  }

  const subTask = await SubTask.findById(subTaskId);

  if (!subTask) {
    throw new ApiError(404, "sub task does not exist");
  }

  subTask.isCompleted = !subTask.isCompleted;
  await subTask.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subTask,
        `sub task marked ${subTask.isCompleted ? "done" : "undone"}`,
      ),
    );
});

// delete subtask
const deleteSubTask = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params;

  const subtask = await SubTask.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(subTaskId),
  });

  if (!subtask) {
    throw new ApiError(404, "sub task does not exist");
  }

  return res.status(200).json(new ApiResponse(200, {}, "SubTask deleted"));
});

export {
  createTask,
  updateTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  createSubTask,
  toggleSubTaskDoneStatus,
  deleteSubTask,
};
