<template>
    <div>
        <div v-if="load">Load</div>
        <!-- <p>{{target}}</p> -->
        <select v-model="target" @change="chnageSelect">
            <option value="">請選擇桃園景點</option>
            <option 
                v-for="(item) in data" 
                :key="item.ScenicSpotID"
                :value="item.ScenicSpotID"
            >
                {{item.ScenicSpotName}}
            </option>
        </select>
        <hr>
        <div class="infoBox">
            <!-- {{info.Position}} -->
            <div id="map"></div>
            <div class="info">
                <template v-for="(item, keys) in info" :key="keys">
                    <h6 v-if="keys === 'ScenicSpotName'">{{item}}</h6>
                    <p v-else-if="keys === 'Description'" class="Description">{{item}}</p>
                    <p v-else-if="keys === 'Address'">地址： {{item}}</p>
                    <p v-else-if="keys === 'Phone'">電話： {{item}}</p>
                    <p v-else-if="keys === 'TicketInfo'">收費： {{item}}</p>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// marker的樣式
const blackIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default {
    data(){
        return {
            load: false,
            data:[],
            target: '',
            info: {},
            map: null,
            marker: null
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
            this.map.setView([pos.PositionLat, pos.PositionLon], 12)

            // L.marker([51.5, -0.09]).addTo(map)
            // 這個寫法會新增很多marker，要想辦法把上一個消雕
            // L.marker([pos.PositionLat, pos.PositionLon],{ icon: blackIcon }).addTo(this.map)

            if(this.marker){
                this.map.removeLayer(this.marker)
            }
            this.marker = L.marker([pos.PositionLat, pos.PositionLon],{ icon: blackIcon }).addTo(this.map)
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
.infoBox{
    display: inline-flex;
    width: 100%;
    height: 50vh;
    #map{
        width: 20rem;
        height: 100%;
    }
    .info{
        width: calc(100vw - 20rem);
        text-align: left;
    }
}

</style>