import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clearkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: String,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// check if the user model already exists, if it is delete it
if(mongoose.models && mongoose.models["users"]){
    delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
