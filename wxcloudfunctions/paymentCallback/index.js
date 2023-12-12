'use strict';
exports.main = async (event, context, callback) => {
	console.log("paycallback")
	console.log(event)
	console.log(event["non-exist"])
	console.log(context)

	var rp = require('request-promise')
	var options = {
		method: 'POST',
		uri: 'http://parting-node-test.zhuyu.chat/user/wxInitiateOrderPay',
		body: {
			openId: event.userInfo.openId,
			outTradeNo: event.outTradeNo,
			timeEnd: event.timeEnd,
			totalFee: event.totalFee,
			transactionId: event.transactionId
		},
		json: true // Automatically stringifies the body to JSON
	};
	const callBackInfo = await rp(options);
	return {
		errcode: 0,
		errmsg: 'ok'
	}
};