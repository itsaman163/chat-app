import express from "express";

import "./utils/global.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/index.js";
import bodyParser from "body-parser";
import multer from "multer";
// import pathErrorHandler from "./middleware/path_handler.js";
import { config } from "./config/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import userModel from "./models/user.model.js";

const app = express();
const server = createServer(app);
const io = new Server(server,{
  connectionStateRecovery: {}
});
const form = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(form.array());

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());

io.on('connection', (socket) => {
  const discord_name = 'gaming_discord'
  socket.on(discord_name, async (msg) => {
    console.log("msg---->>",msg);
    let result;
    try {
      const discord_info = userModel.getDiscordInfo(discord_name);
      const add_data = {
        tMessage:msg,
        iDiscordMasterId:discord_info.discord_master_id,
        iAdminId:1
      }
      await userModel.addUserMessage(add_data);
    } catch (e) {
      // TODO handle the failure
      return;
    }
    io.emit(discord_name, msg);
  });
});
app.use("/access", router);
// app.use(pathErrorHandler);

app.listen(config.port, () =>
  console.log(`Server running at port ${config.port}`)
);
