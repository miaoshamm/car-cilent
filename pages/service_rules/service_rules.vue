<template>
	<view class="wrapper">
		<u-navbar :title="title" :autoBack="true" safeAreaInsetTop placeholder></u-navbar>
		<view v-html="content"></view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getUserAgreement
	} from "@/api"
	import {
		ref
	} from "vue";

	const content = ref("")
	const title = ref("")

	const getInfo = async (type) => {
		try {
			const agreement = await getUserAgreement(type);
			if (agreement.code == 200) {
				content.value = agreement.data.agreementContent
			}
		} catch (e) {}
	}

	onLoad((options) => {
		getInfo(options.type)
		switch(options.type){
			case "PRICE":
				title.value = "价格规则";
				break;
			case "PRIVACY":
				title.value = "用户隐私";
				break;
			case "INSURANCE":
				title.value = "泊车保险协议";
				break;
			case "SERVE":
				title.value = "服务条款";
				break;
		}
	})
</script>