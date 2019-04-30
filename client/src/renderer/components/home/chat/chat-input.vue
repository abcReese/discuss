<template>
  <div class='input-box'>
    <div class="input">
      <div class="upload">
        <div>+</div>
        <input type="file" @change='uploadFile' >
      </div>
      <div class="input-message">
        <input type="text" v-model="message" @keyup.enter="sendMessage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message:'',
    }
  },
  computed: {
    user(){
      return this.$store.state.user.user;
    },
    current(){
      return this.$store.state.chat.current;
    },
    services(){
      return this.$store.state.category.category.services;
    },
    serverIndex(){
      return this.$store.state.serverIndex.index;
    }
  },
  components: {

  },
  sockets:{
    recieveMessage(data){
      // let from=this.current.info.nickname+'<'+this.current.info.email+'>';
      // data.from=from;
      if(data.from===this.current.info.email){
        this.$store.dispatch('addMessage',data);
      }else if(this.current.type=='server'){
      
        this.$store.dispatch('addMessage',data);
      }
      
    }
  },
  methods: {
    sendMessage(){
      let chat={},
          type='';
      if(this.current.type=='user'){
        type='user';
        chat={
          from:this.user.email,
          to:this.current.info.email,
          message:this.message,
          messageType:'text'
        };
      }else{
        type='server';
        let index=this.current.info.index,
            gid=this.services[this.serverIndex].gid,
            cid=this.services[this.serverIndex].textChannel[index].cid,
            to=gid+'-'+cid;
        chat={
          from:this.user.email,
          to:to,
          message:this.message,
          messageType:'text',
          nickname:this.user.nickname
        }
      }
      this.$socket.emit('addMessage',chat,type,data=>{
        this.$store.dispatch('addMessage',data);
      })
      this.message='';
    },
    uploadFile(event){
      let files = event.target.files[0], //提交的文件
          form = new FormData(); 
      form.append('file',files); 
      let self=this;
        this.$http.post(this.$url+'/users/uploadFile',form,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response=>{
          let format=response.data.filename.split('.')[1],
              type='';
          let imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'],
              videolist = ['mp4', 'mtv', 'mkv','avi','rmvb'],
              audiolist = ['mp3', 'wav', 'wmv'];
          let result='';
          result=imglist.some((item)=>{
            return item==format;
          })
          if(result){
            result='image';
          }else{
            result=videolist.some((item)=>{
              return item==format;
            })
            if(result){
              result='video';
            }else{
              result=audiolist.some((item)=>{
                return item==format;
              })
              if(result){
                result='audio';
              }else{
                result='file';
              }
            }
          }
          let chat={
            from:this.user.email,
            to:'',
            message:response.data.filename,
            messageType:result
          }
          if(this.current.type=='user'){
            chat.to=this.current.info.email
          }else{
            let index=this.current.info.index,
                gid=this.services[this.serverIndex].gid,
                cid=this.services[this.serverIndex].textChannel[index].cid,
                to=gid+'-'+cid;
            chat.to=to;
          }
          self.$socket.emit('addMessage',chat,this.current.type,data=>{
            this.$store.dispatch('addMessage',data);
          })
        })
    }
  }
}
</script>

<style lang='stylus'>
.input-box
  height 95px
  padding-top 30px
  padding-right 20px
  border-top 1px solid $chat-cutoff
  & .input
    height 44px
    border-radius 5px
    padding 4px 4px 4px 0
    background-color $content-click
    & .upload
      position relative
      float left
      width 46px
      height 36px
      border-right 1px solid $catalog-font
      &:hover
        cursor pointer
      & div
        position absolute
        left 50%
        top 50%
        width 20px
        height 20px
        line-height 20px
        margin-left -(@width/2)
        margin-top -(@height/2)
        text-align center
        font-size 18px
        font-weight bold
        color $home
        border-radius 50%
        background-color #7F8186
        z-index 1
      & input 
        position absolute
        width 46px
        height 36px
        left 0
        top 0
        opacity 0
        z-index 2
        &:hover
          cursor pointer
    & .input-message
      margin-left 46px
      padding 8px 5px 5px 10px    
      height 38px
      & input 
        width 100%
        font-size 14px
        height 22px
        padding 0
        color #DCDDDE
        border none
        background-color $content-click
        &:focus
          outline none
</style>