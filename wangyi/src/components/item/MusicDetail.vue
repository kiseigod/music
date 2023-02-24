<template>
    <img :src="musicList.al.picUrl" alt="" class="bgImg">
    <div class="musicDetail">
        <div class="detailTop">
            <div class="detailTopLeft">
                <svg class="icon" aria-hidden="true" @click="updateDetailShow">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div>
                    <Vue3Marquee>
                        {{ musicList.name }}
                    </Vue3Marquee>
                    <span v-for="item in musicList.ar" :key="item">{{item.name}}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiangyoujiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="detailTopRight">
                <img src="../../assets/img/分享.png" alt="">
            </div>
        </div>
        <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow = !isLyricShow">
            <img src="../../assets/img/wy1.png" alt="" :class="isbtnShow === true ? 'img_needle' : 'img_needle_active'">
            <img src="../../assets/img/wy.png" alt="" class="img_cd">
            <img :src="musicList.al.picUrl" alt="" class="img_ar"
                :class="isbtnShow === true ? 'img_ar_paused' : 'img_ar_active'">
        </div>
        <div class="musicLyric" v-show="isLyricShow" @click="isLyricShow = !isLyricShow" ref="musicLyric">
            <p v-for="item in lyric" :key="item" 
            :class="{ active: (state.currentTime * 1000 >= item.time && state.currentTime * 1000 < item.pre)}">
                {{ item.lrc }}
            </p>
        </div>
        <div class="detailFooter">
            <div class="footerTop">
                <img src="../../assets/img/爱心.png" alt="" class="icon">
                <img src="../../assets/img/下载.png" alt="" class="icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-heijiaochangpian"></use>
                </svg>
                <img src="../../assets/img/_消息.png" alt="" class="icon">
                <img src="../../assets/img/列表-44.png" alt="" class="icon">
            </div>
            <div class="footerContent">
                <input type="range" class="range" min="0" :max="state.duration" v-model="state.currentTime" step="0.05">
            </div>
            <div class="footer">
                <img src="../../assets/img/循环.png" alt="" class="icon">
                <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <img src="../../assets/img/播放.png" alt="" class="icon1" @click="play" v-if="isbtnShow">
                <img src="../../assets/img/暂停.png" alt="" class="icon1" @click="play" v-else>
                <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity'
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { useStore } from 'vuex'
import { onMounted, watch } from '@vue/runtime-core'

export default {
    components: { Vue3Marquee },
    props: ['musicList', 'play', 'isbtnShow','addDuration'],
    setup(props) {
        const isLyricShow = ref(false) // 磁盘和歌词的显示
        const musicLyric = ref()
        const store = useStore()
        const state = store.state;
        const lyric = computed(() => {  
            let arr;
            if (state.lyricList.lyric) {
                arr = state.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)
                    let lrc = item.slice(11, item.length)                   
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9)
                        lrc = item.slice(10, item.length)
                    }
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    return {min,sec,mill,lrc,time}
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i+1].time)) {
                        item.pre = 100000
                    } else {
                        item.pre = arr[i+1].time
                    }
                })
            }
            return arr
        }).value
        const updateDetailShow = () => {
            store.commit('updateDetailShow')
            isLyricShow.value = false   //让磁盘显示
        }
        const goPlay = (num) => {
            let index = state.playListIndex + num
            if (index < 0) {
                index = state.playList.length - 1
            } else if (index == state.playList.length) {
                index = 0
            }
            store.commit('updatePlayListIndex',index)
        }
        watch(() => {
            return state.currentTime
        }, (newValue) => {
            let p = document.querySelector('p.active')
            if (p) {
                if (p.offsetTop > 300) {
                    musicLyric.value.scrollTop = p.offsetTop - 300
                }
            }
            if (newValue === state.duration) {
                if (state.playListIndex === state.playList.length - 1) {
                    store.commit('updatePlayListIndex', 0)
                    props.play()
                } else {
                    store.commit('updatePlayListIndex', state.playListIndex + 1)
                }
            }
        })
        onMounted(() => {
            props.addDuration()
        })
        return {
            isLyricShow,
            lyric,
            musicLyric,
            goPlay,
            updateDetailShow,
            state,
        }
    }
}
</script>

<style lang="less" scoped>
.musicDetail{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.bgImg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
}
.detailTop{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    fill: #fff;
    .detailTopLeft{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            margin-right: 0.2rem;
        }
        div{
            width: 3rem;
            color: #fff;
            overflow: hidden;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            span{
                color: #ccc;
                font-size: 0.2rem;
            }
            .icon{
                margin-left: 0.05rem;
                width: 0.2rem;
                height: 0.2rem;
            }
        }
    }
    .detailTopRight{
        img{
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
.detailContent{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img_needle{
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-10deg);
        transition: all 2s;
    }
    .img_needle_active {
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(5deg);
        transition: all 2s;
    }
    .img_cd{
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }
    .img_ar{
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
    }
    // 图片旋转暂停启动
    .img_ar_active{
        animation-play-state: running;
    }
    // 图片旋转暂停
    .img_ar_paused {
        animation-play-state: paused;
    }
    // 图片动画
    @keyframes rotate_ar{
        0%{
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
}
.musicLyric{
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    overflow: scroll;
    p{
        color: #ccc;
        margin-bottom: 0.3rem;
    }
    .active{
        color: #fff;
        font-size: 0.45rem;
    }
}
.detailFooter{
    width: 100%;
    height: 3rem;
    padding: 0.3rem 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    fill: #fff;
    .footerTop{
        display: flex;
        justify-content:space-between;
        align-items: center;
        .icon{
            width: 0.6rem;
            height: 0.6rem;
        }
    }
    .range{
        width: 100%;
        height: 0.06rem;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: 0.4rem;
            height: 0.4rem;
        }
        .icon1 {
            width: 0.8rem;
            height: 0.8rem;
        }
    }
}
</style>