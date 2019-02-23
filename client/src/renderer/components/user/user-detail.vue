<template>
  <div class="user-detail">
    <div class="user-info">
      <div class="user-avatar">
        <img :src="user.avatar" alt="">
      </div>
      <div class="user-name">
        <div>{{user.nickname}}</div>
        <div>{{user.nicknameCount}}</div>
      </div>
      <div class="user-setting">
        <div class="micro"></div>
        <div class="earphone"></div>
        <div class="setting" @click="userSetting"></div>
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
    user(){
      return this.$store.state.user.user;
    }
  },
  components: {

  },
  methods:{
    userSetting(){
      var self=this
      this.$router.push({
        path:'usersetting',
        query:{
          prev:self.$route.path
        }
      })
    }
  }
}
</script>

<style lang='stylus'>

$hover-bgc=#25272A

.user-detail
  position absolute
  display flex
  justify-content space-between
  align-items center
  left 9%
  bottom 0
  height 50px
  width 240px
  padding 10px
  background-color #2B2C31
  z-index 3
  & .user-info
    position relative
    display flex
    height 30px
    & .user-avatar 
      position relative
      height 30px
      width 30px
      border-radius 50%
      background-color $main-blue
      & img 
        position absolute
        top 50%
        left 50%
        height 30px
        width 30px
        transform: translate(-50%,-50%)
    & .user-name
      margin-left 10px
      height 30px
      width 80px
      font-size 14px
      & div
        height 15px
        &:nth-of-type(1)
          color $bright-font
        &:nth-of-type(2)
          color $catalog-font
  & .user-setting
    display flex
    & div
      width 30px 
      height 30px
    & .micro
      background url('../../assets/micro.svg') center no-repeat
      &:hover
        cursor pointer
        background $hover-bgc url('../../assets/micro-hover.svg') center no-repeat
    & .earphone
      background url('../../assets/earphone.svg') center no-repeat
      &:hover
        cursor pointer
        background $hover-bgc url('../../assets/earphone-hover.svg') center no-repeat
    & .setting
      background url('../../assets/setting.svg') center no-repeat
      &:hover
        cursor pointer
        background $hover-bgc url('../../assets/setting-hover.svg') center no-repeat
</style>