const state = {
  category:{}
};

const mutations = {
  setCategory(state,category){
    state.category=category;
    console.log(category);
  },
  addServer(state,server){
    state.category.services.push(server);
  },
  addFriend(state,friend){
    state.category.friends.push(friend);
  }
};
const actions = {
  setCategory(context,category){
    context.commit('setCategory',category);
  },
  addServer(context,server){
    context.commit('addServer',server);
  },
  addFriend(context,friend){
    context.commit('addFriend',friend);
  }
}
export default {
  state,
  mutations,
  actions
};