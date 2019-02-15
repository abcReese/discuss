<template>
  <div id="app" >
    <div class="head-frame">
      <div class="title">Discuss</div>
      <div class="window">
        <div class="minimize" @click="minimize">
          -
        </div>
        <div class="maximize" @click="maximize">
          ◻
        </div>
        <div @click="closed">×</div>
      </div>
    </div>
    <div class="content" :style="contentStyle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'discuss',
    data(){
      return {
        contentStyle:{
          height:''
        }
      }
    },
    methods:{
      getStyle(){
        this.contentStyle.height=window.innerHeight-23+'px';
      },
      minimize(){
        this.$ipc.send('minimize');
      },
      maximize(){
        this.$ipc.send('maximize');
      },
      closed(){
        this.$ipc.send('closed');
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

<style lang='stylus'>
  #app
    position : relative;
    font-family : Arial, Helvetica, sans-serif
    -webkit-font-smoothing: antialiased 
    box-sizing border-box;
  .head-frame
    display : flex;
    justify-content : space-between;
    top:0;
    left: 0 ;
    width: 100%;
    height:23px;
    line-height : 23px;
    color: $font-color;
    -webkit-app-region : drag;
    background-color : $home
    & .title
      padding-left:10px;
      font-size:15px;
      font-weight : 600;
      
  .window div
    -webkit-app-region : no-drag;
    display:inline-block;
    margin-left: -8px;
    width : 26px;
    height : 23px;   
    text-align : center;
    &:hover
      background-color : #2B2D30;
      cursor : pointer;
.minimize
  font-size 20px
.maximize
  font-size 15px
</style>
