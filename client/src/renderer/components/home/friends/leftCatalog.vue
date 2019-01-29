<template>
  <div id="catalog">
    <div class="friends" @click="getFriends" :class="{click:friendsClick,friendshover:hover}" @mouseover="friendsHover" @mouseout="outFriends">
      <div class="friends-icon"></div>
      <div class="friends-font" >好友</div>
    </div>
    <div class="catalog-line"></div>
    <div class="friends-message" :style="messageList">
      <span class="message-title">私信</span>
      <div class="message" :class="{click:chat==index,friendshover:message===index}" @click="goChat(index)"
      @mouseout="out" @mouseover="messageHover(index)" 
      v-for="(item,index) in friendsMessages" :key="item.nickname">
        <div class="message-icon">
          <img src="../../../assets/default-avatar.png" alt="">
          <div class="status-circle"></div>
        </div>
        <div class="nickname">
          <span :class="{messagehover:message===index}">nickname</span>
          <span id="delete" v-if="showDelete==index">x</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messageList:{
        height:''
      },
      message:-1,
      arr:[
        {
        nickname:'aaa'
      }
      ],
      friendsMessages:[{
        nickname:'aaa'
      },
      {
        nickname:'bbb'
      }],
      friendsClick:true,
      hover:false,
      chat:-1,
      chatIndex:-1,
      showDelete:-1
    }
  },
  components: {

  },
  methods: {
    getStyle(){
      this.messageList.height=window.innerHeight-90+'px';
    },
    messageHover(index){
      if(this.chat!==index){
        this.message=index;
      }
      this.showDelete=index;
    },
    out(){
      this.message=-1;
      this.showDelete=-1;
    },
    getFriends(){
      this.chat=-1;
      this.hover=false;
      this.friendsClick=true;
      this.$router.push({path:'detail'})
      this.$store.dispatch('changePath','detail');
    },
    friendsHover(){
      if(!this.friendsClick){
        this.hover=true;
      }
    },
    outFriends(){
      this.hover=false;
    },
    goChat(index){
      this.chat=index;
      this.message=-1;
      this.friendsClick=false;
      this.$router.push({path:'/chat'});
      this.$store.dispatch('changePath','chat');
    }
  },
  created(){
    window.addEventListener('resize', this.getStyle);
    this.getStyle();
   },
  destroyed(){
     window.removeEventListener('resize', this.getStyle)
   }
}
</script>

<style lang="stylus">
#catalog
  float left
  width 240px
  height 100%
  color $catalog-font
  background-color $catalog
  border-radius 5px 0 0 5px
  padding 10px 0
  & .catalog-line
    margin 5px 0 10px 0
    height 1px
    background-color $home
.click
  background-color $content-click
  color #fff
.friendshover
  color #fff
  background-color $content
.friends
  height 40px
  padding 10px 2px
  margin 0 10px
  border-radius 10px
  &:hover
    cursor pointer
  & .friends-icon
    float left
    margin-left 10px
    width 30px
    padding-left 10px
    height 100%
    background url("../../../assets/friends.png") 0 center no-repeat
  & .friends-font
    margin-left 40px
    padding-left 10px
    height 100%
    font-size 17px;
    line-height 19px
.friends-message
  padding 0 10px
  overflow auto
  &::-webkit-scrollbar /*滚动条整体样式*/
  display none
  & .messagehover
    color #fff
  & .message-title
    padding 0 10px
    font-size 15px

  & .message
    margin-top 5px
    display flex
    height 40px
    border-radius 5px
    padding 5px 10px
    &:hover
      cursor pointer
    & .message-icon
      position relative
      border-radius 50%
      width 30px
      height 30px
      background-color $main-blue
      & img 
        position absolute
        top 50%
        left 50%
        transform: translate(-50%,-50%)
        z-index 1
      & .status-circle
        position absolute
        bottom -3px
        right -2px
        width 13px
        height 13px
        border-radius 50%
        border 2px solid $catalog
        background-color $offline
        z-index 2
    & .nickname
      display flex
      font-size 16px
      justify-content space-between
      line-height 30px
      width 170px
      & span 
        padding-left 10px
      & #delete:hover
        color #fff
</style>