<template>
    <Lightbox>
        <template v-slot:header>
            <h2>新增管理者</h2>
        </template>

        <template v-slot:footer>
            <button @click="submit">送出</button>
        </template>

        <div>
            <input type="text" v-model="email">
        </div>
    </Lightbox>
</template>
<script>
import Lightbox from '@/components/Lightbox.vue'
export default {
    components: {
        Lightbox
    },
    data(){
        return {
            email: ''
        }
    },
    methods:{
        submit(){
            alert('送出囉')
            this.email = ''
        }
    }
}
</script>
