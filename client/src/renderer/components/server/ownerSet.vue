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
      <div class="set server-setting" @click.stop="createChannel">
        <img src="../../assets/add.svg" alt="">
        <span>新建频道</span>
      </div>
      <div class="set server-setting" @click.stop="createClassify">
        <img src="../../assets/add.svg" alt="" >
        <span>创建分类</span>
      </div>
    </div>
    <modal v-show="modal" >
      <createChannel v-if="name=='createChannel'" :choosed="choosed"></createChannel>
      <createClassify v-if="name=='createClassify'"></createClassify>
      <invite v-if="name=='inviteToServer'"></invite>
    </modal>
  </div>
</template>

<script>
import modal from '../pages/modal'
import createChannel from '../modal/createChannel'
import createClassify from '../modal/createClassify'
import invite from '../modal/inviteToserver'
export default {
  data () {
    return {
      choosed:1
    }
  },
  computed: {
    modal(){
      return this.$store.state.modal.modal
    },
    name(){
      return this.$store.state.modal.name
    }
  },
  components: {
    modal,
    createChannel,
    createClassify,
    invite
  },
  methods:{
    serverSetting(){
      this.$router.push({path:'serversetting'})
    },
    invite(){
      this.$store.dispatch('changeStatus',{modal:true,name:'inviteToServer'});
    },
    createChannel(){
      this.$store.dispatch('changeStatus',{modal:true,name:'createChannel'});
    },
    createClassify(){
      this.$store.dispatch('changeStatus',{modal:true,name:'createClassify'});
    }
  },

  created(){
    this.$store.dispatch('initModal');
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