const errorHandler = (err, req, res, next) => {
  console.error("SERVER ERROR STACK:", err);

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  let errorType = err.name;

  if (err.code === 11000) {
    status = 409;
    errorType = "DuplicateKeyError";
    const field = Object.keys(err.keyValue).join(", ");
    message = `The field '${field}' is already registered. Please use a different value.`;
  }

  if (err.name === "ValidationError") {
    status = 400;
    errorType = "ValidationError";
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Validation Failed: ${errors.join("; ")}`;
  }

  if (err.name === "CastError") {
    status = 400;
    errorType = "CastError";
    message = `Invalid ID format for parameter: ${err.path}`;
  }

  res.status(status).json({
    status: status,
    error: errorType,
    message: message,
  });
};

module.exports = errorHandler;
