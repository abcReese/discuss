<template>
  <div class="server-invite">
    <h3>申请列表</h3>
    <div class="cutoff"></div>
    <list v-for="(item,index) in services[serverIndex].apply" 
    :key="index"
    :member=item>
      <div class="invite-btn operate-btn" slot="operate">
        <div class="agree" @click="agreeJoinServer(item.email,services[serverIndex].gid)">同意</div>
        <div class="reject" @click="rejectJoinServer(item.email,services[serverIndex].gid,index)">拒绝</div>
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
        let info={};
        info.user=data.user;
        info.serverIndex=this.services.findIndex(ele=>{
          return ele.gid==data.gid;
        })
        info.index=this.services[info.serverIndex].apply.findIndex(ele=>{
          return ele.email==data.user.email;
        })
        this.$store.dispatch('agreeServer',info);
      })
    },
    rejectJoinServer(email,gid,index){
      this.$socet.emit('rejectJoinServer',email,gid,data=>{
        this.$store.dispatch('rejectServer',{serverIndex:serverIndex,index:index})
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