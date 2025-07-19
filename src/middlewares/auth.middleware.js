import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async.handler.js";
import { generateAccessTokenAndRefreshTokens } from "../controllers/auth.controllers.js";

export const authCheck = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
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
  } catch (error) {
    // If the access token is expired, try to refresh it
    if (error.name === "TokenExpiredError" && refreshToken) {
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );

        const user = await User.findById(decodedRefreshToken?._id).select(
          "-password -emailVerificationToken -emailVerificationExpiry",
        );
        if (!user || refreshToken !== user.refreshToken) {
          throw new ApiError(401, "Invalid refresh token");
        }

        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await generateAccessTokenAndRefreshTokens(user._id);

        // Update the user's refresh token in the database
        user.refreshToken = newRefreshToken;
        await user.save();

        // Set the new tokens in cookies
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        };
        res.cookie("accessToken", newAccessToken, cookieOptions);
        res.cookie("refreshToken", newRefreshToken, cookieOptions);

        // Attach the user to the request object
        req.user = user;
        next();
      } catch (refreshError) {
        throw new ApiError(
          401,
          "Unable to refresh token: " + refreshError.message,
        );
      }
    } else {
      throw new ApiError(401, error.message || "Invalid access token");
    }
  }
});
