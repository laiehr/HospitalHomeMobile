<template>
	<view>
		<statusBar></statusBar>
		<view id="search" class="margin-bottom-xl" style="position: relative;">
			<image src="../static/blue.png" style="position: absolute;"></image>
			<view class="content padding-top-sm">
				<view class="cu-bar search">
					<view class="cu-avatar round" style="background-image:url(../static/brand.png); background-color: rgba(0,0,0,0);"></view>
					<view class="search-form round bg-white">
						<input @tap="NavToSearch" style="padding-left: 20rpx; padding-right: 0;" :adjust-position="false"
						type="text" placeholder="让呼吸更健康" placeholder-class="text-xxl" confirm-type="search"></input>
						<text class="cuIcon-search text-blue margin-right-sm" style="font-size: 42rpx;"></text>
					</view>
					<view class="action" @click="NavToProfile">
						<text class="text-white text-xxl">厦门</text>
						<text class="text-white text-xxl margin-left-sm">|</text>
						<view class="cu-avatar round margin-left-sm" style="background-image:url(../static/avatar.png);"></view>
					</view>
				</view>
				<view class="flex justify-around align-center margin-right  ">
					<span class="text-white text-lg" style="z-index:1;">热搜：</span>
					<span  style="z-index:1;" class="round tag cu-tags text-lg padding-xs" @tap="NavToSearchRes(tag)" :key="index" v-for="(tag,index) in tags">{{tag}}</span>
				</view>
			</view>
		</view>
		<view class="margin-lr-sm">
			<view class="chat bg-white padding-bottom-xs">
					<p class="padding-lr-xl padding-top-sm padding-bottom-xs text-sl" style="color: #00a7f4;">智能导诊</p>
					<view class="cu-chat margin-tb-sm">
						<view class="cu-item" style="padding: 10rpx;">
							<view class="main">
								<view class="content shadow" style="background-color: #f9f9f9;">
									<text class="text-xxl">Hi~<br/>我是智能导诊助手</text>
								</view>
							</view>
						</view>
					</view>
			</view>
			<view class="cu-bar input radius bg-grey margin-sm" style="background-color: #f9f9f9;margin-left: 0;">
				<text class="cuIcon-voice text-white bg-blue cu-avatar round" style="font-size: 25px;border: #9edefb solid 7rpx;"></text>
				<input @click="NavToGuide" placeholder="请输入症状/疾病/药品..." placeholder-class="text-xl" class="solid-bottom bg-white round shadow" 
				:adjust-position="false" :focus="false" style="padding: 0 0 0 10px;" maxlength="300" cursor-spacing="10"></input>
				<button class="text-df bg-blue">发送</button>
			</view>
			<view style="background-color: #f9f9f9;">
				<view class="cu-bar">
					<view class="text-xxl">
						<text class="cuIcon-titles text-blue"></text>
						<text class="text-bold">医院介绍</text>
					</view>
					<view class="more text-xxl" @tap="SearchMore">查看更多<text class="cuIcon-playfill"></text></view>
				</view>
				<scroll-view scroll-x>
					<view class="flex text-center" id='subsCard'>
						<view class="card bg-white margin-lr-sm"  v-for="(hospital,index) in hospitals1" :key="index">
							<view class="padding-top-sm"><image :src="hospital.avatar" class="cu-avatar round lg" style="background-color: white;"></image></view>
							<view class="text text-black text-overflow text-lg">{{hospital.name}}</view>
							<button id="button" class="text-xl" :class="[hospital.state=='关注'?'bg-blue':'']" @tap="subsribe1(index)">{{hospital.state}}</button>
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="background-color: #f9f9f9;">
				<view class="cu-bar">
					<view class="text-xxl">
						<text class="cuIcon-titles text-blue"></text>
						<text class="text-bold">进驻医疗机构</text>
					</view>
					<view class="more text-xxl" @tap="SearchMore">查看更多<text class="cuIcon-playfill"></text></view>
				</view>
				<scroll-view scroll-x>
					<view class="flex text-center" id='subsCard'>
						<view class="card bg-white margin-lr-sm"  v-for="(hospital,index) in hospitals2" :key="index">
							<view class="padding-top-sm" @tap="NavToHosDetail"><image :src="hospital.avatar" class="cu-avatar round lg" style="background-color: white;"></image></view>
							<view class="text text-black text-overflow text-xl" @tap="NavToHosDetail">{{hospital.name}}</view>
							<button id="button" class="text-xl" :class="[hospital.state=='关注'?'bg-blue':'']" @tap="subsribe2(index)">{{hospital.state}}</button>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<bottom-navbar :navs='mynavs' v-on:selectchange="change($event)" :iniTabCur="0"></bottom-navbar>
	</view>
</template>

<script>
	export default {
		data()
		{
			return{
				TabCur: 0,
				scrollLeft: 0,
				mynavs:[
					{
						name:"首页",
						icon:"cuIcon-home",
						url:"./index"
					},
					{
						name:"智能导诊",
						icon:"cuIcon-question",
						url:"./Guide/Guide"
					},
					{
						name:"科普知识",
						icon:"cuIcon-discover",
						url:"./News/newsList?cate=招投标"
					},
					{
						name:"我的",
						icon:"cuIcon-my",
						url:"./profile/profile"
					},
				],
				hospitals1:[
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
				],
				hospitals2:[
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
				],
				tags:[
					"呼吸科权威医院",
					"原发性肝癌",
					"广州中医院",
				]
			}
		},
		computed:{
			
		},
		methods:{
			change(index){
				if(!this.mynavs[index].url)return;
				uni.redirectTo({
					url:this.mynavs[index].url
				})
			},
			subsribe1(index)
			{
				this.hospitals1[index].state=(this.hospitals1[index].state=='已关注')?'关注':'已关注';
			},
			subsribe2(index)
			{
				this.hospitals2[index].state=(this.hospitals2[index].state=='已关注')?'关注':'已关注';
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if(this.TabCur==4){
					uni.navigateTo({
						url:'./profile/profile'
					})
				}
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
			SearchMore(){
				uni.navigateTo({
					url:'./Search/Result'
				})
			},
			NavToSearch(){
				uni.navigateTo({
					url:'./Search/Search'
				})
			},
			NavToProfile(){
				uni.navigateTo({
					url: './profile/profile',
				});
			},
			NavToSearchRes(e){
				uni.navigateTo({
					url:'./Search/Result?keyword='+e
				});
			},
			NavToHosDetail() {
				uni.navigateTo({
					url: './HospitalDetail/HospitalDetail',
				});
			},
			NavToGuide(){
				uni.navigateTo({
					url: './Guide/Guide',
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f9f9f9;
	}
	#search{
		width:100%;
		image{
			position: absolute;
			width: 100%;
			height: 206rpx;
		}
		.content{
			.tag{
				background-color: rgba(#4ddbfe, 0.4);
				white-space: nowrap;
				overflow: ellipsis;
			}
		}
	}
	.more{
		color: rgb(0, 167, 244);
	}
	.card{
		min-width: 200rpx;
		min-height: 286rpx;
	}
	.text-overflow{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		margin: 10rpx 15rpx 20rpx 15rpx;
	}
	#subsCard{
		button{
			padding:15rpx 30rpx;
			height: 50rpx;
			align-items: center;
			display: inline-flex;
			white-space: nowrap;
		}
	}
</style>
