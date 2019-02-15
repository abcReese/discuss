<template>
  <div>
    <div class="channel-box">
      <h2>加入服务器</h2>
      <div >
        <div class="title">输入gid</div>
        <input type="text" v-model="gid">
    </div>
    </div>
    <btn :eventName="'joinServer'"
    @joinServer="joinServer" @ban="ban">发送请求</btn>
  </div>
</template>

<script>
import btn from './btn';
export default {
  data () {
    return {
      gid:''
    }
  },
  computed: {
    email(){
        return this.$store.state.user.user.email;
      },
    serverIndex(){
      return this.$store.state.serverIndex.index;
    }
  },
  components: {
    btn
  },
  methods: {
    joinServer(){
      this.$socket.emit('joinServer',this.email,this.gid,data=>{
        console.log(data);
        
        this.gid='';
      })
    },
    ban(){
      this.$emit('banModal');
      this.gid='';
    }
  }
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
 
</style>