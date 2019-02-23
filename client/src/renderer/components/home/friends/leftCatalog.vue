<template>
  <div id="catalog">
    <div class="search">
      <input type="text" placeholder="" @click="joinServer">
    </div>
    <div class="catalog-line"></div>
    <div class="friends" @click="getFriends" :class="{click:click,friendshover:hover}" @mouseover="friendsHover" @mouseout="outFriends">
      <div class="friends-icon"></div>
      <div class="friends-font" >好友</div>
    </div>
    <div class="friends-message" :style="messageList">
      <span class="message-title">私信</span>
      <div class="message" :class="{click:currentIndex==index,friendshover:message===index}" 
      @click="goChat(index,item)"
      @mouseout="out" @mouseover="messageHover(index)" 
      v-for="(item,index) in chatArr" :key="item.friend.email">
        <div class="message-icon">
          <img :src="item.friend.avatar" alt="">
          <div class="status-circle"></div>
        </div>
        <div class="nickname">
          <span :class="{messagehover:message===index}">{{item.friend.nickname}}</span>
          <span id="delete" v-if="showDelete==index" @click.stop="deleteChat(index)">x</span>
        </div>
      </div>
    </div>
    <modal v-show="allowM&&modal">
      <join-server v-show="name=='joinServer'" @banModal="banModal"></join-server>
    </modal>
  </div>
</template>

<script>
import modal from '../../pages/modal'
import joinServer from '../../modal/joinServer'
export default {
  data () {
    return {
      messageList:{
        height:''
      },
      message:-1,
      friendsMessages:[],
      friendsClick:true,
      hover:false,
      chat:-1,
      allowM:false,
      chatIndex:-1,
      showDelete:-1
    }
  },
  computed: {
    modal(){
      return this.$store.state.modal.modal;
    },
    name(){
      return this.$store.state.modal.name;
    },
    chatArr(){
      return this.$store.state.chat.chat;
    },
    current(){
      return this.$store.state.chat.current;
    },
    currentIndex(){
      return this.$store.state.chat.chatIndex;
    },
    click(){
      if(this.$store.state.chat.chatIndex>=0){
        return false;
      }else{
        return true;
      }
    },
    email(){
      return this.$store.state.user.user.email;
    }
  },
  // watch: {
  //   chatArr(val){
  //     this.chatArr=this.chatArr
  //   }
  // },
  components: {
    modal,
    joinServer
  },
  methods: {
    getStyle(){
      this.messageList.height=window.innerHeight-180+'px';
    },
    messageHover(index){
      if(this.chat!==index&&this.currentIndex!==index){
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
      this.$store.dispatch('setChatIndex',-1);
    },
    friendsHover(){
      if(!this.click){
        this.hover=true;
      }
    },
    outFriends(){
      this.hover=false;
    },
    goChat(index,friend){
      this.$store.dispatch('setChatIndex',index);
      this.message=-1;
      this.friendsClick=false;
      this.friendsClick=false;
      this.$router.push({path:'/chat'});
      this.$store.dispatch('changePath','chat');
      this.$store.dispatch('setCurrent',{info:friend.friend,type:'user'});
      this.$socket.emit('getHistory',{from:this.email,to:friend.friend.email,type:'user'},data=>{
        this.$store.dispatch('setHistory',data);
      });
    },
    deleteChat(index){
      let a=this.chatArr.slice(0);
      let arr=JSON.parse(localStorage.getItem(this.email));
      if(a.length==1){
        this.$router.push({path:'detail'});
      }else if(index==a.length-1&&this.current.info.email===a[index].friend.email){
        this.$store.dispatch('setCurrent',{info:a[index-1].friend,type:'user'});
        this.$store.dispatch('setChatIndex',a.length-2);
      }else if(this.current.info.email===a[index].friend.email){
        this.$store.dispatch('setCurrent',{info:a[index+1].friend,type:'user'});
        this.$store.dispatch('setChatIndex',index);
      }
      arr.splice(index,1);
      localStorage.setItem(this.email,JSON.stringify(arr));
      this.$store.dispatch('setChat',arr);
    },
    joinServer(){
      this.allowM=true;
      this.$store.dispatch('changeStatus',{modal:true,name:'joinServer'});
    },
    banModal(){
      this.allowM=false;
    }
  },
  created(){
    window.addEventListener('resize', this.getStyle);
    this.getStyle();
    let chat=JSON.parse(localStorage.getItem(this.email))||[];
    this.$store.dispatch('initChat',chat);
    this.$store.dispatch('setChatIndex',-1);
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
  // height 100%
  color $catalog-font
  background-color $catalog
  border-radius 5px 0 0 5px
  padding-top 10px
  & .catalog-line
    margin 5px 0 10px 0
    height 1px
    background-color $home
.search
  height 40px
  padding 5px 10px
  & input 
    padding 0 10px
    width 220px
    height 30px
    border 1px solid #26272B
    border-radius 5px
    background-color #26272B
    &:focus
      outline none
      border 1px solid $main-blue
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
  padding  10px
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
        border-radius 50%
        width 30px
        height 30px
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
        color $bright-font
</style>