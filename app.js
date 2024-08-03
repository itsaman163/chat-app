import express from "express";

import "./utils/global.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/index.js";
import bodyParser from "body-parser";
import multer from "multer";
import pathErrorHandler from "./middleware/path_handler.js";
import { config } from "./config/index.js";

const app = express();
const form = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(form.array());


app.use(cors({ credentials:true, origin:'*'}));
app.use(cookieParser());
app.use(express.json());
app.use('/access',router);
app.use(pathErrorHandler);

app.listen(config.port, ()=> console.log(`Server running at port ${config.port}`));