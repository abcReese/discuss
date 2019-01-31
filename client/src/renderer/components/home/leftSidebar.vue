<template>
  <div id="left-sidebar" >
    <div class="home-icon icon" @click="backHome" :class="{current:serverIndex===-1}"></div>
    <div class="line"></div>
    <div class="server">
      <div class="server-list icon" v-for="(item,index) in arr" :key="item" 
      :class="{current:serverIndex===index}" @click="goServer(index)">
        {{item}}
      </div>
      <div class="addserver-button">
        +
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr:['j','k','m','P'],
      home:true
    }
  },
  components: {

  },
  computed: {
    serverIndex:{
      get(){
        return this.$store.state.serverIndex.index;
      },
      set(){
        
      }
    }
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
