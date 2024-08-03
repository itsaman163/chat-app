import express from 'express';
import User from '../controllers/user.controller.js';

const users = express.Router();

users.post('/getUsersList', User.getUserList);


export default users;