<template>
  <div class="setting-right">
    <div class="setting-detail">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="esc" @click="back">
        <div class="left-line"></div>
        <div class="right-line"></div>
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

  },
  methods:{
    back(){
      console.log(this.$store.state.serverIndex.index);
      this.$router.push({path:'server'});
    }
  }
}
</script>

<style lang='stylus'>
.setting-right
  position relative
  height 100%
  width 75%
  padding 60px 110px 0 40px
  background-color $content
  overflow-x hidden
  overflow-y scroll 
  &::-webkit-scrollbar 
    width 8px
    height 8px
    margin 4px
    background-color $catalog
    border-radius 10px
  &::-webkit-scrollbar-track
    -webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.3)
    border-radius 10px
    background-color: $catalog
  &::-webkit-scrollbar-thumb
    border-radius 10px
    -webkit-box-shadow inset 0 0 6px rgba(0,0,0,.3)
    background-color $home
  & .setting-detail
    position absolute
    top 60px
    left 40px
    width 560px
    & .esc
      position absolute
      right -80px
      top 0
      width 36px 
      height 36px
      border 2px solid $channel-list
      border-radius 50%
      &:hover 
        cursor pointer
        background-color $content-line
      & div
        position absolute
        top 15px
        left 9px
        width 15px
        height 2px
        border-radius 40%
        background-color $server-setting-detail
      & .left-line
        transform rotate(45deg)
      & .right-line
        transform rotate(-45deg)
</style>