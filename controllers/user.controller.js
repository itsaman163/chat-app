import userModel from "../models/user.model.js";

const User = {
  getUserList: async (req, res, next) => {
    try {
      const user_list = await userModel.getUserList();
      return API_RESPONSE.apiSuccess(res, "Usre Data Found.", user_list);
    } catch (error) {
      next(error);
    }
  },
  getDiscordMessages: async (req, res, next) => {
    try {
      const { discord_id = 0 } = req.body;
      if(!discord_id) return API_RESPONSE.apiFailure(res,"discord_id is required!!");
      const where_cond = `iDiscordMasterId = ${discord_id}`;
      const discord_msg_data = await userModel.getDiscordMessages(where_cond);
      return API_RESPONSE.apiSuccess(res, "Discord Messages Data Found.", discord_msg_data);
    } catch (error) {
      next(error);
    }
  },
};

export default User;
