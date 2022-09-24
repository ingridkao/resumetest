<template>
    <div>
        <h6>TDX Get</h6>
        <div v-if="load">Load</div>
        <!-- <p>{{target}}</p> -->
        <select v-model="target" @change="chnageSelect">
            <option 
                v-for="(item) in data3" 
                :key="item.ScenicSpotID"
                :value="item.ScenicSpotID"
            >
                {{item.ScenicSpotName}}
            </option>
        </select>
        <div>
            <!-- {{info.Position}} -->
            <div id="map"></div>
            {{info}}
        </div>
    </div>
</template>
<script>
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default {
    data(){
        return {
            load: false,
            data:[],
            target: '',
            info: {},
            map: null
        }
    },
    components: {},
    methods:{
        chnageSelect(){
            // console.log(this.target);
            // this.info = this.data.find(item=>{
            //     return item.ScenicSpotID === this.target
            // })
            this.info = this.data.find(item=> item.ScenicSpotID === this.target)
            const pos = this.info.Position
            if(!pos) return
            this.map.setView([pos.PositionLat, pos.PositionLon], 15)
            // L.marker([51.5, -0.09]).addTo(map)
            //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            //     .openPopup();
        },
        getData(){
            this.load= true
            // this.axios.get('/public/data/Taoyuan.json')
            this.axios.get('/data/Taoyuan.json')
            .then((response) => {
                // handle success
                this.data = response.data
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() =>{
                // always executed
                this.load = false
            })
        },
        initMap(){
            // 指定作用於map，只能放在id裡
            this.map = L.map('map')
            //定義初始經緯度和zoom
            this.map.setView([25.056, 121.501], 10)
            //底圖
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map)
        }
    },
    mounted(){
        this.getData()  
        this.initMap()
    }
}
</script>

<style lang="scss" scoped>
#map{
    width: 100%;
    height: 20rem;
}
</style>