<template>
  <div id="chat">
    <chat-title></chat-title>
    <div class="cutoff"></div>
    <chat-content></chat-content>
  </div>
</template>

<script>
import chatTitle from '../chat/title'
import chatContent from '../chat/chat-content'
import chatInput from '../chat/chat-input'
export default {
  data () {
    return {

    }
  },
  components: {
    chatTitle,
    chatContent,
    chatInput
  }
}
</script>

<style lang="stylus">
#chat
  margin-left 240px
  height 100%
  background-color $content
  padding 10px 5px 10px 20px
.cutoff
  margin-top 5px
  height 1px
  background-color $home
</style>