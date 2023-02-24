import { createStore } from 'vuex'
import { getMusicLyricAPI } from '@/api'

export default createStore({
    state: {
        playList: [{
            al: {
                id:34861281,
                name:"不说 (电影《从你的全世界路过》路过版主题曲)",
                pic:109951164476217040,
                picUrl: "https://p2.music.126.net/KsKM8fTqQzemsRvjbA-sag==/109951164476217041.jpg",
                pic_str:"109951164476217041"
            },
            ar: [{
                name: '李荣浩'
            }],
            id: 428375722,
            name: "不说",
        }],
        playListIndex: 0, // 默认下标为0
        isbtnShow:true, // 暂停按钮的显示
        detailShow: false, // 歌曲详情页
        lyricList: {}, // 歌词
        currentTime: 0, // 歌词播放时间
        duration: 0, // 歌曲播放总时长
        isLogin: false, // 判断是否登录
        isFooterMusic:true,// 判断底部组件的显示
    },
    mutations: {
        // 更改暂停播放按钮的显示
        updateIsbtnShow(state,value) {
            state.isbtnShow = value
        },
        // 更改歌单的歌曲
        updatePlayList(state, value) {
            state.playList = value
        },
        // 更改播放歌曲
        updatePlayListIndex(state, value) {
            state.playListIndex = value
        },
        // 歌曲详情页的显示
        updateDetailShow(state) {
            state.detailShow = !state.detailShow
        },
        // 更改歌曲的歌词
        updateLyricList(state, value) {
            state.lyricList = value
        },
        // 歌词播放时间
        updateCurrentTime(state, value) {
            state.currentTime = value
            //console.log(state.currentTime);
        },
        // 歌曲时长
        updateDuration(state, value) {
            state.duration = value
        },
        // 搜索添加歌曲
        pushPlayList(state, value) {
            state.playList.push(value)
        }
    },
    actions: {
        // 获取歌词
        async getLyaic(context, value) {
            let res = await getMusicLyricAPI(value)
            context.commit('updateLyricList', res.data.lrc)
        }
    },
    modules: {
    }
})
