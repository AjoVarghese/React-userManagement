var express = require('express');
var router = express.Router();
const adminPost=require('../controllers/admin/adminLogin')



router.post('/login',adminPost.adminLogin)

router.route('/').post(adminPost.adminHome)

router.route('/block').post(adminPost.adminBlock)

router.route('/update').post(adminPost.updateUser)
module.exports = router;
