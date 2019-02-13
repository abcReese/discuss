const UserModel =require('../../model/users');

async function getUserInfo(email,callback){
  let userInfo= await UserModel.getUserInfo(email);
  callback(userInfo);
}

module.exports={
  getUserInfo
}
