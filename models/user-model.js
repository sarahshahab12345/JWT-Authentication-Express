import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your Name"],
    },
    userEmail: {
      type: String,
      required: [true, "Please enter your Email"],
    },
    userPassword: {
      type: String,
      required: [true, "Please enter your Password"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
