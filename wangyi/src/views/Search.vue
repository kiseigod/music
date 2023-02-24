<template>
    <div>
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
        </div>
        <div class="searchHistory">
            <span class="span">历史</span>
            <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
                {{ item }}
            </span>
            <svg class="icon" aria-hidden="true" @click="delHistory">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item, i) in searchList" :key="i">
                <div class="itemLeft" @click="updateIndex(item)">
                    <span class="leftSpan">{{ i+ 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, index) in item.artists" :key="index">
                            {{ item1.name }}
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mvid != 0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiao2"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { getSearchMusicAPI } from '@/api'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const keyWorldList = ref([])
        const searchKey = ref('')
        const searchList = ref([])
        // 添加
        const enterKey = async() => {
            if (searchKey.value !== '') {
                keyWorldList.value.unshift(searchKey.value)
                // 去重
                keyWorldList.value = [...new Set(keyWorldList.value)]
                if (keyWorldList.value.length > 8) {
                    keyWorldList.value.pop()
                }
                searchKey.value = ''
                localStorage.setItem('keyWorldList', JSON.stringify(keyWorldList.value))

                // 搜索请求
                let res = await getSearchMusicAPI(searchKey.value)
                searchList.value = res.data.result.songs
            }
        }
        // 删除
        const delHistory = () => {
            localStorage.removeItem('keyWorldList')
            keyWorldList.value = []
        }
        // 搜索历史点击搜索
        const searchHistory = async(value) => {
            let res = await getSearchMusicAPI(value)
            searchList.value = res.data.result.songs
        }
        // 搜索歌曲点击到播放列表
        const updateIndex = (item) => {
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            store.commit('pushPlayList', item)
            store.commit('updatePlayListIndex', store.state.playList.length - 1)
        }
        onMounted (()=> {
            keyWorldList.value = JSON.parse(localStorage.getItem('keyWorldList')) || []
        })
        return {
            keyWorldList,
            searchKey,
            searchList,
            enterKey,
            delHistory,
            searchHistory,
            updateIndex
        }
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    input{
        margin-left: 0.2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: 0.1rem;
    }
}
.searchHistory{
    width: 100%;
    padding: 0.2rem;
    position: relative;
    .span{
        font-weight: 700;
    }
    .spanKey{
        padding: 0.1rem 0.2rem;
        border-radius: 0.4rem;
        margin: 0.1rem 0.1rem;
        background-color: rgb(207, 196, 196);
        display: inline-block;
    }
    .icon{
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: 0.2rem; 
    }
}
 .itemList {
    width: 100%;
    padding: 0.2rem;
     .item {
         margin: 0.4rem 0;
         display: flex;
         justify-content: space-between;
         align-items: center;

         .itemLeft {
             display: flex;
             align-items: center;

             .leftSpan {
                 margin-right: 0.2rem;
             }

             div {
                 p {
                     font-weight: 700;
                 }

                 span {
                     font-weight: 100;
                     font-size: 0.1rem;
                 }
             }
         }

         .itemRight {
             display: flex;
             justify-content: space-between;
             align-items: center;

             .icon {
                 width: 0.4rem;
                 height: 0.4rem;
                 margin-left: 0.3rem;
             }
         }
     }
 }
</style>