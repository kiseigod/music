<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <button class="more">查看更多</button>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="120" class="musicSwipe" :show-indicators="false">
                <van-swipe-item v-for="item in musicList" :key="item.id" class="swipeItem">
                    <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                        <img :src="item.picUrl">
                        <span class="playCount">
                            <img src="../../assets/img/24gl-play.png" class="icon">
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">{{item.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicListAPI } from '@/api'
import { onMounted, ref } from '@vue/runtime-core'
export default {
    setup() {
        const musicList = ref()
        onMounted(async() => {
            const res = await getMusicListAPI()
            musicList.value = res.data.result
            console.log(res);
        })
        const changeCount = (num) => {
            if (num >= 100000000) {
                return (num/100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num/10000).toFixed(1) + '万'
            }   
        }
        return {
            musicList,
            changeCount
        }
    }
}
</script>

<style lang="less" scoped>
.musicList{
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .title{
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            border-radius: 0.4rem;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            background-color: white;
        }
    }
    .musicContent{
        width: 100%;
        height: 4rem;
        .musicSwipe{
            width: 100%;
            height: 3.6rem;
            .swipeItem{
                padding: 0 0.1rem;
                position: relative;
                img {
                    width: 100%;
                    height: 2.7rem;
                    border-radius: 0.25rem;
                }
                .playCount{
                    position: absolute;
                    top:0;
                    right:0.2rem;
                    line-height: 0.5rem;
                    font-size: 0.25rem;
                    color: white;
                    .icon{
                        width: 0.36rem;
                        height: 0.36rem;
                        color: white;
                        vertical-align: middle;
                    }
                }
                .name{
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>