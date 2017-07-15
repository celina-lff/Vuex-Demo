<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail2" v-show="detailSelectShow" ref='showDetail'>
			<div class="wrapper2">
	            <div class="image-div">
	                <img class="image" :src="food.image">
	            </div>
	            <div class="line2">
	                <div class="line2-content">
	                    <div class="title">{{food.name}}</div>
	                    <div class="rail">月售{{food.sellCount}}份</div>
	                    <div class="goodSay">好评率{{food.rating}}%</div>
	                    <br>
	                    <div class="price"><span>￥</span>{{food.price}}</div>
	                    <div class="reduce-price"><span>￥28</span></div>
	                    <div class="cartControl-wrapper">
	                        <Cartcontrol :food="food"></Cartcontrol>
	                    </div>
	                    <div class="shop" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
	                </div>
	            </div>
	            <div class="instruct">
	                <div class="title">商品介绍</div>
	                <br>
	                <span class="content">{{food.info}}</span>
	            </div>
	            <div class="bgColor"></div>
	            <h1 class="title2">商品评价</h1>
	            <Ratingselect></Ratingselect>
	            <div class="rating-wrapper">
	                <ul>
	                    <li v-for="rating in foodratings" class="rating-item">
	                        <div class="time">
	                            {{rating.rateTime | formatDate}}
	                        </div>
	                        <div class="user">
	                            <span class="name">{{rating.username}}</span>
	                            <img class="avatar" :src="rating.avatar">
	                        </div>
	                        <p class="text">
	                            <i :class="{'icon iconfont icon-dianzan1':rating.rateType===0,'icon iconfont icon-dianzan':rating.rateType===1}"></i>
	                            <span style="color:black">{{rating.text}}</span>
	                        </p>
	                    </li>
	                </ul>
	                <div class="no-rating" v-show="!food.rating||food.ratings.length===0">暂无评价</div>
	            </div>
	            
	            <div @click.stop.prevent="hideDetailSelect" class="close">X</div>
	        </div>	      
	    </div>

	</transition> 
</template>

<script>
 	import Vue from 'vue';
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import star from '../star/star.vue'
	import Cartcontrol from '../Cartcontrol/Cartcontrol.vue'
	import Ratingselect from '../Ratingselect/Ratingselect.vue'

	export default {

		components:
		{
			star,
			Cartcontrol,
			Ratingselect

		},
		filters: 
      {
        formatDate(time) 
        {
          let date = new Date(time);
          return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        }
      },
		props:{
			food:{
				type:Object
			}
		},
		watch:{
			food:function(){
				this.$nextTick(()=>{
					setTimeout( () => {
						if(!this.foodScroll ){
							// alert(111);
							this.foodScroll = new BScroll(this.$refs.showDetail,{
								click : true
							})
						}else{
							// alert(222);
							this.foodScroll.refresh();
						}
					},1000)
				})
				this.$store.dispatch('foodRatings',this.food.ratings);
			}
		},
		computed:{
			...mapGetters([
				'detailSelectShow',
				'seller',
				'goods',
				'arr',
				'selectRatings',
				'foodratings'
				
			])
		},
		methods:{
			hideDetailSelect(){
				this.$store.dispatch('hideDetailSelect');
					},
			addFirst(event) {
        	if (!event._constructed) {
          	return;
       		 }
       			 Vue.set(this.food, 'count', 1);
      		},
      		beforeEnter(el){ //在动画进入前初始化滚动
				this.$store.dispatch('changeTypes',['推荐','吐槽','全部'])
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new BScroll(el,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			}
		}
	 }
</script>

<style lang="less" scoped>
	
.detail2{
		position:fixed;
		top: 0;
		left: 0;
		z-index:0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(7,17,27,0.8);
		color:#fff;
		.wrapper2
		{

		.image-div
		{
			width: 100%;

			.image
			{
				width: 100%;
				height:7.5rem;
			}

		}
		.line2
		{
        width: 100%;
		height:3rem;
		background-color: #ccc;
		//border: 1px solid #ccc;
		.line2-content
		{
		 width: 100%;
		height:2.4rem;
		background-color: #fff;
		.title
		{
			font-size: 0.3rem;
			font-weight: 700;
			color: rgb(7, 17, 27);
			line-height:1rem;
			margin-left: 0.36rem;
		}
		.rail
		{
			font-size: 0.2rem;
			color: rgb(147,153,159);
			line-height:0.3rem;
			margin-left: 0.36rem;
		}
		.goodSay
		{
			font-size: 0.2rem;
			color: rgb(147,153,159);
			line-height:0.3rem;
			margin-left:1.5rem;
			margin-top:-0.3rem;
			margin-left: 2rem;
		}
		.price
		{
			font-size: 0.28rem;
			font-weight: 700;
			color: rgb(240,20,20);
			line-height:0.48rem;
			margin-left: 0.36rem;		
		}
		.reduce-price
		{
			font-size:0.20rem;
			font-weight:700;
			color: rgb(147,153,159);
			line-height: 0.48rem;
			text-decoration: line-through;
			margin-left:1.2rem;
			margin-top:-0.5rem;
		}
		.shop
		{
			 width:2rem;
			 height:0.6rem;
			 line-height: 0.6rem;
			 border-radius: 0.2rem;
			 position: absolute;
			 margin-left:5rem;
			 margin-top: -1.5rem;
			background-color:#3399cc;
			text-align: center;
		}
		.cartControl-wrapper
		{
			 position: absolute;
			 margin-left:5rem;
			 margin-top:0.35rem;
			 border: 0.01rem solid red;
		}
		}
		}
		.close
		{
		position: absolute;
			top:0.2rem;
			left:45%;
			border:0.04rem solid #fff;
			font-size:0.5rem;
			border-radius: 50%;
			width: 0.5rem;
			height: 0.5rem;
			color: #fff;
			line-height: 0.5rem;
			text-align: center;	
		}
		.instruct
		{
			width:100%;
			height:2rem;
			 line-height: 0.6rem;
			 background-color:#fff;
  			//border: 1px solid green;
  			color:#000;
  			.title

  			{
  				color:#000;
  				width:100%;
			 	height:0.5rem;
  				font-size: 0.28rem;
  				font-weight:200;
  				margin-left: 0.36rem;
  			}
  			.content
  			{
  				display: block;
  				width:100%;
  				height:3rem;
  				text-align: left;
  				line-height:0.5rem; 
  				font-size: 0.24rem;
  				font-weight: 200;
  				color:rgb(77, 85,93);
  				color:#000;
  			} 

		}

			.bgColor
  			{
  			width:100%;
			height:0.6rem;	
			 background-color:#ccc;
  			}

  			.title2
  			{
  				width: 100%;
  				height:0.8rem;
  				line-height:0.8rem;
				font-size: 0.28rem;
  				font-weight:200;
				background-color: #fff;
				font-weight:200;
				padding: 0.3rem;
				color: rgb(7,17,27);

  			}
.comment
{
  width: 100%;
  height:1.2rem;
  line-height:2rem;
  margin-top: -0.2rem;
 //border: 1px solid red;
 color: #000;
  background: #fff;
  .com-in
  {
  width: 100%;
  height:1rem;
  line-height:2rem;
  position: absolute;
  margin-top: 0.2rem;
  margin: 0.2rem auto;
  //border:1px solid red;
  .title
  {
  		font-size: 0.3rem;
  		font-weight: 700;
  		margin-left: 0.36rem;
  }
  .all
  {
    width: 1.3rem;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border-radius:0.05rem;
    font-size: 0.1rem;
    background-color:#3399cc;
    margin-top: 0.1rem;
    margin-left:1rem;
  }
  .like
  {
    width: 1.3rem;
    height:0.8rem;
    line-height: 0.8rem; 
    font-size: 0.2rem; 
    text-align: center;
    border-radius:0.05rem;
    background-color:lightblue;
    margin-left:3rem;
    margin-top: -0.8rem;
  }
  .dislike
  {
    width: 1.3rem;
    height:0.8rem;
    line-height: 0.8rem; 
    font-size: 0.2rem; 
    text-align: center;
    border-radius:0.05rem;
    background-color:#ccc;
    margin-left:5rem;
    margin-top:-0.8rem;
  }
  }
}
	
.comment-content
{
 width: 100%;
  height:1.2rem;
  color:#aaa;
  line-height: 1.2rem;
  font-size: 0.3rem;
  text-align:left;
  background-color:#fff;
 // border: 1px solid red;
	.icon
	{
		font-size:0.6rem;
		color:#fff; 
		background-color: #ccc;
		border-radius: 50%;
		margin-left:0.5rem;
	}
	.text
	{
		margin-left:0.2rem;
		/* margin-top:-0.5rem; */
	}
}
.person-comment
{
	width: 100%;
 	height:6rem; 
	background-color: #fff;
	border:1px solid #ccc;
	color:#000;
	.line1
	{
	width: 100%;
	height:4rem;	
	//border:1px solid red;
	.line1-left
	{
		font-size: 0.2rem;
		color:#aaa;
		line-height: 32px;
	}
	.line1-right
	{
	margin-left:5rem;
	margin-top: -0.3rem;
	position: absolute;
	color:#aaa;

	}
	.line1-end
	{
	margin-left:6.5rem;
	margin-top:-0.4rem;
	position: absolute;
	border-radius:50%;
	width: 0.5rem;
	height: 0.5rem;
	}
	.line2-left1
	{
	width: 100%;
	height:1.2rem;
	line-height: 1.2rem;
	font-size: 0.24rem;
	color:rgb(147,153,159);
	//border: 1px solid #000;	
	.icon-dianzan1
	{
		color:#3399cc;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		font-size: 0.4rem;
	}

	.icon-dianzan
	{
		margin-left: 0.2rem;
		margin-right: 0.2rem;

	}

	}
	.line2-left2
	{
	position: absolute;
	margin-top:-0.8rem;
	margin-left:0.8rem;
	font-size: 0.24rem;
	color:rgb(7,17,27);
	}

	}
}
.rating-wrapper{
				padding: 0 0.18rem;
				width: 100%;
				height:5rem;
				background-color: #fff;
				.rating-item{
					position: relative;
					padding: 0.16rem  0;
					height:0.8rem;
					//.border-1px(rgba(7,17,27,0.1));
					.time{
						margin-bottom:0.06rem;
						line-height:0.12rem;
						font-size: 0.1rem;
						color: rgb(147,153,159);
					}
					.user{
						position: absolute;
						right:1rem;
						top:0.16rem;
						font-size: 0.28rem;
						line-height:0.12rem;
						.name{
							display: inline-block;
							margin-right:0.06rem;
							vertical-align: center;
							font-size:0.1rem;
							color: rgb(147,153,159);
						}
						.avatar{
							width:0.4rem;
							height:0.4rem;
							border-radius: 50%;
						}
					}
					.text{
						line-height:0.5rem;
						font-size:0.12rem;
						color: rgb(7,17,27);

						.icon-dianzan1,.icon-dianzan{
							margin-right:0.04rem;
							line-height: 0.16rem;
							font-size:0.12rem;
						}	
						.icon-dianzan1{
							color:rgb(0,160,220);
						}
						.icon-dianzan{
							color:rgb(147,153,159);
						}
					}
				}
				.no-rating{
					padding:0.16rem 0;
					font-size: 0.12rem;
					color: rgb(147,153,159);
				}
			}
}			
}	
</style>