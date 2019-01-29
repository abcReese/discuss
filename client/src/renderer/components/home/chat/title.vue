<template>
  <div id="chat-title">
    <div class="left-name">
      <span>@Jammmm</span>
      <div class="status-circle"></div>
    </div>
    <div class="right-icon">
      <div class="video">
        <img src="../../../assets/video.png" alt="">
        </div>
      <div class="audio">
        <img src="../../../assets/audio.png" alt="">
      </div>
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
#chat-title
  display flex
  justify-content space-between
  color $content-font
  padding 5px 100px
  height 40px
.left-name
  line-height 30px
  font-size 20px
  color #fff
.right-icon
  display flex
  width 80px
  & div
    position relative
    width 35px
    height 35px
    margin-left 10px
    padding 5px
    &:hover
      background-color $home
      cursor pointer
    & img 
      position absolute
      top 50%
      left 50%
      transform: translate(-50%,-50%);
</style>