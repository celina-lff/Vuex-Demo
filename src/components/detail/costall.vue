<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail" v-show="detailShowAll"> 	
			<div @click.stop.prevent="hideDetailAll" class="close">X</div>
		</div>
	</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import 'animate.css/animate.css'

export default {
		components:
		{
			//star
		},
		computed:{
			...mapGetters([
				'detailShowAll',
				//'detailShow',
				'seller'
			])
		},
		methods:{
			hideDetailAll()
			{
				console.log(111);
				this.$store.dispatch('hideDetailAll');
			}
		}
	}

</script>
<style lang="less" scoped>
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 666;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(7,17,27,0.8);
		color:#fff;
		.close
		{
			position: absolute;
			top:0.8rem;
			left:45%;
			border:0.04rem solid #ccc;
			border-radius: 50%;
			width: 0.5rem;
			height: 0.5rem;
			font-size:0.5rem; 
			line-height: 0.5rem;
			text-align: center;
		}
	}	


</style>