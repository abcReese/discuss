<template>
  <div class='list'>
    <div class="member-detail" >
        <div class="user-info">
          <div class="avatar">
            <img :src="member.avatar||''" alt="">
          </div>
          <div class="name">
            <div>{{member.nickname||''}}</div>
            <div>{{member.nicknameCount||''}}</div>
          </div>
          <slot name="crown"></slot>
        </div>
        <slot name="operate"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  props:['member']
}
</script>

<style lang='stylus'>
.list 
  margin-top 10px
  & .member-detail
    display flex 
    justify-content space-between
    align-items center
    border 1px solid transparent
    border-top-color $chat-cutoff
    border-bottom-color $chat-cutoff
    height 70px
    padding 15px 20px
    &:hover
      border-radius 5px
      border-color $home
      background-color $catalog
    & .user-info
      position relative
      display flex
      height 40px
      & .avatar 
        position relative
        height 40px
        width 40px
        border-radius 50%
        background-color $main-blue
        & img 
          position absolute
          top 50%
          left 50%
          transform: translate(-50%,-50%)
          height 40px
          width 40px
      & .name
        margin-left 15px
        height 40px
        width 100px
        & div
          height 20px
</style>