<template>
	<view>
		<statusBar></statusBar>
		<view id="HospitalInfo">
			<view class="head bg-white">
				<image src="../../static/hospital0.png" mode="aspectFill"></image>
				<view class="nav flex">
					<view class="padding-lr">
						<button class="cu-btn cuIcon bg-grey text-xl" @click="NavToIndex">
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
						<button class="cu-btn cuIcon margin-lr-xs bg-grey text-xl"@click="back">
							<text class="cuIcon-more"></text>
						</button>
					</view>
				</view>
			<view class="Info margin-left">
					<view class="action margin-tb-sm">	<!--医院名称与地址-->
						<text class="cuIcon-titles text-blue"></text>
						<text class="text-bold text-xxl" style="color: #000;">{{name}}</text>
						<text class="text-lg margin-left">{{area}}</text>
					</view>
					<view class="flex margin-bottom margin-left-sm margin-top-xs" id="tags">
						<view class="radius cu-tag line-blue padding-lr-sm text-black text-df" :key="index" v-for="(tag,index) in tags">{{tag}}</view>
					</view>
					<view class="flex margin-left-sm padding-bottom-sm">
						<view class="flex justify-between basis-lg text-lg">
							<view class="collection" :key="key" v-for="(value,key) in collections">{{key}}:{{value}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="Contact" class="bg-white flex justify-between align-center margin-tb-sm padding-lr padding-tb-xs">
			<view class="text-xl">
				<p :key="key" class="margin-tb-xs" v-for="(value,key) in contacts">{{key}}:{{value}}</p>
			</view>
			<view>
				<button class="cu-btn text-lg" @click="NavDepartList()">查看科室</button>
			</view>
		</view>
		<view id="HospitalDetail" class="bg-white" >
			<scroll-view id="swiper" class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex flex-sub " :class="index==TabCur?'text-blue cur':''"v-for="(tabName,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
						{{tabName}}<span v-if="index==1">({{dptInfoNum}})</span>
					</view>
				</view>
			</scroll-view>
			<swiper @change="Show" :current="TabCur" :style="{height: height+'px'}" style="position: relative;">
				<swiper-item id="item0">
					<view>
						<p class="margin-sm text-lg">{{abs}}</p>
					</view>
					<view class="more flex justify-end align-center padding-lr-sm padding-bottom-sm" @click="">
						<text class="text-lg">查看更多</text>
						<text class="cuIcon-playfill"></text>
					</view>
				</swiper-item>
				<swiper-item id="item1 list" class="cu-list menu sm-border">	<!--科室列表-->
					<view class="cu-item" :key="index" v-for="(item, index) in departList">
						<view class="content" @click="NavToDetail">
							<text class="text-black text-xl">{{item}}</text>
						</view>
					</view>
					<view class="more flex justify-end align-center padding-lr-sm padding-bottom-sm" @click="NavDepartList">
						<text class="text-lg">查看更多</text>
						<text class="cuIcon-playfill"></text>
					</view>
				</swiper-item>
				<swiper-item id="item2">
					<view :key="index" v-for="(item,index) in news"@click="NavToNewsDetail">
						<view class="padding" style="background-color: white;" v-if="item.photonumber==0">
							<view class="padding-bottom-xs">
								<text class="text-xxl">{{item.title}}</text>
							</view>
								<text class="text-lg">{{item.date}}</text>
						</view>
						<view class="flex" style="background-color: white;" v-if="item.photonumber==1">
							<view class="flex-twice margin">
								<view class="margin-bottom-sm ">
									<text class="text-xxl text-omit">{{item.title}}</text>
								</view>
									<text class="text-lg">{{item.date}}</text>
							</view>
								<image class=" margin-top-lg margin-right flex-sub" mode="widthFix" :src="item.photo[0].name" ></image>
						</view>
						<view class=" padding" style="background-color: white;" v-if="item.photonumber==3">
							
							<text class="text-xxl ">{{item.title}}</text>
							
							<view class="flex margin-bottom-sm margin-top-sm" >
								<image class="margin-right-xs " mode="widthFix" :src="item.photo[0].name" ></image>
								<image class="margin-right-xs " mode="widthFix" :src="item.photo[1].name" ></image>
								<image class="margin-right-xs " mode="widthFix" :src="item.photo[2].name" ></image>
							</view>
							<text class="text-lg">{{item.date}}</text>
						</view>
					</view>
					<view class="more flex justify-end align-center padding-lr-sm padding-bottom-sm" @click="NavNewsPage1">
						<text class="text-lg">查看更多</text>
						<text class="cuIcon-playfill"></text>
					</view>
				</swiper-item>
				<swiper-item id="item3">
					<view :key="index" v-for="(item,index) in news"@click="NavToNewsDetail">
						<view class="padding" style="background-color: white;" v-if="item.photonumber==0">
							<view class="padding-bottom-xs">
								<text class="text-xxl">{{item.title}}</text>
							</view>
								<text class="text-lg">{{item.date}}</text>
						</view>
						<view class="flex" style="background-color: white;" v-if="item.photonumber==1">
							<view class="flex-twice margin">
								<view class="margin-bottom-sm ">
									<text class="text-xxl text-omit">{{item.title}}</text>
								</view>
									<text class="text-lg">{{item.date}}</text>
							</view>
								<image class=" margin-top-lg margin-right flex-sub" mode="widthFix" :src="item.photo[0].name" ></image>
						</view>
						<view class=" padding" style="background-color: white;" v-if="item.photonumber==3">
							
							<text class="text-xxl ">{{item.title}}</text>
							
							<view class="flex margin-bottom-sm margin-top-sm" >
								<image class="margin-right-xs " mode="widthFix" :src="item.photo[0].name" ></image>
								<image class="margin-right-xs " mode="widthFix" :src="item.photo[1].name" ></image>
								<image class="margin-right-xs " mode="widthFix" :src="item.photo[2].name" ></image>
							</view>
							<text class="text-lg">{{item.date}}</text>
						</view>
					</view>
					<view class="more flex justify-end align-center padding-lr-sm padding-bottom-sm" @click="NavNewsPage2">
						<text class="text-lg">查看更多</text>
						<text class="cuIcon-playfill"></text>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data()
		{
			return{
				height: 150,
				TabCur: 0,
				scrollLeft: 0,
				dptInfoNum: 51,
				tabNav:[
					"医院概况",
					"科室信息",
					"人才招聘",
					"招投标信息"
				],
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
				abs:"厦门大学附属翔安医院（以下简称翔安医院）位于厦门市翔安区翔安东路2000号，是由厦门市政府与厦门大学共同投资建设的非营利性公立医院。",
				departInfo:"科室信息科室信息科室信息科室信息科室信息",
				recuit:"招聘信息招聘信息招聘信息招聘信息招聘信息招聘信息",
				bid:"招投标信息招投标信息招投标信息招投标信息招投标信息",
				name: "厦门大学附属翔安医院",
				area: "福建厦门",
				tags: [
					"三甲",
					"综合",
					"市级",
					"公立",
				],
				collections:{
					科室:51,
					专家:59,
					点击数:14
				},
				contacts: {
					挂号电话:"0592-2889000",
					急诊电话:"0592-2889000"
				},
				news:[
					{title:'关于收看2019年“开学第一课”的提示',photo:[],date:'2019-08-28',photonumber:0},
					{title:'2018年我国城乡居民健康素养水平提升至17.06%呈稳步提升态势',photo:[{name:'../../static/hospital0.png'}],photonumber:1,date:'2019-08-28'},
					{title:'陕西：“最美逆行员”消防员 保护我们安全',photo:[{name:'../../static/hospital0.png'},{name:'../../static/hospital0.png'},{name:'../../static/hospital0.png'}],photonumber:3,date:'2019-08-28'},
				],
			}
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			NavDepartList() {
				uni.navigateTo({
					url: '../DepartList/DepartList',
					success: res => {},
				});
			},
			back(){
				uni.navigateBack({
					
				})
			},
			NavToDetail(){
				uni.navigateTo({
					url: '../ExpertList/ExpertList',
					success: res => {},
				});
			},
			NavNewsPage1(){
				uni.navigateTo({
					url: '../News/newsList?cate=招聘',
					success: res => {},
				});
			},
			NavNewsPage2(){
				uni.navigateTo({
					url: '../News/newsList?cate=招投标',
					success: res => {},
				});
			},
			NavToIndex(){
				uni.navigateTo({
					url: '../index2',
					success: res => {},
					
				});
			},
			Show(e){
				this.TabCur=e.detail.current;
			},
			NavToNewsDetail(){
				uni.navigateTo({
					url: '../News/newsDetail',
					success: res => {},
				});
			},
			calHeight(){
				let THIS=this;
				let xId=uni.createSelectorQuery().in(this).select('#swiper');
				uni.getSystemInfo({
					success: function (res) {
						THIS.height=res.windowHeight;
						console.log("window height:"+res.windowHeight);
					}
				});
				xId.boundingClientRect(data=>{
					THIS.height=THIS.height-data.bottom;
					console.log("bottom:"+data.bottom);
					console.log(THIS.height);
				}).exec();
			}
		},
		onReady(){
			this.calHeight();
		}
	}
</script>

<style lang="scss">
	#HospitalInfo{
		.head{
			position: relative;
			image{
				width:100%;
			}
			.nav{
				width: 100%;
				position: absolute;
				top: 40rpx;
			}
		}
		.Info{
			.collection{
				color: rgb(0, 167, 244);
			}
		}
	}
	#tags{
		view{
			margin-right:20rpx;
			height: 40rpx;
		}
		view:after{
			border: 1rpx solid #00A7F4;
		}
	}
	#Contact{
		button{
			color:rgb(3, 182, 226);
			background-color: rgb(224, 244, 254);
		}
	}
	#HospitalDetail{
		.more{
			color: rgb(0, 167, 244);
		}
	}
	.text-omit{
		width: 200px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box; 
		-webkit-box-orient: vertical; 
		-webkit-line-clamp: 3; 
		overflow: hidden;  
	}
	swiper-item{
		overflow:scroll;
		height: auto;
	}
   
</style>
