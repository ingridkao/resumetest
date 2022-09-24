<template>
    <div>
        <h6>XMLHttpRequest</h6>
        <div>{{data1}}</div>
    </div>
    <div>
        <h6>fetch API</h6>
        <div>{{data2}}</div>
    </div>
    <div>
        <h6>axio</h6>
        <div>{{data3}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data1:[],
            data2:[],
            data3:[]
        }
    },
    methods:{
        getData1(){
            
        },
        getData2(){},
        getData3(){},
    },
    mounted(){
        this.getData1()
        this.getData2()
        this.getData3()  
    }
}
</script>