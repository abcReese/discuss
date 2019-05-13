const state = {
  category:{
    
  }
};

const mutations = {
  setCategory(state,category){
    state.category=category;

  },
  addServer(state,server){
    state.category.services.push(server);
  },
  updateAuditing(state,auditing){
    state.category.friends.auditing=auditing;
  },
  updateFriends(state,friends){
    state.category.friends=friends;
  },
  initCategory(state){
    state.category={};
  },
  addServerApply(state,info){  
    state.category.services[info.index].apply.push(info.member);
  },
  updateServer(state,data){
    state.category.services[data.index]=data.server;
  },
  updateServerAvatar(state,data){
    state.category.services[data.index].avatar=data.url;
  },
  updateServerName(state,data){
    state.category.services[data.index].serverName=data.serverName;
  },
  kickout(state,data){
    state.category.services[data.serverIndex].members.splice(data.memberIndex,1);
  },
  agreeServer(state,data){
    state.category.services[data.serverIndex].apply.splice(data.index,1);
    state.category.services[data.serverIndex].members.push(data.user);
  },
  rejectServer(state,data){
    state.category.services[data.serverIndex].apply.splice(data.index,1);
  },
  deleteServer(state,index){
    state.category.services.splice(index,1);
  },
  deleteServerByGid(state,gid){
    let index=-1,
        services=state.category.services;
    for(let i=0;i<services.length;i++){
      if(services[i].gid==gid){
        index=i;
        break;
      }
    }
    state.category.services.splice(index,1);
  },
  createChannel(state,info){
    if(info.index==1){
      let length=state.category.services[info.serverIndex].textChannel.length;
      state.category.services[info.serverIndex].textChannel.push({name:info.channelName,cid:length});
    }
    if(info.index==2){
      let length=state.category.services[info.serverIndex].textChannel.length;
      state.category.services[info.serverIndex].audioChannel.push({name:info.channelName,cid:length})
    }
  },
  addChannel(state,info){
    let index=state.category.services.findIndex(ele=>{
      return ele.gid==info.gid;
    })
    state.category.services[index].textChannel.push(info.channel);
  },
  deleteChannel(state,info){
    if(info.flag==1){
      state.category.services[info.index].textChannel.splice(info.cid,1);
    }
    if(info.flag==2){
      state.category.services[info.index].audioChannel.splice(info.cid,1);
    }
  },
  deleteOnline(state,index){
    let all=state.category.friends.all;
    let online=state.category.friends.online;
    for(let i=0;i<all.length;i++){
      if(all[i].email==online[index].email){
        all[i].isOnline=false;
        break;
      }
    }
    state.category.friends.online.splice(index,1);
  },
  deleteFriend(state,index){
    state.category.friends.all.splice(index,1);
  },
  updateFriendAvatar(state,info){
    let index=state.category.friends.all.findIndex(ele=>{
      return ele.friend==info.email;
    })
    let friend=state.category.friends.all[index];
    friend.avatar=info.url;
    state.category.friends.all.splice(index,1)
    state.category.friends.all.unshift(friend);
    index=state.category.friends.online.findIndex(ele=>{
      return ele.email==info.email;
    })
    state.category.friends.online.splice(index,1);
    state.category.friends.online.unshift(friend);
  },
  updateFriendName(state,info){
    let index=state.category.friends.all.findIndex(ele=>{
      return ele.friend==info.email;
    })
    let friend=state.category.friends.all[index];
    friend.nickname=info.nickname;
    state.category.friends.all.splice(index,1)
    state.category.friends.all.unshift(friend);
    index=state.category.friends.online.findIndex(ele=>{
      return ele.email==info.email;
    })
    state.category.friends.online.splice(index,1);
    state.category.friends.online.unshift(friend);
  },
  addOnline(state,friend){
    state.category.friends.online.push(friend);
    let all=state.category.friends.all;
    for(let i=0;i<all.length;i++){
      if(all[i].email==friend.email){
        all[i].isOnline=true;
        break;
      }
    }
  }
};
const actions = {
  setCategory(context,category){
    context.commit('setCategory',category);
  },
  addServer(context,server){
    context.commit('addServer',server);
  },
  updateAuditing(context,auditing){
    context.commit('updateAuditing',auditing);
  },
  updateFriends(context,friends){
    context.commit('updateFriends',friends);
  },
  initCategory(context){
    context.commit('initCategory');
  },
  addServerApply(context,info){
    context.commit('addServerApply',info);
  },
  updateServer(context,data){
    context.commit('updateServer',data);
  },
  updateServerAvatar(context,data){
    context.commit('updateServerAvatar',data);
  },
  updateServerName(context,data){
    context.commit('updateServerName',data);
  },
  kickout(context,data){
    context.commit('kickout',data);
  },
  deleteServer(context,index){
    context.commit('deleteServer',index);
  },
  deleteServerByGid(context,gid){
    context.commit('deleteServerByGid',gid);
  },
  createChannel(context,info){
    context.commit('createChannel',info);
  },
  deleteChannel(context,info){
    context.commit('deleteChannel',info);
  },
  addChannel(context,info){
    context.commit('addChannel',info);
  },
  agreeServer(context,data){
    context.commit('agreeServer',data);
  },
  rejectServer(context,data){
    context.commit('rejectServer',data);
  },
  deleteOnline(context,index){
    context.commit('deleteOnline',index);
  },
  deleteFriend(context,index){
    context.commit('deleteFriend',index);
  },
  addOnline(context,friend){
    context.commit('addOnline',friend);
  },
  updateFriendAvatar(context,info){
    context.commit('updateFriendAvatar',info);
  },
  updateFriendName(context,info){
    context.commit('updateFriendName',info);
  }
}
export default {
  state,
  mutations,
  actions
};