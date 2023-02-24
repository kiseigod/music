<template>
    <div>
        <ItemMusicTop :playList="playList"></ItemMusicTop>
        <ItemMusicList :itemList="itemList" :subscribedCount="playList.subscribedCount"></ItemMusicList>
    </div>
</template>

<script>
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
import { getMusicItemListAPI, getMusicItemListAllAPI } from '@/api'
import { onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router';
export default {
    components: {
        ItemMusicTop,
        ItemMusicList
    },
    setup() {
        const playList = ref({}) // 歌单详情页信息
        const itemList = ref([]) //  歌单的歌曲
        onMounted(async() => {
            let id = useRoute().query.id
            // 歌曲详情
            let res = await getMusicItemListAPI(id)
            playList.value = res.data.playlist
            // 所有歌曲
            let result = await getMusicItemListAllAPI(id)
            itemList.value = result.data.songs
            // console.log(result);
            // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
            sessionStorage.setItem('itemDetail', JSON.stringify(playList.value))
        })
        return { playList, itemList }
    }
}
</script>

