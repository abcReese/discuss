const state = {
  user:{}
};

const mutations = {
  setUser(state,user){
    state.user=user;
  },
  initUser(state){
    state.user={};
  }
};
const actions = {
  setUser(context,user){
    context.commit('setUser',user);
  },
  initUser(context){
    context.commit('initUser');
  }

}
export default {
  state,
  mutations,
  actions
};