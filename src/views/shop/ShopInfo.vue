<template>
	<div class="shopinfo">
		<nav>
			<router-link :to="{name: 'home'}">首頁</router-link>
			/<router-link :to="{name: 'shopList'}">商品列表</router-link>
			/<span>{{infoTitle}}</span>
		</nav>
		<!-- <h2>Product: {{$route.params.productID}}</h2> -->
		<div v-if="load">
			Loading...
		</div>
		<div v-else-if="!load && infoData">
			{{infoData}}
		</div>
		<div v-else>
			NoData
		</div>
	</div>
</template>
<script>
export default {
    data(){
		return {
			load: false,
			infoData: null,
		}
    },
	computed: {
		infoTitle(){
			return this.infoData? this.infoData.title: ''
		}
	},
    methods:{
        getInfoData(){
            this.load= true
			//限制5筆：limit=5
			const target = this.$route.params.productID
            this.axios.get(`https://dummyjson.com/products/${target}`)
            .then((response) => {
				if(response && response.data){
					this.infoData = response.data
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
    created(){
        this.getInfoData()  
    }
}
</script>
