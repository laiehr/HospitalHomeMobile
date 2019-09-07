<template>
	<view>
		<statusBar></statusBar>
		<view class="cu-bar search bg-gray text-xxl" >
			<span class="cuIcon-back_android margin-left" @tap="back()"></span>
			<view class="search-form round text-xxl">
				<input class="padding-left" :adjust-position="false" type="text" v-model="keyword" confirm-type="search"></input>
				<text class="cuIcon-voice text-blue" style="font-size: 44rpx;"></text>
			</view>
			<view class="action">
				<button class="cu-btn shadow-blur round">搜索</button>
			</view>
		</view>
		<view>
			<scroll-view class="bg-gray nav">
				<view class="flex text-center justify-around">
					<view class="cu-item" :class="0==TabCur?'text-blue cur':''" @tap="tabSelect" data-id="0">
						医院 
					</view>
					<view class="cu-item" :class="1==TabCur?'text-blue cur':''" @tap="tabSelect" data-id="1">
						科室
					</view>
					<view class="cu-item" :class="2==TabCur?'text-blue cur':''" @tap="tabSelect" data-id="2">
						专家
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="flex margin-tb-sm">
			<picker class="bg-white cu-btn flex-sub margin-lr radius" :value="index" :range="picker">
				<text>{{picker[index]}}</text>
				<text class="cuIcon-unfold margin-left-sm"></text>
			</picker>
			<button class="cu-btn bg-white flex-sub margin-lr radius" @click="openDropList()">
				<text>筛选器</text>
				<text class="cuIcon-unfold margin-left-sm"></text>
			</button>
		</view>
		<scroll-view scroll-y="true" id="filters" class="bg-gray shadow shadow-lg" :style="{height:myheight}">	<!--自动展开-->
			<view class="flex justify-between align-center margin margin-lr-lg">
				<text>选择省份</text>
				<text class="cuIcon-unfold padding-xs" @click="provinceopen"></text>
			</view>
			<view class="grid col-5 text-center" :style="{height:provinceheight,overflow:hidden}">
				<view v-for="(item,proIndex) in Province" :key="proIndex" @click="chooseProvience(proIndex)" class="margin-tb-xs">
					<view class="cu-tag light radius" :class="[proIndex==proChoice ? 'bg-blue':'bg-cyan']">{{item.value}}</view>
				</view>
			</view>
			
			<view class="flex justify-between align-center margin margin-lr-lg">
				<text>选择市</text>
				<text class="cuIcon-unfold padding-xs" @click="cityopen"></text>
			</view>
			<view class="grid col-5 text-center" :style="{height:cityheight,overflow:hidden}">
				<view :key="cityIndex" v-for="(item,cityIndex) in Province[proChoice].children" @click="chooseCity(cityIndex)" class="margin-tb-xs">
					<view class="cu-tag light radius" :class="[cityChoice==cityIndex ? 'bg-blue':'bg-cyan']">{{item.value}}</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-grey lg" @click="openDropList()">确定</button>
			</view>
		</scroll-view>
		<view>	<!--搜索结果-->
			<view class="cu-card article no-card " @click="NavToHospital" v-for="result in searchResult">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut">{{result.name}}</view></view>
					<view class="content">
						<image src="../../static/hospital0.png" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{result.abstract}}</view>
							<view >
								<view v-for="tag in result.tags" class="cu-tag bg-red light sm round ">{{tag}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import exp from '../../area.js'
	export default {
		data() {
			return {
				TabCur:0,
				proChoice: 0,
				cityChoice: -1,
				picker: ['按推荐', '按收藏', '按更新'],
				showFilters:false,
				myheight:"0px",
				cityheight:'68rpx',
				provinceheight:'68rpx',
				hidden: 'hidden',
				Province:[],
				index:0,
				keyword:'原发性肝癌',
				searchResult:[
					{
						name:'厦门大学附属翔安医院',
						abstract:'厦门大学附属翔安医院（以下简称翔安医院）位于厦门市翔安区翔安东路2000号，是由厦门市政府与厦门大学共同投资建设的非营利性公立医院',
						avatar:'../../static/hospital0.png',
						tags:['市级','公立'],
					},
					{
						name:'厦门大学附属翔安医院',
						abstract:'厦门大学附属翔安医院（以下简称翔安医院）位于厦门市翔安区翔安东路2000号，是由厦门市政府与厦门大学共同投资建设的非营利性公立医院',
						avatar:'../../static/hospital0.png',
						tags:['市级','公立'],
					},
					{
						name:'厦门大学附属翔安医院',
						abstract:'厦门大学附属翔安医院（以下简称翔安医院）位于厦门市翔安区翔安东路2000号，是由厦门市政府与厦门大学共同投资建设的非营利性公立医院',
						avatar:'../../static/hospital0.png',
						tags:['市级','公立'],
					},
					{
						name:'厦门大学附属翔安医院',
						abstract:'厦门大学附属翔安医院（以下简称翔安医院）位于厦门市翔安区翔安东路2000号，是由厦门市政府与厦门大学共同投资建设的非营利性公立医院',
						avatar:'../../static/hospital0.png',
						tags:['市级','公立'],
					},
					{
						name:'厦门大学附属翔安医院',
						abstract:'厦门大学附属翔安医院（以下简称翔安医院）位于厦门市翔安区翔安东路2000号，是由厦门市政府与厦门大学共同投资建设的非营利性公立医院',
						avatar:'../../static/hospital0.png',
						tags:['市级','公立'],
					},
				]
			}
		},
		methods: {
			chooseCity(index){
				this.cityChoice=index;
			},
			chooseProvience(index){
				this.proChoice=index;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			openDropList(){
				this.myheight=(this.myheight=='78%')?'0rpx':'78%';
			},
			cityopen(){
				this.cityheight=(this.cityheight=='auto')?'68rpx':'auto';
			},
			provinceopen(){
				this.provinceheight=(this.provinceheight=='auto')?'68rpx':'auto';
			},
			NavToHospital(){
				uni.navigateTo({
					url:'../HospitalDetail/HospitalDetail'
				})
			},
			back(){
				uni.navigateBack();
			}
		},
		onLoad(data) {
			this.keyword=data.keyword;
			this.Province=exp;
		}
	}
</script>

<style>
	#filters{
		position: absolute;
		width: 100%;
		height: 0%;
		transition:height 1s;
		z-index:10;
	}
	.we{
		z-index:1;
	}
</style>
