import { request } from "@/utils/request.js"

// 根据服务人员id查询服务人员信息
export const getServiceById = (servicerId) => {
  return request({
    url: `/servicer/findServiceById/${servicerId}`,
    method: "POST"
  })
}

// 获取所有维保地点
export const getLocations = (type) => {
  return request({
    url: `/geographicLocation/findAllGeographicLocation/${type}`,
    method: "GET",
  });
};
// 获取预约成功订单
export const getReservationOrder = (userNo) => {
  return request({
    url: `/userOrder/findReservationOrder?userNo=${userNo}`,
    method: "GET",
  });
};

// 职工修改认证
export const updateCertification = (data) => {
  return request({
    url: `/servicer/employeeUpdateCertification`,
    method: "POST",
    data,
  });
};

// 查看职工认证
export const getEmployeeCertification = (userNo) => {
  return request({
    url: `/servicer/findEmployeeCertification/${userNo}`,
    method: "GET",
  });
};

// 获取COS临时秘钥
export const getCOSSecurityToken = (ext, category) => {
  return request({
    url: `/common/getCOSSecurityToken?ext=${ext}&category=${category}`,
    method: "GET",
  });
};

// 职工首次认证
export const employeeCertification = (data) => {
  return request({
    url: `/servicer/employeeCertification`,
    method: "POST",
    data,
  });
};

// 用户取消订单
export const cancelOrder = (userId, orderId) => {
  return request({
    url: `/userOrder/cancelOrder?userId=${userId}&orderId=${orderId}`,
    method: "GET",
  });
};

// 获取协议
export const getUserAgreement = (type) => {
  return request({
    url: `/userAgreement/findUserAgreement/${type}`,
    method: "GET",
  });
};

// 登录
export const login = (data) => {
  return request({
    url: "/auth/login",
    method: "POST",
    data,
  });
};

// 获取公告信息
export const getNotice = () => {
  return request({
    url: "/notice/findNotice",
    method: "GET",
  });
};

// 服务人员接车录入车辆信息
export const putCarInfo = (data) => {
  return request({
    url: "/parkCarRecord/receiveParkCarInfo",
    method: "POST",
    data,
  });
};

// 服务人员泊车车辆信息
export const putCarRecordInfo = (data) => {
  return request({
    url: "/parkCarRecord/toParkCarInfo",
    method: "POST",
    data,
  });
};

// 职工服务人员查询打卡
export const getServicerPunch = (userNo) => {
  return request({
    url: `/servicer/finPunchByCustom/${userNo}`,
    method: "GET",
  });
};

// 职工服务人员查询服务订单
export const getOrderByServicer = (userNo) => {
  return request({
    url: `/servicer/findOrderByServicer?userNo=${userNo}`,
    method: "GET",
  });
};

// 职工服务人员查询打卡
export const getServicerByType = (roleType) => {
  return request({
    url: `/servicer/findServicerByType?roleType=${roleType}`,
    method: "GET",
  });
};

// 职工服务人员上班打卡
export const getPunchIn = (userNo) => {
  return request({
    url: `/servicer/punchIn/${userNo}`,
    method: "GET",
  });
};

// 职工服务人员下班打卡
export const getPunchOut = (userNo) => {
  return request({
    url: `/servicer/punchOut/${userNo}`,
    method: "GET",
  });
};

// 服务人员确认出发
export const ServicerDestination = (orderNo, userNo) => {
  return request({
    url: `/servicer/toDestination?orderNo=${orderNo}&userNo=${userNo}`,
    method: "GET",
  });
};

// 用户角色验证
export const validateRole = (data) => {
  return request({
    url: `/servicer/validateRole`,
    method: "POST",
    data,
  });
};

// 提交假期申请
export const userAbsent = (data) => {
  return request({
    url: `/userAbsent/askAbsent`,
    method: "POST",
    data,
  });
};

// 查看假期申请
export const getAbsent = (userNo) => {
  return request({
    url: `/userAbsent/findAbsent/${userNo}`,
    method: "GET",
  });
};

// 获取横幅信息
export const getBanner = () => {
  return request({
    url: `/banner/findBanner`,
    method: "GET",
  });
};

// 获取并返回用户openid
export const getOpenId = (data) => {
  return request({
    url: `/user/getOpenId`,
    method: "POST",
    data,
  });
};

// 获取并返回用户Phone
export const getPhone = (code) => {
  return request({
    url: `/user/getPhone?code=${code}`,
    method: "GET",
  });
};

// 查看交接车辆信息
export const getHandOverCarInfo = (orderNo) => {
  return request({
    url: `/userOrder/findHandOverCarInfo/${orderNo}`,
    method: "GET",
  });
};

// 用户查看当前订单信息明细
export const getOrderPaymentRecord = (orderNo) => {
  return request({
    url: `/userOrder/findOrderPaymentRecord?orderNo=${orderNo}`,
    method: "GET",
  });
};

// 根据订单编号获取维保地点信息
export const getPreserveLocation = (orderNo) => {
  return request({
    url: `/userOrder/findPreserveLocation?orderNo=${orderNo}`,
    method: "GET",
  });
};

// 用户预约泊车订单
export const reservationParkOrder = (data) => {
  return request({
    url: `/userOrder/reservationParkOrder`,
    method: "POST",
    data,
  });
};

// 用户预约车辆维保订单
export const reservationPreserveOrder = (data) => {
  return request({
    url: `/userOrder/reservationPreserveOrder`,
    method: "POST",
    data,
  });
};

// 用户预约接送服务
export const reservationTravelOrder = (data) => {
  return request({
    url: `/userOrder/reservationTravelOrder`,
    method: "POST",
    data,
  });
};

// 获取用户评价信息
export const getUserEvaluate = () => {
  return request({
    url: `/userEvaluate/findUserEvaluate`,
    method: "GET",
  });
};

// 获取用户评价订单信息
export const getUserOrderEvaluate = () => {
  return request({
    url: `/userEvaluate/findOrderEvaluate`,
    method: "GET",
  });
};

// 根据用户id获取车辆信息
export const getUserCar = (id) => {
  return request({
    url: `/userCar/findUserCar/${id}`,
    method: "GET",
  });
};

// 获取管理员信息
export const getAmdin = () => {
  return request({
    url: `/admin/getAmdin`,
    method: "GET",
  });
};

// 获取指定车辆维保信息以及其赠送服务信息
export const getCarDonateService = (id) => {
  return request({
    url: `/carServices/findCarDonateService/${id}`,
    method: "GET",
  });
};

// 获取车辆维保服务信息
export const getCarServices = () => {
  return request({
    url: `/carServices/findCarServices`,
    method: "GET",
  });
};

//获取用户信息
export const getUserInfo = () => {
  return request({
    url: `/user/getLoginUser`,
    method: "GET",
  });
};

//修改用户信息
export const putUserInfo = (data) => {
  return request({
    url: `/user/updateUserInfo`,
    method: "POST",
    data,
  });
};

//查看用户全部订单
export const getOrderList = (userNo) => {
  return request({
    url: `/userOrder/findAllOrderByUser?userNo=${userNo}`,
    method: "get",
  });
};

//用户评价订单
export const UserEvaluateOrder = (data) => {
  return request({
    url: `/userEvaluate/addEvaluateOrder`,
    method: "POST",
    data,
  });
};

//根据订单号查询评价
export const getOrderEvaluaContent = (orderNo) => {
  return request({
    url: `/userEvaluate/findUserEvaluateByOrderNo?orderNo=${orderNo}`,
    method: "GET",
  });
};

// 申请开发票
export const applyForInvoice = (data) => {
  return request({
    url: `/userInvoice/handleInvoice`,
    method: "POST",
    data,
  });
};

//根据类型查看金额
export const getTypePrice = (type) => {
  return request({
    url: `/priceManage/findPriceManageByType/${type}`,
    method: "GET",
  });
};

// 录入接车信息
export const inputCarRecord = (data) => {
  return request({
    url: `/servicer/receiveParkCarInfo`,
    method: "POST",
    data,
  });
};
