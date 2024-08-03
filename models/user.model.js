import db from "../config/db.connection.js";

const userModel = {
    getUserList: async () => {
        const result = await db
            .select('vName as name', 'vToken as token', 'eStatus as status')
            .from('moduser')
            .whereRaw('1=1')
        return result;
    }
}
export default userModel;