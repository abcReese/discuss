const mongoose = require('mongoose');
const Schema=mongoose.Schema;
let AuthSchema = new Schema({
  email: String,
  authCode : String,
  createAt : {
    type: Date,
    default : Date.now(),
    expires:'60'
  }
})

AuthSchema.statics = {
  async setCode(email,authCode){
    this.create({
      email : email,
      authCode: authCode
    },function(err,doc){
      if(err){
        return err;
      }
      console.log('success');
      return doc;
    })
  },
  async getCode(email){
    let users=await this.where('email').equals(email).exec();
    if(users.length===0){
      return null
    }else{
      return users[0].authCode;
    }
  }
}

module.exports = mongoose.model('Auth', AuthSchema);
