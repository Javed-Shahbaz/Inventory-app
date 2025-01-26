const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "development"
        ? "Error: Please add an email\n    at registerUser (controllers/userController.js:4:11)\n    at Layer.handle [as handle_request] ..."
        : null,
  });
};

module.exports = errorHandler;
