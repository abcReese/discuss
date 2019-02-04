<template>
  <div class="create-classify">
    <div class="channel-box">
      <h2>创建分类</h2>
      <div class="classify-name">
        <div class="title">分类名称</div>
        <input type="text">
    </div>
    </div>
    <btn>新建分类</btn>
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