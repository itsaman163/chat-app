/**
 * Define here all helpers/utils file as global variable
 */
import apiResp from "../utils/api_response.js";


// Provide sucess and error related response method 
if (!global.API_RESPONSE)
    global.API_RESPONSE = apiResp;

