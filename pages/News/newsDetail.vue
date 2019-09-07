<template>
	<view>
		<statusBar></statusBar>
		<view class="padding-tb-sm flex bg-gradual-theme">	<!--四个按钮-->
			<view class="padding-lr">
				<button class="cu-btn cuIcon bg-grey text-xl" @click="back">
					<text class="cuIcon-back"></text>
				</button>
			</view>
			<view class="padding-lr" style="margin-left: auto;">
				<button class="cu-btn cuIcon margin-lr-xs bg-grey text-xl">
					<text class="cuIcon-favor"></text>
				</button>
				<button class="cu-btn cuIcon margin-lr-xs bg-grey text-xl">
					<text class="cuIcon-share"></text>
				</button>
				<button class="cu-btn cuIcon margin-lr-xs bg-grey text-xl">
					<text class="cuIcon-more"></text>
				</button>
			</view>
		</view>
		<view class="margin">
			<view>
				<p class="margin-tb text-xxl"><strong>每日一景|四川长安：稻谷翻金浪 山村美如画</strong></p>
				<p class="text-grey text-lg margin-tb"><span class="margin-right">来源：央视网</span><span>2019-8-30</span></p>
			</view>
			<view class="margin-tb solids-bottom">
				<image src="../../static/HK.jpg"></image>
				<p class="text-grey text-lg padding-bottom">8月29日上午，中国人民解放军驻香港部队完成进驻香港以来第22次轮换行动。这是当天凌晨陆军部队在香港赤杜军营举行交接仪式。（新华社发）</p>
			</view>
			<view class="text-xl">
				<p>进入八月，四川省广安市岳池县临溪镇龙滩子村，成片的优质水稻相继成熟，金黄色的稻谷，把山村点缀美丽如画。</p>
				<view class="margin-tb"><image src="../../static/scene.jpg"></image></view>
				<p>进入八月，四川省广安市岳池县临溪镇龙滩子村，成片的优质水稻相继成熟，金黄色的稻谷，把山村点缀美丽如画。</p>
			</view>
			<view>
				<p class="text-grey text-lg margin-tb">责任编辑：荣毅 袁微</p></view>
			</view>
		</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			back()
			{
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	image{
		width: 100%;
		align-items: center;
	}
</style>
