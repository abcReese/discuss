const mongoose=require('mongoose');
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
    default: 'http://localhost:3000/upload/default/default-group-avatar.png'
  },
  serverName: {
    type: String,
    maxlength: 15
  },
  members: {
    type: Array,
    default: []
  },
  textChannel:{
    type:Array,
    default:['general']
  },
  audioChannel:{
    type:Array,
    default:['常规']
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
  async getServerInfo(gid){
    let server=await this.where({gid}).exec();
    return server[0];
  }
}
module.exports = mongoose.model('server', ServerSchema);
