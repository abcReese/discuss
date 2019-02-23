<template>
  <div id="detail">
    <div class="friends-manage">
      <div class="add-friends">
        <div class="friends-manage-btn " @click='addFriends'>添加好友</div>
      </div>
      <div class="friends-status">
        <div class="friends-manage-btn" 
          v-for="(item,index) in friendsStatus" :key="item" 
          :class="{current:statusIndex==index,hover:hoverIndex==index}" 
          @click="getStatus(index)" @mouseenter="hoverStyle(index)"
          @mouseout="outStyle()">
          {{item}}
        </div>
      </div>
    </div>
    <div class="detail-cutoff"></div>
    <div class="show-friends-title">
      <div class="name">名称</div>
      <div >状态</div>
    </div>
    <div class="show-friends-content" :style="content">
      <div class="friends-info" 
        v-for="(item,index) in friendsArr" :key="item.name"   
        @mouseover="infoHover(index)"  @click="goChat(item)"
        @mouseout="infoOut()">
        <div class="left info-box">
          <div class="avatar">
            <img :src=item.avatar alt="头像">
          </div>
          <div class="nickname">{{item.nickname}}</div>
        </div>
        <div class="middle info-box">
          <div class="circle" :class="{online:item.isOnline}"></div>
          <div class="status" v-if="item.isOnline">在线</div>
          <div class="status" v-else>离线</div>
        </div>
        <div class="right info-box"  :class="{friend:hover==index}">
          <div class="already-friend friend-operate" v-if="already">
            <div class="video container">
              <img src="../../../assets/video.png" alt="">
            </div>
            <div class="audio container">
              <img src="../../../assets/audio.png" alt="">
            </div>
          </div>
          <div class="auditing-friend friend-operate" v-else>
            <div class="container accept" @click.stop="accept(item.email)">
              ✔
            </div>
            <div class="container reject" @click.stop="reject(item.email)">
              <div class="left-line line"></div>
              <div class="right-line line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <modal v-show="allowModal&&modal" >
       <addFriends v-if="name=='addFriends'" @banModal="banModal"></addFriends>
    </modal>
  </div>
</template>

<script>
import modal from '../../pages/modal'
import addFriends from '../../modal/addFriend'
export default {
  data () {
    return {
      friendsStatus:['所有','在线','待审核'],
      statusIndex:0,
      hoverIndex:-1,
      friendsArr:[],
      already:true,
      auditing:true,
      hover:-1,
      content:{
        height:''
      },
      allowModal:false
    }
  },
  computed:{
    modal(){
      return this.$store.state.modal.modal
    },
    name(){
      return this.$store.state.modal.name
    },
    allFriends(){
      return this.$store.state.category.category.friends.all;
    },
    onlineFriends(){
      return this.$store.state.category.category.friends.online;
    },
    auditingFriends(){
      return this.$store.state.category.category.friends.auditing;
    },
    email(){
      return this.$store.state.user.user.email;
    },
    friends(){
      return this.$store.state.category.category.friends;
    }
  },
  components: {
    modal,
    addFriends
  },
  methods: {
    getStyle(){
      this.content.height=window.innerHeight-120+'px';
    },
    getStatus(index){
      this.statusIndex=index;
      this.hoverIndex=-1;
      if(index==0){
        this.already=true;
        this.auditing=false;
        // this.friendsArr=this.allFriends;
        this.friendsArr=this.friends.all;
      }else if(index==1){
        this.already=true;
        this.auditing=false;
        // this.friendsArr=this.onlineFriends;
         this.friendsArr=this.friends.online;
      }else{
        // this.friendsArr=this.auditingFriends;
        this.already=false;
        this.auditing=true;
         this.friendsArr=this.friends.auditing;
      }
    },
    
    hoverStyle(index){
      if(this.statusIndex!==index){
        this.hoverIndex=index;
      }
    },
    outStyle(){
      this.hoverIndex=-1;
    },
    infoHover(index){
      this.hover=index;
    },
    infoOut(){
      this.hover=-1;
    },
    addFriends(){
      this.allowModal=true;
      this.$store.dispatch('changeStatus',{modal:true,name:'addFriends'})
    },
    accept(asker){
      this.$socket.emit('accept',this.email,asker,data=>{
        this.$store.dispatch('updateFriends',data);
        this.getStatus(2);
      })
    },
    reject(asker){
      this.$socket.emit('reject',this.email,asker,data=>{
        this.$store.dispatch('updateAuditing',data);
        this.getStatus(2);
      })
    },
    banModal(){
      this.allowModal=false;
    },
    goChat(friend){
      let chat=JSON.parse(localStorage.getItem(this.email))||[];
      let length=chat.length;
      let index=chat.findIndex(item=>{
        return item.friend.email===friend.email;
      })
      if(index<0){
        chat.push({
          friend:friend
        });
        this.$store.dispatch('setChat',chat);
        localStorage.setItem(this.email,JSON.stringify(chat));
        this.$store.dispatch('setChatIndex',length);
      }else{
        this.$store.dispatch('setChatIndex',index);
      }
      this.$store.dispatch('setCurrent',{info:friend,type:'user'});
      //获取历史信息
      this.$socket.emit('getHistory',{from:this.email,to:friend.email,type:'user'},data=>{
        this.$store.dispatch('setHistory',data);
      })


      this.$router.push({path:'chat'});
      // this.$store.dispatch('initChat');
    }
  },
  created(){
     window.addEventListener('resize', this.getStyle);
     this.getStyle();
     this.$store.dispatch('initModal')
     this.getStatus(0);
  },
  destroyed(){
    this.getStatus(0)
    window.removeEventListener('resize', this.getStyle)
   }
}
</script>

<style lang="stylus">
$offline = #747F8D

#detail
  margin-left 240px
  height 100%
  background-color $content
  padding 10px 0
.detail-cutoff
  margin-top 5px
  height 1px
  background-color $home
.friends-manage
  display flex
  color $content-font
  padding 5px 0
  height 40px
  font-size 16px
  margin-left 20px
  & .add-friends
    padding 0 5px
    border-right 1px solid $content-line
    & div
      background-color $main-blue
      color #fff
  & .friends-status
    display flex
    & div
      margin 0 10px
      &:nth-of-type(1)
        margin-left 15px
    & .hover
      background-color $app-background
    & .current
      background-color #fff
      color $app-background
  & .friends-manage-btn
    text-align center
    height 25px
    line-height 25px
    margin-right 10px
    padding 0 10px
    border-radius 5px
    &:hover
      cursor pointer
.show-friends-title
  display flex
  height 40px
  padding 10px
  border-bottom 1px solid $content-line
  color #9FA0A2
  font-size 13px
  & div
    height 20px
    padding-left 20px
  & .name
    width 40%
    border-right 1px solid $content-line
.show-friends-content
  padding 0 20px
  overflow-y scroll
  overflow-x auto
  &::-webkit-scrollbar /*滚动条整体样式*/
    width 8px
    height 8px
    margin 4px
    background-color $catalog
    border-radius 10px
  &::-webkit-scrollbar-track
    -webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.3)
    border-radius 10px
    background-color: $catalog
  &::-webkit-scrollbar-thumb
    border-radius 10px
    -webkit-box-shadow inset 0 0 6px rgba(0,0,0,.3)
    background-color $home
  & .friends-info
    display flex
    height 64px
    margin-top 2px
    border-radius 5px
    color #A6A7AB
    &:hover
      background-color #3E4148
      cursor pointer
    & .info-box
      display flex
      align-items center
      padding-left 10px
      text-align center
    & .left
      width 40%
      & .avatar
        position relative
        width 30px
        height 30px
        border-radius 50%
        background-color $main-blue
        & img 
          position absolute
          width 30px
          height 30px
          border-radius 50%
          top 50%
          left 50%
          transform: translate(-50%,-50%);
      & .nickname
        padding-left 10px
    & .middle
      width 40%
      & .circle
        margin-left 10px
        width 10px
        height 10px
        border-radius 50%
        background-color $offline
      & .online
        background-color $online
      & .status
        padding-left 10px
    & .right
      display none
      width 20%
      justify-content flex-end
      & .friend-operate
        display flex
        justify-content space-around
        align-items center
        & .container
          position relative
          width 35px
          height 35px
          margin-left 10px
          padding 5px
          border-radius 5px
          background-color $home
          &:hover
            background-color #4F545C
          & img 
            position absolute
            top 50%
            left 50%
            transform: translate(-50%,-50%);
          & .line
            position absolute
            top 12px
            left 10px
            height 2px
            width 15px
            background-color #fff
          & .left-line
            transform rotate(45deg)
          & .right-line
            transform rotate(-45deg)
        & .accept
          color #fff
          &:hover
            background-color $online
        & .reject:hover
          background-color $delete-red
    & .friend
        display flex
</style>