<template>
    <div>
        <h6>ImageZoom 使用 vue-image-zoom</h6>
        img方法一
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <img alt="Vue logo" src="../../assets/logo.png">
        img方法二: data中定義變數src
        <img alt="Vue logo" :src="logoImg">
        img方法二: 使用require動態載入
        <div class="avatar">
            <div v-for="item in 6" :key="item">
                <!-- <img :src="require(`../../assets/images/avatar/report_avatar_1.png`)"> -->
                <img :src="require(`@/assets/images/avatar/report_avatar_${item}.png`)">
            </div>
        </div>
        div方法四
        <div :style="{
            width: '100%',
            height: '5rem',
            backgroundImage: `url(${logoImg})`
        }"/>
    </div>
</template>

<script>
// @ is an alias to /src
import logoImg from '@/assets/logo.png'

export default {
  data(){
    return {
      logoImg,
      text: '123'
    }
  },
}
</script>
