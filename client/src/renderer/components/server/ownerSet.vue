<template>
  <div id="owner-set">
    <div class="set invite-other" @click.stop="invite">
      <img src="../../assets/add.svg" alt="">
      <span>邀请其他人</span>
    </div>
    <div class="setting-cutoff"></div>
    <div class="server-manager">
      <div class="set server-setting" @click="serverSetting">
        <img src="../../assets/add.svg" alt="">
        <span>服务器设置</span>
      </div>
      <div class="set server-setting">
        <img src="../../assets/add.svg" alt="">
        <span>新建频道</span>
      </div>
      <div class="set server-setting">
        <img src="../../assets/add.svg" alt="">
        <span>创建分类</span>
      </div>
    </div>
    <modal v-show="modal"></modal>
  </div>
</template>

<script>
import modal from '../pages/modal'
export default {
  data () {
    return {
      modal:false
    }
  },
  components: {
    modal
  },
  methods:{
    serverSetting(){
      this.$router.push({path:'serversetting'})
    },
    invite(){
      console.log('00');
      this.modal=true;
    }
  }
}
</script>

<style lang="stylus">
#owner-set
  position absolute
  top 55px
  left 10px
  width 220px
  border-radius 5px
  font-size 13px
  color $channel-list
  background-color $setting-bgc
  z-index 3
  & .setting-cutoff
    height 1px
    background-color $chat-cutoff
  & .set
    position relative
    height 35px
    line-height 35px
    border-radius 5px
    padding 0 15px
    &:hover
      background-color $setting-hover
      color $bright-font
    & span 
      margin-left 30px
    & img 
      position absolute
      left 15px
      top 8px
</style>