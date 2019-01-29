<template>
  <div id="server">
    <leftside></leftside>
    <servercontent></servercontent>
  </div>
</template>

<script>
import leftside from '../server/list'
import servercontent from '../server/content'
export default {
  data () {
    return {

    }
  },
  components: {
    leftside,
    servercontent
  }
}
</script>

<style lang="stylus">
#server
  width 91%
  background-color $catalog
  border-radius 5px 0 0 5px
</style>