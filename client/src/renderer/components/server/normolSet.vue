<template>
  <div id="normol-set">
    <div class="set invite-other">
      <img src="../../assets/add.svg" alt="">
      <span>离开服务器</span>
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
#normol-set
  position absolute
  top 55px
  left 10px
  width 220px
  border-radius 5px
  font-size 13px
  color $delete-red
  background-color $setting-bgc
  z-index 3
  &>div
    position relative
    height 35px
    line-height 35px
    border-radius 5px
    padding 0 15px
    &:hover
      background-color $setting-hover
    & span 
      margin-left 30px
    & img 
      position absolute
      left 15px
      top 8px
</style>