<template>
	<view>
		<statusBar></statusBar>
		<view style="height: 250rpx;"></view>
		<view style="position:fixed; top:0;z-index: 10;width: 100%;">
			<statusBar></statusBar>
			<view id="search" class="bg-gradual-theme" style="height:160rpx">
				<view class="content padding-tb">
					<view class="cu-bar search">
						<view class="cu-avatar round" style="background-image:url(../../static/brand.png); background-color: rgba(0,0,0,0);"></view>
						<view class="search-form round bg-white">
							<input @tap="navToSearch()" style="padding-left: 20rpx;" :adjust-position="false" type="text" placeholder="在此处搜索" confirm-type="search"></input>
							<text class="cuIcon-search text-blue margin-right-sm" style="font-size: 36rpx;"></text>
						</view>
						<view class="action" @click="NavToProfile">
							<text class="text-white">厦门</text>
							<text class="text-white text-xxl margin-left-sm">|</text>
							<view class="cu-avatar round margin-left-sm" style="background-image:url(../../static/avatar.png);"></view>
						</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex flex-sub text-lg" :class="index==TabCur?'text-blue cur':''" v-for="(tabName,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
						{{tabName}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view :key="index" v-for="(item,index) in news" @click="toDetail()">
			<view class="solids-bottom padding" style="background-color: white;" v-if="item.photo.length==0">
				<view class="padding-bottom-xs">
					<text class="text-xxl">{{item.title}}</text>
				</view>
				<view class="text-grey">
					<text class="text-df margin-right-sm">{{item.author}}</text>
					<text class="text-df">{{item.date}}</text>
				</view>
			</view>
			<view class="solids-bottom flex" style="background-color: white;" v-if="item.photo.length==1">
				<view class="flex-twice padding">
					<view class="margin-bottom-sm ">
						<text class="text-xxl text-omit">{{item.title}}</text>
					</view>
				<view class="text-grey">
					<text class="text-df margin-right-sm">{{item.author}}</text>
					<text class="text-df">{{item.date}}</text>
				</view>
				</view>
				<image class=" margin-top-lg margin-right flex-sub" mode="widthFix" :src="item.photo[0].name" ></image>
			</view>
			<view class="solids-bottom padding" style="background-color: white;" v-if="item.photo.length==3">
				<text class="text-xxl ">{{item.title}}</text>
				<view class="flex margin-tb-sm" >
					<image class="margin-lr-xs" mode="widthFix" :src="item.photo[0].name" ></image>
					<image class="margin-lr-xs" mode="widthFix" :src="item.photo[1].name" ></image>
					<image class="margin-lr-xs" mode="widthFix" :src="item.photo[2].name" ></image>
				</view>
				<view class="text-grey">
					<text class="text-df margin-right-sm">{{item.author}}</text>
					<text class="text-df">{{item.date}}</text>
				</view>
			</view>
		</view>
		<bottom-navbar :navs='mynavs' v-on:selectchange="change($event)" :iniTabCur="2"></bottom-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				mynavs:[
					{
						name:"首页",
						icon:"cuIcon-home",
						url:"/pages/index2"
					},
					{
						name:"智能导诊",
						icon:"cuIcon-question",
						url:"/pages/Guide/Guide"
					},
					{
						name:"科普知识",
						icon:"cuIcon-discover",
						url:"/pages/News/newsList?cate=招投标"
					},
					{
						name:"我的",
						icon:"cuIcon-my",
						url:"/pages/profile/profile"
					},
				],
				tabNav:[
					"招聘",
					"招投标",
					"知识库",
					"要闻",
					"综合",
					"快闪",
					"新思想",
				],
				news:[
					{title:'关于收看2019年“开学第一课”的提示',photo:[],date:'2019-08-28',author:'北京世纪坛医院'},
					{title:'佳都科技2019半年报：在手订单充裕，AI产品化升级迎接“5GABC”时代',photo:[{name:'../../static/hospital0.png'}],date:'2019-08-28',author:'北京积水潭医院'},
					{title:'陕西：“最美逆行员”消防员 保护我们安全',photo:[{name:'../../static/hospital0.png'},{name:'../../static/hospital0.png'},{name:'../../static/hospital0.png'}],date:'2019-08-28',author:'上海长征医院'},
					{title:'佳都科技2019半年报：在手订单充裕，AI产品化升级迎接“5GABC”时代',photo:[{name:'../../static/hospital0.png'}],date:'2019-08-28',author:'北京积水潭医院'},
					{title:'陕西：“最美逆行员”消防员 保护我们安全',photo:[{name:'../../static/hospital0.png'},{name:'../../static/hospital0.png'},{name:'../../static/hospital0.png'}],date:'2019-08-28',author:'上海长征医院'},
				]
			}
		},
		onLoad(data) {
			this.TabCur=this.tabNav.indexOf(data.cate);
		},
		methods: {
			change(index){
				this.TabCur=index-1;
				uni.redirectTo({
					url:this.mynavs[index].url
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			navToSearch()
			{
				uni.navigateTo({
					url:'../Search/Search',
				})
			},
			toDetail(){
				uni.navigateTo({
					url:'./newsDetail',
				})
			},
			NavToProfile(){
				uni.navigateTo({
					url:'../profile/profile',
				})
			}
		}
	}
</script>

<style lang="less">
	.text-omit{
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;  
	}
</style>
