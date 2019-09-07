<template>
	<view class="center">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="center_box_bg">
			<view class="center_menu">
				<navigator class="menu_item">
					<text style="flex:1;">头像</text>
					<view class="detail-info">
						<image :src="imgsrc" mode="aspectFit" class="info-img"></image>
					</view>
				</navigator>
				<navigator class="menu_item" url="./modifyRealName">
					<text style="flex:1;">昵称</text>
					<view class="detail-info">
						<text>{{userInfo.RealName}}</text>
					</view>
				</navigator>
				<navigator class="menu_item" url="./modifyMobile">
					<text style="flex:1;">手机号码</text>
					<view class="detail-info">
						<text>{{userInfo.Mobile}}</text>
					</view>
					
				</navigator>
				<navigator class="menu_item">
					<text style="flex:1;">邮箱</text>
					<view class="detail-info">
						<text>{{userInfo.Email?userInfo.Email:"未填写"}}</text>
					</view>
				</navigator>
				<navigator class="menu_item" url="./modifyGrade">
					<text style="flex:1;">年龄</text>
					<view class="detail-info">
						<text>{{userInfo.Grade?userInfo.Grade:"未填写"}}</text>
					</view>
				</navigator>
				<navigator class="menu_item">
					<text style="flex:1;">性别</text>
					<view class="detail-info">
						<text>{{userInfo.Gender?userInfo.Gender:"未填写"}}</text>
					</view>
				</navigator>
				<navigator class="menu_item" >
					<text style="flex:1;">地址</text>
					<view class="detail-info">
						<text>{{userInfo.Location?userInfo.Location:"未填写"}}</text>
					</view>
				</navigator>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg text-xl" @tap="logout()" >退出</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.getStorage({
				key:'currentUserGuid',
				success: (res) => {
					this.currentUserGuid=res.data;
				},
			});
		},
		onShow(){
			this.GetInfor();
		},
		data() {
			return {
				divheight:this.StatusBar,
				currentUserGuid:'',
				userInfo:{},
				imgsrc:'',
			};
		},
		methods: {
			GetInfor(){
				uni.request({
					url: 'http://hh.ricebird.cn/uc/GetUserInfo',
					method: 'POST',
					data: {
						currentUserGuid:this.currentUserGuid,
					},
					success: res => {
						this.userInfo = res.data.data;
						this.imgsrc = "http://hh.ricebird.cn" + res.data.data.Avatar;
						uni.setStorage({
							key:'userInfo',
							data:res.data.data,
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			logout(){
				uni.request({
					url: 'http://hh.ricebird.cn/api/security/logout',
					method: 'POST',
					data: {
						currentUserGuid:this.currentUserGuid,
					},
					success: res => {},
					fail: () => {},
					complete: () => {
						uni.removeStorageSync('userInfo');
						uni.reLaunch({
							url:'../login/login',
						});
					}
				});
				
			},
		},
		
	}
</script>

<style lang="scss">
	.info-img
	{
		height: 120upx;
		width: 120upx;
		margin: 5px;
		border-radius: 4px;
	}
	.detail-info
	{
		display:flex;
		flex:1;
		flex-direction:row-reverse;
		margin-right: 35rpx;
	}

	.center 
	{
		height: 100%;
		&_top {
			height: 18%;
			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100rpx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}
	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 36rpx;
			letter-spacing: 2rpx;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&.navigator-hover{
				/*按钮点击效果*/
				background: #B0B0B0;
			}
			
			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/fumou-center-template/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			&:nth-of-type(2) {
				margin-top: 10px;
			}
		}
	}


</style>
