<template>
  <div id="login">
    <p>欢迎回来 ！</p>
    <span id="descript">We are so exited to see you again!</span>
    <form action="">
      <div class="email">
        <label for="">邮箱</label>
        <input type="email" v-model="email" ref="email">
      </div>
       <div class="password">
        <label for="">密码</label>
        <input type="password" v-model="password" >
      </div>
      <span>忘记密码?</span>
      <input type="summit" value="登录" @click.prevent="login">
    </form>
    <div class="quest">
      需要一个账号？<span id="sign" @click="moveToSignin">注册</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       email:"",
       password:""
    }
  },
  methods:{
    moveToSignin(){
      this.$store.dispatch('changeShow');
    },
    login(){
      let reg= new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if(this.email&&this.password&&reg.test(this.email)){
        let self=this;
        this.$http.post(this.$url+'/users/login', {
          email: self.email,
          password: self.password
        })
        .then(function (response) {
          if(response.data.status==='success'){
            self.$socket.emit('getUserInfo',self.email,data=>{
              self.$store.dispatch('setUser',data);
            });
            self.$socket.emit('getCategory',self.email,data=>{
              console.log(data);
              self.$store.dispatch('setCategory',data);
            })
            self.$router.push({path:'/home'});
          }else{
            console.log(response.data.status)
          }
        });
      }else{
        this.$refs.email.focus();
      }
    }
  },
  components: {

  },
  
}
</script>

<style lang='stylus'>
#login 
  position : absolute;
  width : 480px;
  height : 420px;
  padding : 40px 50px;
  left : 50%;
  top : 50%;
  margin-left: -(@width/2);
  margin-top: -(@height/2);
  border-radius : 5px;
  opacity : 1;
  background-color : $login-background;
  & form label 
    display : inline-block;
    font-size : 13px;
    color : $label-color;
    padding-bottom : 8px;
  & form input
    display : block;
    width : 100%;
    height : 40px;
    color : #EAEAEA
    padding-left : 10px;
    background-color : $input-color;
    border : 1px solid $input-border;
    border-radius : 5px;
    caret-color : #fff;
    &[type=summit]
      text-align : center;
      font-size: 18px;
      color:#fff;
      background-color : $main-blue;
      &:hover
        background-color : $main-blue-hover;
        cursor : pointer;
    &:focus
      outline : none;
      border : 1px solid $main-blue;
  & form span
    display: inline-block;
    font-size: 12px;
    color : $main-blue;
    margin-bottom : 20px;
    &:hover
      margin-bottom : 19px;
      border-bottom : 1px solid $main-blue;
      cursor : pointer;
  & .quest
    padding-top : 10px;
    color : #717780;
    font-size : 14px;
    & #sign
      color : $main-blue;
      font-size : 14px;
      cursor : pointer;
      &:hover
        border-bottom : 1px solid $main-blue;
        cursor : pointer;
  & #descript 
    display:block;
    text-align : center;
    padding-bottom: 20px;
    color:  #717780;

p 
  text-align : center;
  padding-bottom: 10px;
  font-size : 27px;
  color : #EAEAEA;
.email
  padding-bottom : 20px;
.password
  padding-bottom : 10px;

</style>
