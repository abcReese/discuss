<template>
  <div class="modal-backdrop" :style="modalStyle" @click="close">
    <div class="modal" @click.stop="a"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalStyle:{
        height:''
      }
    }
  },
  components: {

  },
  methods:{
    getStyle(){
      this.modalStyle.height=window.innerHeight+'px';
    },
    close(){

    },
    a(){

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
.modal-backdrop
  position fixed
  display flex
  justify-content space-around
  align-items center
  top 0
  bottom 0
  left 0 
  right 0
  margin 0 auto
  background-color rgba(0,0,0,.9);
  z-index 99
  & .modal
    border-radius 5px
    width 450px
    height 300px
    background-color $modal
</style>