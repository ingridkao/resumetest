<template>
	<header>
		<div>
			分頁
			<ul>
				<li 
					v-for="page in pagination" 
					:key="page" 
					:class="{active: page === currentPage}"
					@click="triggerPage(page)"
				>
					{{page}}
				</li>
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
			perPage: 3,
			//分頁呈現
			pagination: [],
			//總頁數
			totalPages: 5
		}
	},
    computed: { 
        goFirstShow() { 
            return this.currentPage >= this.perPage
        },
        goLastShow() { 
            return this.currentPage <= this.totalPages
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
			this.getSource()
		},
		updatePage(){
			this.pagination = []
			for (let item = 1; item <= this.totalPages; item++) {
				this.pagination.push(item)
			}
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