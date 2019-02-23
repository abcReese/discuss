const state = {
  user:{}
};

const mutations = {
  setUser(state,user){
    state.user=user;
  },
  initUser(state){
    state.user={};
  },
  updateUser(state,user){
    state.user.nickname=user.nickname;
    state.user.nicknameCount=user.nicknameCount
    state.user.password=user.password||state.user.password
  },
  updateUserAvatar(state,url){
    state.user.avatar=url;
  }
};
const actions = {
  setUser(context,user){
    context.commit('setUser',user);
  },
  initUser(context){
    context.commit('initUser');
  },
  updateUser(context,user){
    context.commit('updateUser',user);
  },
  updateUserAvatar(context,url){
    context.commit('updateUserAvatar',url);
  }
}
export default {
  state,
  mutations,
  actions
};