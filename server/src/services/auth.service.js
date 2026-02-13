const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const register = async (
  first_name,
  middle_name,
  last_name,
  suffix_name,
  birth_date,
  contact_number,
  email,
  role_id,
  branch_id,
  username,
  password,
) => {
  const existingUser = await userModel.findByUsername(username);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 15);
  const userId = await userModel.createUser(
    first_name,
    middle_name,
    last_name,
    suffix_name,
    birth_date,
    contact_number,
    email,
    role_id,
    branch_id,
    username,
    hashedPassword,
  );

  return generateToken({ user_id: userId, username });
};

const login = async (username, password) => {
  const user = userModel.findByUsername(username);

  if (!user) {
    throw new Error("Username or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Username or password is incorrect");
  }

  return generateToken({ user_id: user.user_id, username: user.username });
};

module.exports = { register, login };
