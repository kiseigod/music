<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span>播放全部<span>(共{{ itemList.length }}首)</span></span>
            </div>
            <div class="listRight">
                <img src="../../assets/img/加号.png" alt="">
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,i) in itemList" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="leftSpan">{{ i+1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1,index) in item.ar" :key="index">
                            {{ item1.name }}
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv !=0">
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
import { useStore } from 'vuex';
export default {
    props: ['itemList', 'subscribedCount'],
    setup(props) {
        const store = useStore()
        const playMusic = (i) => { 
            store.commit('updatePlayList', props.itemList)
            store.commit('updatePlayListIndex', i)
        }
        return {
            playMusic
        }
    }
}
</script>

<style lang="less" scoped>
.itemMusicList{
    width: 100%;
    padding: 0.2rem;
    margin-top: -0.6rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    .itemListTop{
        display: flex;
        justify-content: space-between;
        .listLeft{
            .icon{
                width: 0.4rem;
                height: 0.4rem;
                vertical-align:top;
                margin-right: 0.3rem;
            }
            span{
                font-weight: 900;
                span{
                    font-weight:100;
                    font-size: 0.1rem;
                }
            }
        }
        .listRight{
            margin-top: -0.1rem;
            padding: 0.2rem;
            border-radius: 0.5rem;
            background-color: red;
            color: #fff;
            font-size: 0.2rem;
            img{
                vertical-align: top;
                width: 0.35rem;
                height: 0.35rem;
                margin-right: 0.1rem;
            }
        }
    }
    .itemList{
        .item{
            margin: 0.4rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .itemLeft{
                display: flex;
                align-items: center;
                .leftSpan{
                    margin-right: 0.2rem;
                }
                div{
                    p{
                        font-weight: 700;
                    }
                    span{
                        font-weight: 100;
                        font-size: 0.1rem;
                    }
                }
            }
            .itemRight{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    width: 0.4rem;
                    height: 0.4rem;
                    margin-left: 0.3rem;
                }
            }
        }
    }
}
</style>