<template>
  <div class="chat-message" :class="{'self-message':message.from.email==user.email}">
    <div class="left-avator">
      <img :src="avatar" alt="">
    </div>
    <div class="right-message">
      <div class="nickname-time" :class="{'self-message':message.from.email==user.email}">
        <span class="nickname">{{message.from.nickname}}&nbsp;&nbsp;{{message.from.email}}</span>
        <span class="time">{{time}}</span>
      </div>
      <div class="content" v-if="message.message.type=='text'">
        <span :class="{'self-content':message.from.email==user.email}">{{message.message.content}}</span>
      </div>
      <chatimage v-else-if="message.message.type=='image'">
        <a :href="$url+'/upload/'+message.message.content" :download="message.message.content">{{message.message.content}}</a>
      </chatimage>
      <chataudio v-else-if="message.message.type=='audio'">
        <a :href="$url+'/upload/'+message.message.content" :download="message.message.content">{{message.message.content}}</a>
      </chataudio>
      <chatvideo v-else-if="message.message.type=='video'">
        <a :href="$url+'/upload/'+message.message.content" :download="message.message.content">{{message.message.content}}</a>
      </chatvideo>
      <file v-else>
        <a :href="$url+'/upload/'+message.message.content" :download="message.message.content">{{message.message.content}}</a>
      </file>
    </div>
  </div>
</template>

<script>
import chatimage from './message-type/image'
import chataudio from './message-type/audio'
import chatvideo from './message-type/video'
import file from './message-type/file'
export default {
  data () {
    return {
    }
  },
  computed: {
    time(){
      let time = new Date(this.message.message.time);
      let year=time.getFullYear(),
          month=time.getMonth()+1,
          day=time.getDate(),
          hour=time.getHours(),
          minute=time.getMinutes(),
          second=time.getSeconds();
      return year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒';
    },
    current(){
      return this.$store.state.chat.current;
    },
    user(){
      return this.$store.state.user.user;
    },
    avatar(){
      return this.message.from.avatar;
    }
  },
  components: {
    chatimage,
    chataudio,
    chatvideo,
    file
  },
  props:['message']
}
</script>

<style lang="stylus">
.chat-message
  display flex
  min-height 80px
  padding 20px 10px 20px 0
  border-bottom 1px solid $chat-cutoff
  &>div
    min-height 40px
  & .left-avator
    width 40px
    height 40px
    border-radius 50%
    background $main-blue no-repeat center
    & img 
      height 40px
      width 40px
      border-radius 50%
  & .right-message
    margin 0 20px
    & div
      min-height 20px
    & .nickname-time
      display flex
      line-height 20px
      & .nickname
        color #fff
      & .time 
        margin-left 5px
        color #5E6165
        font-size 13px
.self-message
  flex-direction row-reverse
.self-content
  float right
  margin-right 20px
  margin-top 5px
.content 
  word-wrap:break-word
  & a
    color $bright-font
    text-decoration none
    &:hover
      text-decoration underline
</style>