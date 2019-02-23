<template>
  <div>
    <div class="channel-box">
      <h2>删除频道</h2>
      <!-- <div >
        <div class="title">输入频道名称以确认</div>
        <input type="text">
      </div> -->
      <span>确定要删除频道吗</span>
    </div>
    <btn @ban="ban" :eventName="'deleteChannel'"
    @deleteChannel="deleteChannel">删除</btn>
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
    services(){
      return this.$store.state.category.category.services;
    },
    serverIndex(){
      return this.$store.state.serverIndex.index;
    }
  },
  components: {
    btn
  },
  methods:{
    deleteChannel(){
      this.$emit('changeModal');
      let gid=this.services[this.serverIndex].gid;
      if(this.cid!==0){
        this.$socket.emit('deleteChannel',{gid:gid,cid:this.cid,flag:this.flag},()=>{
        this.$store.dispatch('deleteChannel',{cid:this.cid,index:this.serverIndex,flag:this.flag});
        })
      }else{
        console.log('不能删除默认频道');
      }
    },
    ban(){
      this.$emit('changeModal');
    }
  },
  props:['channelName','cid','flag']
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
 
</style>