import mongoose from "mongoose";
import { asyncHandler } from "../utils/async.handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { Project } from "../models/project.models.js";
import { User } from "../models/user.models.js";
import { ProjectMember } from "../models/projecMember.models.js";

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successully"));
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    createdBy: req.user._id,
  });

  if (!project) {
    throw new ApiError(400, "Project creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project created successully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  const project = await Project.findByIdAndUpdate(
    projectId,
    { name },
    { description },
    { new: true },
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated succussfullly"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findByIdAndDelete(projectId);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project deleted succussfully"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const projectMembers = await ProjectMember.find();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectMembers },
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

  // const project = await Project.findById(projectId);
  // const user = await User.findById(userId);

  // if (!project || !user) {
  //   throw new ApiError(404, "Project or User not found");
  // }

  const deletedProjectMember = await ProjectMember.findOneAndDelete({
    project: projectId,
    user: userId,
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
  getProjects,
  updateMemberRole,
  updateProject,
};
