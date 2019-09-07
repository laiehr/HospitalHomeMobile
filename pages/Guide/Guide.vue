<template>
	<view id="chat-panel">
		<cu-custom bgColor="bg-gradual-theme" :isBack="true"><block slot="backText">返回</block><block slot="content">智能导诊</block></cu-custom>
		<view class="cu-chat">
			<template v-for="(item, index) in chatInfos">
				<view :key="index" class="cu-item" :class="{ self: item.direction === 'self', server: item.direction === 'server' }" v-if="item.direction !== 'info'">
					<view v-if="item.direction === 'server'" class="cu-avatar radius" :style="{ 'background-image': 'url(' + item.avatar + ')'}"></view>
					<view class="main">
						<view class="content shadow" :class="{ 'bg-green': item.direction === 'self' }">
							<view class="margin-bottom-xs text-xl">{{item.text}}</view>
							<view v-if="item.isEnable" class="grid col-2">
								<view v-for="(opt, idx) in item.options" :key="idx" class="margin-bottom-sm">
									<button @click="getNextQuestion(opt, item)" class="cu-btn round bg-blue margin-lr-xs text-xl">{{opt.Content}}</button>
								</view>
							</view>
						</view>
					</view>
					<view v-if="item.direction === 'self'" class="cu-avatar radius" :style="{ 'background-image': 'url(' + item.avatar + ')'}"></view>
				</view>
				<view v-else class="cu-info" :key="index" @click="resetQuestion()">
					<text class="cuIcon-roundclosefill text-red "></text> {{item.text}}
				</view>
			</template>
		</view>
		<view class="cu-bar foot input" style="display: none;" :style="{bottom: InputBottom + 'px'}">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"></input>
			<button class="cu-btn bg-green shadow">发送</button>
		</view>
		<view class="cu-load load-modal" v-if="loading">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				loading: false,
				chatInfos: []
			};
		},
		methods: {
			resetQuestion () {
				this.chatInfos = [];
				this.getNextQuestion();
			},
			getNextQuestion (opt, item) {
				if (opt && item) {
					item.isEnable = false;
					let reply = {
						direction: 'self',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg',
						text: opt.Content,
						options: []
					};
					this.chatInfos.push(reply);
				}
				//this.loading = true;
				let THIS = this;
				uni.request({
					url: 'http://hh.ricebird.cn/api/hospital/GetNextQuestion',
					method: 'POST',
					data: {
						id: opt ? opt.ID : undefined
					},
					success (res) {
						let msg = res.data;
						THIS.loading = false;
						let reply = {};
						if (msg.success && msg.data.options && msg.data.options.length) {
							reply = {
								direction: 'server',
								avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg',
								text: msg.data.QuestionName,
								isEnable: true,
								options: msg.data.options
							}
						} else {
							reply = {
								direction: 'info',
								text: "已经到达根节点，需要跳转到科室（暂未开发），点此重置问题。"
							}
						}
						THIS.chatInfos.push(reply);
					}
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		},
		mounted () {
			this.getNextQuestion();
			uni.setNavigationBarTitle({
			    title: '医院之家 - 智能导诊'
			});
		}
	}
</script>

<style lang="less">
page {
  padding-bottom: 100upx;
}

#chat-panel {
	.server {
		.content {
			display: block;
		}
	}
	.cu-item {
		padding-bottom: 0px;
	}
}
</style>
