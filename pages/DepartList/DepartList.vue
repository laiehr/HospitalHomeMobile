<template>
	<view id="departList">
		<statusBar></statusBar>
		<view>	<!--上半部分-->
			<image class="bg-img" src="../../static/background.png" mode="aspectFill"></image>
			<view class="padding-top-lg flex">	<!--四个按钮-->
				<view class="padding-lr">
					<button class="cu-btn cuIcon bg-grey text-xl" @click="back">
						<text class="cuIcon-home"></text>
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
			<view class="margin-top-lg margin-lr">	<!--医院信息-->
				<view class="action text-xxl">	<!--医院名称与地址-->
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-bold" style="color: #000;">厦门大学附属翔安医院</text>
					<text class="text-lg margin-left">福建厦门</text>
				</view>
				<view class="margin-tb-sm margin-left-sm" id="tags">	<!--医院标签-->
					<view class='radius cu-tag line-blue padding-lr-sm text-black text-df' :key="index" v-for="(item,index) in tags">{{item}}</view>
				</view>
				<view class="flex margin-left-lg">
					<view class="basis-xl flex justify-between text-blue text-lg">
						<text>科室数:12</text>
						<text>专家数:23</text>
						<text>点击数:89</text>
					</view>
				</view>
			</view>
			<view class="cu-bar search flex justify-center">	<!--搜索条-->
				<view class="basis-xl">
					<view class="search-form round" id="searcher">
						<input class="padding-left" type="text" placeholder="肝胆外科" confirm-type="search" @input="search" placeholder-class="text-lg"></input>
						<text class="cuIcon-search text-blue" style="font-size: 40rpx;"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border" id="list">	<!--科室列表-->
			<view class="cu-item" v-if="keyword==''||(chooseIndex.indexOf(index.toString())>-1)" :key="index" v-for="(item, index) in departList">
				<view class="content" @click="NavToDetail">
					<text class="text-black text-xl">{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				chooseIndex:[],
				keyword:'',
				departList:[
					"脊柱外科(3位专家)",
					"肝胆外科(7位专家)",
					"化疗科(4位专家)",
					"心脏内科(8位专家)",
					"泌尿外科(8位专家)",
					"甲状腺乳腺外科(4位专家)",
					"眼科(0位专家)",
					"消化内科(5位专家)",
					"病理科(5位专家)",
					"心血管内科(5位专家)"
				],
				tags:[
					"三甲",
					"综合",
					"市级",
					"公立"
				]
			}
		},
		methods: {
			NavToDetail() {
				uni.navigateTo({
					url: '../ExpertList/ExpertList',
					success: res => {},
				});
			},
			back(){
				uni.reLaunch({
					url: '../index'
				});
			},
			search(event){
				this.chooseIndex=[];
				this.keyword=event.target.value;
				for (let index in this.departList) {
					if(this.departList[index].indexOf(this.keyword)>-1){
						this.chooseIndex.push(index);
					}
				}
			}
		}
	}
</script>

<style lang="less">
	#departList{
		.bg-img{
			width: 100%;
			position: absolute;
		}
		#tags{
			view{
				margin: 0 20rpx;
				height: 40rpx;
			}
			view::after{
				border: 1rpx solid #00A7F4;
			}
		}
		#searcher{
			background-color: #FFF;
		}
		#list > view:first-child{
			background: linear-gradient(#EBEBEB, #FFFFFF);
		}
	}
	
</style>
