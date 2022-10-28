<template>
    <p>資料來源：https://www.travel.taipei/open-api/swagger/ui/index#/Attractions/Attractions_All</p>
    <p>要header所以cros-anywhere沒辦法使用，header帶不過去</p>
    <button @click="nexPage">Next page</button>
    {{travelData}}
</template>
<script>
export default {
    data(){
        return {
            travelData:[],
            page: 0,
            load: false
        }
    },
    methods:{
        getData2(){
            this.load= true
            fetch(`/travelapi/zh-tw/Attractions/All?page=${this.page}`, {
                method: 'GET',
                headers: {
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                this.travelData = result
                this.load= false
            })
            .catch(error => console.log('error', error));
        },
        getData3(){
            this.load= true
            // this.axios.get('https://cors-anywhere.herokuapp.com/https://www.travel.taipei/open-api/zh-tw/Attractions/All', {
            this.axios.get('/travelapi/zh-tw/Attractions/All', {
                headers: {
                    "accept": "application/json"
                },
                params: {
                    page: this.page
                }
            })
            .then((response) => {
                this.travelData = response.data
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() =>{
                this.load = false
            })
        },
        nexPage(){
            this.page += 1
            // this.getData2()
            this.getData3() 
        }
    },
    mounted(){
        this.nexPage()
    }
}
</script>