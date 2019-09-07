<template>
	<view>
		<statusBar></statusBar>
		<view id="search" style="position: relative;height: 206rpx;">
			<image src="../static/blue.png" style="position: absolute;"></image>
			<view class="content">
				<view class="cu-bar search">
					<view class="cu-avatar round" style="background-image:url(../static/brand.png); background-color: rgba(0,0,0,0);"></view>
					<view class="search-form round bg-white">
						<input @tap="NavToSearch" placeholder-class="text-lg" style="padding-left: 20rpx;" :adjust-position="false" 
						type="text" placeholder="让呼吸更健康" confirm-type="search"></input>
						<text class="cuIcon-search text-blue margin-right-sm" style="font-size: 36rpx;"></text>
					</view>
					<view class="action" @click="NavToProfile">
						<text class="text-white text-xl">厦门</text>
						<text class="text-white text-xxl margin-left-sm">|</text>
						<view class="cu-avatar round margin-left-sm" style="background-image:url(../static/avatar.png)"></view>
					</view>
				</view>
				<view class="flex justify-around align-center margin-right margin-tb-xs">
					<span class="text-white text-lg" style="z-index:1;">热搜：</span>
					<span  style="z-index:1;" class="round tag cu-tags padding-xs" @tap="NavToSearchRes(tag)" :key="index" v-for="(tag,index) in tags">{{tag}}</span>
				</view>
			</view>
		</view>
		<view class="margin-lr-sm flex justify-around margin-tb bg-white padding-tb shadow">
			<view :key="index" v-for="(item,index) in bigicon" style="width: 15%;border-bottom: #00CCFE 5rpx solid; border-bottom-left-radius: 20rpx;"
			 class="text-center padding-tb-xs" @click="Nav(index)">
				<image :src="item.icon" mode="widthFix" ></image>
				<text class="text-xl text-bold">{{item.text}}</text>
			</view>
		</view>
		<view class="flex justify-center margin-lr" >
			<image src="../static/banner.jpg" style="height: 150rpx; width: 100%;"></image>
		</view>
		<view class="margin-lr-sm">
			<view style="background-color: #f9f9f9;">
				<view class="cu-bar">
					<view class="text-xxl">
						<text class="cuIcon-titles text-blue"></text>
						<text class="text-bold">收藏医院</text>
					</view>
					<view class="more text-lg" @tap="SearchMore()">查看更多<text class="cuIcon-playfill"></text></view>
				</view>
				<scroll-view scroll-x>
					<view class="flex text-center" id='subsCard'>
						<view class="card bg-white margin-lr-sm"  v-for="(hospital,index) in hospitals1" :key="index" >
							<view class="padding-top-sm" @tap="NavToHosDetail"><image :src="hospital.avatar" class="cu-avatar round lg" style="background-color: white;"></image></view>
							<view class="text-black text-overflow text-lg" @tap="NavToHosDetail">{{hospital.name}}</view>
							<button id="button" class="text-lg align-center" :class="[hospital.state=='关注'?'bg-blue':'']" @tap="subsribe1(index)">{{hospital.state}}</button>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="margin-lr-sm">
			<view class="cu-bar">
				<view class="text-xxl">
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-bold">健康知识</text>
				</view>
				<view class="more text-lg" @tap="SearchMore">查看更多<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="cu-card article no-card " @click="NavToHospital">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut text-xl">程序员如何缓解脱发</view></view>
					<view class="content">
						<image src="../static/hospital0.png" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">脱发是现在很多中年人常见的一种情况，可现在趋于年轻化发展，在脱发的人群中，和工作性质也有很大关系，尤其是程序员整体上脱发比较厉害</view>
							<view >
								<view class="cu-tag bg-red light sm round ">优质</view>
								<view class="cu-tag bg-red light sm round ">关注</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card article no-card " @click="NavToHospital">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut text-xl">程序员如何缓解脱发</view></view>
					<view class="content">
						<image src="../static/hospital0.png" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">脱发是现在很多中年人常见的一种情况，可现在趋于年轻化发展，在脱发的人群中，和工作性质也有很大关系，尤其是程序员整体上脱发比较厉害</view>
							<view >
								<view class="cu-tag bg-red light sm round ">优质</view>
								<view class="cu-tag bg-red light sm round ">关注</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-lr-sm">
			<view style="background-color: #f9f9f9;">
				<view class="cu-bar">
					<view class="text-xxl">
						<text class="cuIcon-titles text-blue"></text>
						<text class="text-bold">进驻机构</text>
					</view>
					<view class="more text-lg" @tap="SearchMore">查看更多<text class="cuIcon-playfill"></text></view>
				</view>
				<scroll-view scroll-x>
					<view class="flex text-center" id='subsCard'>
						<view class="card bg-white margin-lr-sm"  v-for="(hospital,index) in hospitals2" :key="index" >
							<view class="padding-top-sm" @tap="NavToHosDetail"><image :src="hospital.avatar" class="cu-avatar round lg" style="background-color: white;"></image></view>
							<view class="text-black text-overflow text-lg" @tap="NavToHosDetail">{{hospital.name}}</view>
							<button id="button" class="text-lg align-center" :class="[hospital.state=='关注'?'bg-blue':'']" @tap="subsribe2(index)">{{hospital.state}}</button>
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
				bigicon:[
					{
						icon:'../static/guide.png',
						text:'智能导诊',
					},
					{
						icon:'../static/booking.png',
						text:'代约医生',
					},
					{
						icon:'../static/re.png',
						text:'人才招聘',
					},
					{
						icon:'../static/bid.png',
						text:'招投标',
					}
				],
				mynavs:[
					{
						name:"首页",
						icon:"cuIcon-home",
						url:"./index2"
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
						avatar:"../static/hospital0.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital1.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital2.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital3.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital4.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital5.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital6.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
				],
				hospitals2:[
					{
						avatar:"../static/hospital7.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital8.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital9.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital1.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital2.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital3.png",
						name:"厦门大学附属翔安医院",
						state:"关注"
					},
					{
						avatar:"../static/hospital4.png",
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
			NavToSearchRes(e){
				uni.navigateTo({
					url:'./Search/Result?keyword='+e
				});
			},
			NavToSearch(){
				uni.navigateTo({
					url:'./Search/Search'
				});

			},
			NavToHosDetail() {
				uni.navigateTo({
					url: './HospitalDetail/HospitalDetail',
				});
			},
			NavToProfile(){
				uni.navigateTo({
					url: './profile/profile',
				});
			},
			NavToGuide(){
				uni.navigateTo({
					url: './Guide/Guide',
				});
			},
			Nav(index){
				if(index==0)this.NavToGuide();
				else if(index==1);
				else if(index==2||index==3){
					uni.redirectTo({
						url:'./News/newsList'
					})
				}
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
				min-width: 120rpx;
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
			padding:10rpx 20rpx;
			height: 40rpx;
			align-items: center;
			display: inline-flex;
			white-space: nowrap;
		}
	}
</style>
