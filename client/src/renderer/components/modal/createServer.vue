<template>
  <div>
    <div class="channel-box">
      <h2>创建服务器</h2>
      <div >
        <div class="title">输入名称</div>
        <input type="text" v-model="serverName">
    </div>
    </div>
    <btn :eventName="'createServer'"
    @createServer="createServer" @ban="ban">创建</btn>
  </div>
</template>

<script>
import btn from './btn'
export default {
  data () {
    return {
      serverName:''
    }
  },
  computed: {
    email(){
        return this.$store.state.user.user.email;
      }
  },
  components: {
    btn
  },
  methods:{
    createServer(){
      this.$socket.emit('createServer',{email:this.email,serverName:this.serverName},data=>{
        this.$store.dispatch('addServer',data);
        this.$store.dispatch('initModal')
      })
    },
    ban(){
      this.$emit('banModal')
    }
  }
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
 
</style>