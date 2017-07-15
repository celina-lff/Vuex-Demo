<template>
   <div class="ratings" >
     <div class="">
        <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
          <div id="box">
            <div class="score-wrapper1">
              <span class="title">服务态度</span>
             <star id="star"  :size="36" :score="seller.serviceScore"></star> 
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper2">
              <span class="title">商品评分</span>
              <star id="star":size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
            </div>
          </div>
        </div>
      <div class="background"></div>
      <div class="comment">
        <div class="com-in">
        <div class="all"  ref="alltext"   @click="doAll()">全部<span  v-show='allcount>0'>({{allcount}})</span></div>
        <div class="like" ref="liketext"  @click="doLike()">满意 <span  v-show='likecount>0'>({{likecount}})</span></div>
        <div class="dislike" ref="disliketext" @click="doDislike()">不满意 <span v-show='dislikecunt>0'>({{dislikecunt}})</span></div> 
        </div>
      </div>
      <div class="comment-content">
        <span ><i  ref="dochecked" class="icon iconfont icon-test icon-test"  @click="lookContent($event)"> </i> </span>
          </i><span class="text" ref="alltext">只看有内容的评价</span>
      </div>
      <div  class="menu-wrapper" ref ='menufood'>
        <ul  class="wrapper">
         <li v-for="rating in ratings" class="rating-item" ><!-- v-show="Show(rating.rateType, rating.text)" -->
                <div class="avatar">
                  <img :src="rating.avatar" alt="" width="28" height="28">
                </div>

                <div class="content">
                  <h1 class="name">{{rating.username}} <p class="date"> {{rating.rateTime | formatDate}}</p></h1>
                    <div class="star-wrapper">
                    <star :size="24" :score="rating.score"></star><span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达
                    </span>
                  </div><br>
                  <p class="text">{{rating.text}}</p><br>
                    <div class="recommend" >
                      <span v-if="rating.rateType==1" ><i class="icon iconfont icon-dianzan"></i></span>
                      <span v-if="rating.rateType==0" ><i class="icon iconfont icon-dianzan1"></i></span>
                      <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
                    </div>
                </div>
              </li>
              <hr>
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
    //import split from '../split/split.vue'
  const ALL = 2;
  export default
   {
    data() {
      return {
        // ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        ratings:[],
        timer:{},
        count:0,
        //lookContent:false,
        allcount:0,
        likecount:0,
        dislikecunt:0
      }
    },
    created(){
      // this.$store.dispatch('getRatings');
      this.$store.dispatch('getRatings').then(() => {
         this.$nextTick( () => {
          this._initfoods();  
           for(var i=0;i<this.arr.length;i++)
            {
              this.ratings.push(this.arr[i]);
            }
        })
       });
    }, 
    components:{
      star
    },
     filters: 
      {
        formatDate(time) 
        {
          let date = new Date(time);
          return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        }
      },
    computed : 
    mapGetters([
      // 'ratings',
      'seller',
      'arr'
    ]),
     watch:{
      ratings()
      {
       // console.log(111);
        this.$nextTick(()=>{
         // console.log(222);
          setTimeout(() => {
             this._initfoods();
           },200)
        
        })
      }
    },
      methods:
     {
      _initfoods()
      {
        // if(!this.foodScroll){
        //   this.foodScroll.fresh();
        // }else{
          this.foodScroll = new BScroll( this.$refs.menufood,{
            click : true
          })
        // }
        
      },
//全部按钮事件
doAll()
{
  //先将ratings.length清空，将arr中的数据存数到ratings
  this.ratings.length=0;
  for(var i=0;i<this.arr.length;i++)
  {
    this.ratings.push(this.arr[i]);

  }
  this.allcount=this.ratings.length;
   this.$refs.dochecked.style.backgroundColor='#3399cc';
this.$refs.alltext.style.color="#3399cc";
},
//满意按钮
doLike()
{
 this.ratings.length=0;
  for(var i=0;i<this.arr.length;i++)
  {
    if(this.arr[i].rateType==0)

    {
      this.ratings.push(this.arr[i]); 
    }
   
  } 
   this.likecount=this.ratings.length;
  this.$refs.liketext.style.backgroundColor="lightgreen"; 
},
doDislike()
{  console.log(333);
   this.ratings.length=0;
  for(var i=0;i<this.arr.length;i++)
  {
    if(this.arr[i].rateType==1)
    {
      this.ratings.push(this.arr[i]); 
    }
   
  }  
   this.dislikecunt=this.ratings.length;
  this.$refs.disliketext.style.backgroundColor="pink";
},
lookContent(e){
clearTimeout(this.timer);
this.timer=setTimeout(()=>{
  this.count++;
  if(this.count%2!=0)
  {
    this.ratings.length=0;
      for(var i=0;i<this.arr.length;i++)
      {
         this.ratings.push(this.arr[i]); 
      }
      this.$refs.dochecked.style.backgroundColor='#3399cc';
      this.$refs.alltext.innerHTML='查看全部内容';
       this.$refs.alltext.style.color='#3399cc';
  }
 if(this.count%2==0)
  {
     this.ratings.length=0;
      for(var j=0;j<this.arr.length;j++)
      {
        if(this.arr[j].text)
        {
         this.ratings.push(this.arr[j]);
        }
      }
     this.$refs.dochecked.style.backgroundColor='#ccc';
      this.$refs.alltext.innerHTML='只看有内容的评价';
       this.$refs.alltext.style.color='#ccc';

  }

},0)



}

}
}
   
</script>
<style  lang="less" scoped>
.ratings
  {
    width: 100%;
    height:10rem;
    background-color: #fff;
    overflow: hidden; 
    .ratings-content
    {
      width: 100%;
      height:2.75rem;
      background: #fff;
      font-size:0.3rem;
      //border: 1px solid red;
 .overview
 {
  width:100%;
  height:2.75rem;
 
 .overview-left
 {
  width:2.75rem;
  height:2.75rem;
  //border: 1px solid #000;
   text-align: center;

  .score
 {  
  margin-top:0.4rem;
   font-size:0.48rem;
   color:rgb(255,153,0);
   line-height: 0.56rem;
   
 }
 .title
 {
  font-size: 0.24rem;
  color:rgb(7,17,27);
  line-height: 0.5rem;
 }
 .rank
 {
  font-size: 0.20rem;
  color:#aaa;
  line-height: 0.4rem;

 } 
}
.overview-right
{
   width:4.6rem;
   height:2.7rem;
  //border: 1px solid #000;
   text-align: center; 
  margin-top: -2.75rem;
 margin-left:2.85rem; 
  #box
{
 width:4.4rem;
height:2rem;
margin-top:0.2rem;
border-left:1px solid #eee;

}

  .score-wrapper1
  {
   width:4.2rem;
   height:0.5rem;
   line-height:0.5rem; 
  //border: 1px solid blue;
   margin-top: 0.2rem;
   margin-left: 0.2rem;
   text-align: center;
   .title
   {
    font-size: 0.24rem;
    color:rgb(7,17,27);
    line-height: 0.36rem;
    margin-left: -2.5rem;
   }
   #star
   {
    margin-left:0.8rem;
    margin-top:-0.5rem;
   }
    .score
   {
    font-size: 0.24rem;
    color:rgb(255,153,0);
    line-height: 0.36rem;
   // border: 1px solid #000;
    float:right;
    margin-right: 0.2rem;
    margin-top: -0.5rem;
   }
  
  }
 .score-wrapper2
  {
   width:4.2rem;
   height:0.5rem;
   line-height:0.5rem; 
  // border: 1px solid blue;
   margin-top: 0.2rem;
   margin-left: 0.2rem;
   text-align: center;
   .title
   {
    font-size: 0.24rem;
    color:rgb(7,17,27);
    line-height: 0.36rem;
    margin-left: -2.5rem;
   }
   #star
   {
    margin-left:0.8rem;
    margin-top:-0.5rem;
   }
   .score
   {
    font-size: 0.24rem;
    color:rgb(255,153,0);
    line-height: 0.36rem;
    float:right;
    margin-right: 0.2rem;
    margin-top: -0.5rem;
   }
  }
.delivery-wrapper
{
  .title
  {
     font-size: 0.24rem;
    color:rgb(7,17,27);
    line-height: 0.36rem;
    margin-left: -1.6rem; 
  }
.delivery
{
  font-size: 0.24rem;
  color:rgb(147,153,159);
  line-height: 0.36rem;
}
   width:4.2rem;
   height:0.5rem;
  // border: 1px solid blue;
   margin-top: 0.2rem;
   margin-left: 0.2rem;
}

}
} 
}
} 
.background
{
  width: 100%;
  height:0.6rem;
  background-color: #eee;
}
.comment
{
  width: 100%;
  height:1.5rem;
  line-height: 1.5rem;
 // border: 1px solid blue;
  .com-in
  {
  width: 90%;
  height:1rem;
  line-height: 1rem;
  margin-top:0.5rem;
  margin-left:0.5rem;
  border-bottom:0.01rem solid #ccc;
  .all
  {
    width: 1.2rem;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border-radius:0.05rem;
    font-size: 0.1rem;
    background-color:#3399cc;
  }
  .like
  {
   width: 1.2rem;
    height:0.8rem;
    line-height: 0.8rem;
    font-size: 0.2rem; 
    text-align: center;
    border-radius:0.05rem;
    background-color:lightblue;
    margin-left:1.5rem;
    margin-top:-0.8rem;
  }
  .dislike
  {
    width: 1.2rem;
    height:0.8rem;
    line-height: 0.8rem; 
    font-size: 0.2rem; 
    text-align: center;
    border-radius:0.05rem;
    background-color:#ccc;
    margin-left:3rem;
    margin-top:-0.8rem;
  }
  }
} 
.comment-content
{
   width: 100%;
  height:1rem;
  color:#aaa;
  line-height:0.8rem;
  font-size: 0.3rem;
  text-align:left;
  .icon-test
  {
    color:#fff;
    background-color: #ccc;
    font-size:0.5rem;
    border-radius: 50%;
    margin-left: 0.5rem;
    margin-top: 0.3rem;
  }

  //border: 1px solid red;
}
.menu-wrapper
{
  flex:0 0 0.8rem;
  width: 100%;
  height:8rem;
  overflow: hidden;
//border: 1px solid #000;
  .rating-item
  {
    width: 100%;
    height:2.2rem;
    //border: 1px solid #000; 
    font-size: 0.15rem;
    .avatar
    {
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      img{
        width: 0.56rem;
        height: 0.56rem;
      }
      
    }
    .content
      {
        width:6rem;
        height:1.5rem;
       // border: 1px solid blue;
        margin-left:1rem;
        margin-top:-0.6rem;
        
        .name{
          font-size: 0.2rem;
          color:rgb(7,17,27);
          line-height: 0.24rem;
          //border: 1px solid red;
          .date
          {
            float: right;
          }

        }
        .text
        {
          line-height:0.24rem;
          color:#000;

        }
        .star-wrapper
        {
          width:6rem;
          height:0.5rem;
         // border: 1px solid #000;
          .delivery
        {
            position: absolute;
           //border: 1px solid #000;
            margin-left:2.2rem;
            font-size: 0.2rem;
            font-weight: 200;
            margin-top: -0.3rem;
            color:rgb(147,153,159);

        }
      
        }
        .text
        {
          font-size: 0.24rem;
            line-height: 0.36rem;
        } 
         .recommend
         {
          color:#aaa;
          position: absolute;
         // border: 1px solid red;
          font-size: 0.18rem;
          line-height: 0.32rem;
          .icon-dianzan1
          {

            color:#3399cc;
          }
          .item
          {
          border: 1px solid #aaa;
           margin-left: 0.1rem;

          }

         }
       
        
      }
  }

}

</style>