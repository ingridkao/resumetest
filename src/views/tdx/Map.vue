<template>
    <select name="" id="" v-model="sel" @change="change(sel)" >
        <option value="1" selected>請選擇</option>
        <option v-for="item in data" :key="item.car" >{{item.location}}</option>
    </select>

    <div class="wrap">
        <div class="list" v-if="Object.keys(info).length > 0">
            <p v-for="(item) in displayP" :key="item.index">
                {{item.name}}: {{info[item.index]}}
            </p>
            <span  v-for="(item) in displaySpan" :key="item.index">
                {{item.name}}: {{info[item.index]}}
            </span>
        </div>
    </div>

    <div id="map"></div>

</template>
<script>
import L from"leaflet"
import "leaflet/dist/leaflet.css"

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
        return{
            data:[],
            sel:'',
            leafletMap:null,
            info:{},
            displayP: [
                {index: "time",name: "時間"},
                {index: "car",name: "車號"},
                {index: "linid",name: ""},
            ],
            displaySpan: [
                {index: "x",name: "座標x"},
                {index: "y",name: "座標y"},
            ]
        }
    },
    methods:{
        initMap(){
            this.leafletMap = L.map('map').setView([25.056, 121.501], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.leafletMap);
        },
        change(sel){
            this.info = this.data.find(item=>item.location===this.sel)
            if(this.info){
                //L.map('map')這個不能在初始一次
                // this.leafletMap = L.map('map').setView([`${this.info.x}`,`${this.info.y}`], 13);
                const {x, y, car} = this.info
                this.leafletMap.setView([y,x], 13);
                L.marker([y,x],{ icon: blackIcon })
                .addTo(this.leafletMap)
                .bindPopup(car)
                .openPopup()
            }
        }
    },
    created(){
        this.axios.get("https://api.kcg.gov.tw/api/service/get/aaf4ce4b-4ca8-43de-bfaf-6dc97e89cac0")
        .then((res)=>{
            this.data = res.data.data
        })
    },
    mounted(){
        this.initMap()
    }
}
</script>
<style lang="scss">
#map{
    width: 100vw;
    height: 20rem;
}
.wrap{}
</style>