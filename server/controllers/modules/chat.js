const ChatModel=require('../../model/chat');
const ServerModel=require('../../model/services');

async function addMessage({from,to,message,messageType},type,callback){
  let time=Date.now();
  let chat={
    from,
    to,
    type:messageType,
    time,
    content:message
  }
  await ChatModel.addMessage(chat);
  const userHash = global.$userHash;
  const fromSocketId = userHash[chat.from];
  const toSocketId = userHash[chat.to];
  const socket = global.$sockets[fromSocketId];
  if(type=='user'){
    socket.to(toSocketId).emit('recieveMessage',chat);
  }else{
    console.log(fromSocketId);
    socket.broadcast.to(to).emit('recieveMessage',chat);
  }
  callback(chat);
}



async function getHistory({from,to,gid,type},callback){
  let history=[];
  if(type=='user'){
    let arr1=await ChatModel.getHistory(from,to);
    let arr2=await ChatModel.getHistory(to,from);
    history=arr1.concat(arr2);
    history.sort((a,b)=>{
      return a.time-b.time;
    })
  }else{

    history=await ChatModel.getServerHistory(to);
    history.sort((a,b)=>{
      return a.time-b.time;
    })
  }
  callback(history);
}

async function join({email,to},callback){
  const userHash = global.$userHash;
  const userSocketId = userHash[email];
  const socket = global.$sockets[userSocketId];

  socket.join(to);
  console.log('join room: '+to);
  callback();
}

async function leave({email,to},callback){
  console.log(email,to);
  const userHash = global.$userHash;
  const userSocketId = userHash[email];
  const socket = global.$sockets[userSocketId];

  socket.leave(to);
  console.log('leave room: '+to);
  callback();
}

module.exports={
addMessage,
getHistory,
join,
leave
}
