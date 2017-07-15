<template>
	<div class="star">
	<span v-for='itemClass in itemlist' class="cc" :class='itemClass'></span>
		
	</div>
</template>
<script>
	const length=5;
	const START_ON='on';
	const START_HALF='half';
	const START_OFF='off';

	export default{
		props:['score'],
		computed:{
			itemlist(){
				let result=[];
				let integer =Math.floor(this.score);
				let litter=this.score-integer;
				for(let i=0;i<integer;i++)
				{
					result.push(START_ON);
				}
				if(litter>0.5)
				{
					result.push(START_HALF);
				}
				while (result.length<length) {
					result.push(START_OFF);
				}
				return result;
			}
		}
	}
</script>
<style lang="less" scoped>
	.star{
		.cc{
			display: inline-block;
			width: 0.4rem;
			height: 0.4rem;
			&.on{
				background-image: url(star_on.png);
				background-size: 0.4rem 0.4rem;
				background-repeat: no-repeat;
			}
			&.off{
				background-image: url(star_off.png);
				background-size: 0.4rem 0.4rem;
				background-repeat: no-repeat;

			}
			&.half
			{
				background-image: url(star_half.png);
				background-size: 0.4rem 0.4rem;
				background-repeat: no-repeat;
			}
		}
	}



</style>