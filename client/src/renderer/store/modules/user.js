const state = {
  user:{}
};

const mutations = {
  setUser(state,user){
    state.user=user;
  }
};
const actions = {
  setUser(context,user){
    context.commit('setUser',user);
  }

}
export default {
  state,
  mutations,
  actions
};