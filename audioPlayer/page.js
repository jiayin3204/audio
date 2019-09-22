import './page.scss'
import template from './page.tpl';
import realFormatSecond from '../../modules/audio';
export default {
  template,
  data() {
    return {
      sliderTime: 0,
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        minTime: 0,
        step: 0.1
      }
    }
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play() {
      console.log('你的播放开启了')
      this.$refs.audio.play()
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay() {
      console.log('检测到你播放中')
      this.audio.playing = true
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false
    },
    handleFocus() {
      console.log('focues')
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log('loadedmetadata')
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },

    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt(this.audio.maxTime / 100 * index)
      return '进度条: ' + realFormatSecond(index)
    },

    handleTouchStart(e) {
      this.setValue(e.touches[0]);

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchup', this.handleTouchEnd);
      document.addEventListener('touchend', this.handleTouchEnd);
      document.addEventListener('touchcancel', this.handleTouchEnd);

      // e.preventDefault();
      // this.onDragStart(e);
    },
    handleTouchMove(e) {
      console.log(e.changedTouches[0])
      this.setValue(e.changedTouches[0]);
    },
    handleTouchEnd(e) {
      this.setValue(e.changedTouches[0]);
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchup', this.handleTouchEnd);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('touchcancel', this.handleTouchEnd);
      // this.onDragStop(e);
    },
    // 从点击位置更新 value
    setValue(e) {
      const $el = this.$el;
      const {
        maxTime,
        minTime,
        step
      } = this.audio;
      let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (maxTime - minTime);
      value = Math.round(value / step) * step + minTime;
      value = parseFloat(value.toFixed(5));

      if (value > maxTime) {
        value = maxTime;
      } else if (value < minTime) {
        value = minTime;
      }
      this.$refs.audio.currentTime = value;
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      console.log('拖动进度条')
      // this.audio.playing && this.pause();
      // console.log('拖动了',index,this.sliderTime,this.audio.maxTime,parseInt(index / 100 * this.audio.maxTime))
      // !this.audio.playing && this.play();
      this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    },
    // 将整数转化成时分秒
    // formatSecond(second = 0) {
    //   console.log(realFormatSecond(second));
      
    //   return realFormatSecond(second)
    // }
  },
  computed: {

  },

  computed: {

  }
}