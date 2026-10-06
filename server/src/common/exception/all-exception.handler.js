const AllExpceptionHandler = (app) => {
  app.use((err, req, res, next) => {
    return res.json({ error: err.message });
  });
};
export default AllExpceptionHandler;
