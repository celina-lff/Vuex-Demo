<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon iconfont icon-gouwuche icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>

				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop="pay">
				<div class="pay" :class="{'enough':totalPrice>=seller.minPrice}">
					{{payDesc}} <span v-show = '!totalCount'></span>
				</div>
			</div>
		</div>
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<div class="title">购物车</div>
					<div class="empty" @click="empty">清空</div>
				</div>
				<div class="list-content" ref="list">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<div class="name">{{food.name}}</div>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontroll-wrapper">
								<Cartcontrol :food="food"></Cartcontrol>
							</div><br><hr>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="list-mask" v-show="listShow" @click="listShow=false"></div>
		</transition>	
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Cartcontrol from '../Cartcontrol/Cartcontrol.vue'
	//import BScroll from 'better-scroll'

	export default{
		computed:{
			...mapGetters([
				'seller',
				'goods'
			]),
			selectFoods(){
				let foods = [];

				this.goods.forEach( good => {

					good.foods.forEach( food => {

						if ( food.count > 0 ){
							foods.push(food);
						}
					})
				});
				return foods;
			},

			totalCount(){
				let count = 0;
				this.selectFoods.forEach( food => {
					count += food.count;
				})
				return count;
			},

			totalPrice(){
				let total = 0;
				this.selectFoods.forEach( food => {
					total += food.price * food.count;
				})
				return total;
			},
			payDesc(){
				if( this.totalPrice === 0 ){
					return `￥${this.seller.minPrice}元`
				}else if ( this.totalPrice < this.seller.minPrice ) {
					return ` 还差${this.seller.minPrice - this.totalPrice } 元`	
				}else{
					return '去结算'
				}
			}
		},
		components:{
			Cartcontrol
		},
		data(){
			return {
				listShow:false
			}
		},
		methods:{
			toggleList(){
				if(!this.totalCount)
				{
					return;
				}
				this.listShow=!this.listShow;
				//初始化滚动
				if(this.listShow){
					this.$nextTick(() => {
						//判断当没有this.scroll时才初始化，否则刷新即可，避免每次点击都重新创建一个BScroll
						if(!this.scroll)
						{
							// this.scroll=new BScroll(document.getElementsByClassName('list-content')[0],{ //使用原生js获取DOM元素
							this.scroll=new BScroll(this.$refs.list,{  //使用$refs获取DOM元素
								click:true
						});
						}
						else
						{
							this.scroll.refresh();
						}
					});
				}
			},
			empty(){
				this.selectFoods.forEach(food => {
					food.count=0;
				});
			},
			pay(){
				if(this.totalPrice<this.minPrice){
					return;
				}
				alert(`需要支付${this.totalPrice}元`);
			}
		}
	}
</script>

<style lang="less" scoped>

	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height:1rem;
		background: #000;
		.content{
			display: flex;
			background: #141d27;
			.content-left{
				flex:1;
				.logo-wrapper{
					display: inline-block;
					position: relative;
				 	top:-0.4rem; 
					margin: 0.1rem;
					padding:0.6rem;
					width:0.56rem;
					height:0.56rem;
					line-height:0.56rem;
					box-sizing: border-box;
					border-radius: 50%;
					background: #141d27;
					border:0.05rem solid #222;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						margin-top:-0.6rem;
						margin-left: -0.6rem;
						position: absolute;
					
						&.highlight{
							background-color:rgb(0,160,220); 
						}
						.icon-shopping_cart{
							font-size:0.5rem;
							position: absolute;
							margin-left:-0.25rem;
							margin-top: 0.3rem;
							color:#fff;
							&.highlight{
								color:#fff;
							}
						}
					}
					.num{
						position: absolute;
						top:0;
						right:0;
						width:0.3rem;
						height:0.3rem;
						line-height:0.3rem;
						text-align: center;
						border-radius:0.16rem;
						font-size:0.2rem;
						font-weight: 700;
						color:#fff;
						background-color: rgb(240, 20, 20);
						box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 0, 0, 0.4);
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					width: 1rem;
					height: 1rem;
					margin-left: 0.2rem;
					line-height:1rem;
					text-align: center;
					padding-right: 0.12rem;
					box-sizing: border-box;
					border-right: 0.01rem solid rgba(255,255,255,0.1);
					font-size: 0.3rem;
					font-weight: 700;
					color: rgba(255,255,255,0.4);
					//border: 1px solid red;
					&.highlight{
						color:#fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					width: 2.8rem;
					line-height:0.8rem;
					margin: 0.12rem 1rem 0 0.12rem;
					margin-left:0rem;
					color: rgba(255,255,255,0.4);
					font-size:0.3rem;
					text-align: center;
					//border: 1px solid red;
				}
			}
			.content-right{
				flex:0 0 1.05rem;
				width:1.8rem;
				margin-left:5.7rem;
				position: absolute;
				height:1.9rem;
				//border: 1px solid red;
				.pay{
					height:1rem;
					line-height:1rem;
					text-align: center;
					font-size:0.3rem;
					color: rgba(255, 255, 255,0.4);
					font-weight: 700;
					//border: 1px solid red;
					background-color: #2b333b;
					&.enough{
						background-color:#00b43c;
						color:#fff; 
					}
				}
			}
		}
		.shopcart-list{
			position: absolute;
			bottom:0.48rem;
			height: 5rem;
			background: #fff;
			left: 0;
			z-index: -1;
			width: 100%;
			// transform: translate3d(0, -100%, 0);
			// transform:translateY(-100%);  //向上平移
			.list-header{
				height:0.8rem;
				border: 1px solid #ccc;
				line-height:0.8rem;
				padding: 0 0.18rem;
				background-color: #f3f5f7;
				border-bottom: 0.01rem  solid rgba(7, 17, 27, 0.1);
				.title{
					float: left;
					font-size: 0.3rem;
					color: rgb(7, 17, 27);
				}
				.empty{
					float: right;
					font-size: 0.3rem;
					color: rgb(0, 160, 220);
				}
			}
			.list-content{
				padding:0 0.18rem;
				margin-top:0.5rem;
				height:3rem;
				overflow: hidden;
				background: #fff;
				.food{
					position: relative;
					padding: 0.12rem 0;
					height:1rem;
					box-sizing: border-box;
					/*.border-1px(rgba(7, 17, 27, 0.1));*/
					.name{
						line-height:0.24rem;
						font-size: 0.3rem;
						color:rgb(7, 17, 27);
					}
					.price{
						position: absolute;
						right:2rem;
						bottom: 0.12rem;
						line-height:1.4rem;
						font-size:0.3rem;
						font-weight: 700;
						color: rgb(240, 20, 20);
					}
					.cartcontroll-wrapper{
						position: absolute;
						left:5.5rem;
						top:1.8rem;	
						/* bottom:-1.5rem; */
						//border: 1px solid red;
					}
				}
			}
		}
	}
	.list-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		background-color: rgba(7, 17, 27, 0.6);
	}
</style>