<template>
  <div class="channel-detail" :class="{aclick:channelClick===index,chover:channelHover==index}"
  @click="goTextChannel(index)" 
  @mouseover="hover(index)" @mouseout="channelOut" v-if="!(hide&&channelClick!==index)">
    <div class="channel-left">#{{services[serverIndex].textChannel[index].name}}</div>
    <div class="channel-right">
      <div class="create-invite" v-if="inviteIndex===index">删除频道
        <div class="invite-arrow"></div>
      </div>
      <div class="add" @mouseover="invite(index)" 
      @mouseout="inviteOut()"
      @click="deleteChannel" v-show="index==channelClick&&email==services[serverIndex].ownerEmail">
      </div>
      <div class="channel-setting" v-if="settingIndex===index">编辑频道
        <div class="setting-arrow"></div>
      </div>
      <div class="setting" @mouseover="setting(index)" 
      @mouseout="settingOut()"
      @click="edit" v-show="index==channelClick&&email==services[serverIndex].ownerEmail">
      </div>
    </div>
    <modal v-show="allow&&modal">
      <editChannel v-if="mname==='editChannel'" @changeModal="changeModal"></editChannel>
      <delete-channel v-if="mname==='deleteChannel'" @changeModal="changeModal"
      :channelName="channelName" :cid="index" :flag="1"></delete-channel>
    </modal>
  </div>
</template>

<script>
import modal from '../pages/modal'
import editChannel from '../modal/editChannel'
import deleteChannel from '../modal/deleteChannel'
export default {
  data () {
    return {
      inviteIndex:-1,
      settingIndex:-1,
      allow:false,
      channelName:''
    }
  },
  computed: {
    modal(){
      return this.$store.state.modal.modal
    },
    mname(){
      return this.$store.state.modal.name
    },
    services(){
      return this.$store.state.category.category.services
    },
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    email(){
      return this.$store.state.user.user.email;
    }
  },
  components: {
    modal,
    editChannel,
    deleteChannel
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
    },
    goTextChannel(index){
      let channelName=this.services[this.serverIndex].textChannel[index].name,
          cid=this.services[this.serverIndex].textChannel[index].cid,
          gid=this.services[this.serverIndex].gid,
          to=gid+'-'+cid;
      this.channelName=channelName;
      this.$store.dispatch('changeName',channelName);

      this.$socket.emit('getHistory',{to,type:'server'},data=>{
 
        this.$store.dispatch('setHistory',data);
      })
      this.$store.dispatch('setCurrent',{info:{index},type:'server'});
      this.$emit("clickIndex",index);
    },
    hover(index){
      this.$emit("hoverIndex",index);
    },
    channelOut(){
      this.$emit("outIndex");
    },
    edit(){
      this.allow=true;
      this.$store.dispatch('changeStatus',{modal:true,name:'editChannel'});
    },
    deleteChannel(){
      this.allow=true;
      this.$store.dispatch('changeStatus',{modal:true,name:'deleteChannel'});
    },
    changeModal(){
      this.allow=false;
    }
  },
  props:["name","index","channelClick","channelHover","hide"],
  created() {
    this.allow=false;
  },
}
</script>

<style lang='stylus'>
.aclick
  color #fff
  background-color $content-click
.chover
  
  color #b3b5b8
  background-color $content
.hide
  height 0
.channel-detail
  display flex
  width 220px
  margin-bottom 2px
  border-radius 5px
  &:hover
    cursor pointer
    border-radius 5px
  & .channel-left,& .channel-right
    height 35px
  & .channel-left
    width 70%
    padding-left 10px
    line-height 35px
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