const adminHelpers=require('../../helpers/adminHelpers')


exports.adminLogin=(req,res)=>{
    
   adminHelpers.doLogin(req.body).then((data)=>{
      console.log("Admin Login",data);
       if(data === null){
         res.status(401).json("Invalid User")
       }else if(data.status == true){
         res.status(200).json(data)
       }else{
         res.status(401).json("invalid User")
       }
   })
}

exports.adminHome=(req,res)=>{
  adminHelpers.doFindAllUsers().then((data)=>{
    
    if(data != null){
      res.status(200).json(data)
    }
  })
}


exports.adminBlock=(req,res)=>{
  console.log("block",req.body);
  adminHelpers.blockUnblockUser(req.body).then((data)=>{
    console.log("blockdata",data);
    if(data != null){
      res.status(200).json("USER BLOCKED SUCCESSFLYY")
    }else{
      res.status(400).json("Error")
    }
  })
}


exports.updateUser=(req,res)=>{
  console.log("update",req.body);
  adminHelpers.doUpdateUser(req.body).then((data)=>{
    //  if(data == true){
    //   res.status(400).json("email is already there")
    //  }else{
      console.log(data);
      res.status(200).json(data)
    //  }
  })
}