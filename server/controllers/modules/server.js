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
  callback(res);
}

async function uploadServerAvatar(gid,url,callback){
  await ServerModel.updateAvatar(gid,url);
  callback();
}

module.exports={
  createServer,
  joinServer,
  agreeJoinServer,
  uploadServerAvatar
}
