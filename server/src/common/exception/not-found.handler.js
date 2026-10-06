const NotFoundHandler = (app) => {
  app.use((req, res, next) => {
    return res.json({ message: "route not found" });
  });
};

export default NotFoundHandler;