import mongoose from "mongoose";

export type User = {
  email: string;
  passwordHash: string;
  hatchwaysId?: string;
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
  hatchwaysId: {
    type: String,
    required: false,
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
