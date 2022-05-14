const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please enter firstname"],
  },
  lastname: {
    type: String,
    required: [true, "please enter lastname"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "minimum password length is 6 characters"],
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});

  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')

}

const User = mongoose.model("user", userSchema);

module.exports = User;
