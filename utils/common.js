import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const getCURRDIR = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(__filename);
    return dirname;
}

   
export const getDate = async () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
   
    return (year + "-" + month + "-" + date);
};

export const getDateTime = async () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
};

export const getUNQID = async (linked_admin_id=0) => {
    return linked_admin_id > 0 ? linked_admin_id + "-" + uuidv4() : uuidv4();
};

export const getUPcase = async (str) => {
    return str.toUpperCase();
};

export const CLOG = async (str) => {
    console.log(str);
};
export const apiRequest = async (source = 'hrms', apiName = '', apiSetting = {}) => {
    try {

        const { method = "GET", apiParams = null, headers = {} } = apiSetting;
        const apiUrl = { hrms: config.hrms_url }[source];
        const targetUrl = `${apiUrl}${apiName}`;

        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;multipart/form-data";
        axios.defaults.headers.get["Content-Type"] = "application/json;charset=UTF-8";
        axios.defaults.timeout = 1000 * 60; // Wait for 60 seconds

        const options = {
            method,
            url: targetUrl,
            data: apiParams,
            headers,
        };
        const response = await axios(options);
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export default getCURRDIR;