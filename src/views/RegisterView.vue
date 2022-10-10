<template>
  <div>
    <form @submit.prevent="userRegistration">
      <h3>註冊</h3>

      <div>
        <label>名子</label>
        <input
          type="text"
          v-model="user.name"
        />
      </div>

      <div>
        <label>信箱</label>
        <input
          type="email"
          v-model="user.email"
        />
      </div>

      <div>
        <label>密碼</label>
        <input
          type="password"
          v-model="user.password"
        />
      </div>

      <button type="submit">
        註冊
      </button>

      <p class="forgot-password text-right">
        已經註冊過了?
        <router-link to="/login">登入</router-link>
      </p>
    </form>
  </div>
</template>

<script>
// import { firebaseAuth } from "@/config/firebaseConfig.js";
export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
				name: ''
            }
        }
    },
    methods: {
        userRegistration() {
            //https://reqres.in/api/register
            // firebaseAuth
            // .createUserWithEmailAndPassword(this.user.email, this.user.password)
            // .then((res) => {
            // res.user
            //     .updateProfile({
            //     displayName: this.user.name,
            //     })
            //     .then(() => {
            //     this.$router.push("/login");
            //     });
            // })
            // .catch((error) => {
            // alert(error.message);
            // });

			//送給後端
			this.axios.post('https://reqres.in/api/register',{
				email: this.user.email,
				password: this.user.password
			})
			.then( (response) => {
				//確定可以註冊(並拿到token)
				if(response && response.data && response.data.token){
					//將token存入localStorage
					localStorage.setItem('usertoken', response.data.token)

					//繼續請求使用者資訊
					this.$store.dispatch('checkUserToken', response.data.token)
					.then((response) => {
						// Vuex Promise回傳成功
						this.$router.push("/admin");
						// 有些人主張註冊完要在登入一次，看後端怎麼設計
						// this.$router.push("/login"); 

					})
					.catch((error) => {
						// Vuex Promise回傳失敗，清空input
						// 通常這邊要提示為什麼不能註冊
					})
				}
			})
			.catch( (error) => {
				this.errorMsg = error && error.response && error.response.data ? error.response.data.error: ''
			})
        }
    }
}
</script>