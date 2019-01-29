<template>
 <div id='signin'>
    <p>创建一个账户 ！</p>
    <form >
      <div class="email">
        <label for="">邮箱</label>
        <input type="email" name="email" v-model="email" ref="email">
      </div>
       <div class="username">
        <label for="">用户名</label>
        <input type="text" name="username" v-model="username" placeholder="不超过15个字符">
      </div>
       <div class="password">
        <label for="">密码</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="checkcode">
        <input type="text" name="checkcode" v-model="code">
        <span v-if="check" @click="getCode">{{checkcode}}</span>
        <span id="code-message" v-if="!check">{{codeMessage}}</span>
      </div>
      <input type="submit" value="注册" @click.prevent="submit">
    </form>

    <div class="quest">
      <span id="sign" @click="moveToLogin">已经拥有账号？</span>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      checkcode:"获取验证码",
      sendcode:false,//表明是否已经点击过注册
      check: true,
      codeMessage:"验证码已发送到邮箱，5分钟内有效。",
      email:"",
      username:"",
      password:"",
      code:""
    }
  },
  methods:{
    moveToLogin(){
      this.$store.dispatch('changeShow');
    },
    submit(){
      let reg= new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if(this.email&&this.username&&this.password&&this.code&&reg.test(this.email)){
        this.$http({        
          method : 'post',
          url : 'http://localhost:3000/users/signin',
          data : {
            email : this.email,
            username : this.username,
            password : this.password,
            code : this.code
          }
        }).then(function(response){
          console.log(response.data);
          switch(response.data.status){
            case 'success':
              console.log('success');
              break;
            case 'exist':
              console.log('exist');
              break;
            case 'codeWrong':
              console.log('wrong');
          }
          this.$store.dispatch('changeShow');
        })
      }else{
        this.$refs.email.focus();
      }
    },
    getCode(){
      if(!this.sendcode){
        let reg= new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(this.email&&reg.test(this.email)){
          this.check=false;
          this.sendcode=true;
          let self=this,
              email=this.email;
          this.$http.get(this.$url+'/users/getCode',{
            params : {
              email : email
            }
          }).then(function(response){
            console.log(response.data);
            setTimeout(()=>{
              self.check=true;
              self.sendcode=false;
            },3000);
          })
        }else{
          this.$refs.email.focus();
        }
      }
    }
  },
  components: {

  }
}
</script>

<style lang='stylus'>
#signin
  position : absolute;
  width : 480px;
  height : 510px;
  padding : 40px 50px;
  left : 50%;
  top : 50%;
  margin-left: -(@width/2);
  margin-top: -(@height/2);
  border-radius : 5px;
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
    color : #EAEAEA;
    padding-left : 10px;
    background-color : $input-color;
    border : 1px solid $input-border;
    border-radius : 5px;
    caret-color : #fff;
    &[type=submit]
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
  & form .checkcode input
    display : inline-block
    width : 25%;
  & form .checkcode 
    & #code-message
      background-color : #626773;
    & span
      text-align : center;
      color: #fff;
      margin-left:10px;
      font-size: 15px;
      background-color : $main-blue;
      display: inline-block
      width : 70%;
      height : 40px;
      padding: 0
      line-height 40px;
      border-radius : 5px;
      &:hover
        margin-bottom : 20px;
        background-color : $main-blue-hover;
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
    padding-top : 10px;d
    & #sign
      color : $main-blue;
      font-size : 14px;
      cursor : pointer;
      &:hover
        border-bottom : 1px solid $main-blue;
        cursor : pointer;
p 
  text-align : center;
  padding-bottom: 10px;
  font-size : 27px;
  color : #EAEAEA;
.email,.username,.password
  padding-bottom : 20px;
</style>