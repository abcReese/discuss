<template>
  <div>
    <div class="channel-box">
      <h2>修改频道名称</h2>
      <div >
        <div class="title">输入新频道名称</div>
        <input type="text">
      </div>
    </div>
    <btn>修改</btn>
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