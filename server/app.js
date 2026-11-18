import express from "express";
import swaggerConfig from "./src/config/swagger.config.js";
import AllExpceptionHandler from "./src/common/exception/all-exception.handler.js";
import NotFoundHandler from "./src/common/exception/not-found.handler.js";
import AppRotuer from "./src/module/app.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// body-parser
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
  app.use(express.json());
  app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// Routes
app.use(AppRotuer);

// swagger
swaggerConfig(app);

// error-handler
AllExpceptionHandler(app);

// notfound-handler
NotFoundHandler(app);

export default app;
