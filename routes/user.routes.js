import express from 'express';
import User from '../controllers/user.controller.js';

const users = express.Router();

users.post('/getUsersList', User.getUserList);
users.post('/getDiscordMessages', User.getDiscordMessages);



export default users;