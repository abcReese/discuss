const state = {
  show: true
};

const mutations = {
  changeShow(state) {
    state.show=!state.show;
  },
  initShow(state){
    state.show=true;
  }
};
const actions = {
  changeShow(context){
    context.commit('changeShow');
  },
  initShow(context){
    context.commit('initShow');
  }
}
export default {
  state,
  mutations,
  actions
};