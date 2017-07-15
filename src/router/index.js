import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'
import Ratings from '../components/ratings/Ratings.vue'
import Sellers from '../components/sellers/Sellers.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/goods',
  		component:Goods
  	},
  	  	{
  		path:'/ratings',
  		component:Ratings
  	},
       {
      path:'/sellers',
      component:Sellers
    }
  ],
  linkActiveClass:'active'
})
