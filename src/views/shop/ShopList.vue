<template>
	<div >
		<nav>
			<router-link :to="{name: 'home'}">首頁</router-link>
		</nav>
		<div v-if="load">Loading...</div>
		<div  v-else class="shopList">
			<div
				v-for="(item, index) in listData"
				:key="item.id"
				class="shopCard"
			>
				<!-- <img :src="item.thumbnail" :alt="item.title"> -->
				<div class="slideBox">
					<button @click="imgPrev(index, item.images.length)">L</button>
					<div class="imgContanier">
						<div 
							class="imgBox"
							:style="slideImg(index)"
						>
							<img 
								v-for="(imgItem, imgIndex) in item.images"
								:key="imgIndex"
								:src="imgItem" 
								:alt="`${item.title}_${imgIndex}`"
							/>
						</div>
					</div>
					<button @click="imgNext(index, item.images.length)">R</button>
				</div>
				<router-link 
					:to="{
						name: 'shopInfo',
						params: {
							productID: item.id
						}
					}"
				>
					{{item.title }}
				</router-link>
				<p>{{item.description}}</p>
				<p>${{item.price}}</p>
				<div>
					<button @click="add(item.id)"> + </button>
					<input type="number" v-model="cart[item.id]['count']">
					<button @click="reduse(item.id)"> - </button>
				</div>
			</div>
		</div>

		<aside>
			<h6>購物車</h6>
			<ul>
				<li v-for="(cartItem, cartKey) in displayCart" :key="cartKey">
					{{cartItem.name}}
					${{cartItem.price}}
					X{{cartItem.count}}
				</li>
			</ul>
		</aside>
	</div>
</template>
<script>
export default {
    data(){
		return {
			load: false,
			listData: [],
			slideImgActive: [],
			cart: {}
		}
    },
	computed: {
		displayCart(){
			return Object.values(this.cart).filter(item => item.count > 0)
		}
	},
    methods:{
        getListData(){
            this.load= true
			//限制5筆：limit=5
            this.axios.get('https://dummyjson.com/products?limit=5')
            .then((response) => {
				if(response.data && response.data.products){
					this.listData = response.data.products
					this.listData.map(item => {
						this.cart[item.id] = {
							name: item.title,
							price: item.price,
							count: 0,
							slide: 0
						}
						this.slideImgActive.push(0)
					})
				}
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() =>{
                this.load = false
            })
        },
        add(id){
			this.cart[id]['count'] += 1
        },
        reduse(id){
			if(this.cart[id]['count'] === 0)return
			this.cart[id]['count'] -= 1
        },
		slideImg(index){
			return {
				marginLeft: `${-10*this.slideImgActive[index]}rem`
			}
		},
		imgPrev(index, last){
			if(this.slideImgActive[index] === 0){
				this.slideImgActive[index] = last - 1
			}else{
				this.slideImgActive[index] -= 1
			}
		},
		imgNext(index, last){
			if(this.slideImgActive[index] === last-1){
				this.slideImgActive[index] = 0
			}else{
				this.slideImgActive[index] += 1
			}
		}
    },
    mounted(){
        this.getListData()  
    }
}
</script>

<style lang="scss" scoped>
.shopList{
	display: inline-flex;
	.shopCard{
		width: 30%;
		margin-right: 1rem;
		.slideBox{
			position: relative;
			display: inline-flex;
			width: 13rem;
			height: 8rem;
			overflow: hidden;
			button{
				width: 1.5rem;
				height: 100%;
				&:last-child{position: absolute;right:0;}
			}
			.imgContanier{
				overflow: hidden;
				width: 100%;
				.imgBox{
					margin-left: 1.5rem;
					width: 10rem;
					height: 100%;
					white-space:nowrap;
					img{
						width: 10rem;
					}
				}
			}
		}
		// img{
		// 	width: 100%;
		// }
	}
}
</style>
