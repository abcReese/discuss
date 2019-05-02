<template>
  <div class="content-box">
    <div class="chat-content" :style="content" v-if="type=='user'">
      <div class="chat-begin">
        <span >这是您与@{{current.info.nickname}}私信的开头</span>
        
        <slot></slot>
      </div>
    
     <message v-for="item in messages" :key="item.name" :message="item"></message>
    
    </div>
    <div class="chat-content" :style="content" v-else>
      <div class="chat-begin">
        <span >欢迎来到aaa</span>
        <slot></slot>
      </div>
     
       <server-message v-for="item in messages" :key="item.name" :message="item"></server-message>
     
  
    
    </div>
    <chat-input></chat-input>
  </div>
</template>

<script>
import message from './message'
import chatInput from './chat-input'
import serverMessage from './server-message'
export default {
  data () {
    return {
      content:{
        height:''
      }
    }
  },
  computed:{
    type(){
      return this.$store.state.chat.current.type;
    },
    messages(){
      return this.$store.state.chat.history;
    },
    current(){
      return this.$store.state.chat.current;
    }
  },
  components: {
    message,
    chatInput,
    serverMessage
  },
  methods: {
    scrollToBottom(){
      this.$nextTick(() => {
	    var container = this.$el.querySelector(".chat-content");
        container.scrollTop = container.scrollHeight;
     })
    },
    getStyle(){
      this.content.height=window.innerHeight-174+'px';
    }
  },
  mounted () {
    this.scrollToBottom();
  },
  updated:function(){
    this.scrollToBottom();
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

<style lang="stylus">
.content-box
  padding-left 20px
.chat-content
  color $content-font
  overflow auto 
  &::-webkit-scrollbar 
    width 8px
    height 8px
    margin 4px
    background-color $catalog
    border-radius 10px
  &::-webkit-scrollbar-track
    -webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.3)
    border-radius 10px
    background-color: $catalog
  &::-webkit-scrollbar-thumb
    border-radius 10px
    -webkit-box-shadow inset 0 0 6px rgba(0,0,0,.3)
    background-color $home
  & .chat-begin
    position relative
    height 100px
    border-bottom 1px solid $chat-cutoff
    & span 
      position absolute
      left 0
      bottom 15px
</style>