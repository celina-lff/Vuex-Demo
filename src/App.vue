<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>

    <router-view></router-view>
    <!-- <div id="footer"> <v-Cartcontrol></v-Cartcontrol></div> -->
   
  </div>
</template>
<script>
  import Header from './components/header/Header.vue'
  import Cartcontrol from './components/Cartcontrol/Cartcontrol.vue'
  export default {
    components:{
      'v-header':Header,
     'v-Cartcontrol':Cartcontrol
    }
  }
</script>

<style lang="less" scoped>
  #app .tab
  {
    display: flex;
    font-size:0.2rem;
    width:100%;
    height:0.6rem;
    line-height:0.6rem;
    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
    .tab-item{
      flex:1;
      width: 0.3rem;
      //border: 1px solid red;
      text-align: center;
      & > a{
        font-size:0.14rem;
        display: block;
        &.active{
          color:#ff7300;
        }
      }
    }
  }
  #footer{
    position: fixed;
    position: absolute;
    bottom: 0;
    width: 100%;
    height:0.5rem;
    background-color:#333;
  }
</style>
