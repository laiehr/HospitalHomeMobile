<template>
	<view class="content">
		<statusBar></statusBar>
		<view class="head">
			<p>
				<span><navigator class="cuIcon-home" open-type="redirect" url="../index"></navigator></span>
				<span><navigator class="cuIcon-settings" url="../userInfo/userInfo"></navigator></span>
			</p>
		</view>	
		<view class="info">
			<image v-on:click="NavToInfor()" v-bind:src="imgsrc" />
			<p class="info_name">
				<span style="font-size: 44upx;">{{userInfo.RealName}}</span>
				<i style="display: inline-block; font-size: 44upx;" class="iconfont icon-nan"></i>
			</p>
			<p class="info_text">
				{{userInfo.Grade?userInfo.Grade:"未填写"}} 岁  {{userInfo.Location?userInfo.Location:"未填写地区"}}
			</p>
			<view class="info_item">
				<p>{{userInfo.Collections.Hospitals}}</p>
				<p>医院</p>
			</view>
			<view class="info_item">
				<p>{{userInfo.Collections.Departs}}</p>
				<p>科室</p>
			</view>
			<view class="info_item">
				<p>{{userInfo.Collections.Experts}}</p>
				<p>专家</p>
			</view>
		</view>
			
		<view class="iconCon">
			<view @click="NavBackIndex">
				<i class="iconfont icon-xiezuo icon_comment"></i>
				<p>首页</p>
			</view>
			<view @click="NavToDJ()">
				<i class="iconfont icon-tupian icon_comment"></i>
				<p>智能导诊</p>
			</view>
			<view>
				<i class="iconfont icon-yinyue icon_comment"></i>
				<p>人才招聘</p>
			</view>
			<view>
				<i class="iconfont icon-shipin icon_comment"></i>
				<p>招投标</p>
			</view>
		</view>
		
		<view class="ui-table">
			<navigator class="ui-table-cell">
				<span>附近医院</span>
				<i class="iconfont icon-you1"></i>
			</navigator>
			<navigator>
				<span>我的收藏</span>
				<i class="iconfont icon-you1"></i>
			</navigator>
			<navigator>
				<span>导诊记录</span>
				<i class="iconfont icon-you1"></i>
			</navigator>
			<navigator>
				<span>扫一扫</span>
				<i class="iconfont icon-you1"></i>
			</navigator>
		</view>
		<bottom-navbar :navs='mynavs' v-on:selectchange="change($event)" :iniTabCur="3"></bottom-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				divheight:this.StatusBar,
				currentUserGuid:'',
				imgsrc:'',
				userInfo:{
					Collections:{	
					}
				},
				mynavs:[
					{
						name:"首页",
						icon:"cuIcon-home",
						url:"../index2"
					},
					{
						name:"智能导诊",
						icon:"cuIcon-question",
						url:"../Guide/Guide"
					},
					{
						name:"科普知识",
						icon:"cuIcon-discover",
						url:"../News/newsList?cate=招投标"
					},
					{
						name:"我的",
						icon:"cuIcon-my",
						url:"../profile/profile"
					},
				],
			}
		},
		onLoad(){
			uni.getStorage({
				key:'currentUserGuid',
				success: (res) => {
					this.currentUserGuid=res.data;
				},
			});
		},
		onShow() {
			this.GetInfor();
		},
		methods: {
			change(index){
				this.TabCur=index-1;
				uni.redirectTo({
					url:this.mynavs[index].url
				})
			},
			GetInfor(){
				uni.request({
					url: 'http://hh.ricebird.cn/uc/GetUserInfo',
					method: 'POST',
					data: {
						currentUserGuid:this.currentUserGuid,
					},
					success: res => {
						if(res.data.success==false)
						{
							uni.showToast({title:res.data.msg});
							setTimeout(function(){
								uni.reLaunch({url:'../login/login'});
								uni.hideToast();
							},1500);
							return;
						}
						this.userInfo = res.data.data;
						this.imgsrc = "http://hh.ricebird.cn" + res.data.data.Avatar;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			NavToInfor(){
				uni.navigateTo({
					url:'../userInfo/userInfo',
				})
			},
			NavToDJ(){
				uni.navigateTo({
					url:'../Guide/Guide',
				});
			},
			NavBackIndex(){
				uni.redirectTo({
					url:'../index',
				});
			}
			
		}

	}
</script>

<style lang="less">
	@import '../../style/icon.css';
	@import'../../colorui/icon.css';
	@import url("../../color.less");
	*{
		margin: 0;
		padding: 0;
		font-family: 微软雅黑;
		font-size:36rpx;
	}
	.head{
		/* 头部包含背景图 */
		color: #FFF;
		background-color: @mainColor;
		width: 100%;
		overflow: hidden;
		height: 160px;
	}
	.head > p{
		/* 放我的和设置图标 */
		height: 50px;
		line-height: 50px;
	}
	.head > p > span:nth-of-type(1){
		display: inline-block;
		float: left;
		padding-left: 10px;
		font-size: 36rpx;
		font-weight: bold;
	}
	.head > p > span:nth-of-type(2){
		display: inline-block;
		float: right;
		padding:0rpx 0rpx 0 0;
		font-size: 36rpx;
	}
	.head > p > span> navigator{
		text-align: center;
		font-size: 44rpx;
		width: 90rpx;
		margin-right: 20rpx;
	}
	
	
	.info{
		/* 存放个人信息的 */
		width: calc( 100% - 32px );
		background-color: #FFFFFF;
		margin-left: 16px;
		margin-top: -48px;
		float: left;
		border-radius: 8px;
		box-shadow: 0 0 6px rgba(255,218,25,0.6);
	}
	.info > image{
		width: 140rpx;
		height: 140rpx;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: -70rpx;
		border: 1px solid #ffda19;
	}
	.info_name{
		margin:5rpx 0;
		text-align: center;
		font-size: 44rpx;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}
	.info_text{
		text-align: center;
		height: 30px;
		line-height: 30px;
		font-size: 32rpx;
		color: #6F6F6F;
	}
	.info_item{
		width: calc( 100% / 3 );
		float: left;
		text-align: center;
		padding: 4px 0;
	}
	.info_item > p:nth-of-type(1){
		font-size: 32rpx;
	}
	.info_item > p:nth-of-type(2){
		font-size: 36rpx;
		color: #6F6F6F;
	}
	.info_item:nth-of-type(1){
		border-radius: 0 0 0 8px;
	}
	.info_item:nth-last-of-type(1){
		border-radius: 0 0 8px 0;
	}
	
	.iconCon{
		/* 放功能的图标 */
		width: 100%;
		float: left;
		overflow: hidden;
		margin-top: 32rpx;
		padding: 0rpx 0rpx;
	}
	.iconCon > view{
		float: left;
		width: calc( 100% / 4 );
		text-align: center;
		padding: 20rpx 0rpx;
	}
	.iconCon > view:active{
		background-color: @active-Color;
	}
	
	.ui-table{
		float: left;
		width: calc(100%);
		background-color: #FFFFFF;
		border-top: 8px solid #EFEFF4;
	}
	.ui-table > navigator{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #EFEFF4;
		padding: 0 32px;
	}
	.ui-table > navigator > span{
		float: left;
	}
	.ui-table > navigator > i{
		float: right;
	}
	.ui-table .navigator-hover{
		background: #B0B0B0;
	}
	
	.icon_comment{
		border-radius: 100px;
		font-size: 44rpx;
		width: 70rpx;
		height: 70rpx;
		display: inline-block;
		line-height: 70rpx;
		color: #FFFFFF;
	}
	
	.icon-xiezuo{
		background-color: #fbdc58;
	}
	.icon-tupian{
		background-color: #94ede2;
	}
	.icon-yinyue{
		background-color: #bceccd;
	}
	.icon-shipin{
		background-color: #ffbadc;
	}
</style>

