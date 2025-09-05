import { asyncHandler } from "../utils/async.handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { Project } from "../models/project.models.js";
import { User } from "../models/user.models.js";
import { ProjectMember } from "../models/projecMember.models.js";
import { UserRolesEnum } from "../utils/constants.js";
import mongoose from "mongoose";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

const projectCommonAggregation = (req) => {
  return [
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
        pipeline: [
          {
            $project: {
              password: 0,
              refreshToken: 0,
              forgotPasswordToken: 0,
              forgotPasswordExpiry: 0,
              emailVerificationToken: 0,
              emailVerificationExpiry: 0,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "projectmembers",
        localField: "_id",
        foreignField: "project",
        as: "projectMembers",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "project",
        as: "tasks",
      },
    },
    {
      $lookup: {
        from: "projectnote",
        localField: "_id",
        foreignField: "project",
        as: "projectNotes",
      },
    },
  ];
};

const getAllProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const projectAggregation = Project.aggregate([
    ...projectCommonAggregation(req),
  ]);

  const projects = await Project.aggregatePaginate(
    projectAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalProjects",
        docs: "projects",
      },
    }),
  );

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(projectId),
      },
    },
    ...projectCommonAggregation(req),
  ]);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project[0], "Project fetched successully"));
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const createdBy = req.user._id;

  const project = await Project.create({
    name,
    description,
    createdBy,
  });

  if (!project) {
    throw new ApiError(400, "Project creation failed");
  }

  await ProjectMember.create({
    project: project._id,
    user: req.user._id,
    role: UserRolesEnum.ADMIN,
  });

  const createdProject = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(project._id),
      },
    },
    ...projectCommonAggregation(req),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, createdProject, "Project created successully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  const project = await Project.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
    createdBy: req.user?._id,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    project._id,
    {
      $set: {
        name,
        description,
      },
    },
    { new: true },
  );

  const aggregatedProject = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(updatedProject._id),
      },
    },
    ...projectCommonAggregation(req),
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        aggregatedProject[0],
        "Project updated succussfullly",
      ),
    );
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(projectId),
        createdBy: req.user?._id,
      },
    },
    ...projectCommonAggregation(req),
  ]);

  if (!project[0] || project.length === 0) {
    throw new ApiError(404, "Project not found");
  }

  const deletedProject = await Project.findByIdAndDelete(projectId);

  await ProjectMember.deleteMany({ project: projectId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project deleted succussfully"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(projectId),
      },
    },
    ...projectCommonAggregation(req),
  ]);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const projectMembers = await ProjectMember.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "projectmemberDetails",
        pipeline: [
          {
            $project: {
              password: 0,
              refreshToken: 0,
              forgotPasswordToken: 0,
              forgotPasswordExpiry: 0,
              emailVerificationToken: 0,
              emailVerificationExpiry: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$projectmemberDetails", // Unwind the array to get a single object
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        projectMembers,
        "Project members fetched succussfully",
      ),
    );
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  const project = await Project.findById(projectId);
  const user = await User.findById(userId);

  if (!project || !user) {
    throw new ApiError(404, "Project or User not found");
  }

  const existingMember = await ProjectMember.findOne({
    project: projectId,
    user: userId,
  });

  if (existingMember) {
    throw new ApiError(400, "User is already a member of the project");
  }

  const newMember = await ProjectMember.create({
    project: projectId,
    user: userId,
    role,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, newMember, "Member added to project successfully"),
    );
});

const deleteMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;

  console.log(projectId, userId);

  const deletedProjectMember = await ProjectMember.findOneAndDelete({
    user: userId,
    project: projectId,
  });

  if (!deletedProjectMember) {
    throw new ApiError(404, "Project member not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Member deleted from project successfully"));
});

const updateMemberRole = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;
  const { role } = req.body;

  const projectMember = await ProjectMember.findOneAndUpdate(
    { project: projectId, user: userId },
    { role },
    { new: true },
  );

  if (!projectMember) {
    throw new ApiError(404, "Project member not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, projectMember, "Member role updated successfully"),
    );
});

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getAllProjects,
  updateMemberRole,
  updateProject,
};
