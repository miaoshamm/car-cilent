import {request} from "@/utils/request.js"

// 获取公告信息
const getNotice = () => {
	return request({
		url:'/notice/findNotice',
		method:"GET"
	})
}

// 服务人员接车录入车辆信息
const putCarInfo = (data) => {
	return request({
		url:"/parkCarRecord/receiveParkCarInfo",
		method:"POST",
		data
	})
}

// 服务人员泊车车辆信息
const putCarRecordInfo = (data) => {
	return request({
		url:"/parkCarRecord/toParkCarInfo",
		method:"POST",
		data
	})
}

// 职工服务人员查询打卡
const getServicer = (userNo) => {
	return request({
		url:`/servicer/findOrderByCustom/${userNo}`,
		method:"GET"
	})
}

// 职工服务人员查询打卡
const getOrderByServicer = (servicerId) => {
	return request({
		url:`/servicer/findOrderByServicer?servicerId=${servicerId}`,
		method:"GET"
	})
}

// 职工服务人员查询打卡
const getServicerByType = (roleType) => {
	return request({
		url:`/servicer/findServicerByType?roleType=${roleType}`,
		method:"GET"
	})
}

// 职工服务人员上班打卡
const getPunchIn = (userNo) => {
	return request({
		url:`/servicer/punchIn/${userNo}`,
		method:"GET"
	})
}

// 职工服务人员下班打卡
const getPunchOut = (userNo) => {
	return request({
		url:`/servicer/punchOut/${userNo}`,
		method:"GET"
	})
}

// 服务人员确认出发
const getPunchOut = (orderNo,userNo) => {
	return request({
		url:`/servicer/toDestination?orderNo=${orderNo}&userNo=${userNo}`,
		method:"GET"
	})
}

// 用户角色验证
const validateRole = (data) => {
	return request({
		url:`/servicer/validateRole`,
		method:"POST",
		data
	})
}

// 提交假期申请
const userAbsent = (data) => {
	return request({
		url:`/userAbsent/askAbsent`,
		method:"POST",
		data
	})
}

// 查看假期申请
const getAbsent = (userNo) => {
	return request({
		url:`/userAbsent/findAbsent/${userNo}`,
		method:"GET"
	})
}

// 获取横幅信息
const getBanner = () => {
	return request({
		url:`/banner/findBanner`,
		method:"GET"
	})
}

// 获取并返回用户openid
const getOpenId = () => {
	return request({
		url:`/user/getOpenId`,
		method:"POST"
	})
}

// 获取并返回用户Phone
const getPhone = () => {
	return request({
		url:`/user/getPhone`,
		method:"GET"
	})
}

// 用户取消订单
const cancelOrder = () => {
	return request({
		url:`/userOrder/cancelOrder`,
		method:"GET"
	})
}

// 查看交接车辆信息
const getHandOverCarInfo = (orderNo) => {
	return request({
		url:`/userOrder/findHandOverCarInfo/${orderNo}`,
		method:"GET"
	})
}

// 用户查看当前订单信息明细
const getOrderPaymentRecord = (orderNo) => {
	return request({
		url:`/userOrder/findOrderPaymentRecord?orderNo=${orderNo}`,
		method:"GET"
	})
}

// 根据订单编号获取维保地点信息
const getPreserveLocation = (orderNo) => {
	return request({
		url:`/userOrder/findPreserveLocation?orderNo=${orderNo}`,
		method:"GET"
	})
}

// 用户预约泊车订单
const reservationParkOrder = (data) => {
	return request({
		url:`/userOrder/reservationParkOrder`,
		method:"POST",
		data
	})
}

// 用户预约车辆维保订单
const reservationPreserveOrder = (data) => {
	return request({
		url:`/userOrder/reservationPreserveOrder`,
		method:"POST",
		data
	})
}

// 用户预约接送服务
const reservationTravelOrder = (data) => {
	return request({
		url:`/userOrder/reservationTravelOrder`,
		method:"POST",
		data
	})
}

// 获取用户评价信息
const getUserEvaluate = () => {
	return request({
		url:`/userEvaluate/findUserEvaluate`,
		method:"GET"
	})
}

// 根据用户id获取车辆信息
const getUserEvaluate = (id) => {
	return request({
		url:`/userCar/findUserCar/${id}`,
		method:"GET"
	})
}

// 获取管理员信息
const getAmdin = () => {
	return request({
		url:`/admin/getAmdin`,
		method:"GET"
	})
}

// 获取指定车辆维保信息以及其赠送服务信息
const getCarDonateService = (id) => {
	return request({
		url:`/carServices/findCarDonateService/${id}`,
		method:"GET"
	})
}

// 获取车辆维保服务信息
const getCarServices = () => {
	return request({
		url:`/carServices/findCarServices`,
		method:"GET"
	})
}