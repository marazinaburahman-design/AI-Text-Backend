export function errorHandler(error, req, res, next) {
  console.error("Backend error:", error);

  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({
    message: "Something went wrong while processing your request.",
  });
}
