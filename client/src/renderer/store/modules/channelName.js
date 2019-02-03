const state = {
  name:''
};

const mutations = {
  changeName(state,name) {
    state.name=name;
  },
  initName(state){
    state.name='';
  }
};

const actions = {
  changeName(context,name){
    context.commit('changeName',name);
  },
  initName(context){
    context.commit('initName');
  }
}
export default {
  state,
  mutations,
  actions
};