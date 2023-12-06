const baseUrl = "http://parking-java-test.zhuyu.chat"

export const request = ({url,method,data}) => {
	let header = {}
	if(uni.getStorageSync("accessToken")){
		header = {
			Authorization:uni.getStorageSync("accessToken")
		}
	}
	return new Promise((resolve,reject) => {
		uni.request({
			url:baseUrl + url,
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

