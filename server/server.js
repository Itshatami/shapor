import app from "./app.js";
import { config } from "dotenv";
import connectToDB from "./src/config/mongoose.config.js";
import http from "http";

config();

const startServer = async () => {
  const PORT = process.env.PORT;
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => console.log(`live on ${PORT}`));
};

async function run() {
  connectToDB();
  startServer();
}

run();
