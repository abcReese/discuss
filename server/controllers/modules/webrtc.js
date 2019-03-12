
async function videoInvite({from,to},callback){
  const userHash = global.$userHash;
  const fromSocketId = userHash[from];
  const toSocketId = userHash[to];
  const socket = global.$sockets[fromSocketId];

  socket.to(toSocketId).emit('call',from);
}

async function inviteResponse({from,to,result},callback){
  const userHash = global.$userHash;
  const fromSocketId = userHash[from];
  const toSocketId = userHash[to];
  const socket = global.$sockets[fromSocketId];

  socket.to(toSocketId).emit('inviteResponse',result);

  callback();
}

async function closeVideo({from,to}){
  const userHash = global.$userHash;
  const fromSocketId = userHash[from];
  const toSocketId = userHash[to];
  const socket = global.$sockets[fromSocketId];

  socket.to(toSocketId).emit('closeVideo');
}

async function rtcCandidate({from,to,candidateSdp}){
  const userHash = global.$userHash;
  const fromSocketId = userHash[from];
  const toSocketId = userHash[to];
  const socket = global.$sockets[fromSocketId];

  // console.log(`candidateSdp: ${candidateSdp}`);
  socket.to(toSocketId)
    .emit('rtcCandidate', {
      from,
      candidateSdp
    });
}

async function rtcOffer({from,to,offerSdp}){
  const userHash = global.$userHash;
  const fromSocketId = userHash[from];
  const toSocketId = userHash[to];
  const socket = global.$sockets[fromSocketId];

  console.log(`offerSdp: ${offerSdp}`);

  socket.to(toSocketId)
    .emit('rtcOffer', {
      from,
      offerSdp
    });
}

async function rtcAnswer({from,to,answerSdp}){
  const userHash = global.$userHash;
  const fromSocketId = userHash[from];
  const toSocketId = userHash[to];
  const socket = global.$sockets[fromSocketId];

  console.log(`answerSdp: ${answerSdp}`);

  socket.to(toSocketId)
    .emit('rtcAnswer', {
      from,
      answerSdp
    });
}

module.exports={
videoInvite,
inviteResponse,
closeVideo,
rtcCandidate,
rtcOffer,
rtcAnswer
}
