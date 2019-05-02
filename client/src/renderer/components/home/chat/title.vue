<template>
  <div id="chat-title">
    <div class="left-name">
      <span>{{name}}</span><span>{{account}}</span>
      <div class="status-circle"></div>
    </div>
    <div class="right-icon">
      <div class="video" @click.stop="videoChat">
        <img src="../../../assets/video.png" alt="">
        </div>
      <div class="audio" @click.stop="audioChat">
        <img src="../../../assets/audio.png" alt="">
      </div>
    </div>
    <div class="black-box" :class="{'video-height':videoHeight,'audio-height':audioHeight}">
      <!-- <div class="video-container" v-if="videoHeight">
        <div class="local-video">
          <video class="local-video" ref="local-video" autoplay></video>
        </div>
        <div class="remote-video">
          <video class="remote-video" ref="remote-video" autoplay></video>
        </div>
      </div> -->
      <div class="audio-container" v-if="audioHeight">
        <div class="local-audio">
          <audio class="local-video" ref="local-audio" autoplay></audio>
        </div>
        <div class="remote-audio">
          <audio class="remote-audio" ref="remote-audio" autoplay></audio>
        </div>
      </div>
      <span class="leave" @click.stop="leave" v-if="videoHeight||audioHeight">离开语音</span>
    </div>
    <div class="request-box"  :class="{request:request&&from==current.info.email}">
      <span v-if="request&&from==current.info.email">来自啊啊啊的视频邀请</span>
      <div v-if="request&&from==current.info.email" class="handle-btn">
        <button @click.stop='inviteResponse(true)'>接受</button>
        <button @click.stop='inviteResponse(false)'>拒绝</button>
      </div>
    </div>
  </div>
</template>

<script >
import 'webrtc-adapter';
export default {
  data () {
    return {
      videoHeight:false,
      audioHeight:false,
      request:false,
      localStream:null,
      remoteStream:null,
      pc:null,
      a:''
    }
  },
  computed: {
    name(){
      let current=this.$store.state.chat.current;
      if(current.type=='user'){
        return current.info.nickname;
      }else{
        let services=this.$store.state.category.category.services;
        let serverIndex=this.$store.state.serverIndex.index;
        return services[serverIndex].serverName;
      }
    },
    account(){
      let services=this.$store.state.category.category.services;
      let serverIndex=this.$store.state.serverIndex.index;
      let account=this.$store.state.chat.current.info.email||services[serverIndex].gid;
      return '<'+account+'>';
    },
    current(){
      return this.$store.state.chat.current;
    },
    from(){
      return this.a;
    },
    user(){
      return this.$store.state.user.user;
    }
  },
  watch: {
    localStream() {
      this.$refs['local-audio'].srcObject = this.localStream;
    },
    remoteStream() {
      this.$refs['remote-audio'].srcObject = this.remoteStream;
    }
  },
  components: {

  },
  beforeMount() {
    let rtcConfig = {
        // 使用免费的stun服务器，用于击穿NAT获取主机的网络地址
       iceServers: [
          { urls: 'stun:stun.voxgratia.org' },
          { urls: 'stun:stun.voipstunt.com' },
          { urls: 'stun:stunserver.org' },
          { urls: 'stun:stun.ekiga.net' }
        ]
      };
    let pc = null;
    pc = new RTCPeerConnection(rtcConfig);//新建RTCPeerConnection实例
    this.pc = pc;//把该实例赋值给Vue实例中的属性
  },
  sockets:{
    call(from){
      this.request=true;
      this.a=from;
    },
    inviteResponse(result){
      this.videoHeight=result;
      if(result){
        this.loadLocalVideo().then(() => {
          this.initContent();
          this.createOffer();
        });
      }
    },
    closeVideo(){
      this.videoHeight=false;
      this.audioHeight=false;
      if(this.localStream){
        let tracks=this.localStream.getTracks();
        for(let i=0;i<tracks.length;i++){
          tracks[i].stop();
        }
        this.localStream=null;
      }
      this.pc.close();
    },
    rtcAnswer({answerSdp}){
      let answer = new RTCSessionDescription({
          type: 'answer',
          sdp: answerSdp
        });
        console.log('pc start setRemoteDescription');
        this.pc
          .setRemoteDescription(answer)
          .then(() => {
            console.log('pc setRemoteDescription complete');
          })
          .catch(err => {
            console.log(`pc setRemoteDescription failed：${err.toString()}`);
          });
    },
    rtcCandidate({candidateSdp}){
      let candidate = new RTCIceCandidate({
          candidate: candidateSdp
        });

        this.pc
          .addIceCandidate(candidate)
          .then(() => {
            console.log('pc addIceCandidate success');
          })
          .catch(() => {
            console.error('pc addIceCandidate failed');
          });
    },
    rtcOffer({offerSdp}){
      let offer = new RTCSessionDescription({
          type: 'offer',
          sdp: offerSdp
        });
      let pc=this.pc;
        console.log('pc start setRemoteDescription');

        pc
          .setRemoteDescription(offer)
          .then(() => {
            console.log('pc setRemoteDescription complete');
          })
          .catch(err => {
            console.log(`pc setRemoteDescription failed：${err.toString()}`);
          });

        console.log('pc start createAnswer');

        pc
          .createAnswer()
          .then(answer => {
            console.log('\ncreateAnswer -> answer:');
            console.log(answer);
            console.log('\n');
            console.log('pc start setLocalDescription');

            pc
              .setLocalDescription(answer)
              .then(() => {
                console.log('pc setLocalDescription complete');

                // send answer to remote client
                this.$socket.emit('rtcAnswer', {
                  from: this.email,
                  to: this.to,
                  answerSdp: answer.sdp
                });
              })
              .catch(err => {
                console.log(`pc setLocalDescription failed：${err.toString()}`);
              });
          })
          .catch(err => {
            console.error(`pc createAnswer fail：${err.toString()}`);
          });
    }
  },
  methods: {
    videoChat(){
      this.videoHeight=!this.videoHeight;
      this.audioHeight=false;
      if(!this.localStream){
        this.$socket.emit('videoInvite',{from:this.user.email,to:this.current.info.email});
      }else{
        let tracks=this.localStream.getTracks();
        for(let i=0;i<tracks.length;i++){
          tracks[i].stop();
        }
        this.localStream=null;
      }
    },
    audioChat(){
      this.videoHeight=false;
      this.audioHeight=!this.audioHeight;
      if(!this.localStream){
        this.$socket.emit('videoInvite',{from:this.user.email,to:this.current.info.email});
      }else{
        let tracks=this.localStream.getTracks();
        for(let i=0;i<tracks.length;i++){
          tracks[i].stop();
        }
        this.localStream=null;
      }
    },
    leave(){
      this.videoHeight=false;
      this.audioHeight=false;
      if(this.localStream){
        let tracks=this.localStream.getTracks();
        for(let i=0;i<tracks.length;i++){
          tracks[i].stop();
        }
        this.localStream=null;
        this.$socket.emit('closeVideo',{from:this.user.email,to:this.current.info.email});
      }
  
    },
    loadLocalVideo(){
      return new Promise((resolve, reject) => {
        let constraints = {
          audio: true,
          video:false
        };
        
      
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(mediaStream => {
            this.localStream = mediaStream;
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject(new Error(err));
          });
      });
    },
    initContent(){
      
      let pc=this.pc;
      pc.onicecandidate = event => {
        console.log('candidate: ', event);

        if (event.candidate) {
          let candidateSdp = event.candidate.candidate;
          this.$socket.emit('rtcCandidate', {
            from: this.user.email,
            to: this.current.info.email,
            candidateSdp
          });
        }
      };

      pc.oniceconnectionstatechange = event => {
        console.log(`ICE state: ${pc.iceConnectionState}`);
        console.log('ICE state change event: ', event);
      };

      pc.ontrack = event => {
        console.log('%c pc.ontrack', 'color:#41C02D');
        console.log(event);

        if (this.remoteStream !== event.streams[0]) {
          this.remoteStream = event.streams[0];
          this.isRemoteVideoLoaded = true;
          console.log('%c received remote stream', 'color:#41C02D');
        }
      };

      console.log('add local tracks to pc');

      this.localStream.getTracks().forEach(track => {
        // note: chrome  not support addTrack method now, so we use a shim
        // https://github.com/webrtc/adapter
        pc.addTrack(track, this.localStream);
      });
    },
    createOffer() {
      let pc = this.pc;
      let offerOptions = {
        offerToReceiveAudio: 1
      };
      if (!pc) {
        return;
      }
      pc
        .createOffer(offerOptions)
        .then(offer => {
          console.log('\ncreateoffer -> offer:');
          console.log(offer);
          console.log('\n');
          console.log('pc start setLocalDescription');
          pc
            .setLocalDescription(offer)
            .then(() => {
              console.log('pc setLocalDescription complete');
              // send offer to remote client
              this.$socket.emit('rtcOffer', {
                from: this.user.email,
                to: this.current.info.email,
                offerSdp: offer.sdp
              });
            })
            .catch(err => {
              console.log(`pc setLocalDescription failed：${err.toString()}`);
            });
        })
        .catch(err => {
          console.error(`pc createOffer fail：${err.toString()}`);
        });
    },
    inviteResponse(result){
      if(result){
        this.videoHeight=result;
        this.loadLocalVideo(true).then(() => {
          
        });
        this.$socket.emit('inviteResponse',{from:this.user.email,to:this.current.info.email,result},()=>{
          console.log('success');
        })
      }else{
        this.$socket.emit('closeVideo',{from:this.user.email,to:this.current.info.email})
      }
      this.request=false;
    }
  }
}
</script>

<style lang="stylus" >
#chat-title
  position relative
  display flex
  justify-content space-between
  color $content-font
  padding 5px 20px
  height 40px
.black-box
  position absolute
  z-index 4
  left 0
  top 40px
  width 100%
  height 0
  background-color #000
  transition all .5s
  & .video-container
    display flex
    justify-content space-between
    width 100%
    & div
      width 50%
      height 300px
      & video 
        width 100%
        height 300px
        object-fit cover
  & .leave
    position absolute
    left 50%
    bottom 10px
    transform translateX(-50%)
    height 30px
    width 
    line-height 30px
    padding 5px 10px
    color #fff
    border-radius 5px
    background-color $delete-red
    &:hover
      background-color $delete-red-hover
      cursor pointer
      color $bright-font
.request-box
  display flex
  justify-content space-between
  align-items center
  position absolute
  z-index 5
  top 45px
  left 0
  width 100%
  height 0
  padding 0 20px
  background-color $home
  & button 
    width 50px
    height 30px
    border-radius 5px
    border none
    color #fff
    outline none
    &:first-of-type
      background-color $online
      &:hover
        background-color #41AA82
    &:last-of-type
      background-color $delete-red
      &:hover
        background-color $delete-red-hover
    &:hover 
      cursor pointer
  & .hide
    height 0
.request
  height 50px
.video-height
  height 360px
.audio-height
  height 250px
.left-name
  line-height 30px
  font-size 20px
  color #fff
  & span:last-of-type
    margin-left 10px
    font-size 15px
    color  $content-font
.right-icon
  display flex
  width 80px
  & div
    position relative
    width 35px
    height 35px
    margin-left 10px
    padding 5px
    &:hover
      background-color $home
      cursor pointer
    & img 
      position absolute
      top 50%
      left 50%
      transform: translate(-50%,-50%);
</style>