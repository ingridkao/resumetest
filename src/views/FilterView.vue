<template>
	<header>
		<div>
			<!-- 篩選某一區段的用radio -->
			篩選價錢
			<span>
				<input type="radio" v-model="priceFilter" value="" />
				<label for="">全部</label>	
			</span>
			<span v-for="(priceVal, priceKey) in priceObj" :key="priceKey">
				<input type="radio" v-model="priceFilter" :value="priceKey" />
				<label for="">{{priceVal.min}}-{{priceVal.max}}</label>
			</span>
		</div>
		<div>
			<!-- 篩選多個條件的用checkbox -->
			篩選項目
			<span v-for="category in categoryArray" :key="category">
				<input type="checkbox" v-model="categoryFilter" :value="category" />
				<label for="">{{category}}</label>
			</span>
		</div>
	</header>
	<main class="container">
		<div v-for="item in productData" :key="item.id">
			<h6>{{item.title}}</h6>
			<p>${{item.price}}</p>
			<img :src="item.image" :alt="item.title" style="height: 6rem">
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			//原始資料
			productSource: [],
			//處理後的資料
			productData: [],
			priceObj: {
				'low': { min: 1, max: 50 },
				'middle': { min: 51, max: 100 },
				'hight': { min: 101, max: 1000 }
			},
			categoryArray: [],
			priceFilter: '',
			categoryFilter: []
		}
	},
	watch: {
		priceFilter(){
			this.updateProduct()
		},
		categoryFilter(){
			this.updateProduct()
		}
	},
	methods:{
		getSource(){
			// 如果會重複getSource需要reset
			// this.productSource = []
			// this.categoryArray = []
			this.axios.get("https://fakestoreapi.com/products/").then((res) => {
				this.productSource = res.data
				//如果包含就return false, 不包含就新增push項目
				this.productSource.filter(item => this.categoryArray.includes(item.category) ? false: this.categoryArray.push(item.category))
				this.updateProduct()
			})
		},
		updateProduct(){
			//將條件多的“類別"先篩選一次
			this.productData = this.productSource.filter(item => {
				//沒有類別或符合類別
				return this.categoryFilter.length === 0 || this.categoryFilter.includes(item.category)
			})
			//篩選類別後再看看要不要篩選價錢
			const targetPrice = this.priceObj[this.priceFilter]
			this.productData = this.productData.filter(item => {
				if(targetPrice){
					return item.price >= targetPrice.min && item.price <= targetPrice.max
				}else{
					return item
				}
			})
		}
	},
	created() {
		this.getSource()
	}
}
</script>
<style lang="scss" scoped>
.container{
	display: inline-flex;
	flex-wrap: wrap;
	width: 100vw;
	>div{
		flex-basis: 20%;
	}
}
</style>