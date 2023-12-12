import COS from "cos-wx-sdk-v5"
import {
	getCOSSecurityToken
} from "@/api"

const Bucket = "zhuyu-test-1256652038";
const Region = 'ap-guangzhou';
const cos = new COS({
	SecretId: 'AKIDWznWEZiIpCYs45320taAh9Ram383i7JH',
	SecretKey: 'GMFxUpyufCVaP7dw2uY0EG4i9LK5eonX',
})

// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function(str) {
	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A');
};

// 获取上传路径、上传凭证L
const getUploadInfo = () => {
	return new Promise(async (resolve, reject) => {
		const result = await getCOSSecurityToken("png", "images")
		if (result.code == 200) {
			return resolve(result.data)
		}
		reject(result.msg)
	})
}

// export const wxUploadFile = (filePath, fileName) => {
// 	var formData = {
// 		key: opt.cosKey,
// 		policy: opt.policy, // 这个传 policy 的 base64 字符串
// 		success_action_status: 200,
// 		'q-sign-algorithm': opt.qSignAlgorithm,
// 		'q-ak': opt.qAk,
// 		'q-key-time': opt.qKeyTime,
// 		'q-signature': opt.qSignature,
// 	};
// 	// 如果服务端用了临时密钥计算，需要传 x-cos-security-token
// 	if (opt.securityToken) formData['x-cos-security-token'] = opt.securityToken;
// 	uni.uploadFile({
// 		url: 'https://' + opt.cosHost, //仅为示例，非真实的接口地址
// 		filePath: opt.filePath,
// 		name: 'file',
// 		formData: formData,
// 		success: (res) => {
// 			if (![200, 204].includes(res.statusCode)) return callback && callback(res);
// 			var fileUrl = 'https://' + opt.cosHost + '/' + camSafeUrlEncode(opt.cosKey).replace(/%2F/g, '/');
// 			callback && callback(null, fileUrl);
// 		},
// 		error(err) {
// 			callback && callback(err);
// 		},
// 	});
// }

export const wxUploadFile = (filePath, fileName) => {
	return new Promise(async (resolve, reject) => {
		let info = await getUploadInfo()
		if (info.code === 200) {
			cos.postObject({
				Bucket: Bucket,
				/* 必须 */
				Region: Region,
				/* 必须 */
				Key: `/images/${fileName}`,
				/* 必须 */
				FilePath: filePath,
				Headers:{
					
				},
				onProgress: function(info) {
					console.log("[cos.postObject-seccess]", JSON.stringify(info));
				}
			}, function(err, data) {
				console.log("[cos.postObject-err]", err || data);
				resolve(data.headers.location)
			});
		}
	})
}