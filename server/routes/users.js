var express = require('express');
var router = express.Router();
var multer=require('multer')
const {protect} = require('../middleware/jwt')
const userLoginPost=require('../controllers/user/login')



//storage
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});



/* GET users listing. */
router.post('/signup',userLoginPost.registerPost)

router.post('/login',userLoginPost.userLoginPost)

router.route('/').get(protect,userLoginPost.userHome)

router.route('/profile').post(userLoginPost.userProfileUpdate)

// router.get('/get-profile',userLoginPost.getProfile)
router.route("/get-profile").get(protect,userLoginPost.getProfile)

module.exports = router;
