<template>
  <div class="chat-message">
    <div class="left-avator"></div>
    <div class="right-message">
      <div class="nickname-time">
        <span class="nickname">{{nickname}}&nbsp;&nbsp;{{email}}</span>
        <span class="time">{{time}}</span>
      </div>
      <div class="content">{{message.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    time(){
      let time=new Date(this.message.time);
      let year=time.getFullYear(),
          month=time.getMonth()+1,
          day=time.getDate(),
          hour=time.getHours(),
          minute=time.getMinutes(),
          second=time.getSeconds();
      return year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒';
    },
    nickname(){
      if(this.message.from==this.user.email){
        return this.user.nickname;
      }else{
        return this.current.info.nickname;
      }
    },
    current(){
      return this.$store.state.chat.current;
    },
    user(){
      return this.$store.state.user.user;
    },
    email(){
      return '<'+this.message.from+'>';
    }
  },
  components: {

  },
  props:['message']
}
</script>

<style lang="stylus">
.chat-message
  min-height 80px
  padding 20px 10px 20px 0
  border-bottom 1px solid $chat-cutoff
  &>div
    min-height 40px
  & .left-avator
    float left 
    width 40px
    border-radius 50%
    background $main-blue url('../../../assets/default-avatar.png') no-repeat center
  & .right-message
    margin-left 60px
    & div
      min-height 20px
    & .nickname-time
      line-height 20px
      & .nickname
        color #fff
      & .time 
        margin-left 5px
        color #5E6165
        font-size 13px
.content 
  word-wrap:break-word
</style>