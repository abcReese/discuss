<template>
  <div>
    <div class="channel-box">
      <h2>删除频道</h2>
      <div >
        <div class="title">输入频道名称以确认</div>
        <input type="text">
      </div>
    </div>
    <btn>删除</btn>
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