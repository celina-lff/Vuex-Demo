<template>
	<div class="goods">

		<div class="menu-wrapper" ref = 'menufood'> 
			<ul id="wrapper" >
				<li id="lie-text" v-for="(value,key) in goods" :class = "{'current' : key === currentIndex}" @click = 'selectmunu(key,$event)'>
					{{value.name}}<div class="setHR"><hr></div>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref = 'menufoodlist'>
			<ul>
				<li v-for="item in goods">
					<h1 class="foods-wrapper">
					<div class="left-text">{{item.name}}</div>
					</h1>
					<ul id="wrapper">
						<li v-for="food in item.foods" class="food-list" @click="showDetailSelect(food)">
							<div class="right">
							<img class="image" :src="food.icon">
							<div class="image-text"><div id="right-title">{{food.name}}</div>
							<div id="food-dec">{{food.description}}</div>
							<div class="right-three">
							<div id="rail">月售{{food.sellCount}}份</div>
							<div id="goodSay">好评率{{food.rating}}%</div>
							<div class="add-reduce">
							<div id="price">
							<span class="now">￥{{food.price}}</span>
							<span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
							</div>
							<div class="cartcontrol-wrapper">
							<div id="circlechange"><Cartcontrol :food="food"></Cartcontrol></div>
							</div>
							</div>
							</div>
							</div><br><br><hr>
							</div>		
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<Shopcart></Shopcart>
		<!-- 弹出层 -->
		<detailSelect :food="selectFood"></detailSelect>

	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import detailSelect from '../detail/detailSelect.vue'
	import Cartcontrol from '../Cartcontrol/Cartcontrol.vue'
	import Shopcart from '../Shopcart/Shopcart.vue'

	export default
	 {
		created(){
			this.$store.dispatch('getGoods');
		},
		computed :{ 
		...mapGetters([
			'goods',
			'detailSelectShow'
		]),
		currentIndex()
		{
				for ( let i = 0 ; i < this.listHeight.length ; i++ )
				{
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if( !height2 || (this.scrollY >= height1 &&  this.scrollY < height2) )
					{
						return i;
					}
				}
				return 0;
			}
},
		data()
		{
			return{
				listHeight:[],
				scrollY : '',
				selectFood:{}
			}
		},
		watch:{
			goods()
			{
				this.$nextTick(()=>{
				this._initfoods();
				this._initHeight();
				
				})
			}
		},
		components:{
			detailSelect,
			Shopcart,
			Cartcontrol

		},
		methods : {
			showDetailSelect(food){
				// 这个提交动作显示详情页
				this.$store.dispatch('showDetailSelect');
				// 提交动作用来传数据（参数）到vuex
				this.$store.dispatch('foosshow',food);
				this.selectFood=food;
			},
			_initfoods(){
				this.foodScroll = new BScroll( this.$refs.menufood,{
					click : true

				}),
				this.foodScrollList = new BScroll( this.$refs.menufoodlist,{
					click : true,
					probeType : 3

				});
				this.foodScrollList.on('scroll',(pos)=>{
					this.scrollY =  Math.abs(Math.round(pos.y));
					// console.log(this.scrollY);

				})

			},
			_initHeight()
			{
				let foodlist=this.$refs.menufoodlist.getElementsByClassName('food-list');
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodlist.length;i++)
				{
					height+=foodlist[i].clientHeight;
					this.listHeight.push(height);
				}
			},
			selectmunu(k,e){
				console.log(5);
				let foodlist = this.$refs.menufoodlist.getElementsByClassName('food-list');
				this.foodScrollList.scrollToElement(foodlist[k],300);
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods
		{
		margin-top:1.7rem;
		display: flex;
		position: absolute;
		top:1.74rem;
		bottom:0.46rem;
		overflow: hidden;
		font-size:0.15rem;
		#lie-text
		{
			width:1.4rem;
			height:1.4rem;
			line-height:0.4rem;
			//border:1px solid red;
			margin-bottom:0.05rem;
			text-align: center;
			font-size: 0.24rem;
			&.current{
					color:red;
				}
			.smallbox
			{
			width:1.0rem;
			height:0.8rem;
			margin-left:0.2rem; 
			//border:1px solid red;
			text-align: center;
			}
			.setHR
			{
			width:1.0rem;
			height:0.3rem;
			margin-left: 0.2rem;
			margin-top: 0.4rem;
			//border:1px solid green;
			}
		}
			h1
			{
			font-size:0.24rem;
			color:rgb(147,153,159);
			line-height:0.52rem;
			.left-text
			{
			width:5rem;
			height:0.4rem; 
			line-height:0.4rem;  
			//border:1px solid red;
			}
		}
		.right{
			width:5rem;
			height:2.2rem;
			//border:1px solid red; 
			.image
			{
			width: 1.5rem;
			height:1.5rem; 
			margin-top:0.2rem; 
		}
		.image-text
		{
			display: block;
			width:3.3rem;
			height:1.5rem;
			//border:1px solid #ccc;
			font-size:0.24rem;
			font-weight: 200;
			line-height: 0.28rem;
			float:right;
			margin-top: 0.2rem;
			margin-left: 0.1rem;

			#right-title
			{
				font-size: 0.28rem;
				color:rgb(7,17,27);
				line-height: 0.28rem;

			}
			#food-dec
			{
				color: #ccc;
				margin-top:0.4rem;
			}
			.right-three
			{
				width:4rem;
				height:0.5rem;
				margin-top: -0.1rem;
				//border: 1px solid red;

			.add-reduce
			{
				width:2rem;
				height:0.5rem;
				//border: 1px solid blue;	
				margin-left: 2rem;
				float: left;
			#price
			{
				color:red;
				font-weight: 700;
				line-height:0.48rem;
				font-size:0.28rem;
				margin-left: -2rem;	
				margin-top: -0.2rem;		
			}

		}
			#rail
			{
				width:1.5rem;
				height:0.5rem;
				color: #ccc;
				margin-top:0.2rem;
			}
			#goodSay
			{
				width:1.5rem;
				height:0.5rem;
				color: #ccc;
				margin-left: 1.6rem;
				margin-top:-0.5rem;
			}		
		}	
	}
}
		.menu-wrapper{
			flex:0 0 0.8rem;
			width:1.4rem;
			margin-right:0.1rem;
			background-color: #f3f5f7;
			//border:1px solid blue;
		}
		.foods-wrapper{
			flex:1;
			width:5.8rem;
			//border:1px solid red;
			#circlechange
			{
				margin-top:1rem;
				width: 2rem;
				height: 1rem;
			}
		}
	}

</style>