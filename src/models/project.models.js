import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { UserRolesEnum } from "../utils/constants.js";
import { User } from "./user.models.js";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

projectSchema.pre("save", async function (next) {
  const user = await User.findById(this.createdBy);

  user.role = UserRolesEnum.ADMIN;
  await user.save({ validateBeforeSave: false });

  next();
});

projectSchema.plugin(mongooseAggregatePaginate);

export const Project = mongoose.model("Project", projectSchema);
