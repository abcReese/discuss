<template>
  <div class="account edit-account">
    <div class="main-info">
      <div class="my-avatar"></div>
      <div class="info">
        <div class="username">
          <div>用户名<span>*</span></div>
          <div>
            <input type="text">
            <div class="number"></div>
          </div>
        </div>
        <div class="email">
          <div>邮箱<span>*</span></div>
          <input type="text">
        </div>
        <div class="password">
          <div>当前密码<span>*</span></div>
          <input type="text">
        </div>
        <span class="change" v-if="!change" @click="changePwd">更改密码？</span>
        <div class="password" v-else>
          <div>新密码<span>*</span></div>
          <input type="text">
        </div>
      </div>
    </div>
    <div class="cutoff"></div>
    <div class="account-btn">
      <div class="delete">
        删除账户
      </div>
      <div class="submit" >
        <div @click="cancle">取消</div>
        <div>保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      change:false
    }
  },
  components: {

  },
  methods:{
    changePwd(){
      this.change=true;
    },
    cancle(){
      this.$emit('cancle');
    }
  }
}
</script>

<style lang='stylus' scoped>
.edit-account
  background-color #303237
  color $content-font
  & .cutoff
    margin-top 20px
    margin-bottom 20px
    height 1px
    background-color $chat-cutoff
  & .main-info
    display flex
    justify-content space-between
    & span
      color $delete-red
    & .my-avatar
      width 100px
      height 100px
      border-radius 50%
      background-color $main-blue
    & .info input 
      height 40px
      width 400px
      border-radius 5px
      font-size 18px
      background-color  $setting-bgc
      border 1px solid  $setting-bgc
      padding 10px
      color $bright-font
      &:focus
        background-color #303237
        outline none
        border 1px solid $main-blue
    & .info>div>div:first-child
      margin-bottom 10px
    & .username 
      font-size 13px
      & input 
        border-radius 5px 0 0 5px
        width 275px
      &>div:last-child
        display flex
      & .number
        width 125px
        height 40px
        background-color $setting-bgc
        border-left 1px solid $chat-cutoff
    & .email
      font-size 13px
    & .password
      font-size 13px
    & .change
      font-size 14px
      color $bright-font
      &:hover
        text-decoration underline 
        cursor pointer
  & .account-btn
    display flex
    justify-content space-between
    font-size 14px
    & .delete
      padding 5px 10px
      border-radius 5px
      color $delete-red
      border 1px solid $delete-red
    & .submit 
      display flex
      justify-content space-between
      color $bright-font
      height 30px
      line-height 20px
      & div
        padding 5px 15px
      & div:first-child
        margin-right 10px
        &:hover 
          text-decoration underline 
          cursor pointer
      & div:last-child
        background-color #43BF81
        border-radius 5px
        &:hover
          background-color #3CA374
          cursor pointer
</style>  