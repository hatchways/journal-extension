import mongoose from "mongoose";

export type User = {
  email: string;
  passwordHash: string;
};

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
