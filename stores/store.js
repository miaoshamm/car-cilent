import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		id: 'user'
		userInfo: {}
	},
	actions: {
		setUserInfo(value) {
			this.userInfo = value;
		}
	},
	persist: {
		enabled: true, //开启数据持久化
		strategies: [{
			key: 'user', //给一个要保存的名称
			storage: localStorage, //sessionStorage / localStorage 存储方式
		}]
	},
});