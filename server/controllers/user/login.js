const userHelpers=require('../../helpers/userHelpers')
const generateToken = require('../../utilities/generateToken')

exports.registerPost = (req,res) => {
    
    userHelpers.doSignUp(req.body).then((data)=>{
        if(data === true){
            
            res.status(401).json("User already registered")
        }else{
            
            res.status(200).json(req.body)
        }
    })
}

exports.userLoginPost=(req,res)=>{
    userHelpers.doLogin(req.body).then((data)=>{
        if(data.status === true){
            let details = {
                _id:data._id,
                name:data.name,
                image:data.image,
                loginstatus:data.loginstatus,
                token:generateToken(data._id)
            }
            res.status(200).json(details)
        }else{
            res.status(401).json("Invalid User")
        }
        
    })
}

exports.userProfileUpdate=(req,res) => {
    
    try{
       
        userHelpers.doUploadProfile(req.body).then((data)=>{
            
            res.status(200).json(data)
        })
    } catch (error) {
        console.log('error',error);
        res.status(400).json(error);
    }
}

exports.userHome =(req,res)=>{
    try{

    }catch (error) {
        res.status(400).json(error)
    }
}
exports.getProfile = (req,res) =>{
    try{
        
        userHelpers.getImage(req.query.id).then((data)=>{
            res.status(200).json(data)
        })
    } catch (error) {

    }
}



