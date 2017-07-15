<template>
  <div class="ratingselect">
    <div class="type">
      <span class="block all" :class="{'active':selectType===2}" @click="select(2)">
        {{types[2]}} <span class="count">{{selectRatings.length}}</span>
      </span>
      <span class="block positive" :class="{'active':selectType===0}" @click="select(0)">
        {{types[0]}} <span class="count">{{cc}}</span>
      </span>
      <span class="block negative" :class="{'active':selectType===1}" @click="select(1)">
        {{types[1]}} <span class="count">{{dd}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggle">
      <span class="icon iconfont icon-test icon-test"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        timer:{}
      }
    },
    computed:{
      ...mapGetters([
        'ratings',
        'types',
        'selectType',
        'onlyContent',
        'foodratings',
        'selectRatings'
      ]),
      cc(){
        return this.selectRatings.filter( rating => {
          return rating.rateType === 0;
        }).length;
      },
      dd(){
        return this.selectRatings.filter( rating => {
          return rating.rateType === 1;
        }).length;
      }
    },
    methods:{
      select(type,event){
        this.$store.dispatch('select',type);
      },
      toggle(){
           this.$store.dispatch('toggle');
      }
    }
  }
</script>

<style lang="less" scoped>

  .ratingselect{
    background-color: #fff;
    .type{
      padding: 0.18rem 0;
      margin: 0 0.18rem;
     // .border-1px(rgba(7,17,27,0.1));
      .block{
        display: inline-block;
        margin-right:0.08rem;
        margin-top: -2rem;
        padding:0.08rem 0.08rem;
        border-radius:0.01rem;
        font-size:0.12rem;
        color: rgb(77,85,93);
        text-align: center;
        line-height: 0.5rem;
        &.active{
          color: #fff;
        }
        &.all,&.positive{
          width: 1rem;
          height:0.5rem;
          background: rgba(0,160,220,0.2);
          &.active{
            background:#3399cc;
          }
        }
        &.negative{
           width: 1rem;
          height:0.5rem;
          background: rgba(77,85,93,0.2);
          &.active{
            background: pink;
          }
        }
      }
    }
    .switch{
      width:100%;
      height:0.5rem;
     // border: 1px solid #000;
      padding:0.12rem 0.18rem;
      line-height:0.24rem;
      border-bottom:0.01rem solid rgba(7,17,27,0.1);
      color:rgb(147,153,159);
      &.on{
        color:blue;
        height: 0.5rem;
        border-radius: 50%;

        .icon-test{
        color: blue;
        }
      }
      .icon-test{
        display: inline-block;
        vertical-align: top;
        margin-right:0.04rem;
        font-size:0.5rem;
      }
      .text{
        display: inline-block;
        vertical-align: top;
        font-size:0.3rem;
      }
    }
  }
</style>