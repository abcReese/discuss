const ServerModel=require('../../model/services')
const CategoryModel=require('../../model/Category')
const UserModel=require('../../model/users')

async function createServer({
  email,
  serverName
},callback){
  let category=await CategoryModel.getCategory(email);
  let gid=await ServerModel.createServer({
    email,
    serverName
  })
  category=category[0];
  category.services.push(gid);
  await CategoryModel.updateCategory(email,category);
  let server=await ServerModel.getServerInfo(gid);
  callback(server);
}

async function joinServer(email,gid,callback){
  let result=await ServerModel.joinServer(email,gid);
  console.log(result);
  if(result){
    let user=UserModel.getUserInfo(email);
  }
}

async function agreeJoinServer(email,gid,callback){
  let server=await ServerModel.getServer(gid);
  let index=server.apply.indexOf(email);
  server.apply.splice(index,1);
  server.members.push(email);
  await ServerModel.updateServer(gid,server);
  let res=await ServerModel.getServerInfo(gid);

  let applyCate=await CategoryModel.getCategory(email);
  applyCate=applyCate[0];
  applyCate.services.push(gid);
  await CategoryModel.updateCategory(email,applyCate);
  // const userHash=global.$userHash;
  // const applyId=userHash[email];
  // io.to(applyId).emit('addServer',server);
  callback(res);
}

async function rejectServer(email,gid,callback){
  let server=await ServerModel.getServer(gid);
  let index=server.apply.indexOf(email);
  server.apply.splice(index,1);
  await ServerModel.updateServer(gid,server);
  callback();
}

async function uploadServerAvatar(gid,url,callback){
  await ServerModel.updateAvatar(gid,url);
  callback();
}

async function updateServerName(gid,serverName,callback){
  await ServerModel.updateName(gid,serverName);
  callback();
}

async function kickout(gid,index,callback){
  let server=await ServerModel.getServer(gid);
  console.log(server);
  server.members.splice(index,1);
  await ServerModel.updateServer(gid,server);
  callback();
}

async function deleteServer(gid,callback){
  let server=await ServerModel.getServer(gid);
  let members=server.members;
  let userHash=global.$userHash;
  for(let i=0;i<members.length;i++){
    if(members[i]!==server.ownerEmail){
      const userId=userHash[members[i]];
      io.to(userId).emit('deleteServer',gid);
      await deleteServerInCate(members[i],gid);
    }
  }
  await deleteServerInCate(server.ownerEmail,gid);
  await ServerModel.deleteServer(gid);
  callback();
}

async function deleteServerInCate(email,gid){
  let category=await CategoryModel.getCategory(email);
  category=category[0];
  let index=category.services.indexOf(gid);
  if(index>=0){
    category.services.splice(index);
  }
  await CategoryModel.updateCategory(email,category);
}

async function createChannel(info,callback){
  if(info.index==1){
    await ServerModel.createTextChannel(info.gid,info.channelName);
  }
  if(info.index==2){
    await ServerModel.createAudioChannel(info.gid,info.channelName);
  }
  callback();
}

async function deleteChannel(info,callback){
  console.log(info);
  await ServerModel.deleteChannel(info);
  callback();
}
module.exports={
  createServer,
  joinServer,
  agreeJoinServer,
  rejectServer,
  uploadServerAvatar,
  updateServerName,
  kickout,
  deleteServer,
  createChannel,
  deleteChannel
}
