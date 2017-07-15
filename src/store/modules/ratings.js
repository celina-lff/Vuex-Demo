import types from '../types.js'
import axios from 'axios'
const state={
// ratings:[],
// seller:{},
arr:[]
}

const getters={
	// ratings(state){
	// 	return state.ratings;
	// },
	arr(state){
		return state.arr;
	}

}

const actions={
	// getRatings({commit,state}){
	// 	axios.get('/api/ratings').then(resp => {
	// 		if(resp.data.errno==0){
	// 			commit(types.GET_RATINGS,resp.data.data);
	// 		}
	// 	});
	// },
	getArr({commit,state}){
		return new Promise((resolve,reject) => {
			axios.get('/api/ratings').then(resp => {
				if(resp.data.errno==0){
					// console.log(resp.data.data);
					commit(types.GET_ARR,resp.data.data);
					resolve();
				}
			});
		});	
	}

}
const mutations=
{
	// [types.GET_RATINGS](state,data){
	// 	state.ratings=data;
	// },	
	[types.GET_ARR](state,data){
		state.arr=data;
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}