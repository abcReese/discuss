const mongoose=require('mongoose');
let count=0;
const UserSchema=mongoose.Schema({
  email:{type:String,require:true},
  nickname:{type:String,maxlength:20},
  nicknameCount:{type:String},
  password:{type:String,require:true},
  avatar:{type:String,default:'http://localhost:3000/images/default/default-avatar.png'},
  isOnline:Boolean
},{
  timestamps:true,
})

UserSchema.statics={
  async register(user){
    let data=await this.where('email').equals(user.email).exec();
    data=data[0];
    let doc={
      email:user.email,
      nickname:user.nickname,
      password:user.password,
      isOnline:false
    }
    //如果该邮箱没有注册过就进行注册并返回true，否则返回false.
    if(!data){
      let users=await this.where('nickname').equals(user.nickname).exec();
      //如果nickname与其他用户不同，则
      if(users.length===0){
        user.nicknameCount='0001';
      }else{
        let count=Number(users[0].nicknameCount)+users.length+1+'';
        for(let i=0;i<4-count.length;i++){
          count+='0'+count;
        }
        doc.nicknameCount=count;
      }
      console.log(doc);
      data=new this(doc);
      await data.save();
      return true;
    }else{
      return false;
    }
  },
  async login(user){
    let data=await this.where('email').equals(user.email).exec();
    data=data[0];
    if(!data){
      return 'null';
    }
    if(data.password!==user.password){
      return 'wrong';
    }
    let condition = {email : data.email};
    let update = { $set: {isOnline : true}};
    this.updateOne(condition,update).exec();
    return 'success';
  },
  async getUserInfo(email){
    let user=await this.where('email').equals(email).exec();
    return user[0];
  }
}
module.exports = mongoose.model('User', UserSchema);
