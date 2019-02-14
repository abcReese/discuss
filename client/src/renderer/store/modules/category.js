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
  addAuditing(state,friend){
    state.category.friends.auditing.push(friend);
  },
  initCategory(state){
    state.category={};
  }
};
const actions = {
  setCategory(context,category){
    context.commit('setCategory',category);
  },
  addServer(context,server){
    context.commit('addServer',server);
  },
  addAuditing(context,friend){
    context.commit('addAuditing',friend);
  },
  initCategory(context){
    context.commit('initCategory');
  }
}
export default {
  state,
  mutations,
  actions
};