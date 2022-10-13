<template>
	<div >
		<nav>
			<router-link :to="{name: 'home'}">首頁</router-link>
		</nav>
		<div v-if="load">Loading...</div>
		<div  v-else class="shopList">
			<div
				v-for="(item, shopIndex) in listData"
				:key="item.id"
				class="shopCard"
			>
				<div class="slideBox">
					<button @click="imgPrev(shopIndex, item.images.length)">L</button>
					<div class="imgContanier">
						<div 
							class="imgBox"
							:style="slideImg(shopIndex)"
						>
							<div
								v-for="(imgItem, imgIndex) in item.images"
								:key="imgIndex"
								:style="{
									backgroundImage: `url(${imgItem})`
								}"
							></div>
						</div>
					</div>
					<button @click="imgNext(shopIndex, item.images.length)">R</button>
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
			slideImgActive: [], //記錄所有小圖順序
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
						//記錄所有小圖順序，預設為0 -> [0,0,0,0, ....]
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
		slideImg(shopIndex){
			// 參數shopIndex是商品的順序index
			// 根據slideImgActive[shopIndex]回傳圖片容器的style
			return {
				marginLeft: `${-10*this.slideImgActive[shopIndex]}rem`
			}
		},
		imgPrev(shopIndex, imglast){
			// 參數shopIndex是商品的順序index, imglast是小圖片的數量
			if(this.slideImgActive[shopIndex] === 0){
				this.slideImgActive[shopIndex] = imglast - 1
			}else{
				this.slideImgActive[shopIndex] -= 1
			}
		},
		imgNext(shopIndex, imglast){
			// 參數shopIndex是商品的順序index, imglast是小圖片的數量
			if(this.slideImgActive[shopIndex] === imglast-1){
				this.slideImgActive[shopIndex] = 0
			}else{
				this.slideImgActive[shopIndex] += 1
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
					height: 100%;
					white-space:nowrap;
					>div{
						display: inline-block;
						width: 10rem;
						height: 100%;
						background-position: center;
						background-repeat: no-repeat;
						background-size: contain;
					}
				}
			}
		}
	}
}
</style>
