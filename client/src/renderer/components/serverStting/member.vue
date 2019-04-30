<template>
  <div class="setting-member">
    <h3>服务器成员</h3>
    <div class="sum">成员</div>
    <!-- <div class="list">
      <div class="member-detail" >
        <div class="user-info">
          <div class="avatar">
            <img src="../../assets/default-avatar.png" alt="">
          </div>
          <div class="name">
            <div>sdasdasd</div>
            <div>aaaa</div>
          </div>
          <div class="server-owner">
            <img src="../../assets/setting-crown.svg" alt="">
          </div>
        </div>
        <div class="operate-btn">
          踢出服务器
        </div>
      </div>
    </div> -->
    <list v-for="(item,index) in services[serverIndex].members" 
    :key="index"
    :member=item>
      <div class="server-owner" slot="crown" 
      v-if="services[serverIndex].ownerEmail==item.email">
        <img src="../../assets/setting-crown.svg" alt="">
      </div>
      <div class="operate-btn" slot="operate" @click="kickout(services[serverIndex].gid,item.email,index)"
      v-if="services[serverIndex].ownerEmail!=item.email&&services[serverIndex].ownerEmail==user.email">
          踢出服务器
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
  computed: {
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    services(){
      return this.$store.state.category.category.services;
    },
    user(){
      return this.$store.state.user.user;
    }
  },
  components: {
    list
  },
  methods:{
    kickout(gid,email,index){
      let members=this.services[this.serverIndex].members.slice(0);
      
      console.log(members[index].email);
      this.$socket.emit('kickout',gid,index,()=>{
        this.$store.dispatch('kickout',{serverIndex:this.serverIndex,memberIndex:index});
      })
    }
  }
}
</script>

<style lang='stylus'>
.setting-member
  color $bright-font
  & h3
    margin 10px 0
  & .operate-btn
      height 30px
      padding 0 5px
      line-height 30px
      font-size 15px
      text-align center
      border 1px solid $home
      background-color $delete-red
      border-radius 5px
      &:hover
        cursor pointer
</style>