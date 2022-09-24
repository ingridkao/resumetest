<template>
    <div>
        <h6>XMLHttpRequest</h6>
        <!-- <div>{{data1.products}}</div> -->
        <List v-if="data1.products" :mydata="data1.products"/>
    </div>
    <div>
        <h6>fetch API</h6>
        <List v-if="data2.products" :mydata="data2.products"/>
    </div>
    <div>
        <h6>axio</h6>
        <div v-if="load">Load</div>
        <List v-if="data3.products" :mydata="data3.products"/>
    </div>
</template>
<script>
// import axios from "axios"
import List from '@/components/ShopList.vue'
export default {
    data(){
        return {
            data1:[],
            data2:[],
            data3:[],
            load: false
        }
    },
    components: {
        List
    },
    methods:{
        getData1(){
            const oReq = new XMLHttpRequest()
            oReq.open("GET", "https://dummyjson.com/products")
            oReq.send()
            oReq.onload = () => {
                // console.log(oReq.response);
                const data = JSON.parse(oReq.response)
                this.data1 = data
            }
            oReq.onerror = (err) => {
                console.log(err);
            }
        },
        getData2(){
            fetch('https://dummyjson.com/products')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                // console.log(response.json())
                return response.json()
            })
            .then((myJson) => {
                // console.log(myJson);
                this.data2 = myJson
            })
        },
        getData3(){
            this.load= true
            this.axios.get('https://dummyjson.com/products')
            .then((response) => {
                // handle success
                this.data3 = response.data
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() =>{
                // always executed
                this.load = false
            });
        },
    },
    mounted(){
        // this.getData1()
        // this.getData2()
        this.getData3()  
    }
}
</script>