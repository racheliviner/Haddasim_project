import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import { routesInit } from "./api/routes/config_routes";
import "./api/db/mongoconnect";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
routesInit(app);

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
