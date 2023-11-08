const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err,
    stack: err.stack,
  });
};
module.exports = { errorHandler };
