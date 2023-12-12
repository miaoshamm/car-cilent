'use strict';
const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context, callback) => {
	var rp = require('request-promise');
	let url =
	`http://parting-node-test.zhuyu.chat/userOrder/countPayMoneyByOrder?orderNo=${event.outTradeNo.orderNo}`;
	const price =JSON.parse(await rp(url)) ;
	const wxContext = cloud.getWXContext()
	console.log("Hello World", cloud.DYNAMIC_CURRENT_ENV)
	console.log(event)
	const res = await cloud.cloudPay.unifiedOrder({
		"body": event.body, // 商品描述
		"outTradeNo": event.outTradeNo.orderNo, // 商户订单号
		"subMchId": event.subMchId, // 商户号
		"totalFee": price.data.orderPayMoney, // 总金额
		"envId": 'cloud1-7gq3bs6j826b6a91', // 云函数环境名称
		"functionName": "paymentCallback", // 支付结果通知回调云函数名
		"spbillCreateIp": wxContext.CLIENTIP,
	})
	return res
};