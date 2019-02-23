<template>
  <div class="setting-leftside">
    <div class="setting-options">
      <div class="option" :class="{optionClick:click===index,optionHover:hover===index}" 
      v-for="(item,index) in options" 
      :key="item.title" @click="optionClick(index)"
      @mouseover="optionHover(index)" @mouseout="optionOut">
        {{item.title}}
      </div>
      <div class="delete-server" @click="deleteServer">删除服务器</div>
    </div>
    <modal v-show="modal"><delete-server></delete-server></modal>
  </div>
</template>

<script>
import modal from '../pages/modal'
import deleteServer from '../modal/deleteServer'
export default {
  data () {
    return {
      options:[
        {
          title:'概况'
        },
        {
          title:'成员'
        },{
          title:'邀请'
        }
      ],
      click:0,
      hover:-1
    }
  },
  computed: {
    modal(){
      return this.$store.state.modal.modal
    },
    name(){
      return this.$store.state.modal.name
    },
  },
  components: {
    modal,
    deleteServer
  },
  methods:{
    optionClick(index){
      this.click=index;
      this.hover=-1;
      var route=''
      if(index===0){
        route='serversetting';
      }else if(index==1){
        route='member';
      }else{
        route='invite';
      }
      this.$router.push({path:route});
    },
    optionHover(index){
      if(this.click!==index){
        this.hover=index;
      }
    },
    optionOut(){
      this.hover=-1;
    },
    deleteServer(){
      this.$store.dispatch('changeStatus',{modal:true,name:null});
    }
  },
  create(){
    this.$router.push({path:'serversetting'})
  }
}
</script>

<style lang='stylus'>
.optionHover
  color $server-setting-detail
  background-color $content
.optionClick
  background-color $main-blue
  color #fff
.setting-leftside
  position relative
  height 100%
  width 25%
  padding-top 60px
  background-color $catalog
  & .setting-options
    position absolute
    right 20px
    top 60px
    width 190px
    color $server-setting-option
    & div
      height 30px
      margin-bottom 2px
      line-height 30px
      border-radius 5px
      padding 0 10px
    & .option:hover
      cursor pointer
  & .delete-server
    color $delete-red
    &:hover
      cursor pointer
      background-color #423337
    
</style>