<template>
  <div class='input-box'>
    <div class="input">
      <div class="upload">
        <div>+</div>
      </div>
      <div class="input-message">
        <input type="text" v-model="message" @keyup.enter="sendMessage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message:''
    }
  },
  computed: {
    user(){
      return this.$store.state.user.user;
    },
    current(){
      return this.$store.state.chat.current;
    }
  },
  components: {

  },
  sockets:{
    recieveText(data){
      let from=this.current.info.nickname+'<'+this.current.info.email+'>';
      data.from=from;
      this.$store.dispatch('addMessage',data);
    }
  },
  methods: {
    sendMessage(){
      let chat={}
      if(this.current.type='user'){
        chat={
          from:this.user.email,
          to:this.current.info.email,
          message:this.message
        }
      }
      this.$socket.emit('addTextMessage',chat,data=>{
        let from=this.user.nickname+'<'+this.user.email+'>';
        data.from=from;
        this.$store.dispatch('addMessage',data);
      })
      this.message='';
    }
  }
}
</script>

<style lang='stylus'>
.input-box
  height 100px
  padding-top 30px
  padding-right 20px
  border-top 1px solid $chat-cutoff
  & .input
    height 44px
    border-radius 5px
    padding 4px 4px 4px 0
    background-color $content-click
    & .upload
      position relative
      float left
      width 46px
      height 36px
      border-right 1px solid $catalog-font
      & div
        position absolute
        left 50%
        top 50%
        width 20px
        height 20px
        line-height 20px
        margin-left -(@width/2)
        margin-top -(@height/2)
        text-align center
        font-size 18px
        font-weight bold
        color $home
        border-radius 50%
        background-color #7F8186
    & .input-message
      margin-left 46px
      padding 8px 5px 5px 10px    
      height 38px
      & input 
        width 100%
        font-size 14px
        height 22px
        padding 0
        color #DCDDDE
        border none
        background-color $content-click
        &:focus
          outline none
</style>