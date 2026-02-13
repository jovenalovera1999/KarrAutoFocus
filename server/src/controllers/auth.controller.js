const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const {
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
    } = req.body;

    const token = await authService.register(
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
    );

    res.status(201).json({ token, message: "User successfully created" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
