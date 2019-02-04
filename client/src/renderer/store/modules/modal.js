const state = {
  modal: false,
  name:''
};

const mutations = {
  changeStatus(state,status) {
    state.modal=status.modal;
    state.name=status.name;
  },
  initModal(state){
    state.modal=false;
    state.name='';
  }
  
};

const actions = {
  changeStatus(context,status){
    context.commit('changeStatus',status);
  },
  initModal(context){
    context.commit('initModal');
  }
}
export default {
  state,
  mutations,
  actions
};