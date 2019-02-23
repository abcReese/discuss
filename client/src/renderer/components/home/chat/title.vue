<template>
  <div id="chat-title">
    <div class="left-name">
      <span>{{name}}</span><span>{{account}}</span>
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
  computed: {
    name(){
      let current=this.$store.state.chat.current;
      if(current.type=='user'){
        return current.info.nickname;
      }else{
        let services=this.$store.state.category.category.services;
        let serverIndex=this.$store.state.serverIndex.index;
        return services[serverIndex][current.info.type][current.info.index];
      }
    },
    account(){
      let services=this.$store.state.category.category.services;
      let serverIndex=this.$store.state.serverIndex.index;
      let account=this.$store.state.chat.current.info.email||services[serverIndex].gid;
      return '<'+account+'>';
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
  padding 5px 20px
  height 40px
.left-name
  line-height 30px
  font-size 20px
  color #fff
  & span:last-of-type
    margin-left 10px
    font-size 15px
    color  $content-font
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