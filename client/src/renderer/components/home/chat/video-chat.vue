<template>
  <div class="black-box" :class="{'video-height':videoChat}">
    <div class="video-container" v-if="videoChat">
      <div class="local-video">
        <video class="local-video" ref="local-video" autoplay></video>
      </div>
      <div class="remote-video">
        <video class="remote-video" ref="remote-video" autoplay></video>
      </div>
    </div>
    <span class="leave" @click.stop="leave" v-if="videoChat">离开语音</span>
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
  
  methods: {
    loadLocalVideo(){
      return new Promise((resolve, reject) => {
        let constraints = {
          audio: true,
          video:true
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
    }
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
  }
}
</script>

<style lang='stylus'>

 
</style>