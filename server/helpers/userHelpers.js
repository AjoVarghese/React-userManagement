const connection=require('../config/connection')
const collection=require('../config/collection')
const bcrypt=require('bcrypt')
const {ObjectID}=require('bson')
const cloudinary=require('../cloudinary')



module.exports={
    doSignUp:(userData) => {
        return new Promise(async(resolve,reject)=>{
            let user=await connection.get().collection(collection.USER_DETAILS).findOne({email:userData.email})
            let emailStatus=false
            
            if(!user){
                bcrypt.hash(userData.password,10,(err,hash)=>{
                  if(err) throw err
                  else{
                    userData.password = hash
                    userData.loginStatus = true
                    userData.image = "https://www.liveabout.com/thmb/APMQQFMHcHHnJyXnZntsFDu0RLo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/peter_2008_v2F_hires1-56a00f083df78cafda9fdcb6.jpg"
                    connection.get().collection(collection.USER_DETAILS).insertOne(userData).then((data)=>{
                        resolve(data)
                    })
                  }
                })
            }else{
                emailStatus=true
                resolve(emailStatus)
            }
        })
    },

    doLogin:(loginData) =>{
        return new Promise(async(resolve,reject)=>{
            let user=await connection.get().collection(collection.USER_DETAILS).findOne({email:loginData.email})
            
            if(user){
                if(user.loginStatus){
                bcrypt.compare(loginData.password,user.password,(err,result)=>{
                    let response=user
                     
                    if(err){
                        throw err
                       
                    }else if(result === true){
                        console.log("result true");
                        response.status = true
                        console.log("login response",response);
                        resolve(response)
                    }else{
                        console.log("result false");
                        response.status = false
                        resolve(response)
                    }
                })
            }else{
                emailStatus=true
                console.log("emailStatus true");
                resolve(emailStatus)
            }
            }else{
                
                emailStatus=true
                console.log("emailStatus true");
                resolve(emailStatus)
            }
        })
    },

    doFind : (id) =>{
        return new Promise((resolve,reject)=>{
            connection.get().collection(collection.USER_DETAILS).findOne({_id:ObjectID(id)}).then((data)=>{
                resolve(data)
            })
        })
    },

    doUploadProfile:(data) => {
        return new Promise((resolve,reject)=>{
            connection.get().collection(collection.USER_DETAILS).updateOne({
                _id:ObjectID(data.id)
            },
            {
                $set:{image:data.image}
            }
            )
            resolve(data.image)
        })
    },

    getImage : (details) =>{ 
        console.log('details',details);
        return new Promise((resolve,reject)=>{
            connection.get().collection(collection.USER_DETAILS).findOne({_id:ObjectID(details)}).then((data)=>{
                console.log('found',data);
                resolve(data)
            })
        })
    }

    
}



