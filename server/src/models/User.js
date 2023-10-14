const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "minimum length of password is 6 characters"],
  },
  city:{
    type:String,
    required: true,
  },
  chat: [{
    message:{
      type:String,
      required: true,
    },
    condition:{
      type:String, 
      required:true,
    },
    response:{
      type:String,
      //required: true,
    }
  }]
});
UserSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
module.exports = new mongoose.model("User", UserSchema);
