<template>
  <div id="home-root">
    <left-sidebar></left-sidebar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import leftSidebar from '../home/leftSidebar'
export default {
  data () {
    return {

    }
  },
  components: {
    leftSidebar
  },
  methods:{
    
  },

}
</script>

<style lang="stylus">
#home-root
  display flex
  background-color  $home
  height 100%
  maargin-top 22px
</style>