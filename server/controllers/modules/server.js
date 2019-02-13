const ServerModel=require('../../model/services')
const CategoryModel=require('../../model/Category')

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

module.exports={
  createServer
}
