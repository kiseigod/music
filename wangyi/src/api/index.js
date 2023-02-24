import service from "../request";

// 获取轮播图
export const getBannerAPI = () => service({
    url: '/banner?type=2',
    method:'get'
})

// 获取推荐歌单
export const getMusicListAPI = () => service({
    url: '/personalized?limit=10',
    method:'get'
})

// 获取歌单详情信息
export const getMusicItemListAPI = (id) => service({
    url: `/playlist/detail?id=${id}`,
    method:'get'
})

// 获取歌单详情所有歌曲
export const getMusicItemListAllAPI = (id) => service({
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`,
    method:'get'
})

// 获取歌曲的歌词
export const getMusicLyricAPI = (id) => service({
    url: `/lyric?id=${id}`,
    method: 'get'
})

// 搜索
export const getSearchMusicAPI = (data) => service({
    url: `/search?keywords=${data}`,
    method:'get'
})