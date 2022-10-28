<template>
    <div>
        <div v-if="load">Load</div>
		<div v-else>{{source}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            load: false,
            source:[]
        }
    },
    methods:{
        getSourceData(){
            this.load= true
            this.axios.get('/data/Taoyuan.json')
            .then((response) => {
                // handle success
                this.source = response.data
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() =>{
                // always executed
                this.load = false
            })
        }
    },
    created(){
        this.getSourceData()  
    }
}
</script>