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
    @addFriend="addFriend" @ban="banModal">发送邀请</btn>
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
    },
    friends(){
      return this.$store.state.category.category.friends;
    }
  },
  components: {
    btn
  },
  methods: {
    addFriend(){
      this.$socket.emit('addFriend',{from:this.from,to:this.to},data=>{
        // console.log('aaa');
        // console.log(this.friends);
        // let auditing=this.friends.auditing.slice(0);
        // auditing.push(data);
        // this.$store.dispatch('updateAuditing',auditing);
        this.$store.dispatch('initModal');
      })
    },
    banModal(){
      this.$emit('banModal')
    }
  },
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
 
</style>