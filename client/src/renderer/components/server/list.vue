<template>
  <div id="server-leftside" v-if="serverIndex===listIndex">
    <div class="server-name-box" @click="editServer">
      <span class="server-name">{{name}}</span>
      <div class="arrow" v-if="edit"></div>
      <div class="cancle" v-else></div>
      <ownerset v-if="allow&&owner"></ownerset>
      <normolset v-if="allow&&!owner"></normolset>
    </div>
    <div class="channel-list" :style="channelList">
      <div class="channel text-channel">
        <div class="channel-title" @click="showText">
          <span class="show-all" v-if="textShow"></span>
          <span class="hide" v-else></span>
          <span class="text">文字频道</span>
          <span class="add-channel" v-if="owner">+</span>
        </div>
        <textchanneldetail v-for="(item,index) in textChannel" 
        :name="item.name" :index="index" :channelClick="channelClick" 
        :channelHover="channelHover"
        :key="item.name" @clickIndex="indexChange"
        @hoverIndex="hoverChange" @outIndex="outChange"></textchanneldetail>
      </div>
      <div class="channel audi-ochannel">
        <div class="channel-title" @click="showAudio">
          <span class="show-all" v-if="audioShow"></span>
          <span class="hide" v-else></span>
          <span class="text">语音频道</span>
          <span class="add-channel" v-if="owner">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import normolset from './normolSet'
import ownerset from './ownerSet'
import textchanneldetail from './textChannelDetail'
export default {
  data () {
    return {
      edit:true,
      allow:false,
      owner:true,
      textShow:true,
      audioShow:true,
      channelClick:-1,
      channelHover:-1,
      channelList:{
        height:''
      },
      textChannel:[
        {
        name:'sdasd'
        },
        {
        name:'sdsafg1'
        },
        {
        name:'sdsafg2'
        },
        {
          name:'sdsafg3'
        },
        {
          name:'sdsafg4'
        },
        {
          name:'sdsafg5'
        },
        {
          name:'sdsafg6'
        },
        {
          name:'sdsafg7'
        },
        {
          name:'sdsafg8'
        },
        {
          name:'sdsafg9'
        },
        {
          name:'sdsafg12'
        },
        {
          name:'sdsafg13'
        },
        {
          name:'sdsafg15'
        },
        {
          name:'sdsafg152'
        },
        {
          name:'sdsafg51'
        },
        {
          name:'sdsafg21'
        }
      ],
      audioChannel:[]
    }
  },
  computed: {
    serverIndex(){
      return this.$store.state.serverIndex.index;
    }
  },
  components: {
    normolset,
    ownerset,
    textchanneldetail
      // template:`
      //   <div class="channel-detail">
      //     <div class="channel-left">#{{name}}</div>
      //     <div class="channel-right">
      //       <div class="create-invite">创建邀请连接</div>
      //       <div class="add">
      //       </div>
      //       <div class="setting">
      //       </div>
      //     </div>
      //   </div>
      // `,
      // props:['name','index']
  },
  props:["name","listIndex"],
  methods:{
    editServer(){
      this.edit=!this.edit;
      this.allow=!this.allow;
    },
    showText(){
      this.textShow=!this.textShow;

    },
    showAudio(){
      this.audioShow=!this.audioShow;
    },
    indexChange(index){
      this.channelClick=index;
    },
    hoverChange(index){
      if(this.channelClick!==index){
        this.channelHover=index;
      }
    },
    outChange(){
      this.channelHover=-1;
    },
    getStyle(){
      this.channelList.height=window.innerHeight-123+'px';
    }
  },
  created(){
    window.addEventListener('resize', this.getStyle);
    this.getStyle();
   },
  updated(){
    this.edit=true;
    this.arrow=false;
  },
  destroyed(){
     window.removeEventListener('resize', this.getStyle)
   }
}
</script>

<style lang="stylus">
$hover-font=#B9BBBE
#server-leftside
  position absolute
  float left
  width 240px
  // height 100%
  border-radius 5px 0 0 5px
.server-name-box
  position relative
  height 50px
  line-height 50px
  padding 0 10px
  color $bright-font
  font-weight 600
  border-bottom 1px solid $home
  &:hover
    cursor pointer
    background-color #2A2C30
  & .arrow, & .cancle
    position absolute
    right 15px
    width 8px
    height 8px
    border 2px solid transparent
    transform rotate(45deg)
  & .arrow
    top 20px
    border-right-color #959698
    border-bottom-color #959698
  & .cancle
    top 24px
    border-left-color #959698
    border-top-color #959698
    transform rotate(45deg)

.channel-list
  padding 30px 10px 0 10px
  color $channel-list
  overflow-y auto
  overflow-x visible
  &::-webkit-scrollbar 
    display none
  & .text-channel
    padding-bottom 30px
  & .channel-title
    position relative
    height 20px
    padding-right 15px
    &:hover
      cursor pointer
    &:hover .text 
      color $hover-font
    &:hover .show-all
      border-right-color $hover-font
      border-bottom-color $hover-font
    &:hover .hide
      border-top-color $hover-font
      border-right-color $hover-font
    & span 
      display inline-block
      line-height 20px
    & .text
      margin-left 15px
      width 175px
      font-weight 500
      font-size 13px
    & .show-all, & .hide
      position absolute
      width 5px
      height 5px
      border 1px solid transparent
      transform rotate(45deg)
      z-index 2
    & .show-all
      left 2px
      top 5px
      border-right-color #959698
      border-bottom-color #959698
    & .hide
      left 1px
      top 7px
      border-top-color #959698
      border-right-color #959698
    & .add-channel
      float right
      font-size 20px
      &:hover
        color $hover-font
</style>