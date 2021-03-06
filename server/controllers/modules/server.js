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

  if(result){
    let user=await UserModel.getUserInfo(email);
    const userHash = global.$userHash;
    const fromSocketId = userHash[email];
    const toSocketId = userHash[result];
    const socket = global.$sockets[fromSocketId];

    let data={};
    data.user=user;
    data.gid=gid;
    socket.to(toSocketId).emit('updateApply',data);
  }
  callback();
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

  const userHash = global.$userHash;
  const fromSocketId = userHash[server.ownerEmail];
  const toSocketId = userHash[email];
  const socket = global.$sockets[fromSocketId];
  let user=await UserModel.getUserInfo(email);
  socket.to(toSocketId).emit('agreeJoinServer',res);
  callback({gid,user});
}

async function rejectJoinServer(email,gid,callback){
  let server=await ServerModel.getServer(gid);
  let index=server.apply.indexOf(email);
  server.apply.splice(index,1);
  await ServerModel.updateServer(gid,server);
  callback();
}

async function uploadServerAvatar(gid,url,callback){
  await ServerModel.updateAvatar(gid,url);

  let server=await ServerModel.getServer(gid);
  let members=server.members;
  let userHash=global.$userHash;
  const fromSocketId = userHash[server.ownerEmail];
  const socket = global.$sockets[fromSocketId];
  for(let i=0;i<members.length;i++){
    if(members[i]!==server.ownerEmail){
      const userId=userHash[members[i]];
      socket.to(userId).emit('updateServerAvatar',{gid,url});
    }
  }

  callback();
}

async function updateServerName(gid,serverName,callback){
  await ServerModel.updateName(gid,serverName);

  let server=await ServerModel.getServer(gid);
  let members=server.members;
  let userHash=global.$userHash;
  const fromSocketId = userHash[server.ownerEmail];
  const socket = global.$sockets[fromSocketId];
  for(let i=0;i<members.length;i++){
    if(members[i]!==server.ownerEmail){
      const userId=userHash[members[i]];
      socket.to(userId).emit('updateServerName',{gid,serverName});
    }
  }
  callback();
}

async function kickout(gid,index,callback){
  let server=await ServerModel.getServer(gid);
  let email=server.members[index];
  let category=await CategoryModel.getCategory(email);
  let i=category.services.findIndex((ele,index)=>{
    return ele.gid==gid;
  })
  category.services.splice(index,1);
  server.members.splice(index,1);
  await CategoryModel.updateCategory(email,category);
  await ServerModel.updateServer(gid,server);

  let userHash=global.$userHash;
  const fromSocketId = userHash[server.ownerEmail];
  const toSocketId=userHash[email];
  const socket = global.$sockets[fromSocketId];
  socket.to(toSocketId).emit('deleteServer',gid);
  callback();
}

async function deleteServer(gid,callback){
  let server=await ServerModel.getServer(gid);
  let members=server.members;
  let userHash=global.$userHash;
  const fromSocketId = userHash[server.ownerEmail];
  const socket = global.$sockets[fromSocketId];
  for(let i=0;i<members.length;i++){
    if(members[i]!==server.ownerEmail){
      const userId=userHash[members[i]];
      socket.to(userId).emit('deleteServer',gid);
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
    let server = await ServerModel.getServer(info.gid);
    let length = server.textChannel.length;
    const userHash = global.$userHash;
    const fromSocketId = userHash[server.ownerEmail];
    const socket = global.$sockets[fromSocketId];
    for(let i=0;i<server.members.length;i++){
      socket.to(userHash[server.members[i]]).emit('addChannel',{gid:info.gid,channel:server.textChannel[length-1]});
    }
  }
  if(info.index==2){
    await ServerModel.createAudioChannel(info.gid,info.channelName);
  }
  callback();
}

async function deleteChannel(info,callback){
  console.log(info);
  let server = await ServerModel.getServer(info.gid);
  console.log(server);
  let index=server.textChannel.findIndex(ele=>{
    return ele.cid==info.cid;
  })
  let length = server.textChannel.length;
  const userHash = global.$userHash;
  const fromSocketId = userHash[server.ownerEmail];
  const socket = global.$sockets[fromSocketId];
  for(let i=0;i<server.members.length;i++){
    socket.to(userHash[server.members[i]]).emit('deleteChannel',{gid:info.gid,ChannelIndex:index});
  }
  await ServerModel.deleteChannel(info);
  callback();
}
module.exports={
  createServer,
  joinServer,
  agreeJoinServer,
  rejectJoinServer,
  uploadServerAvatar,
  updateServerName,
  kickout,
  deleteServer,
  createChannel,
  deleteChannel
}
