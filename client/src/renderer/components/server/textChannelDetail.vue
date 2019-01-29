<template>
  <div class="channel-detail" >
    <div class="channel-left">#{{name}}</div>
    <div class="channel-right">
      <div class="create-invite" v-if="inviteIndex===index">创建邀请连接
        <div class="invite-arrow"></div>
      </div>
      <div class="add" @mouseover="invite(index)" @mouseout="inviteOut()">
      </div>
      <div class="channel-setting" v-if="settingIndex===index">编辑频道
        <div class="setting-arrow"></div>
      </div>
      <div class="setting" @mouseover="setting(index)" @mouseout="settingOut()">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inviteIndex:-1,
      settingIndex:-1
    }
  },
  components: {

  },
  methods:{
    invite(index){
      this.inviteIndex=index
    },
    inviteOut(){
      this.inviteIndex=-1;
    },
    setting(index){
      this.settingIndex=index;
    },
    settingOut(){
      this.settingIndex=-1;
    }
  },
  props:{
    name:{
      type:String
    },
    index:{
      type:Number
    }
  }
}
</script>

<style lang='stylus'>
.channel-detail
  display flex
  width 220px
  &:hover
    cursor pointer
    color #b3b5b8
    background-color $content
    border-radius 5px
  & .channel-left,& .channel-right
    height 30px
  & .channel-left
    width 70%
    padding-left 10px
    line-height 30px
  & .channel-right
    display flex
    position relative
    width 30%
    & .invite
      opacity 1
    & .create-invite
      position absolute
      top -30px
      left -30px
      width 100px
      height 30px
      line-height 30px
      padding 0 10px
      font-size 13px
      border-radius 5px
      text-align center
      color #fff
      background-color #000
      & .invite-arrow
        position absolute
        border 5px solid transparent
        left 43px
        bottom -10px
        border-top-color #000
    & .add
      position absolute
      left 10px 
      top 25%
      width 18px
      height 18px
      background url('../../assets/add.svg') center no-repeat
      &:hover
        cursor pointer
        background url('../../assets/add-hover.svg') center no-repeat
    & .channel-setting
      position absolute
      top -30px
      left 0px
      width 75px
      height 30px
      line-height 30px
      padding 0 10px
      font-size 13px
      border-radius 5px
      text-align center
      color #fff
      background-color #000
      & .setting-arrow
        position absolute
        border 5px solid transparent
        left 40px
        bottom -10px
        border-top-color #000
    & .setting
      position absolute
      right 11px 
      top 7px
      width 20px
      height 20px
      background url('../../assets/setting.svg') center no-repeat
      &:hover
        cursor pointer
        background url('../../assets/setting-hover.svg') center no-repeat
</style>