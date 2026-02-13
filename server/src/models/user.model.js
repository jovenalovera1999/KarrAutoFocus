const pool = require("../config/db");

const findByUsername = async (username) => {
  const [rows] = await pool.query(
    "SELECT * FROM tbl_users WHERE username = ?",
    [username],
  );

  return rows[0];
};

const createUser = async (
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
  const [result] = await pool.query(
    "INSERT INTO tbl_users(first_name, middle_name, last_name, suffix_name, birth_date, contact_number, email, role_id, branch_id, username, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
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
    ],
  );

  return result.insertId;
};

module.exports = { findByUsername, createUser };
