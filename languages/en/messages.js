const messages = {
    /*Auth Controller Messages*/
    1001: "Invalid User Name !",
    1002: "Invalid Password !",
    1003: "Logged In Successfully.",


    /*Project Controller Messages*/
    2001: "Project List Found.",
    2002: "Project Info Found.",


    /*Project Sprint Controller Messages*/
    2101: "Sprint Created Successfully.",
    2102: "Sprint Updated Successfully.",
    2103: "Sprint Data Found.",
    2104: "Sprint Deleted Successfully.",
    
    /*Project Story Controller Messages*/
    2201: "Story Information Found.",
    
    /*Project Task Controller Messages*/
    2301: "Task Data Found.",

    9999: "Something Went Wrong !"
};


const getMessageByCode = (messageCode) => {
    //check if code is not number then return code as it is.
    if (isNaN(messageCode)) return messageCode;
    return messages[messageCode];
};

export default getMessageByCode;