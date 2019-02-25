<template>
  <div class="account edit-account">
    <div class="main-info">
      <div class="my-avatar">
        <img :src="imgDataUrl" alt="">
        <input type="file" @change='uploadImg'  accept="image/jpeg, image/png, image/jpg">
      </div>
      <div class="info">
        <div class="username" >
          <div>用户名<span>*</span></div>
          <div>
            <input type="text" v-model="nickname">
            <div class="number">{{user.nicknameCount||''}}</div>
          </div>
        </div>
        <!-- <div class="email">
          <div>邮箱<span>*</span></div>
          <input type="text" v-model="email">
        </div> -->
        <div class="password">
          <div>当前密码<span>*</span></div>
          <input type="text" v-model="password">
        </div>
        <span class="change" v-if="!change" @click="changePwd">更改密码？</span>
        <div class="password" v-else>
          <div>新密码<span>*</span></div>
          <input type="text" v-model="newPassword">
        </div>
      </div>
    </div>
    <div class="cutoff"></div>
    <div class="account-btn">
      <!-- <div class="delete">
        删除账户
      </div> -->
      <div class="submit" >
        <div @click="cancle">取消</div>
        <div @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      change:false,
      imgDataUrl:'',
      form:'',
      nickname:'',
      email:'',
      password:'',
      newPassword:'',
    }
  },
  components: {

  },
  computed: {
    user(){
      return this.$store.state.user.user;
    }
  },
  methods:{
    changePwd(){
      this.change=true;
    },
    cancle(){
      this.$emit('cancle');
    },
    uploadImg(event){
      if(event.target.files.length>0){
        let files = event.target.files[0]; //提交的图片
        this.form = new FormData(); 
        
        this.form.append('file',files); 
        this.getBase64(event.target,(url)=>{
			    this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片
		    });
	    }
    },
    save(){
      if(this.nickname&&this.password){
        let info={nickname:this.nickname,email:this.user.email,password:this.password,newPassword:this.newPassword};
        this.$socket.emit('updateUserInfo',info,data=>{
          if(data.result){
            let password=this.newPassword||this.password;
            console.log(password);
            this.$store.dispatch('updateUser',{nickname:this.nickname,nicknameCunt:data.count,password:password})
          }
        })
        if(this.form){
          let self=this;
          this.$http.post(this.$url+'/users/uploadFile',this.form,{
            headers:{'Content-Type':'multipart/form-data'}
          }).then(response=>{
            console.log(response.data);
            let filename=response.data.filename;
            console.log(filename);
            let url='http://localhost:3000/upload/'+filename;
            self.$socket.emit('updateUserAvatar',this.user.email,url,()=>{
              this.$store.dispatch('updateUserAvatar',url);
            });
            this.form='';
          })
        }
      }
    },
    getBase64(file,callback){//把选择的文件转化为base64格式文件显示
      var maxWidth = 640;
	    if(file.files && file.files[0]){
	      var thisFile = file.files[0];
	      // if(thisFile.size>2019200){
	      //     // mualert.alertBox("图片不能超过800K");
	      //     alert("图片不能超过2M");
	      //     return
	      // };
	      var reader = new FileReader();
	      reader.onload = function(event){
	          var imgUrl = event.target.result;
	          var img = new Image();
	          img.onload = function(){
	            var canvasId = 'canvasBase64Imgid',
	            canvas = document.getElementById(canvasId);
	            if(canvas!=null){document.body.removeChild(canvas);}
	            var canvas = document.createElement("canvas");
	            canvas.innerHTML = 'New Canvas';
	            canvas.setAttribute("id", canvasId);
	            canvas.style.display='none';
	            document.body.appendChild(canvas);
	            canvas.width = this.width;
	            canvas.height = this.height;
	            var imageWidth = this.width, 
	            imageHeight = this.height;
	            if (this.width > maxWidth){
	                imageWidth = maxWidth;
	                imageHeight = this.height * maxWidth/this.width;
	                canvas.width = imageWidth;
	                canvas.height = imageHeight;
	            }
	            var context = canvas.getContext('2d');
	            context.clearRect(0, 0, imageWidth, imageHeight);
	            context.drawImage(this, 0, 0, imageWidth, imageHeight);
	            var base64 = canvas.toDataURL('image/png',1);
	            var imgbase = base64.substr(22);
	            callback(imgbase)
	              //this.imgUrl = 
	          }
	          img.src = imgUrl;
	      }
	      reader.readAsDataURL(file.files[0]);
	    }
    }
  },
  created(){
    this.nickname=this.user.nickname
  }
}
</script>

<style lang='stylus' scoped>
.edit-account
  background-color #303237
  color $content-font
  & .cutoff
    margin-top 20px
    margin-bottom 20px
    height 1px
    background-color $chat-cutoff
  & .main-info
    display flex
    justify-content space-between
    & span
      color $delete-red
    & .my-avatar
      position relative
      width 100px
      height 100px
      border-radius 50%
      background-color $main-blue  
      & img 
        width 100px
        height 100px
        border-radius 50%
      & input 
        width 100px
        height 100px
        position absolute
        left 0 
        top 0
        outline none 
        opacity 0
        &:hover
          cursor pointer
    & .info input 
      height 40px
      width 400px
      border-radius 5px
      font-size 18px
      background-color  $setting-bgc
      border 1px solid  $setting-bgc
      padding 10px
      color $bright-font
      &:focus
        background-color #303237
        outline none
        border 1px solid $main-blue
    & .info>div>div:first-child
      margin-bottom 10px
    & .username 
      font-size 13px
      & input 
        border-radius 5px 0 0 5px
        width 275px
      &>div:last-child
        display flex
      & .number
        width 125px
        height 40px
        background-color $setting-bgc
        border-left 1px solid $chat-cutoff
        border-radius 0 5px 5px 0
    & .email
      font-size 13px
    & .password
      font-size 13px
    & .change
      font-size 14px
      color $bright-font
      &:hover
        text-decoration underline 
        cursor pointer
  & .account-btn
    display flex
    justify-content  flex-end
    font-size 14px
    & .delete
      padding 5px 10px
      border-radius 5px
      color $delete-red
      border 1px solid $delete-red
    & .submit 
      display flex
      justify-content space-between
      color $bright-font
      height 30px
      line-height 20px
      & div
        padding 5px 15px
      & div:first-child
        margin-right 10px
        &:hover 
          text-decoration underline 
          cursor pointer
      & div:last-child
        background-color #43BF81
        border-radius 5px
        &:hover
          background-color #3CA374
          cursor pointer
</style>  