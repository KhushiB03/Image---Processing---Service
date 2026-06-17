import mongoose, { Mongoose } from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}
const schema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("user", schema);
export default User;
