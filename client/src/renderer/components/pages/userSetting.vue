<template>
  <div id="user-setting" :style="settingStyle">
    <div class="setting-leftside">
      <div class="setting-options">
        <div class="option">
          我的账户
        </div>
        <div class="log-out" >登出</div>
      </div>
    </div>
    <div class="setting-right">
      <div class="setting-detail">
        <show-setting v-if="!edit" @edit="move"></show-setting>
        <edit-setting v-else @cancle="move"></edit-setting>
        <div class="esc" @click="back">
          <div class="left-line"></div>
          <div class="right-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import leftside from '../serverStting/leftSide'
// import rightside from '../serverStting/right-content'
import showSetting from '../userSetting/showSetting'
import editSetting from '../userSetting/editSetting'
export default {
  data () {
    return {
      edit:false,
      settingStyle:{
        height:'',
        width:'',
      },
      options:[
        {
          title:'我的账户'
        }
      ]
    }
  },
  components: {
    showSetting,
    editSetting
  },
  methods:{
    back(){
      var prev=this.$route.query.prev;
      this.$router.push({
        path:prev
      })
    },
    move(){
      this.edit=!this.edit;
    },
    getStyle(){
      this.settingStyle.height=window.innerHeight-23+'px';
      this.settingStyle.width=window.innerWidth+'px';
    }
  },
  created(){
     window.addEventListener('resize', this.getStyle);
     this.getStyle()
   },
  destroyed(){
     window.removeEventListener('resize', this.getStyle)
   }
}
</script>

<style lang='stylus'>
#user-setting
  display flex
  & .option
    color #fff
    background-color $main-blue
  & .log-out
    color $delete-red
    &:hover
      cursor pointer
      background-color #423337
  
  & .setting-right
    &::-webkit-scrollbar
      display none
    & .account
      // align-items center
      padding 20px
      border-radius 5px
</style>