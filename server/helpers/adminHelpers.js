const connection = require('../config/connection')
const collection = require('../config/collection')
const { ObjectID } = require('bson')
const { Collection } = require('mongodb')



module.exports={
    doLogin : async(adminData) => {
        return new Promise(async(resolve, reject) => {
            let admin = await connection.get().collection(collection.ADMIN_DETAILS).findOne({email:adminData.email })
            if(admin) {
                if(admin.password === adminData.password) {
                    admin.status = true
                    resolve(admin)
                } else {
                    admin.status = false
                    resolve(admin)
                }
            } else {
                
                resolve(admin)
            }
        })
    },

    doFindAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let data=await connection.get().collection(collection.USER_DETAILS).find().toArray()
            resolve(data)
        })
    },
    blockUnblockUser:(userData)=>{
        console.log('block userDatagggggggggggg',userData);
        return new Promise(async(resolve,reject)=>{
            let user=await connection.get().collection(collection.USER_DETAILS).findOne({email:userData.user.email})
            if(user.loginStatus === true){
                connection.get().collection(collection.USER_DETAILS).updateOne({email:user.email},{
                    $set:{loginStatus:false}
                }).then((data)=>{
                    resolve(data)
                })
            }else{
                connection.get().collection(collection.USER_DETAILS).updateOne({email:user.email},{
                    $set:{loginStatus:true}
                }).then((data)=>{
                    resolve(data)
                })
            }
        })
    },
    doUpdateUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let userStatus=false
            
                connection.get().collection(collection.USER_DETAILS).updateOne({email:userData.oldEmail},
                    {
                        $set:{email:userData.email,name:userData.name}
                    }
                    ).then((data)=>{
                        resolve(data)
                        console.log(data);

                    })
            
        })
    }
}