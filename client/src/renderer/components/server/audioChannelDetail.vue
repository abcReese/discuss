<template>
  <div class="channel-detail" :class="{cclick:channelClick===index,hover:channelHover==index,hide:hide&&channelClick!==index}"
  @click="goAudioChannel(index)" 
  @mouseover="hover(index)" @mouseout="channelOut" v-if="!(hide&&channelClick!==index)">
    <div class="channel-left">#{{services[serverIndex].audioChannel[index].name}}</div>
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
      :channelName="channelName" :cid="index" :flag="2"></delete-channel>
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
    goAudioChannel(index){

      let channelName=this.services[this.serverIndex].audioChannel[index].name;
      this.channelName=channelName;
      this.$store.dispatch('changeName',channelName);
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
.cclick
  color #fff
.hover
  color #b3b5b8
.hide
  height 0
</style>