<template>
    <div class="swipeTop"> 
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image.pic"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { getBannerAPI } from '@/api'
import { onMounted, ref } from '@vue/runtime-core';
export default {
    setup() {
        const images = ref();
        onMounted(async() => {
            const res = await getBannerAPI()
            images.value = res.data.banners
        })
        return { images };
    },
};
</script>

<style lang="less" scoped>
.swipeTop{
    .van-swipe {
        width: 100%;
        height: 3rem;
        .van-swipe-item {
            padding: 0 0.2rem;
            img {
                width: 100%;
                height: 100%;
                border-radius: .2rem;
            }
        }
        /deep/.van-swipe__indicator--active{
            background-color: rgb(219, 130, 130);
        }
    }
}
</style>