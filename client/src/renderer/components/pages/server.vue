<template>
  <div id="server">
    <leftside v-for="(item,index) in arr" :key="item.a"
    :name="item.name" 
    :listIndex="index"></leftside>
    <servercontent v-for="(item,index) in arr" :key="item.name" 
    :name="item.name"
    :index="index"></servercontent>
  </div>
</template>

<script>
import leftside from '../server/list'
import servercontent from '../server/content'
export default {
  data () {
    return {
      arr:[
        {
          name:'j',
          a:1
        },
        {
          name:'k',
          a:2
        },
        {
          name:'m',
          a:3
        },
        {
          name:'p',
          a:4
        }
      ]
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
  position relative
  width 91%
  background-color $catalog
  border-radius 5px 0 0 5px
</style>