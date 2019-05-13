const UserModel =require('../../model/users');
const CategoryModel=require('../../model/Category');

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

      let category=await CategoryModel.getCategory(info.email);
      category=category[0];
      console.log(category);
      let friends=category.friends;
      const userHash = global.$userHash;
      const fromSocketId = userHash[info.email];
      let toSocketId;
      const socket = global.$sockets[fromSocketId];
      friends.all.forEach(ele=>{
        toSocketId = userHash[ele];
        socket.to(toSocketId).emit('updateFriendName',{friend:info.email,nickname:info.nickname});
      })
      callback({result:true,nicknameCount:count});
  }else{
    callback({result:false});
  }
}

async function updateUserAvatar(email,url,callback){
  console.log(email,url);
  await UserModel.updateAvatar(email,url);
  let category=await CategoryModel.getCategory(email);
  category=category[0];
  console.log(category);
  let friends=category.friends;
  const userHash = global.$userHash;
  const fromSocketId = userHash[email];
  let toSocketId;
  const socket = global.$sockets[fromSocketId];
  friends.all.forEach(ele=>{
    toSocketId = userHash[ele];
    socket.to(toSocketId).emit('updateAvatar',{friend:email,url});
  })

  callback();
}

async function online(email,callback){
  let category=await CategoryModel.getCategory(email);
  category=category[0];
  let all=category.friends.all;
  const userHash = global.$userHash;
  const fromSocketId = userHash[email];
  let toSocketId;
  const socket = global.$sockets[fromSocketId];
  let user= await UserModel.getUserInfo(email);
  for(let i=0;i<all.length;i++){
    let friend=await UserModel.getUserInfo(all[i]);
    if(friend.isOnline){
      toSocketId=userHash[friend.email];
      socket.to(toSocketId).emit('friendOnline',user);
    }
  }
  callback('online');
}

async function offline(email,callback){
  let category=await CategoryModel.getCategory(email);
  category=category[0];
  let all=category.friends.all;
  const userHash = global.$userHash;
  const fromSocketId = userHash[email];
  let toSocketId;
  const socket = global.$sockets[fromSocketId];
  for(let i=0;i<all.length;i++){
    let friend=await UserModel.getUserInfo(all[i]);
    if(friend.isOnline){
      toSocketId=userHash[friend.email];
      socket.to(toSocketId).emit('friendOffline',email);
    }
  }
  callback('offline');
}
module.exports={
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  online,
  offline
}
