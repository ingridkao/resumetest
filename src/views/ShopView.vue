<template>
	<div class="shop">
		<nav v-if="!load">
			<router-link 
				v-for="item in listData"
				:key="item.id"
				:to="{
					name: 'shop',
					params: {
						productID: item.id
					}
				}"
			>
				{{item.title }}
			</router-link>
		</nav>
		<h2>Product: {{$route.params.productID}}</h2>
	</div>
</template>
<script>
import ImageItem from '@/components/ImageItem.vue'
export default {
    components: {
      	ImageItem
    },
    data(){
		return {
			load: false,
			listData: [],
			target: null
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
