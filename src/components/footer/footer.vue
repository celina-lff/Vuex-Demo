<template>
	<div class="footer">
	 <div class="price">
      <div class="circle"  @click="showDetailAll">
      <i class="icon iconfont icon-gouwuche"></i>
      </div>
	 	
	 <div class="price-text">￥0</div>
	 </div>
	  <div class="desc">另需配送费￥4元</div>
	 <div class="send">￥20元起送</div>
	 <costall> </costall>
	</div>
</template>
<script type="text/javascript">
   import {mapGetters} from 'vuex'
	import costall from '../detail/costall.vue'

	export default {
		created(){
			this.$store.dispatch('getSellerAll');
		},
		computed:{
			...mapGetters([
			'detailShowAll'
			]),
		},
		components:{
			costall,
		},
		methods:{
			showDetailAll(){
				this.$store.dispatch('showDetailAll');
			}
		}
	}

</script>
<style type="text/css" lang="less" scoped>
	.footer
	{
		position: fixed;
		width: 100%;
		height:2.5rem;
		z-index: 999;
		border: 1px solid #131d26;
		text-align: center;
		.price
		{
			width:2.6rem;
			height:1.5rem;
			line-height: 1rem;
			font-size: 0.5rem;
			color:#fff;
			//border: 0.01rem solid red;
			background-color: #131d26;
			float: left;
			.circle
			{
				width:1.2rem;
				height:1.2rem;
				margin-top: -0.3rem;
				margin-left: 0.2rem;
				 background-color:#2b343c; 
				border: 0.1rem solid #141d27;
				border-radius: 50%;
				.icon
				{
					font-size:0.7rem;
					text-align: center;
					position: absolute;
					margin-top: 0.1rem;
					margin-left: -0.4rem;
					color: #80858a;
				}
			}		
			.price-text
			{
			width:1rem;
			height:0.8rem;
			line-height: 0.8rem;
			//margin-top:0.2rem;
			color:#ccc;
			position: absolute;
			bottom:1.5rem;
			margin-left:1.5rem;
			//border: 0.01rem solid #ccc;
			position: absolute;
			font-size: 0.5rem;
			}
		}
		.desc
		{
			width:2.5rem;
			height:1.5rem;
			line-height: 1.2rem;
			text-align: center;
			color:#ccc;
			//border: 0.01rem solid #000;
			font-size: 0.28rem;
			float:left;
			background-color: #131d26;
		}
		.send
		{
			width:2rem;
			height:1.5rem;
			line-height: 1.2rem;
			font-size: 0.28rem;
				color:#ccc;
			background-color: #2b333b;
			float:left;
		}

	}



</style>	