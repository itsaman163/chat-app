import db from "../config/db.connection.js";

const userModel = {
    getUserList: async () => {
        const result = await db
            .select('mu.iAdminId as user_id', 'mu.vName AS user_name', 'mu.eStatus AS user_status',
                'dm.iDiscordMasterId as discord_id', 'dm.vShortCode as discord_name')
            .from('mod_user as mu')
            .leftJoin('user_discord_transition as udt', 'udt.iAdminId', 'mu.iAdminId')
            .leftJoin('discord_master as dm', 'dm.iDiscordMasterId', 'udt.iDiscordMasterId')
            .where('mu.eStatus','Active')
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