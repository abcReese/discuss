const CategoryModel=require('../../model/Category')
const UserModel= require('../../model/users');

async function addFriend({from,to},callback){
  let fromCategory= await CategoryModel.getCategory(from);
  fromCategory=fromCategory[0];
  if(fromCategory.friends.all.indexOf(to)!==-1){
    console.log('already friend');
    callback('');
    return ;
  }
  let user=await UserModel.getUserInfo(to);
  if(user){
    let toCategory= await CategoryModel.getCategory(to);
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

async function accept(accepter,asker,callback){
  let accepterCate=await CategoryModel.getCategory(accepter);
  accepterCate=accepterCate[0];
  let askerCate= await CategoryModel.getCategory(asker);
  askerCate=askerCate[0];

  await handleAutiting(accepter,asker,accepterCate,askerCate);

  accepterCate.friends.all.push(asker);
  askerCate.friends.all.push(accepter);
  await CategoryModel.updateCategory(accepter,accepterCate);
  await CategoryModel.updateCategory(asker,askerCate);

  let accepterFriends=await getFriends(accepterCate);
  let askerFriends=await getFriends(askerCate);

  callback(accepterFriends);
}

async function reject(accepter,asker,callback){
  let accepterCate=await CategoryModel.getCategory(accepter);
  accepterCate=accepterCate[0];
  let askerCate= await CategoryModel.getCategory(asker);
  askerCate=askerCate[0];

  await handleAutiting(accepter,asker,accepterCate,askerCate);

  await CategoryModel.updateCategory(accepter,accepterCate);
  await CategoryModel.updateCategory(asker,askerCate);

  let accepterFriends=await getFriends(accepterCate);
  let askerFriends=await getFriends(askerCate);
  callback(accepterFriends.auditing);
}

async function handleAutiting(accepter,asker,accepterCate,askerCate){
  let accepterIndex=accepterCate.friends.auditing.findIndex((ele)=>{
    return ele.email=asker;
  })
  let askerIndex=askerCate.friends.auditing.findIndex((ele)=>{
    return ele.email=accepter;
  })
  accepterCate.friends.auditing.splice(accepterIndex,1);
  askerCate.friends.auditing.splice(askerIndex,1);
}

async function getFriends(category){
  let categories={
    services:[],
    friends:{
      all:[],
      online:[],
      auditing:[]
    }
  };
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
  return categories.friends;
}

module.exports={
  addFriend,
  accept,
  reject
}
