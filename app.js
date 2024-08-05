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
const io = new Server(server, {
  // connectionStateRecovery: {}
  cors: {
    origin: "*", // Change this to the URL of your client
    // methods: ["GET", "POST"]
  },
});
const form = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(form.array());

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());

io.on("connection", (socket) => {
  console.log({ socket_info: socket });
  const discord_info = userModel.getDiscordInfo("gaming_discord");
  const discord_name = discord_info.discord_name;
  socket.on(discord_name, async ({ message, user_id }) => {
    console.log("msg---->>", message);
    try {
      const add_data = {
        tMessage: message,
        iDiscordMasterId: discord_info.discord_master_id,
        iAdminId: user_id || 1, // want user_id
      };
      await userModel.addUserMessage(add_data);
    } catch (e) {
      // TODO handle the failure
      return;
    }
    const { user_name } = userModel.getUserNameById(user_id);
    const return_obj = {
      message: msg,
      discord_id: discord_info.discord_master_id,
      user_id: user_id,
      user_name: user_name,
    };
    io.emit(discord_name, return_obj);
  });
});
app.use("/access", router);
// app.use(pathErrorHandler);

server.listen(config.port, () =>
  console.log(`Server running at port ${config.port}`)
);
