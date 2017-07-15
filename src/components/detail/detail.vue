<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail" v-show="detailShow"> 
			<br><br><br><br>
			<h2 id="bgtitle">{{seller.name}}</h2>
			<br>
			<star :score='seller.score'></star><br>
			<div id="title">——————优惠信息——————</div>
			<br>
			<ul>
				 <img class="leftImg1"
				src="../img/decrease_1@2x.png" alt="">
				 <img class="leftImg2"
				src="../img/discount_1@2x.png" alt="">
				 <img class="leftImg3"
				src="../img/discount_1@2x.png" alt="">
				 <img class="leftImg4"
				src="../img/special_1@2x.png" alt="">
				 <img class="leftImg5"
				src="../img/special_1@2x.png" alt="">
				<li id="spacial" v-for="item in seller.supports">
				{{item.description}}
				</li>
			</ul>
			<br>
			<div id="title">——————商家公告——————</div>
			<br>
			<div id="inform">
			{{seller.bulletin}}<br>
			</div>
			<div @click.stop.prevent="hideDetail" class="close">X</div>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import star from '../star/star.vue'

	export default {
		components:
		{
			star
		},
		computed:{
			...mapGetters([
				'detailShow',
				'seller'
			])
		},
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail');
			}
		}
	}

</script>

<style lang="less" scoped>
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 666;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(7,17,27,0.8);
		color:#fff;
		#bgtitle
		{
		font-size: 0.32rem;
		font-weight: 700;
		color:rgb(255,255,255);
		line-height: 0.32rem;
		}
		.close{
			position: absolute;
			bottom:0.8rem;
			left:45%;
			border:0.04rem solid #ccc;
			border-radius: 50%;
			width: 0.5rem;
			height: 0.5rem;
			line-height: 0.5rem;
			text-align: center;
		}
		#spacial
		{
		width:6rem;
		height:0.8rem;
		//border: 1px solid red;
		font-size: 0.24rem;
		font-weight: 200;
		color:rgb(255,255,255);
		text-align: left;
		margin-left:2rem;
		}
		#title
		{
			font-size: 0.28rem;
			font-weight: 200;
			color:rgb(255,255,255);

		}
		#inform
		{
		width:6rem;
		height:0.6rem;
		//border: 1px solid red;
		margin-left:1rem;
		font-size: 0.24rem;
		font-weight: 200;
		color:rgb(255,255,255);
		text-align:left;
		}
		.leftImg1
		{
		position:absolute;
		top:2.8rem;
		margin-left:-2.5rem;
		} 
		.leftImg2
		{
		position:absolute;
		top:3.6rem;
		margin-left:-2.5rem;
		} 
		.leftImg3
		{
		position:absolute;
		top:4.4rem;
		margin-left:-2.5rem;
		} 
		.leftImg4
		{
		position:absolute;
		top:5.2rem;
		margin-left:-2.5rem;
		}
		.leftImg5
		{
		position:absolute;
		top:6rem;
		margin-left:-2.5rem;
		}

	}
</style>