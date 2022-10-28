<template>
    <div>
        <div v-if="load">Load</div>
        <div v-else-if="sourceError">{{sourceError}}</div>
		<div v-else>{{sourceData}}</div>
		<!-- ToDo: 如果之後多個頁面要接Map，建議將地圖變成組件，將資料用props傳到地圖組件裡 -->
    </div>
</template>
<script>
const AUTH_URL = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"
const API_URL = 'https://tdx.transportdata.tw/api/basic/'
const CLIENT_ID = process.env.VUE_APP_CLIENT_ID || null
const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET || null
export default {
    data(){
        return {
			accesstoken: '',
            load: false,
			sourceError: '',
            sourceData:[],
			city: 'Taoyuan',
			params:{
				'$format' : 'JSON',
				'$top' : 30,
			}
        }
    },
    methods:{
		getAuthorizationHeader(){
			const parameter = new URLSearchParams([
				['grant_type', 'client_credentials'],
				['client_id', CLIENT_ID],
				['client_secret', CLIENT_SECRET]
			])
			//這邊要記得return
			return this.axios({
				method: "POST",
				url: AUTH_URL,
				headers: { "content-type": "application/x-www-form-urlencoded" },   
				data: parameter
			}).then((response) => {
				this.accesstoken = response.data
			}).catch((err) => {
				this.sourceError = err.response
			})
		},
		getSourceData(){
			if(!CLIENT_ID || !CLIENT_SECRET){
				this.sourceError = '要輸入CLIENT_ID和CLIENT_SECRET'
				return
			}
			// https://tdx.transportdata.tw/api-service/swagger/basic/2cc9b888-a592-496f-99de-9ab35b7fb70d#/Bike/BikeApi_Station_2180
			if(!(this.accesstoken && this.accesstoken.access_token)){
				this.sourceError = '沒有token，每個呼叫來源端IP的上限為每日50次。'
				return
			}
			this.load = true
			this.sourceData = []
			//這邊要記得return
			//https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/Taichung?%24top=30&%24format=JSON
			return this.axios.get(`${API_URL}v2/Bike/Station/City/${this.city}`, {
				headers: {
					authorization: `Bearer ${this.accesstoken.access_token}`,
				},
				params: this.params
			}).then((response) => {
				this.sourceData = response.data
			}).catch((err) => {
				this.sourceError = err.response
			}).finally(() =>{
                this.load = false
            })
		}
    },
	async created(){
		//在async之內的作用域
		await this.getAuthorizationHeader()
		//會等getAuthorizationHeader裡面的promise做完事情在做下一個getSourceData
		await this.getSourceData()
	}
}
</script>