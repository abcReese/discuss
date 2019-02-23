<template>
  <div id="server-leftside" v-if="serverIndex===listIndex">
    <div class="server-name-box" @click="editServer">
      <span class="server-name">{{services[serverIndex].serverName}}</span>
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
          <span class="add-channel" v-if="owner" @click.stop="newTextChannel">+</span>
        </div>
        <textchanneldetail v-for="(item,index) in services[serverIndex].textChannel" 
        :name="item.name" :index="index" :channelClick="channelClick" 
        :channelHover="channelHover" :hide="tHide"
        :key="item.name" @clickIndex="indexChange"
        @hoverIndex="hoverChange" @outIndex="outChange"></textchanneldetail>
      </div>
      <div class="channel audi-ochannel">
        <div class="channel-title" @click="showAudio">
          <span class="show-all" v-if="audioShow" @click="audioHide"></span>
          <span class="hide" v-else></span>
          <span class="text">语音频道</span>
          <span class="add-channel" v-if="owner" @click.stop="newAudioChannel">+</span>
        </div>
        <audio-channel-detail v-for="(item,index) in services[serverIndex].audioChannel" 
        :index="index" :channelClick="achannelClick" 
        :channelHover="achannelHover" :hide="aHide"
        :key="item.name" @clickIndex="aindexChange"
        @hoverIndex="ahoverChange" @outIndex="aoutChange"></audio-channel-detail>
      </div>
    </div>
    <modal v-show="modal&&allowModal" >
      <createChannel v-if="mname=='createChannel'" :choosed="choosed" @changeModal="changeModal"></createChannel>
    </modal>
  </div>
</template>

<script>
import normolset from './normolSet'
import ownerset from './ownerSet'
import textchanneldetail from './textChannelDetail'
import modal from '../pages/modal'
import createChannel from '../modal/createChannel'
import audioChannelDetail from './audioChannelDetail'
export default {
  data () {
    return {
      edit:true,
      allow:false,
      allowModal:false,
      owner:true,
      textShow:true,
      audioShow:true,
      channelClick:0,
      channelHover:-1,
      achannelClick:-1,
      achannelHover:-1,
      choosed:1,
      tHide:false,
      aHide:false,
      channelList:{
        height:''
      },
      textChannel:[
        
      ],
      audioChannel:[]
    }
  },
  computed: {
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    modal(){
      return this.$store.state.modal.modal
    },
    mname(){
      return this.$store.state.modal.name
    },
    services(){
      return this.$store.state.category.category.services
    }
  },
  components: {
    normolset,
    ownerset,
    textchanneldetail,
    modal,
    createChannel,
    audioChannelDetail
  },
  props:["name","listIndex"],
  methods:{
    editServer(){
      this.edit=!this.edit;
      this.allow=!this.allow;
      this.allowModal=false;
      this.$store.dispatch('initModal');
    },
    showText(){
      this.textShow=!this.textShow;
      this.tHide=!this.tHide;
    },
    newTextChannel(){
      this.allowModal=true
      this.choosed=1;
      this.$store.dispatch('changeStatus',{modal:true,name:'createChannel'});
    },
    newAudioChannel(){
      this.allowModal=true
      this.choosed=2;
      this.$store.dispatch('changeStatus',{modal:true,name:'createChannel'});
    },
    showAudio(){
      this.audioShow=!this.audioShow;
      this.aHide=!this.aHide;
    },
    indexChange(index){
      this.channelClick=index;
      this.achannelClick=-1;
      this.channelHover=-1;
    },
    hoverChange(index){
      if(this.channelClick!==index){
        this.channelHover=index;
      }
    },
    outChange(){
      this.channelHover=-1;
    },
    aindexChange(index){
      this.achannelClick=index;
      this.channelClick=-1;
    },
    ahoverChange(index){
      if(this.achannelClick!==index){
        this.achannelHover=index;
      }
    },
    aoutChange(){
      this.achannelHover=-1;
    },
    getStyle(){
      this.channelList.height=window.innerHeight-123+'px';
    },
    textHide(){
      this.tHide=!this.tHide;
    },
    audioHide(){
      this.aHide=!this.tHide;
    },
    changeModal(){
      this.allowModal=false;
    }
  },
  created(){
    this.allowModal=false;
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