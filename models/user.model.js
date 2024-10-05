import db from "../config/db.connection.js";

const userModel = {
  getUserList: async () => {
    const result = await db
      .select(
        "mu.iAdminId as user_id",
        "mu.vName AS user_name",
        "mu.eStatus AS user_status",
        "dm.iDiscordMasterId as discord_id",
        "dm.vShortCode as discord_name"
      )
      .from("mod_user as mu")
      .leftJoin("user_discord_transition as udt", "udt.iAdminId", "mu.iAdminId")
      .leftJoin(
        "discord_master as dm",
        "dm.iDiscordMasterId",
        "udt.iDiscordMasterId"
      )
      .where("mu.eStatus", "Active");
    return result;
  },
  getDiscordInfo: async (short_code) => {
    const result = await db
      .select(
        "dm.iDiscordMasterId as discord_master_id",
        "dm.vShortCode as discord_name"
      )
      .from("discord_master as dm")
      .where("dm.vShortCode", short_code)
      .limit(1)
      .first();
    return result;
  },
  addUserMessage: async (add_data) => {
    let result = await db.insert(add_data).into("discord_message");
    return result;
  },
  getDiscordMessages: async (where_cond) => {
    const result =  db
      .select(
        "dm.tMessage as message",
        "dm.iDiscordMasterId as discord_id",
        "dm.iAdminId as user_id",
        "mu.vName as user_name",
        "dm.iDiscordMessageId as discord_message_id",
        "dm.iSysRecDeleted as is_delete"
      )
      .from("discord_message as dm")
      .leftJoin("mod_user as mu", "mu.iAdminId", "dm.iAdminId")
      .whereRaw(where_cond);
      console.log(result.toString());
    return result;
  },
  getUserNameById: async (user_id) => {
    const result = await db
      .select("vName as user_name")
      .from("mod_user")
      .where("iAdminId", user_id)
      .limit(1)
      .first();
    return result;
  },
  updateUserMessage: async (update_data, where_cond) => {
    const result = await db("discord_message")
      .update(update_data)
      .whereRaw(where_cond);
    return result;
  },
};
export default userModel;
