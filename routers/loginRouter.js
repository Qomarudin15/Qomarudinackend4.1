const express = require('express'); 
const router = express.Router();
const loginService = require('../service/loginService');
router.post('/login', loginService.login); 
router.get('/user', loginService.getUser); 
router.post('/logout', loginService.logout); 
router.post('/tambahUser', loginService.registerUser)
module.exports = router;