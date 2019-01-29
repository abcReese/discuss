<template>
  <div class="member" :style="memberStyle">
    <div class="online-member">
      <div class="member-box member-status">
        <span>在线—</span>
      </div>
      <div class="member-list">
        <user></user>
      </div>
    </div>
    <div class="offline-member">
      <div class="member-box member-status">
        <span>离线—</span>
      </div>
      <div class="member-list">
        <user></user>
      </div>
    </div>
  </div>
</template>

<script>
import user from './user'
export default {
  data () {
    return {
      memberStyle:{
        height:''
      },
     
    }
  },
  components: {
    user
  },
  methods:{
    getStyle(){
      this.memberStyle.height=window.innerHeight-73+'px';
    }
  },    
  created(){
     window.addEventListener('resize', this.getStyle);
     this.getStyle()
   },
  destroyed(){
     window.removeEventListener('resize', this.getStyle)
   }
}
</script>

<style lang='stylus'>
.member
  position absolute
  top 0 
  right 0
  width 240px
  padding 0 5px
  color $channel-list
  background-color $catalog
  overflow auto
  &::-webkit-scrollbar 
    display none
.member-box
  height 40px
  font-size 13px
  padding 5px 10px
.member-status
  position relative
  & span 
    position absolute
    left 15px
    bottom 0
.member-list
  padding 5px
</style>