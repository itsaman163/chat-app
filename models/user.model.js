import db from "../config/db.connection.js";

const userModel = {
    getUserList: async () => {
        const result = await db
            .select('vName as name', 'vToken as token', 'eStatus as status')
            .from('moduser')
            .whereRaw('1=1')
        return result;
    },
    getDiscordInfo: async(short_code) => {
        const result = await db
            .select('dm.iDiscordMasterId as discord_master_id')
            .from('discord_master as dm')
            .where("dm.vShortCode",short_code)
        return result;
    },
    addUserMessage: async (add_data) => {
        let result = await db.insert(add_data).into("discord_message");
        return result;
    }
}
export default userModel;