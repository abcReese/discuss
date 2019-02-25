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
  if(type=='user'){
    let userHash=global.$userHash;
    let socketId=userHash[to];
    let io=global.$io;
    io.to(socketId).emit('recieveText',chat);
  }else{

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

module.exports={
addMessage,
getHistory
}
