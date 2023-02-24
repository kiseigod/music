<template>
    <div class="itemMusicTop">
        <img :src="playList.coverImgUrl" alt="" class="bgImg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>
    <div class="itemContent">
        <div class="itemContentLeft">
            <img :src="playList.coverImgUrl" alt="" class="itemImg">
            <span class="itemCount">
                <img src="../../assets/img/24gl-play.png" class="icon">
                {{ changeCount(playList.playCount) }}
            </span>
        </div>
        <div class="itemContentRight">
            <div class="item1">
                <span>{{ playList.name }}</span>
            </div>
            <div class="item2">
                <img :src="playList.creator.backgroundUrl" alt="">
                <span>{{ playList.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou"></use>
                </svg>
            </div>
            <div class="item3">
                <span>{{ playList.description }}</span>
            </div>
        </div>
    </div>
    <div class="itemBottom">
        <div class="iconItem">
            <img src="../../assets/img/_消息.png" class="icon">
            <span>{{ changeCount(playList.commentCount) }}</span>
        </div>
        <div class="iconItem">
            <img src="../../assets/img/分享.png" class="icon">
            <span>{{ changeCount(playList.shareCount) }}</span>
        </div>
        <div class="iconItem">
            <img src="../../assets/img/下载.png" class="icon">
            <span>下载</span>
        </div>
        <div class="iconItem">
            <img src="../../assets/img/30show_多选.png" class="icon">
            <span>多选</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['playList'],
    setup(props) {
        // 通过props进行传值，获取不到数据，获取sessionStorage中的
        if (props.playList.creator = '') {
            props.playList.creator = JSON.parse(sessionStorage.getItem().playList).creator
        }
        const changeCount = (num) => {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
            return num
        }
        return { changeCount }
    }
}
</script>

<style lang="less" scoped>
.itemMusicTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft,.itemRight{
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
        span{
            font-size: 0.4rem;
            color: #fff;
        }
        .icon{
            fill: #fff;
        }
    }
    .bgImg{
        width: 100%;
        height: 11rem;
        position: fixed;
        z-index: -1;
        filter: blur(0.6rem);
    }
}
.itemContent{
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    margin: 0.4rem 0;
    padding: 0 0.2rem;
    .itemContentLeft{
        width: 35%;
        height: 100%;
        position: relative;
        .itemImg {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
        }
        .itemCount {
            position: absolute;
            top: 0;
            right: 0.2rem;
            line-height: 0.5rem;
            font-size: 0.25rem;
            color: white;

            .icon {
                width: 0.36rem;
                height: 0.36rem;
                color: white;
                vertical-align: middle;
            }
        }
    }
    .itemContentRight{
        height: 100%;
        padding-left: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item1{
            color: #fff;
            font-size: 0.27rem;
        }
        .item2{
            color: rgb(247, 247, 234);
            img{
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
            .icon {
                width: 0.3rem;
                fill: #fff;
                vertical-align: top;
            }
        }
        .item3{
            width: 211.48px;
            display: flex;
            justify-content: space-between;
            font-size: 0.2rem;
            color: rgb(203, 202, 202);
            overflow: hidden;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }
}
.itemBottom {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;

    .iconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
            fill: #fff;
        }
        span{
            color: #fff;
            font-size: 0.2rem;
        }
    }
}
</style>