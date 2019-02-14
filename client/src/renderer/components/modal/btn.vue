<template>
  <div class="channel-btn">
      <div @click.stop="cancle">取消</div>
      <button @click="emitParent"><slot></slot></button>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods:{
    cancle(){
      this.$store.dispatch('initModal')
    },
    emitParent(){
      this.$emit(this.eventName);
    }
  },
  props:['eventName']
}
</script>

<style lang='stylus'>
.channel-btn
  display flex
  justify-content flex-end
  align-items center
  padding 20px
  background-color $catalog
  font-size 15px
  border-radius 0 0 5px 5px
  & div
    margin-right 30px
    &:hover
      text-decoration underline
      cursor pointer
  & button 
    padding 10px 20px
    border-radius 5px
    color #fff
    font-size 15px
    border none
    background-color $main-blue
    &:hover
      cursor pointer
    &:focus
      outline none
</style>