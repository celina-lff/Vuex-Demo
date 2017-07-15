import types from '../types.js'
import axios from 'axios'

const state={
	goods:[],
	detailSelectShow:false,
	arr:[],
	food : {},
	foodratings :[], 
	types:['满意','不满意','全部'],
	selectType:2,
	onlyContent:false,
	selectRatings:[]
}

const getters={
	goods(state){
		return state.goods;
	},
	detailSelectShow(state){
		return state.detailSelectShow;
	},
	foodratings(state){
		return state.foodratings;
	},
	food(state){
		return state.food;
	},
	types(state){
		return state.types;
	},
	selectType(state){
		return state.selectType;
	},
	onlyContent(state){
		return state.onlyContent;
	},
	arr(state){
		return state.arr;
	},
	selectRatings(state){
		return state.selectRatings;
	}

}

const actions={
	getGoods({commit,state}){
		axios.get('/api/goods').then(resp => {
			if(resp.data.errno==0){
				commit(types.GET_GOODS,resp.data.data);
			}
		});
	},
	showDetailSelect({commit}){
		commit(types.SHOW_DETAILSELECT);
	},
	hideDetailSelect({commit}){
		commit(types.HIDE_DETAILSELECT);
	},
	changeTypes:({commit,state},_types)=>{
		commit(types.CHANGE_TYPES,_types);
	},
	// 这里是goods页面的点击事件，然后转到mutations
	foosshow:({commit,state},food) =>{
		commit(types.FOOD_SHOW,food);
	},
	select:({commit,state},type)=>{
		commit(types.SELECT,type);
	},
	toggle:({commit}) => {
		commit(types.TOGGLE);
	},
	getRatings({commit,state}){
		return new Promise((resolve,reject)=>{
			axios.get('/api/ratings').then(resp => {
				if(resp.data.errno===0){
					// console.log(resp.data.data);
					commit(types.GET_RATINGS,resp.data.data);
					resolve();
				}
			});
		});
	},
	foodRatings({commit,state},ratings){
		commit('foodRatings',ratings);
	}
}

const mutations={
	[types.GET_GOODS](state,data){
		state.goods=data;
	},
	// 这里就是进行具体操作,一方面把传递过来的当前商品对象赋值给state里面的food
	// 另一方面把对象里面的评价赋值给state里面的foodratings和selectRatings;
	// 一个是用作点击切换评论筛选 一个是显示点击切换评论的条数
		[types.FOOD_SHOW](state,data){
		state.food = data;
		state.foodratings = data.ratings;
		state.selectRatings = data.ratings;
	},
	[types.SHOW_DETAILSELECT](state){
		state.detailSelectShow=true;
	},
	[types.HIDE_DETAILSELECT](state){
		state.detailSelectShow=false;
	},
	[types.SELECT](state,type){
		state.selectType=type;
		// alert(type);
		state.foodratings = state.arr.filter(rating=>{
			if(state.selectType===2)
			{
				return true;
			}
			else
			{
				
				return rating.rateType===state.selectType;
			}
			// console.log(state.selectRatings);
		})
	},
	[types.TOGGLE](state){
		state.onlyContent = !state.onlyContent;
		state.foodratings = state.arr.filter( rating => {
	
			if( state.onlyContent && !rating.text ){
				return false;
			}else if( state.selectType === 2 ){
				return true;
			}else{
				return rating.rateType === state.selectType ;
			}
		})	
	},
	[types.CHANGE_TYPES](state,_types)
	{
		state.types=_types;
		// selectRatings=state.arr;
	},
	[types.GET_RATINGS](state,data)
	{
		state.arr=data;
	},
	foodRatings(state,ratings){
		state.arr=ratings;
		state.selectRatings=ratings;
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}