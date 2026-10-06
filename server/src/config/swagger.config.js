import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

export default function swaggerConfig(app) {
  const swaggerDocumentaion = swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "wall backend",
        version: "0.0.1",
        contact: "its a divar clone",
      },
    },
    apis: [process.cwd() + "/src/module/**/*.swagger.js"],
  });

  const swagger = setup(swaggerDocumentaion, {});

  app.use("/swagger", serve, swagger);
}
