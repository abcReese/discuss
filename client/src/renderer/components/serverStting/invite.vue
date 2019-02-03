<template>
  <div class="server-invite">
    <h3>申请列表</h3>
    <list>
      <div class="invite-btn" slot="operate">
        <div class="agree">同意</div>
        <div class="reject">拒绝</div>
      </div>
    </list>
  </div>
</template>

<script>
import list from './member-list'
export default {
  data () {
    return {

    }
  },
  components: {
    list 
  }
}
</script>

<style lang='stylus'>
.server-invite
  color $bright-font
  & .invite-btn
    display flex
    & div
      height 30px
      padding 0 10px
      line-height 30px
      font-size 15px
      text-align center
      border-radius 5px
    & .agree
      background-color $main-blue
    & .reject
      margin-left 5px
      background-color $delete-red
</style>