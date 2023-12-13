<template>

</template>
<script setup>
	import { onLaunch} from '@dcloudio/uni-app'
onLaunch(()=>{
	const code = wx.getLaunchOptionsSync()
	console.log(code);
})
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-plus/index.scss";
	@import 'static/css/index.scss';
</style>