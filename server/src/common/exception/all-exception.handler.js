const AllExceptionHandler = (app) => {
  app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      error: err.message,
    });
  });
};

export default AllExceptionHandler;