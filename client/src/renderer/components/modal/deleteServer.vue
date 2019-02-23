<template>
  <div>
    <div class="channel-box">
      <h2>删除服务器</h2>
      <div >
        <h5>确定要删除服务器吗？</h5>
      </div>
    </div>
    <btn :eventName="'deleteServer'"
    @deleteServer="deleteServer">删除</btn>
  </div>
</template>

<script>
import btn from './btn'
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
  sockets:{
    deleteServer(gid){
      this.$store.dispatch('deleteServerByGid',gid);
    }
  },
  components: {
    btn
  },
  methods: {
    deleteServer(){
      this.$socket.emit('deleteServer',this.services[this.serverIndex].gid,()=>{
        this.$store.dispatch('deleteServer',this.serverIndex);
        let index;
        index=this.serverIndex==0?0:this.serverIndex-1;
        this.$store.dispatch('changeIndex',index)
        this.$store.dispatch('initModal')
        this.$router.push({path:'server'})
      });
    }
  },
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
  & div
    margin-top 20px
 
</style>