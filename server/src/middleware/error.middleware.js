const errorHandler = (err, req, res, next) => {
  res.status(400).json({ message: err.message || "Server Error" });
};

module.exports = errorHandler;
