<template>
	<div class="header" @click="showDetail">
	<img id="banner" src="../img/main.jpeg">
		<img  class="mainimage" :src="seller.avatar" alt="" >
		<div class="line1">
		<div class="title">{{seller.name}}</div>
		 <img class="brind" src="../img/brand@2x.png">
		</div>
		<div class="line2">
		<div class="dec">{{seller.description}} / 38分钟到达</div>
		</div>
		<div class="line3" v-if="seller.supports">
		<img class="reduce" src="../img/decrease_1@2x.png" alt="">
		<div class="reduce-text">{{seller.supports[0].description}}</div>
		<div class="circle">5个 <span>></span></div>
		</div>
		<div class="header-bottom">
		<img  class="gonggao" src="../img/bulletin@2x.png">
		<div class="list-text">{{seller.bulletin}}</div>
		<div class="more"></div>
		</div>
		<br>
		<!-- 弹出层 -->
		<Detail></Detail>
	</div>
</template>

<script>	
	import {mapGetters} from 'vuex'
	import Detail from '../detail/Detail.vue'

	export default {
		created(){
			this.$store.dispatch('getSeller');
		},
		computed:{
			...mapGetters([
				'seller'
			]),
			msg(){
				return 'welcome to itany';
			}
		},
		components:{
			Detail
		},
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail');
			}
		}
	}
</script>

<style lang="less" scoped>

	.header{
		width: 100%;
		height:2.68rem;
		background-color: rgba(7,17,27,0.5);
		opacity: 0.3rem;
		blur:0.1rem;
		font-size:0.32rem;
		line-height:0.36rem;
		font-weight:bold;
		text-align: center;
		color:#fff;
		#banner
		{
		width: 100%;
		height:2.68rem;
		position: absolute;
		top:0rem;
		left:0rem;
		opacity:0.3;
		}
		.line1
		{
		width:75%;
		height:0.9rem;
		margin-left:1.8rem; 
		//border:0.01rem solid #ccc;
		.brind
			{
				width:0.8rem;
				height:0.4rem;
				position: absolute;
				top:0.48rem;
				left:2rem;
			}
			.title
			{
			position: absolute;
			font-size: 0.32rem;
			color:rgb(255,255,255);
			font-weight: bold;
			line-height:0.36rem;
			margin-top: 0.48rem;
			margin-left:1.1rem;
		}
		}
		.line2	
		{
			width:75%;
			height:0.4rem;
			margin-left:1.8rem; 
			//border:0.01rem solid #ccc;
		.dec{
			font-size:0.24rem;
			color:rgb(255,255,255);
			font-weight:bold;
			line-height:0.24rem;
			position:absolute;
			top:0.9rem;
			left:2rem;
			margin-top:0.1rem;

			} 
		}
		.line3
		{
			width:75%;
			height:0.6rem;
			margin-left:1.8rem; 
			//border:0.01rem solid #ccc;
		.reduce
			{
			width:0.3rem;
			height:0.3rem;
			position: absolute;
			top:1.4rem;
			left:2rem;
			} 
			.reduce-text
			{
			font-size:0.2rem;
			color:rgb(255,255,255);
			font-weight: 200;
			position:absolute;
			top:1.4rem;
			left:2.6rem;
				
			} 
			.circle 
			{
				width:1.2rem;
				height:0.5rem; 
				border-radius:0.3rem;
				position: absolute;
				right:0.2rem;
				border:1px solid #777;
				background-color: #777;
				text-align: center;
				line-height:0.5rem; 
			}	
		}
		.mainimage{
			width: 1.28rem;
			height:1.28rem;
			border-radius:0.04rem;
			position: absolute;
			top:0.48rem;
			left:0.48rem;
		}
		.header-bottom
			{
			width: 100%;
			height:0.56rem;
			background-color: rgba(7,17,27,0.2);
			position: absolute;
			top:2.1rem;
			.gonggao
			{
			position: absolute;
			left:0.2rem;
			top:0.15rem;
			width:0.6rem;
			height:0.3rem;

			}
			.list-text
			{
			width:80%;
			height:0.5rem;
			text-align:center;
			line-height:0.6rem; 
			font-size:0.2rem;
			margin-left:0.8rem;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;



			}
			.more
			{
				width:0.5rem;
				height:0.5rem;
				line-height:0.6rem;
				//border:1px solid #ccc;
				position: absolute;
				right:0.2rem;
				margin-top:-0.5rem;

			}
		}
	}



</style>