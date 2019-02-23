<template>
  <div id="server-content" v-if="serverIndex===index">
    <div class="content-title">{{channelName}}</div>
    <div class="chat-box">
      <chat-content class='a'></chat-content>
      <!-- <div class="member" :style="member"></div> -->
      <member></member>
    </div>
  </div>
</template>

<script>
import chatContent from '../home/chat/chat-content'
import chatInput from '../home/chat/chat-input'
import member from './member'
export default {
  data () {
    return {
     
    }
  },
  computed: {
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    channelName(){
      return this.$store.state.channelName.name;
    }
  },
  components: {
    chatContent,
    chatInput,
    member
  },
  methods:{
    
  },
  props:["index","name"]
}
</script>

<style lang="stylus">
#server-content
  position relative
  height 100%
  margin-left 240px
  // padding-left 20px
  background-color $content
.content-title
  height 50px
  line-height 50px
  padding 0 30px
  color $bright-font
  font-weight 600
  border-bottom 1px solid $home
.a
  margin-right 240px
.chat-box
  position relative
.member
  position absolute
  top 0 
  right 0
  width 240px
  background-color $catalog
</style>