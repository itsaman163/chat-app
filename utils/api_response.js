import getMessageByCode from '../languages/en/messages.js';

const apiSuccess =  async (res, messageCode = null, data = [],success = 1) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    
    var response = {
            settings : {success:success,message:getMessageByCode(messageCode)},
            data : []
        };

    // if(typeof data != 'undefined' && data != '' && data != null){
    // }
    
    response.data = data;   
    return res.send(response);

};

const apiFailure = async (res, messageCode, statusCode = 200) => {

    var response = {
            settings : {success:0,message:getMessageByCode(messageCode)},
            data : []
        };
    
    statusCode = (messageCode == 9999) ? 500 : statusCode;
    return res.status(statusCode).send(response);

};

export default {apiSuccess, apiFailure};