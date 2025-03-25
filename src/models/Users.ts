import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "../types/users.types";
import bcrypt from "bcryptjs";
import { COMMAN_REGEX, ERROR_MESSAGES, USER_ROLES } from "../constants";

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [COMMAN_REGEX.EMAIL_REGEX, ERROR_MESSAGES.INVALID_EMAIL],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, ERROR_MESSAGES.PASSWORD_MIN],
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.READER,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

userSchema.virtual("isAdmin").get(function () {
  return this.role === "admin";
});

const User = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
);

export default User;