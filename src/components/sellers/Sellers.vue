<template>
<!-- 第一部分 -->
	<div class="seller" ref = 'sellerfood'>
	<div class="">
		 <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
         <span ><i ref="dochecked" class="icon iconfont icon-xin"  @click='lookContent' ></i></span> 
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text1">({{seller.ratingCount}})</span>
          <span class="text2">月售{{seller.sellCount}}单</span>
          <span class="text3" ref="alltext">{{msg}}</span>
        </div>
<!-- 第二部分 -->
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite">
 
        </div>
      </div>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>

       <ul v-if="seller.supports" class="supports">
       	 <div id="leftImg">
        <img  id="img1" src="../img/decrease_4@2x.png"><br><br><br>
        <img id="img2" src="../img/discount_4@2x.png"><br><br><br>
        <img id="img3"  src="../img/discount_4@2x.png"><br><br><br>
        <img id="img4" src="../img/special_4@2x.png"><br><br><br>
        <img id="img5" src="../img/special_4@2x.png">
        </div>
          <li class="support-item" v-for="(item, index) in seller.supports"><hr>

            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul> 
 </div>
  <div class="pics">
  <div class="bg">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="120">
            </li>
          </ul>  
        </div></div>
      </div>
      	<div class="info">
        <div class="title "><div class="bg">商家信息</div></div>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
 </div>
	</div>
   
 </div>

</template>
<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import star from '../star/star.vue'
	
	export default {
		created(){
			this.$store.dispatch('getSeller');
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
	
		data() {
			return {
				 timer:{},
       			 count:0,
       			 msg:'收藏'
			}
		},
		components:{
			star
		},

		computed :{ 
			...mapGetters([
			'seller'
			])
		},
		watch:{
			seller()
				{
				// console.log(111);
				this.$nextTick(()=>{
					// console.log(222);
					setTimeout( () => {
						this._initsellerfoods();
					},100)

				})
			}

		},
		methods:{
				lookContent()
			{
			  this.count++;
			 
			  if(this.count%2!=0)
			  {
			      this.$refs.dochecked.style.color='red';
			      this.$refs.alltext.innerHTML='已收藏';
			      this.$refs.alltext.style.color='red';
			  }
				if(this.count%2==0)
					  {
					    this.$refs.dochecked.style.color='#ccc';
					    this.$refs.alltext.innerHTML='收藏';
					    this.$refs.alltext.style.color='#ccc';

					  }
				},
			_initsellerfoods()
			{
				this.foodScroll = new BScroll( this.$refs.sellerfood,{
				 click : true
				});
				let picWidth = 120;
				let margin = 6;
				let width = (picWidth + margin) * (this.seller.pics.length) - margin;
				this.$refs.picList.style.width = width + 'px';
				this.picScroll = new BScroll( this.$refs.picWrapper , {
						scrollX : true ,
						eventPassthrough: 'vertical'
				})
			}
		

}

}
</script>
<style lang="less" scoped>
	.seller
	{
		width:100%;
		height:12rem;
		border: 1px solid #ccc;
		overflow: hidden;
		background-color: #eee;
		.seller-content
		{
		width:100%;
		/*  height:1.5rem; */
		margin: 0 auto;
		border-bottom: 1px solid #ccc;
		background-color: #eee;
		.overview
		{
			width: 100%;
			height:1.2rem;
			//border: 1px solid red;
			background-color: #fff;
			.title
			{
		     font-size:0.28rem;
			color:#000;
			line-height: 0.28rem;
			width: 100%;
			height:1rem;
			line-height:1rem;
			//border: 1px solid #ccc;
			background-color: #fff;
			}
			.icon
			{
				position: absolute;
				margin-left: 6.1rem;
				margin-top: -0.4rem;
				z-index: 999;
				font-size: 0.5rem;
				color:#ccc;
			}

			.desc
			{
				font-size: 0.2rem;
				color:rgb(77, 85,93);
				line-height: 0.36rem;
				background-color: #fff;
				.text1
				{
					font-size: 0.2rem;
					color: rgb(77,85,93);
					line-height: 0.36rem;
					margin-left:2.4rem;
					position: absolute;
					margin-top:-0.4rem;
				}
				.text2
				{
					font-size: 0.2rem;
					color: rgb(77,85,93);
					line-height: 0.36rem;
					margin-left:3rem;
					position: absolute;
					margin-top:-0.4rem;

				}
				.text3
				{
					width: 0.8rem;
					height: 0.5rem;
					font-size: 0.2rem;
					color: rgb(77,85,93);
					line-height: 0.36rem;
					margin-left:6rem;
					position: absolute;
					margin-top:-0.4rem;
				}
			}

		}

		}
		.remark
		{
			margin-top: 0.2rem;
			width: 100%;
			height: 1.5rem;
			//border: 1px solid red;
			background-color: #fff;
			.block
			{
			width:32.8%;
			height:1.4rem; 
			float: left;
			//border: 1px solid red;
			h2
			{
			font-size: 0.2rem;
			text-align: center;
			margin-top: 0.2rem;
			color: rgb(147, 153,159);
			line-height: 0.2rem;

			}
			.content
			{
				font-size: 0.2rem;
				font-weight: 200;
				color: rgb(7, 17, 27);
				line-height: 0.48rem;
				margin-top: 0.3rem;
				text-align: center;
				.stress
				{
					font-size: 0.48rem;
				}
			  }
			}
		}
		.bulletin
		{
			width: 100%;
			height:10.5rem;
			margin-top:2.5rem;
			//border: 1px solid red;
			background-color: #eee;
			.title
			{
			width: 100%;
			height:1rem;
			line-height: 1rem;
			//border: 1px solid #ff0;
			font-size: 0.28rem;
			background-color: #fff;
			}
			.content-wrapper
			{
				width: 100%;
				height:2.5rem;
				//border: 1px solid red;
				font-size: 0.24rem;
				color: rgb(240,20,20);
				line-height: 0.48rem;
				background-color: #fff;
			}
			.supports
			{
				width: 100%;
				height:5.5rem;
				margin-top:-0.15rem;
				//border: 1px solid #f0f;
				background-color: #fff;
				font-size:0.24rem;
				.support-item
				{
				width:90%;
				height:1rem;
				margin: 0 auto;
				display: block;
				//border: 1px solid blue;
				.text{
					font-weight: 200;
					color:rgb(7, 17, 27);
					line-height: 0.8rem;
					text-align: center;
					margin-left:1rem;
					}

				}


			}
			#leftImg
			{
			width:0.8rem;
			height:5rem;
			position: absolute;
			margin-top: 0.2rem;
			margin-left:0.5rem;	
			//border: 0.01rem solid red;
			}


		}

		.pics
		{
			width: 100%;	
			height:4rem;
			margin:0rem;
			font-size:0.28rem;	
			margin-top:-1rem;
			background-color: #eee;
			//border: 1px solid green;
		.bg{
			height:3.2rem;
			//border: 1px solid red;
			background-color: #fff;

		 .title{
		 	 margin-bottom:0.12rem;
      		line-height:0.14rem;
      		color:rgb(7, 17, 27);
      		font-size:0.28rem;	
      		position: absolute;
      		margin-top: 0.2rem;
      		margin-left:0.3rem;

		 }
		 .pic-wrapper
		 {
		  width :100%;
      	overflow:hidden;
     	 white-space:nowrap;
     	 //border: 1px solid red;
     	 .pic-list
     	 {
     	  font-size:0;
     	  margin-top: 0.3rem;
     	  .pic-item
     	  {
     	  display:inline-block;;
          margin-right:0.2rem;
          margin-top: 0.3rem;
          width:2.4rem;
          height:1.8rem;
          img
          {
           width:2.4rem;
          height:1.8rem;
          padding:0.18rem;
          }
     	  }	
     	 }
     }
	}
	}
		.info
		{
		width: 100%;
		padding: 18px 18px 0 18px;
    	color:rgb(7, 17, 27);
    	font-size:0.28rem;
    	margin-top: -0.2rem;	
    	height:6rem;
    	background-color: #fff;
    	//border: 1px solid green;	
    	.title
    	{
    	  padding-bottom:0.12rem;
      		line-height:0.5rem;
      		width:6.8rem;
      		border-bottom: 1px solid #ccc;
      		height: 0.8rem;
      		font-size:0.28rem;
      		border-bottom: 0.01rem solid #ccc;	

    	}
    	.info-item
    	{
    	padding: 0.16rem 0.12rem;
    	width:6.5rem;
    	height: 0.8rem;
    	color:rgb(7, 17, 27);
      	line-height:0.8rem;
     	font-size:0.24rem;
     	font-weight: 200;
	border-bottom: 0.01rem solid #ccc;		

    	}
    
		}

	}
		
		
	

</style>