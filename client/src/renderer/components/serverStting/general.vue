<template>
  <div class='general'>
    <h3>服务器概览</h3>
    <div>
      <div class="server-icon">s</div>
      <div class="upload-btn">上传图片</div>
      <div class="server-name">
        <div>服务器名称</div>
        <input type="text">
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

<style lang='stylus'>
.general
  color $bright-font
  &>div
    display flex
    justify-content space-between
    align-items center
    padding-top 20px
    & .server-icon
      width 100px
      height 100px
      border-radius 50%
      background-color $main-blue
      text-align center 
      font-size 25px
      line-height 100px
    & .upload-btn 
      height 40px
      width 100px
      padding 5px 10px
      font-size 15px
      line-height  30px
      text-align center
      corlor $bright-font
      border 1px solid $server-setting-option
      border-radius 5px
    & .server-name
      width 270px
      height 80px
      &>div
        font-size 14px
      & input 
        margin-top 10px
        width 100%
        height 40px
        padding 0 20px
        font-size 18px
        color #7F8186
        border 1px solid $home
        border-radius 5px
        background-color $catalog
        &:hover
          border 1px solid #000
        &:focus
          outline none
          border 1px solid $main-blue
</style>