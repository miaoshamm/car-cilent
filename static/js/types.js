export const orderTypes = {
  HELP_SAVE_ASK_OF: {
    big_type: "代客泊车",
    small_type: "帮存自取",
		icon:'../../static/images/index/grid1.png',
		url:'/pages/order_detail_parking/order_detail_parking'
  },
  HELP_SAVE_AND_RETRIEVE: {
    big_type: "代客泊车",
    small_type: "帮存帮取",
		icon:'../../static/images/index/grid1.png',
		url:'/pages/order_detail_parking/order_detail_parking'
  },
  TRANSFER: {
    big_type: "接送",
    small_type: "接送",
		icon:'../../static/images/index/grid4.png',
		url:'/pages/order_detail_pick_up/order_detail_pick_up'
  },
  PRESERVE: {
    big_type: "保养",
		icon:'../../static/images/index/grid3.png',
		url:'/pages/wish/wish_pay/wish_pay'
  },
  TRANSFER_PICK_UP: {
    big_type: "接送",
    small_type: "只接",
		icon:'../../static/images/index/grid4.png',
		url:'/pages/order_detail_pick_up/order_detail_pick_up'
		
  },
  TRANSFER_DROP_OFF: {
    big_type: "接送",
    small_type: "只送",
		icon:'../../static/images/index/grid3.png',
		url:'/pages/order_detail_pick_up/order_detail_pick_up'
  }
};
export  const orderStatus = {
	RECEIVED_TO_USER:'预约成功，等待交接',
  RESERVATION: "预约成功",
  RECEIVED: "已接单",
  ARRIVED: "已到达",
  PARK_PROCESS: "停车中",
  CAR_ASK_OF: "车辆自取中",
  CANCELED: "订单取消",
  PENDING_PAYMENT: "待支付",
  PAID: "已支付",
  COMING_IN: "前往接送点",
  TO_DESTINATION: "前往目的地",
  COMPLETE: "完成"
}