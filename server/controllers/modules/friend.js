const CategoryModel=require('../../model/Category')
const UserModel= require('../../model/users');

async function addFriend({from,to},callback){
  console.log(from,to);
  console.log('sd');
  let user=await UserModel.getUserInfo(to);
  if(user){
    let fromCategory= await CategoryModel.getCategory(from);
    let toCategory= await CategoryModel.getCategory(to);
    fromCategory=fromCategory[0];
    toCategory=toCategory[0];
    let toEmail={
      sent:false,
      email:from
    };
    let fromEmail={
      sent:true,
      email:to
    }
    fromCategory.friends.auditing.push(fromEmail);
    toCategory.friends.auditing.push(toEmail);
    await CategoryModel.updateCategory(from,fromCategory);
    await CategoryModel.updateCategory(to,toCategory);
    let auditingFriend=await UserModel.getUserInfo(to);
    callback(auditingFriend);
  }else{
    callback('');
  }
}

module.exports={
  addFriend
}
