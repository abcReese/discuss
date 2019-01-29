<template>
  <div id="friends-content">
    <catalog></catalog>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import catalog from './friends/leftCatalog'
export default {
  data () {
    return {

    }
  },
  components:{
    catalog
  },
  created(){
    this.$router.push({path:this.$store.state.route.path});
  }
}
</script>

<style lang="stylus">
#friends-content
  width 91%
  height 100%
  background-color #2F3136
  border-radius 5px 0 0 5px
</style>
