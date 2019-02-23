<template>
  <div class="user">
    <div class="message-icon">
      <img :src="avatar" alt="">
      <!-- <div class="online-circle" v-if="online"></div>
      <div class="offline-circle" v-else></div> -->
    </div>
    <div class="nickname">
      <span>{{nickname}}</span><span class="email">{{info}}</span>
    </div>
    <div class="owner" v-if="email==userEmail">
      <img src="../../assets/crown.svg" alt="" @mouseover="hover" @mouseout="ownerOut">
      <div class="hover-tipe" v-if="ownerHover">
        <span>服务器所有者</span>
        <div class="owner-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      online:false,
      owner:true,
      ownerHover:false
    }
  },
  computed: {
    userEmail(){
      return this.$store.state.user.user.email;
    },
    info(){
      return '<'+this.email+'>';
    }
  },
  components: {

  },
  methods:{
    hover(){
      this.ownerHover=true;
    },
    ownerOut(){
      this.ownerHover=false;
    }
  },
  props:['email','nickname','avatar']
}
</script>

<style lang='stylus'>
.user 
  display flex
  height 40px
  padding 5px 10px
  color #b3b5b8
  &:hover
    cursor pointer
    background-color $content
    border-radius 5px
  & .message-icon
      position relative
      border-radius 50%
      width 30px
      height 30px
      background-color $main-blue
      & img 
        position absolute
        top 50%
        left 50%
        width 30px
        height 30px
        border-radius 50%
        transform: translate(-50%,-50%)
        z-index 1
      & .online-circle
        position absolute
        bottom -3px
        right -2px
        width 13px
        height 13px
        border-radius 50%
        border 2px solid $catalog
        background-color $online
        z-index 2
      & .offline-circle
        position absolute
        bottom -3px
        right -2px
        width 13px
        height 13px
        border-radius 50%
        border 2px solid $catalog
        background-color $offline
        z-index 2
  & .nickname
    padding-left 10px
    line-height 30px
    & span:first-child
      color $bright-font
    & .email
      font-size 11px
  & .owner
    position relative
    & img 
      position absolute
      left 10px
      top 8px
    & .hover-tipe
      position absolute
      left -32px
      top -32px
      padding 5px 10px
      height 30px
      width 100px
      color #b3b5b8
      font-size 13px
      line-height 20px
      border-radius 5px
      background-color #000
      & .owner-arrow
        position absolute
        border 5px solid transparent
        left 43px
        bottom -10px
        border-top-color #000
</style>