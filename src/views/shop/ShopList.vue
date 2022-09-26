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
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data(){
		return {
			load: false,
			listData: []
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
				}
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() =>{
                this.load = false
            })
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
