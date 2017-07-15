import types from '../types.js'
import axios from 'axios'

const state={
	foodShow:false,
	food:{},
	ratings:[], //所有评价
	types: ['满意','不满意','全部'],  //0表示满意，1表示不满意，2表示全部
	selectType:2, //选择类型
	onlyContent:false, //只看有内容的吗
	selectRatings:[] //选择显示的评价
}

const getters={
	foodShow(state){
		return state.foodShow;
	},
	food(state){
		return state.food;
	},
	ratings(state){
		return state.ratings;
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
	selectRatings(state){
		return state.selectRatings;
	}
}

const actions={
/*	showFood:({commit,state},food) => {
		commit(types.SHOW_FOOD,food);
	},*/

	changeTypes:({commit,state},_types) =>{
		commit(types.CHANGE_TYPES,_types);
	},
	hideFood:({commit}) => {
		commit(types.HIDE_FOOD);
	},
	select:({commit,state},{type}) => {
		commit( types.SELECT,{type});
	},
	toggle:({commit}) => {
		commit(types.TOGGLE);
	},
	getRatings:({commit,state}) => {
		//返回一个Promise对象，便于在异步操作完成后进行处理
		//return new Promise((resolve,reject) => {
			axios.get('/api/ratings').then((resp) => {
		      if(resp.data.errno===0){
		      	// console.log(resp.data.data);
		      	commit(types.GET_RATINGS,resp.data.data);
		      	resolve();
		      }
		    });
		//});
	}
}

const mutations={

	[types.SHOW_FOOD](state,food){
		state.foodShow=true;
		state.food=food; //需要注意代码间的顺序，如必须等获取到food后才能进行处理操作
		state.ratings=food.ratings;
	},
	[types.HIDE_FOOD](state){
		state.foodShow=false;
	},
	[types.SELECT](state,{type}){
		state.selectType = type;

		state.selectRatings = state.ratings.filter( rating => {
			if( state.selectType === 2 ){
				return true;
			}else{
				return rating.rateType === state.selectType ;
			}
		})
	},
	[types.TOGGLE](state){
		state.onlyContent = !state.onlyContent;
		state.selectRatings = state.ratings.filter( rating => {
	
			if( state.onlyContent && !rating.text ){
				return false;
			}else if( state.selectType === 2 ){
				return true;
			}else{
				return rating.rateType === state.selectType ;
			}
		})	
	},
	[types.CHANGE_TYPES](state,_types){
		state.types = _types;
		state.selectRatings = state.ratings;
	},
	[types.GET_RATINGS](state,data){
		state.ratings=data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}