import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fixed: use function reference
  },
});

userSchema.pre("save", async function (next) {
  // Only hash if the password is new or modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// Fixed: The line below prevents your OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;