<template>
	<div class="cartcontrol">
		<div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart"><i class="icon iconfont icon-jian"></i></div>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="increase icon-add_circle" @click.stop="increaseCart"><i class="icon iconfont icon-guanbi"></i></div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			increaseCart(){
				if ( !this.food.count ){
					Vue.set( this.food , 'count' , 1 );
				}else{
					this.food.count++;
				}
			},
			decreaseCart(){
				if ( this.food.count ){
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.cartcontrol{
			width:2.5rem;
			height:0.8rem;
			margin-left: -1rem;
			position: absolute;
			margin-top: -2rem;
			//border: 1px solid blue;

		.increase {
			display: inline-block;
			width:0.7rem;
			height:0.8rem;
			position: absolute;
			font-size:1rem;
			line-height:0.6rem;
			margin-left:2rem;
			color:rgb(0,160,220);
			//border: 1px solid red;
			text-align: right;
			.icon
			{
				font-size:0.5rem;
			}
			}
			.decrease
			{
			display: inline-block;
			width:0.7rem;
			height:0.8rem;
			position: absolute;
			margin-left: 0.75rem;
			line-height:0.6rem;
			font-size:1rem;
			color:rgb(0,160,220);
			//border: 1px solid red;
			text-align: right;
			.icon
			{
				font-size:0.5rem;

			}

			}
		
		.count{
			display: inline-block;
			vertical-align: top;
			width:0.5rem;
			height:0.8rem;
			line-height: 0.8rem;
			text-align:center;
			position: absolute;
			//border: 1px solid red;
			font-size:0.4rem;
			margin-left:1.5rem;
			color:rgb(147,153,159);
	
		}
	}
</style>

