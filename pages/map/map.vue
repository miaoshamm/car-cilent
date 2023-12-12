<template>
	<view class="h-full">
		<map id="mapSelected" style="width: 100%; height: 100%;" 
		:latitude="23.12" :longitude="113.36"
		:show-compass="true"
		:markers="markers">
		</map>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const markers = [
		{
			id:1,
			latitude:"23.12",
			longitude:"113.36"
		}
	]
</script>

<style lang="scss" scoped>
.h-full{
	height: 100vh;
}
</style>