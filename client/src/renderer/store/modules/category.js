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
  addServerApply(state,index,member){  
    state.category.services[index].apply.push(member);
  },
  updateServer(state,data){
    console.log(data.server);
    console.log(state.category.services[data.index]);
    state.category.services[data.index]=data.server;
    console.log(state.category.services[data.index]);
    console.log('b');
  },
  updateServerAvatar(state,data){
    state.category.services[data.index].avatar=data.url;
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
  addServerApply(context,index,member){
    context.commit('addServerApply',index,member);
  },
  updateServer(context,data){
    context.commit('updateServer',data);
  },
  updateServerAvatar(context,data){
    context.commit('updateServerAvatar',data);

  }
}
export default {
  state,
  mutations,
  actions
};