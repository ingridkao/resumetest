<template>
	<div >
		<nav>
			<router-link :to="{name: 'home'}">首頁</router-link>
		</nav>
		<div v-if="load">Loading...</div>
		<div  v-else class="shopList">
			<div
				v-for="item in listData"
				:key="item.id"
				class="shopCard"
			>
				<img :src="item.thumbnail" :alt="item.title">
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
							count: 0
						}
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
		img{
			width: 100%;
		}
	}
}
</style>
