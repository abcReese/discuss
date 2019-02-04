<template>
  <div>
    <div class="channel-box">
      <h2>添加好友</h2>
      <div >
        <div class="title">输入对方邮箱</div>
        <input type="text">
    </div>
    </div>
    <btn>发送邀请</btn>
  </div>
</template>

<script>
import btn from './btn'
export default {
  data () {
    return {

    }
  },
  components: {
    btn
  }
}
</script>

<style lang='stylus'>
.channel-box
  padding 20px
 
</style>