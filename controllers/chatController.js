var express = require("express");  
var router = express.Router();  
const { showChats } = require('../services/chatService');  

router.get('/', showChats);  

module.exports = router;