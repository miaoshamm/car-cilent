import {
	getCOSSecurityToken
} from "@/api"

// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function(str) {
	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A');
};

const putFile = ({
	prefix,
	filePath,
	key,
	AuthData
}) => {
	return new Promise((resolve, reject) => {
		// put上传需要读取文件的真实内容来上传
		const wxfs = wx.getFileSystemManager();
		wxfs.readFile({
			filePath: filePath,
			success(fileRes) {
				var requestTask = wx.request({
					url: prefix + '/' + key,
					method: 'PUT',
					header: {
						Authorization: AuthData.authorization,
						'x-cos-security-token': AuthData.securityToken,
					},
					data: fileRes.data,
					success(res) {
						var url = prefix + '/' + camSafeUrlEncode(key).replace(/%2F/g, '/');
						if (res.statusCode === 200) {
							resolve(url)
						} else {
							reject(res)
						}
					},
					fail(res) {
						reject(res)
					},
				});
				requestTask.onProgressUpdate((res) => {
					console.log('正在进度:', res);
				});
			},
		});
	})
}

// 上传文件
export const wxUploadFile = (filePath,category) => {
	return new Promise(async (resolve, reject) => {
		var extIndex = filePath.lastIndexOf('.');
		var fileExt = extIndex >= -1 ? filePath.substr(extIndex + 1) : '';
		const result = await getCOSSecurityToken(fileExt,category)
		if (result.code == 200) {
			const AuthData = result.data
			const prefix = 'https://' + AuthData.cosHost;
			const key = AuthData.cosKey;
			try{
				const url = await putFile({
					prefix,
					filePath,
					key,
					AuthData
				});
				resolve(url)
			}catch(e){
				reject(e)
			}
		}
	})
};