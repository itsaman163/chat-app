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

io.on("connection", async (socket) => {
  const discord_info = await userModel.getDiscordInfo("gaming_discord");
  const discord_name = discord_info.discord_name;
  socket.on(
    discord_name,
    async ({ message, user_id, type = "add", discord_message_id = "" }) => {
      try {
        const { user_name } = await userModel.getUserNameById(user_id);
        const return_obj = {
          message,
          discord_id: discord_info.discord_master_id,
          user_id: user_id,
          user_name: user_name,
          discord_message_id,
          is_delete: 0,
          type
        };
        const operational_data = {
          tMessage: message,
          iDiscordMasterId: discord_info.discord_master_id,
          iAdminId: user_id || 1, // want user_id
        };
        if (type === "add") {
          const result = await userModel.addUserMessage(operational_data);
          return_obj.discord_message_id = result[0];
        }
        if (type === "update") {
          const where_cond = `iDiscordMessageId = ${discord_message_id}`;
          await userModel.updateUserMessage(operational_data, where_cond);
        }

        if (type === "delete") {
          const where_cond = `iDiscordMessageId = ${discord_message_id}`;
          return_obj.is_delete = 1;
          const delete_data = {
            iSysRecDeleted: return_obj.is_delete,
          };
          await userModel.updateUserMessage(delete_data, where_cond);
        }

        io.emit(discord_name, return_obj);
      } catch (e) {
        // TODO handle the failure
        return;
      }
    }
  );
});
app.use("/access", router);
// app.use(pathErrorHandler);

server.listen(config.port, () =>
  console.log(`Server running at port ${config.port}`)
);
