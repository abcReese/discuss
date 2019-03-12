const user=require('./modules/user');
const server=require('./modules/server');
const category=require('./modules/category');
const friend=require('./modules/friend');
const chat=require('./modules/chat');
const webrtc=require('./modules/webrtc')
module.exports = {
  user,
  server,
  category,
  friend,
  chat,
  webrtc
};
