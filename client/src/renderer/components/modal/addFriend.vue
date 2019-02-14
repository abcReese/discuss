<template>
  <div>
    <div class="channel-box">
      <h2>添加好友</h2>
      <div >
        <div class="title">输入对方邮箱</div>
        <input type="text" v-model='to'>
    </div>
    </div>
    <btn :eventName="'addFriend'"
    @addFriend="addFriend">发送邀请</btn>
  </div>
</template>

<script>
import btn from './btn'
export default {
  data () {
    return {
      to:''
    }
  },
  computed: {
    from(){
      return this.$store.state.user.user.email;
    }
  },
  components: {
    btn
  },
  methods: {
    addFriend(){
      this.$socket.emit('addFriend',{from:this.from,to:this.to},data=>{
        console.log(data);
        this.$store.dispatch('addAuditing',data);
        this.$store.dispatch('initModal');
      })
    }
  },
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
 
</style>