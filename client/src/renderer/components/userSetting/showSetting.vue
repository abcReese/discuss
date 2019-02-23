<template>
  <div class="my-account account">
    <div class="my-avatar"></div>
      <div class="my-info">
        <div class="username">
          <span>用户名</span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="email">
          <span>邮箱</span>
          <span>{{user.email}}</span>
        </div>
      </div>
    <div class="edit-btn" @click="edit">编辑</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    user(){
      return this.$store.state.user.user;
    }
  },
  components: {

  },
  methods:{
    edit(){
      this.$emit("edit");
    }
  }
}
</script>

<style lang='stylus'>
.my-account
  display flex
  justify-content space-between
  background-color #292B2F
  & .my-avatar
    width 100px
    height 100px
    border-radius 50%
    background-color $main-blue
  & .my-info
    width 320px
    height 100px
    padding-top 5px
    font-size 14px
    color $content-font
    & span 
      display block
  & .edit-btn
    height 30px
    line-height 30px
    color #fff
    font-size 15px
    padding 0 10px
    border-radius 5px
    background-color $main-blue
    &:hover
      background-color $main-blue-hover
      cursor pointer
</style>