<template>
  <div id="serverSetting" :style="settingStyle">
    <leftside></leftside>
    <rightside></rightside>
  </div>
</template>

<script>
import leftside from '../serverStting/leftSide'
import rightside from '../serverStting/right-content'
export default {
  data () {
    return {
      settingStyle:{
        height:'',
        width:'',
      }
    }
  },
  components: {
    leftside,
    rightside
  },
  methods:{
    getStyle(){
      this.settingStyle.height=window.innerHeight-23+'px';
      this.settingStyle.width=window.innerWidth+'px';
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
#serverSetting
  display flex
</style>