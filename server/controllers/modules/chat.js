const ChatModel=require('../../model/chat');

async function addTextMessage({from,to,message},callback){
  let time=Date.now();
  let chat={
    from,
    to,
    type:'text',
    time,
    content:message
  }
  await ChatModel.addMessage(chat);
  let userHash=global.$userHash;
  let socketId=userHash[to];
  let io=global.$io;
  io.to(socketId).emit('recieveText',chat);
  callback(chat);
}

async function getHistory({from,to,type},callback){
  let history=[];
  if(type=='user'){
    let arr1=await ChatModel.getHistory(from,to);
    let arr2=await ChatModel.getHistory(to,from);
    history=arr1.concat(arr2);
    history.sort((a,b)=>{
      return a.time-b.time;
    })
  }else{
    console.log(to);
  }
  callback(history);
}

module.exports={
addTextMessage,
getHistory
}
