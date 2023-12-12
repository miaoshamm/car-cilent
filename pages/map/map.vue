<template>
	<view class="h-full">
		<map id="mapSelected" style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :show-compass="true"
			:markers="markers">
		</map>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	const markers = ref([])
	
	const longitude = ref()
	const latitude = ref()

	onLoad((options) => {
		longitude.value = options.longitude
		latitude.value = options.latitude
		markers.value = [
			{
				id:1,
				longitude:options.longitude,
				latitude:options.latitude
			}
		]
	})
</script>

<style lang="scss" scoped>
	.h-full {
		height: 100vh;
	}
</style>