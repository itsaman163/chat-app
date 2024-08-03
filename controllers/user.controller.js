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
};

export default User;
