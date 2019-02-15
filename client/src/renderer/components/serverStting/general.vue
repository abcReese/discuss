<template>
  <div class='general'>
    <h3>服务器概览</h3>
    <div>
      <div class="server-icon">
        <img :src="services[serverIndex].avatar" alt="">
      </div>
      <div class="upload-btn">
        <span>上传图片</span>
        <input type="file" @change='uploadImg'  accept="image/jpeg, image/png, image/jpg">
      </div>
      <div class="server-name">
        <div>服务器名称</div>
        <input type="text">
      </div>
    </div>
    <button>保存</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgDataUrl:''
    }
  },
  computed: {
    email(){
      return this.$store.state.user.user.eamil;
    },
    serverIndex(){
      return this.$store.state.serverIndex.index;
    },
    services(){
      return this.$store.state.category.category.services;
    }
  },
  components: {

  },
  methods: {
    uploadImg(event){
      if(event.target.files.length>0){
        let files = event.target.files[0]; //提交的图片
        let form = new FormData(); 
        
        form.append('file',files); 
        //上传图片  
        let self=this;
        this.$http.post(this.$url+'/users/uploadImg',form,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response=>{
          console.log(response.data);
          let filename=response.data.filename;
          console.log(filename);
          let url='http://localhost:3000/images/'+filename;
          self.$socket.emit('uploadServerAvatar',this.services[this.serverIndex].gid,url,()=>{
            this.$store.dispatch('updateServerAvatar',{index:this.serverIndex,url:url});
          });
        })
		    this.getBase64(event.target,(url)=>{
			    this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片
		    });
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
}
</script>

<style lang='stylus'>
.general
  color $bright-font
  &>div
    display flex
    justify-content space-between
    align-items center
    padding-top 20px
    & .server-icon
      width 100px
      height 100px
      border-radius 50%
      background-color $main-blue
      text-align center 
      font-size 25px
      line-height 100px
      & img 
        width 100px
        height 100px
        border-radius 50%
    & .upload-btn 
      position relative
      height 40px
      width 100px
      padding 5px 10px
      font-size 15px
      line-height  30px
      text-align center
      corlor $bright-font
      border 1px solid $server-setting-option
      border-radius 5px
      &:hover
        background-color $main-blue
        border-color $main-blue-hover
      & input 
        position absolute
        height 50px
        width 100px
        left 0px
        top 0
        opacity 0
    & .server-name
      width 270px
      height 80px
      &>div
        font-size 14px
      & input 
        margin-top 10px
        width 100%
        height 40px
        padding 0 20px
        font-size 18px
        color #7F8186
        border 1px solid $home
        border-radius 5px
        background-color $catalog
        &:hover
          border 1px solid #000
        &:focus
          outline none
          border 1px solid $main-blue
  & button
    padding 5px 20px
    font-size 16px
    color $bright-font
    font-weight 500
    border-radius 5px
    margin-top 20px
    float right
    background-color $main-blue
    border none
    &:hover
      background-color $main-blue-hover
      cursor pointer
</style>