<template>
    <div class="home">
        <TopNav></TopNav>
        <SwipeTop></SwipeTop>
        <IconList></IconList>
        <MusicList></MusicList>
    </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue'
import SwipeTop from '@/components/home/SwipeTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
export default {
    name: 'Home',
    components: {
        TopNav,
        SwipeTop,
        IconList,
        MusicList
    }
}
</script>
