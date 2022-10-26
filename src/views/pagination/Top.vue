<template>
	<header>
		<div>
			分頁
			<ul>
				<li v-if="currentPage !== 1" @click="triggerPage(currentPage-1)">prev</li>
				<li v-if="showFirst" @click="triggerPage(1)">首頁1</li>
				<li 
					v-for="page in pagination" 
					:key="page" 
					:class="{active: page === currentPage}"
					@click="triggerPage(page)"
				>
					{{page}}
				</li>
				<li v-if="currentPage < totalPages - 1" @click="triggerPage(totalPages)">末頁{{totalPages}}</li>
				<li v-if="currentPage !== totalPages" @click="triggerPage(currentPage+1)">next</li>
			</ul>
		</div>
	</header>
	<main class="container">
		<div v-for="item in sourceData" :key="item.id">
			<h6>{{item.first_name}} {{item.last_name}}</h6>
			<p>{{item.email}}</p>
			<img :src="item.avatar" :alt="item.first_name" style="height: 6rem">
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			//原始資料:這筆資料都是API取得不用前端處理filter等
			sourceData: [],
			//目前分頁
			currentPage: 1,
			//分頁一頁幾筆
			perPage: 4,
			//分頁呈現
			pagination: [],
			//總頁數
			totalPages: 4,
			//頁數顯示幾格
			pageShow: 4
		}
	}, 
	computed: {
		pageShowCount(){
			if(this.totalPages <= this.pageShow){
				return this.totalPages - 1
			}else{
				return this.pageShow - 1
			}
		},
		showFirst(){
			if(this.totalPages <= this.pageShow){
				return false
			}else{
				return this.currentPage > this.pageShowCount
			}
		}
	},
	methods:{
		getSource(){
			// 如果會重複getSource需要reset
			this.sourceData = []
			this.axios.get("https://reqres.in/api/users", {
				params: {
                    page: this.currentPage,
                    per_page: this.perPage
                }
			}).then((res) => {
				if(!res.data) return
				const {data, total, total_pages } = res.data
				this.sourceData = data

				//大部分後端給的不會有total_pages，要用total算
				this.totalPages = total_pages
				this.updatePage()
			})
		},
		triggerPage(page){
			this.currentPage = page
			// this.getSource()
			this.updatePage()
		},
		updatePage(){
			let start = 1
            let end = start + this.pageShowCount
			if(this.currentPage > this.pageShowCount){
				start = this.currentPage - 1
				end = start + this.pageShowCount
			}
			if(this.totalPages > this.pageShowCount && this.currentPage >= this.totalPages - 1){
				end = this.totalPages
				start = end - this.pageShowCount
			}
			this.pagination = []
            for (let index = start; index <= end; index++) {
                this.pagination.push(index)  
            }
		}
	},
	created() {
		// this.getSource()
		this.updatePage()
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
ul{
	display: inline-flex;
	li{
		list-style: none;
		border: 1px solid #ddd;
		margin: 0 0.5rem;
		padding: 0.25rem;
		&.active{
			background: rgb(202, 202, 202);
		}
	}
}
</style>