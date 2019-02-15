<template>
  <div class="server-invite">
    <h3>申请列表</h3>
    <div class="cutoff"></div>
    <list v-for="(item,index) in services[serverIndex].apply" 
    :key="index"
    :member=item>
      <div class="invite-btn operate-btn" slot="operate">
        <div class="agree" @click="agreeJoinServer(item.email,services[serverIndex].gid)">同意</div>
        <div class="reject">拒绝</div>
      </div>
    </list>
  </div>
</template>

<script>
import list from './member-list'
export default {
  data () {
    return {

    }
  },
  computed: {
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    services(){
      return this.$store.state.category.category.services;
    }
  },
  components: {
    list 
  },
  methods:{
    agreeJoinServer(email,gid){
      this.$socket.emit('agreeJoinServer',email,gid,data=>{
        console.log(data);
        this.$store.dispatch('updateServer',{index:this.serverIndex,server:data});
      })
    }
  }
}
</script>

<style lang='stylus'>
.server-invite
  color $bright-font
  & .invite-btn
    display flex
    & div
      height 30px
      padding 0 10px
      line-height 30px
      font-size 15px
      text-align center
      border-radius 5px
    & .agree
      background-color $main-blue
      &:hover 
        background-color $main-blue-hover
    & .reject
      margin-left 5px
      background-color $delete-red
  & .operate-btn:hover
    cursor pointer
</style>