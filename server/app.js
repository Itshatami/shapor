import express from "express";
import swaggerConfig from "./src/config/swagger.config.js";
import AllExpceptionHandler from "./src/common/exception/all-exception.handler.js";
import NotFoundHandler from "./src/common/exception/not-found.handler.js";
import AppRotuer from "./src/module/app.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// body-parser
app.use(express.json());
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
