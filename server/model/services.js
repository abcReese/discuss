const mongoose=require('mongoose');
const UserModel=require('./users');
const ServerSchema=mongoose.Schema({
  gid: {
    type: String,
    required: [true, 'group-gid is required']
  },
  ownerEmail: {
    type: String,
    required: [true, 'group-ownerEmail is required']
  },
  avatar: {
    type: String,
    default: 'http://localhost:3000/images/default/default-group-avatar.png'
  },
  serverName: {
    type: String,
    maxlength: 15
  },
  members: {
    type: Array,
    default: []
  },
  apply:{
    type:Array,
    default:[]
  },
  textChannel:{
    type:Array,
    default:[{
      cid:0,
      name:'general'
    }]
  },
  audioChannel:{
    type:Array,
    default:[{
      cid:0,
      name:'常规'
    }]
  }
},{
  timestamps: true
})
ServerSchema.statics={
  async createServer({email,serverName}){
    let len = await this.countDocuments()
      .exec();
    let info = {
      gid: `g${10000 + len}`,
      ownerEmail: email,
      serverName:serverName,
      members:[email]
    };
    let server = new this(info);

    await server.save();

    return server.gid;
  },
  async getServer(gid){
    let server=await this.where({gid}).exec();
    return server[0];
  },
  async getServerInfo(gid){
    let server=await this.where({gid}).exec();
    server=server[0];
    let members=[];
    let apply=[];
    for(let i=0;i<server.members.length;i++){
      let user=await UserModel.getUserInfo(server.members[i]);
      let userApply=await UserModel.getUserInfo(server.apply[i]);
      members.push(user);
      apply.push(userApply);
    }
    server.members=members;
    server.apply=apply;
    return server;
  },
  async joinServer(email,gid){
    let server=await this.where({gid}).exec();
    if(server.length!==0&&server[0].members.indexOf(email)==-1&&server[0].apply.indexOf(email)==-1){
      server=server[0];
      server.apply.push(email);
      await this.where({
        gid:gid
      })
      .updateOne({
        apply:server.apply
      })
      .exec();
      return true;
    }else{
      return false;
    }
  },
  async updateServer(gid,server){
    await this.where({gid}).update({apply:server.apply,members:server.members}).exec();
  },
  async updateAvatar(gid,url){
    await this.where({gid}).updateOne({avatar:url}).exec();
  },
  async updateName(gid,serverName){
    await this.where({gid}).updateOne({serverName:serverName}).exec();
  },
  async deleteServer(gid){
    await this.where({gid}).deleteOne().exec();
  },
  async createTextChannel(gid,channelName){
    let server=await this.getServer(gid);
    let length=server.textChannel.length;
    server.textChannel.push({name:channelName,cid:length});
    await this.where({gid}).updateOne({textChannel:server.textChannel});
  },
  async createAudioChannel(gid,channelName){
    let server=await this.getServer(gid);
    let length=server.audioChannel.length;
    server.audioChannel.push({name:channelName,cid:length});
    await this.where({gid}).updateOne({audioChannel:server.audioChannel});
  },
  async deleteChannel(info){
    let server=await this.getServer(info.gid);
    if(info.flag==1){
      server.textChannel.splice(info.cid,1);
      await this.where({gid:info.gid}).updateOne({textChannel:server.textChannel});
    }
    if(info.flag==2){
      server.audioChannel.splice(info.cid,1);
      await this.where({gid:info.gid}).updateOne({audioChannel:server.audioChannel});
    }
  }
}
module.exports = mongoose.model('server', ServerSchema);
