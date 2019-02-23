const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
  from: {
    type: String,
    required: [true, 'message-private from is required']
  },
  to: {
    type: String,
    required: [true, 'message-private to is required']
  },
  type: {
    type: String,
    required: [true, 'message-private type is required']
  },
  time: mongoose.Schema.Types.Mixed,
  content: mongoose.Schema.Types.Mixed
});

ChatSchema.statics={
  async addMessage(message){
    let chat=new this(message);
    await chat.save();
  },
  async getHistory(from,to){
    let history=await this.where({from,to}).exec();
    return history;
  }
}

module.exports = mongoose.model('chat', ChatSchema);
