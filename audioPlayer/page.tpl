<div class="audio">
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio ref="audio" @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata" src="https://mv.tl100.com/tl-book/mp3/8b9da190d53411e9b88c0de35fbf1f17.mp3"
        controls="controls" style="display:none;"></audio>

    <!-- 音频播放控件 -->
    <div class="audio-box">
        <button @click="startPlayOrPause" class="player-btn">
            <img src="../../../imgs/play.png" alt="" v-if="!audio.playing">
            <img src="../../../imgs/pause.png" alt="" v-else>
        </button>
        <div class="slider" @touchstart="handleTouchStart">
            <div class="slider-track"></div>
            <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
            <div class="slider-thumb" :style="'left:'+sliderTime+'%'"></div>
        </div>
    </div>
</div>