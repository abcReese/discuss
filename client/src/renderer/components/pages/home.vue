<template>
  <div id="home-root">
    <left-sidebar></left-sidebar>
    <userdetail></userdetail>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import leftSidebar from '../home/leftSidebar'
import userdetail from '../user/user-detail'
export default {
  data () {
    return {

    }
  },
  components: {
    leftSidebar,
    userdetail
  },
  methods:{
    
  },

}
</script>

<style lang="stylus">
#home-root
  display flex
  position relative
  background-color  $home
  height 100%
  maargin-top 22px
</style>