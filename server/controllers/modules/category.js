const CategoryModel=require('../../model/Category');
const ServerModel=require('../../model/services');
const UserModel= require('../../model/users');

async function getCategory(email,callback){
  let category= await CategoryModel.getCategory(email);
  let categories={
    services:[],
    friends:[]
  };
  category=category[0];
  // 根据gid和email从user集合和server集合读取user和server的详细信息
  for(let i=0;i<category.services.length;i++){
    let server=await ServerModel.getServerInfo(category.services[i]);
    categories.services.push(server);
  }
  for(let i=0;i<category.friends.length;i++){
    let friend=await UserModel.getUserInfo(category.friends[i]);
    categories.friends.push(friend);
  }
  callback(categories);
}

module.exports={
  getCategory
}
