const CategoryModel=require('../../model/Category');
const ServerModel=require('../../model/services');
const UserModel= require('../../model/users');

async function getCategory(email,callback){
  let category= await CategoryModel.getCategory(email);
  let categories={
    services:[],
    friends:{
      all:[],
      online:[],
      auditing:[]
    }
  };
  category=category[0];
  // 根据gid和email从user集合和server集合读取user和server的详细信息
  for(let i=0;i<category.services.length;i++){
    let server=await ServerModel.getServerInfo(category.services[i]);
    categories.services.push(server);
  }
  for(let i=0;i<category.friends.all.length;i++){
    let user=await UserModel.getUserInfo(category.friends.all[i]);
    categories.friends.all.push(user);
    if(user.isOnline){
      categories.friends.online.push(user);
    }
  }
  for(let i=0;i<category.friends.auditing.length;i++){
    if(!category.friends.auditing[i].sent){
      let user=await UserModel.getUserInfo(category.friends.auditing[i].email);
      categories.friends.auditing.push(user);
    }
  }
  callback(categories);
}

module.exports={
  getCategory
}
