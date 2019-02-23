const UserModel =require('../../model/users');

async function getUserInfo(email,callback){
  let userInfo= await UserModel.getUserInfo(email);
  callback(userInfo);
}

async function updateUserInfo(info,callback){
  console.log(info)
  let user=await UserModel.getUserInfo(info.email);
  if(user.password==info.password){
      let users=await UserModel.getUserByName(info.nickname);
      let count=(users.length+1)+'';
      for(let i=0;i<6-count.length;i++){
        count='0'+count;
      }
      info.count=count;
      await UserModel.updateUser(info);
      callback({result:true,nicknameCount:count});
  }else{
    callback({result:false});
  }
}

async function updateUserAvatar(email,url,callback){
  console.log(email,url);
  await UserModel.updateAvatar(email,url);
  callback();
}
module.exports={
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
}
