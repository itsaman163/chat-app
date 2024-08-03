import express from "express";
import usersRoute from "./user.routes.js";

const router = express.Router();
router.use('/users', usersRoute);
//
router.use((req, res, next) => {
    next({
        statusCode: 404,
        messageCode: 'Method Not Found',
    });
});

router.use((err, req, res, next) => {
    let messageCode = err.messageCode || 9999;
    let statusCode = err.statusCode || 9999;
    API_RESPONSE.apiFailure(res, messageCode, statusCode);
});


export default router;