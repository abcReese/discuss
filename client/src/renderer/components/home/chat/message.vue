<template>
  <div class="chat-message">
    <div class="left-avator"></div>
    <div class="right-message">
      <div class="nickname-time">
        <span class="nickname">Jammmm</span>
        <span class="time">sdsds</span>
      </div>
      <div class="content">adasdasdsadasdasdasdsadsadsad</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="stylus">
.chat-message
  min-height 80px
  padding 20px 0
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
        color #5E6165
.content 
  word-wrap:break-word
</style>