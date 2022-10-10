<template>
    <div>
        <div v-if="user && user.id">
            <img :src="user.avatar" :alt="user.first_name">
        </div>
        <h3>
            <span v-if="user && user.id">{{user.first_name}} {{user.last_name}}</span>
            您好，請問要登出嗎?</h3>
           <p>{{user}}</p>
        <button 
            type="submit" 
            @click="logOut()">
                登出
        </button>
    </div>
</template>
<script>
// import { firebaseAuth } from "@/config/firebaseConfig.js";

export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        this.checkLogin()
    },
    methods: {
        checkLogin(){
            // firebaseAuth.onAuthStateChanged((user) => {
            //   if (user) {
            //     this.user = user;
            //   } else {
            //     this.user = null;
            //   }
            // });
            
            if(this.$store.state.userInfo){
                this.user = this.$store.state.userInfo
            }else{
                this.$store.dispatch('checkUserToken')
                .then((response) => {
                    this.user = this.$store.state.userInfo
                })
                .catch((error) => {
                    // 沒有token導向到登入頁面
                    this.$router.push("/login")
                })
            }
            //如果要模組化通常會利用vue-router裡面的router.beforeEach
            // https://ithelp.ithome.com.tw/articles/10187631
            //但這邊如果僅後台需要登入那就比較不適合
        },
        logOut() {
            // firebaseAuth.signOut().then(() => {
            //     firebaseAuth.onAuthStateChanged(() => {
            //     this.$router.push('/login')
            //     })
            // })
            this.$store.commit('setUserInfo', null)
            this.$router.push("/login")
        }
    }
};
</script>