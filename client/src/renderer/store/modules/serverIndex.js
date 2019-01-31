const state = {
  index:-1
};

const mutations = {
  changeIndex(state,index) {
    state.index=index;
  },
  initIndex(state){
    state.index=-1;
  }
};

const actions = {
  changeIndex(context,index){
    context.commit('changeIndex',index);
  },
  initPath(context){
    context.commit('initIndex');
  }
}
export default {
  state,
  mutations,
  actions
};