<template>
  <div class="create-channel">
    <div class="channel-box">
      <h2>创建频道</h2>
    <div class="channel-name">
      <div class="title">频道名称</div>
      <input type="text" v-model="channelName">
    </div>
    <div class="channel-classify">
      <div class="title">频道类别</div>
      <div class="choice" >
        <div class="text-channel" :class="{choosed:choose==1}" @click.capture="chooseOne">
          <input type="radio" name="channelClassify"><label>文字频道</label>
          <div class="radio-box" :class="{boxChoosed:choose==1}"></div>
          <div class="radio-choosed" v-show="choose==1">✔</div>
        </div>
        <div class="voice-channel" :class="{choosed:choose==2}" @click.capture="chooseTwo">
          <input type="radio" name="channelClassify"><label>语音频道</label>
          <div class="radio-box" :class="{boxChoosed:choose==2}"></div>
          <div class="radio-choosed" v-show="choose==2">✔</div>
        </div>
      </div>
    </div>
    </div>
    <btn :eventName="'createChannel'"
    @createChannel="createChannel" @ban="ban">新建频道</btn>
  </div>
</template>

<script>
import btn from './btn'
export default {
  data () {
    return {
      index:1,
      choose:1,
      channelName:''
    } 
  },
  computed: {
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    services(){
      return this.$store.state.category.category.services;
    }
  },
  components: {
    btn
  },
  methods:{
    chooseOne(){
      this.choose=1
    },
    chooseTwo(){
      this.choose=2;
    },
    createChannel(){
      let gid=this.services[this.serverIndex].gid;
      if(this.channelName){
        this.$socket.emit('createChannel',{gid:gid,channelName:this.channelName,index:this.choose},()=>{
          this.$store.dispatch('createChannel',{serverIndex:this.serverIndex,index:this.choose,channelName:this.channelName});
          this.$store.dispatch('initModal');
        });
      }else{
        console.log('0');
      }
    },
    ban(){
      this.$emit('changeModal');
    }
  },
  props:{
    choosed:{
      default:1
    }
  },
  // props:["choosed"]
  created(){
    this.choose=this.choosed;
  }
}
</script>

<style lang='stylus'>
.create-channel
  font-size 12px
  & .channel-box
    padding 20px
  & .choice .choosed
    background-color $main-blue
    border-color $main-blue
  & .choice>div
    position relative
    width 400px
    height 45px
    line-height 45px
    border 1px solid $home
    border-radius 5px
    background-color #303339
    & .radio-box
      position absolute
      left 10px
      top -10px
      width 25px
      height 25px
      border-radius 2px
      border 1px solid  $content-font
    & .radio-choosed
      position absolute
      left 17px
      top -20px
      color $main-blue
      font-size 16px
      font-weight 600
    & .boxChoosed
      background-color #fff
    & input 
      display none
    &:hover
      cursor pointer
    & label 
      position absolute
      font-size 17px
      left 80px
      top 0
      &:hover 
        cursor pointer
    &:first-child
      margin-bottom 10px
  
</style>