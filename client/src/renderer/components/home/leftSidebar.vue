<template>
  <div id="left-sidebar" >
    <div class="home-icon icon" @click="backHome" :class="{current:serverIndex===-1}"></div>
    <div class="line"></div>
    <div class="server">
      <div class="server-list icon" v-for="(item,index) in services" :key="item.gid" 
      :class="{current:serverIndex===index}" @click="goServer(index)">
        <img :src="services[index].avatar" alt="">
      </div>
      <div class="addserver-button" @click="createServer">
        +
      </div>
    </div>
    <modal v-if="allowA&&modal"><create-server v-if="name=='createServer'" @banModal="banModal"></create-server></modal>
  </div>
</template>

<script>
import modal from '../pages/modal'
import createServer from '../modal/createServer'
export default {
  data () {
    return {
      home:true,
      arr:[],
      allowA:false
    }
  },
  computed: {
    serverIndex:{
      get(){
        return this.$store.state.serverIndex.index;
      },
      set(){
        
      }
    },
    services(){
      return this.$store.state.category.category.services;
    },
    modal(){
      return this.$store.state.modal.modal
    },
    name(){
      return this.$store.state.modal.name
    },
  },
  components:{
    modal,
    createServer
  },
  methods:{
    backHome(){
      this.$store.dispatch('changeIndex',-1);
      this.home=true;
      if(this.$route.path!=='/detail'||this.$route.path!=='/chat'){
         this.$router.push({path:this.$store.state.route.path})
      }
    },
    goServer(index){
      if(this.home=true){
        this.home=false;
      }
      this.serverIndex=index;
      this.$store.dispatch('changeIndex',index);
      this.$router.push({path:'server'});
    },
    createServer(){
      this.allowA=true;
      this.$store.dispatch('changeStatus',{modal:true,name:'createServer'})
    },
    banModal(){
      this.allowA=false;
    }
  }
}
</script>

<style lang='stylus'>
#left-sidebar
  heigth 100%
  width 9%
  overflow scroll
  &::-webkit-scrollbar
    display:none
  & .current
    border-radius 13px;
    cursor pointer
    background-color $main-blue
.home-icon
  background url(../../assets/home.png)center $server-color no-repeat 
.line
  width 30px
  height 2px
  margin 5px auto 
  background-color $server-color
.icon
  width 50px
  height 50px
  line-height  50px
  margin 10px auto
  border-radius 50%
  transition all .5s
  &:hover
    border-radius 13px;
    cursor pointer
    background-color $main-blue

.server-list
  text-align center
  color #fff
  border-radius 50%
  background-color $server-color
  & img 
    width 50px
    height 50px
    border-radius 50%
    transition all .5s
    &:hover
      border-radius 13px;
.addserver-button
  width 50px
  height 50px
  line-height  50px
  margin 10px auto
  text-align center
  font-size 30px
  color #4C4E52
  border 1px dashed #4C4E52
  border-radius 50%
  background-color $home
  transition all .5s
  &:hover
    cursor pointer
    color #fff
    border 1px dashed #fff
</style>
