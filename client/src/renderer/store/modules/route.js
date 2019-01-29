const state = {
  path: 'detail'
};

const mutations = {
  changePath(state,newPath) {
    state.path=newPath;
  },
  initPath(state){
    state.path='detail';
  }
};

const actions = {
  changePath(context,newPath){
    context.commit('changePath',newPath);
  },
  initPath(context){
    context.commit('initPath');
  }
}
export default {
  state,
  mutations,
  actions
};