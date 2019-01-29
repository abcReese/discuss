<template>
 <div id='root' >
   <transition name="change">
     <login v-if="show" ></login>
     <signin v-if="!show" ></signin>
   </transition>
 </div>
</template>

<script>
import login from '../login.vue';
import signin from '../signin.vue';
export default {
  data () {
    return {
      
    }
  },
  computed: {
    show(){
      return this.$store.state.loginPage.show;
    }
  },
  components: {
    login,
    signin
  },
  methods:{
    getHeight(){
      this.height=window.innerHeight+'px';
    }
  },
  created(){
    window.addEventListener('resize', this.getHeight);
    this.$store.dispatch('initPath');
    this.getHeight()
  },

  destroyed(){
    window.removeEventListener('resize', this.getHeight)
  },
  beforeCreate () {
    this.$store.dispatch('initShow');
  }
 }
</script>

<style lang='stylus'>
#root
  background-color : $app-background;

.test
  border:1px solid #fff;
.change-enter-active, .change-leave-active
  transition: opacity .1s;
.change-enter
  opacity : 0;
.change-enter-to
  opacity : 1;
.change-leave
  opacity : 1;
.change-leave-to
  opacity : 0;
</style>
