<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio  ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup :show="detailShow" position="right" :style="{ width: '100%', height: '100%' }">
            <MusicDetail 
                :musicList="playList[playListIndex]" 
                :play="play" 
                :isbtnShow="isbtnShow"
                :addDuration="addDuration"
            >
            </MusicDetail>
        </van-popup>
    </div>
</template>

<script>
import MusicDetail from './MusicDetail.vue'
import { ref, toRefs, computed } from '@vue/reactivity';
import { mapMutations, useStore } from 'vuex';
import { onMounted, watch } from '@vue/runtime-core';

export default {
    components: { MusicDetail },
    setup() {
        const audio = ref()
        let interVal = ref(0)
        const store = useStore()
        const state = store.state;
        const storeMutations = mapMutations(['updateDetailShow','updateIsbtnShow'])
        const musicList = computed(() => state).value;
        const updateTime = () => {
            interVal.value = setInterval(() => {
                store.commit('updateCurrentTime', audio.value.currentTime)
            },1000)
        }
        const play=()=> {
            // 判断音乐是否播放
            if (audio.value.paused) {
                audio.value.play()
                store.commit('updateIsbtnShow', false)
                updateTime()
            } else {
                audio.value.pause()
                store.commit('updateIsbtnShow', true)
                clearInterval(interVal.value) 
            }
        }
        const addDuration = () => {
            store.commit('updateDuration',audio.value.duration)
        }
        watch(() => {
            return musicList.playList[musicList.playListIndex].id
        }, () => {  // 监听下标发生了改变，就自动播放音乐
            store.dispatch('getLyaic', musicList.playList[musicList.playListIndex].id)
            addDuration()
            audio.value.autoplay = true
            if (audio.value.paused) {  // 如果是暂停状态，改变图标
                store.commit('updateIsbtnShow', false)
            }
        }) 
        onMounted(() => {
            store.dispatch('getLyaic', musicList.playList[musicList.playListIndex].id)
        })
        return {
            ...toRefs(musicList),
            play,
            audio,
            ...storeMutations,
            updateTime,
            interVal,
            addDuration
        }
    },
}
</script>

<style lang="less" scoped>
.FooterMusic{
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    .footerLeft{
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: 0.2rem;
        }
        p{
            font-weight: 700;
            margin-bottom: 0.1rem;
        }
        span{
            font-weight: 100;
            font-size: 0.1rem;
        }
    }
    .footerRight{
        width: 17%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>