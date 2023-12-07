const baseUrl = "http://parking-java-test.zhuyu.chat"
const nodeUrl = "https://node-base-test.zhuyu.chat"

export const request = ({url,method,data}) => {
	let lastUrl = ''
	let header = {}
	if(uni.getStorageSync("accessToken")){
		header = {
			Authorization:uni.getStorageSync("accessToken")
		}
	}
	if(url.search('wechat') != -1 || url.search('common') != -1){
		lastUrl = nodeUrl + url
	}else{
		lastUrl = baseUrl + url
	}
	return new Promise((resolve,reject) => {
		uni.request({
			url:lastUrl,
			method,
			data,
			header,
			success(res) {
				if(res.data.code === 401){
					uni.clearStorageSync()
					uni.reLaunch({
						url:"/pages/index/index"
					})
				}
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

