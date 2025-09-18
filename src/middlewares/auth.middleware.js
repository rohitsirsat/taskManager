import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async.handler.js";
import { generateAccessTokenAndRefreshTokens } from "../controllers/auth.controllers.js";
import { ProjectMember } from "../models/projecMember.models.js";
import mongoose from "mongoose";

export const authCheck = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  // has accessToken
  try {
    if (accessToken) {
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      );

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry",
      );

      if (!user) {
        throw new ApiError(401, "Invalid accessToken");
      }

      req.user = user;

      next();
    } else if (refreshToken) {
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );

        const user = await User.findById(decodedRefreshToken?._id).select(
          "-password -emailVerificationToken -emailVerificationExpiry",
        );

        if (!user) {
          throw new ApiError(401, "Invalid access");
        }

        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await generateAccessTokenAndRefreshTokens(user?._id);

        // update the user's refresh token in the database
        user.refreshToken = newRefreshToken;
        await user.save();

        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };

        res.cookie("accessToken", newAccessToken, cookieOptions);
        res.cookie("refreshToken", newRefreshToken, cookieOptions);

        req.user = user;
        next();
      } catch (error) {
        throw new ApiError(
          401,
          "Unable to refresh token: " + refreshError.message,
        );
      }
    }
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export const validateProjectPermission = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(401, "Invalid project id");
    }

    const project = await ProjectMember.findOne({
      project: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(req.user?._id),
    });

    if (!project) {
      throw new ApiError(403, "Project not found");
    }

    const givenRole = project?.role;

    req.user.role = givenRole;

    if (!roles.includes(givenRole)) {
      throw new ApiError(403, "You are not allow to perform this action");
    }

    next();
  });
