export const orderTypes = {
	HELP_SAVE_ASK_OF: {
		big_type: "代客泊车",
		small_type: "帮存自取",
		icon: '../../static/images/index/grid1.png',
		url: '/pages/order_detail_parking/order_detail_parking',
		userStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '泊车员已收到，等待交接',
			PARK_PROCESS: '泊车员已接车，正在泊车',
			PARK_COMPLETE: "泊车完成，请支付费用进行再交接",
			USER_ARRIVED: '已经到达订单地点'
		},
		serviceStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '客户到达取车位置',
			PARK_PROCESS: '请前往泊车，录入泊车信息',
			PARK_COMPLETE: "等待客户交接",
			USER_ARRIVED: '用户到达订单地点'
		}
	},
	HELP_SAVE_AND_RETRIEVE: {
		big_type: "代客泊车",
		small_type: "帮存帮取",
		icon: '../../static/images/index/grid1.png',
		url: '/pages/order_detail_parking/order_detail_parking',
		userStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '泊车员已收到，等待交接',
			PARK_PROCESS: '泊车员已接车，正在泊车',
			PARK_COMPLETE: "泊车完成，请支付费用进行再交接"
		},
		serviceStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '客户到达取车位置',
			PARK_PROCESS: '请前往泊车，录入泊车信息',
			PARK_COMPLETE: "等待客户交接"
		}
	},
	TRANSFER: {
		big_type: "接送",
		small_type: "接送",
		icon: '../../static/images/index/grid4.png',
		url: '/pages/order_detail_pick_up/order_detail_pick_up',
		userStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '泊车员已收到，等待交接',
			PARK_PROCESS: '泊车员已接车，正在泊车',
			PARK_COMPLETE: "泊车完成，请支付费用进行再交接",
			USER_ARRIVED: '已经到达订单地点'
		},
		serviceStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '客户到达取车位置',
			PARK_PROCESS: '请前往泊车，录入泊车信息',
			PARK_COMPLETE: "等待客户交接",
			USER_ARRIVED: '用户到达订单地点'
		}
	},
	PRESERVE: {
		big_type: "保养",
		icon: '../../static/images/index/grid3.png',
		url: '/pages/wish/wish_pay/wish_pay',
		userStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '泊车员已收到，等待交接',
			PARK_PROCESS: '泊车员已接车，正在泊车',
			PARK_COMPLETE: "泊车完成，请支付费用进行再交接",
			USER_ARRIVED: '已经到达订单地点'
		},
		serviceStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '客户到达取车位置',
			PARK_PROCESS: '请前往泊车，录入泊车信息',
			PARK_COMPLETE: "等待客户交接",
			USER_ARRIVED: '用户到达订单地点'
		}
	},
	TRANSFER_PICK_UP: {
		big_type: "接送",
		small_type: "只接",
		icon: '../../static/images/index/grid4.png',
		url: '/pages/order_detail_pick_up/order_detail_pick_up',
		userStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '泊车员已收到，等待交接',
			PARK_PROCESS: '泊车员已接车，正在泊车',
			PARK_COMPLETE: "泊车完成，请支付费用进行再交接",
			USER_ARRIVED: '已经到达订单地点'
		},
		serviceStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '客户到达取车位置',
			PARK_PROCESS: '请前往泊车，录入泊车信息',
			PARK_COMPLETE: "等待客户交接",
			USER_ARRIVED: '用户到达订单地点'
		}

	},
	TRANSFER_DROP_OFF: {
		big_type: "接送",
		small_type: "只送",
		icon: '../../static/images/index/grid3.png',
		url: '/pages/order_detail_pick_up/order_detail_pick_up',
		userStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '泊车员已收到，等待交接',
			PARK_PROCESS: '泊车员已接车，正在泊车',
			PARK_COMPLETE: "泊车完成，请支付费用进行再交接",
			USER_ARRIVED: '已经到达订单地点'
		},
		serviceStatus: {
			RESERVATION: '预约成功，请前往取车位置',
			RECEIVED_TO_USER: '客户到达取车位置',
			PARK_PROCESS: '请前往泊车，录入泊车信息',
			PARK_COMPLETE: "等待客户交接",
			USER_ARRIVED: '用户到达订单地点'
		}
	}
};
export const orderStatus = {
	RECEIVED_TO_USER: '预约成功，等待交接',
	RESERVATION: "预约成功",
	RECEIVED: "已接单",
	ARRIVED: "已到达",
	PARK_PROCESS: "停车中",
	PARK_COMPLETE: "停车完成",
	CAR_ASK_OF: "车辆自取中",
	CANCELED: "订单取消",
	PENDING_PAYMENT: "待支付",
	PAID: "已支付",
	COMING_IN: "前往接送点",
	TO_DESTINATION: "前往目的地",
	COMPLETE: "完成"
}