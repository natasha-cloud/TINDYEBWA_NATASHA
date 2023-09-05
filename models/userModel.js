const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  email: { type: String, required: true, unique: true },
});

// Method to compare passwords during logins
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// This runs before saving user model
userSchema.pre("save", async function (next) {
  // Checks if password field has been modified
  if (!this.isModified("password")) {
    return next();
  }
  

  try {
    // Encrypt password if password field has been modified
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// for indexing for search
userSchema.index({ "$**": "text" });

module.exports = mongoose.model("User", userSchema);
