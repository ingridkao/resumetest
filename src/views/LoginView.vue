<template>
  <div >
    <form @submit.prevent="userLogin">
    <h3>登入</h3>
	<p>資訊參考https://reqres.in/</p>
	<p>eve.holt@reqres.in/cityslicka</p>
	<p style="color: #8d2525;">{{errorMsg}}</p>
	<hr>
    <div class="form-group">
        <label>郵件地址</label>
        <input
        type="email"
        class=""
        v-model="user.email"
        />
    </div>

    <div class="form-group">
        <label>密碼</label>
        <input
        type="password"
        class=""
        v-model="user.password"
        />
    </div>

    <button type="submit" class="">登入</button>
	<hr>
	<router-link to="/register">
		沒有帳號前往註冊
	</router-link>
    </form>
	<hr>
	<p>token最簡單的方式是用base64轉，依據規則越複雜安全度會高(像是字串由email+name+'%%'，之類奇怪的規則)</p>
	<p>正常要從後端回傳給前端，這樣子才不會將規則暴露在瀏覽器中(前端沒有秘密)</p>

	<p>https://developer.mozilla.org/en-US/docs/Web/API/btoa</p>
	<p>解碼：const encodedData = btoa("Hello, world"); </p>
	<p>解碼：const decodedData = atob(encodedData); </p>
	<p>The string to be decoded is not correctly encoded.有可能解不出來=>https://www.base64encode.org/</p>
  </div>
</template>

<script>
// import { firebaseAuth } from "@/config/firebaseConfig.js";
export default {
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
			errorMsg: null
        }
    },
    methods: {
        userLogin() {
        //   firebaseAuth
        //     .signInWithEmailAndPassword(this.user.email, this.user.password)
        //     .then(() => {
        //       this.$router.push("/admin");
        //     })
        //     .catch((error) => {
        //       alert(error.message);
        //     });
			//送給後端
			this.axios.post('https://reqres.in/api/login',{
				email: this.user.email,
				password: this.user.password
			})
			.then( (response) => {
				if(response && response.data && response.data.token){
					//確定可以登入並拿到token透過funciton存入localStorage
					//並繼續請求使用者資訊
					this.$store.dispatch('checkUserToken', response.data.token)
					.then((response) => {
						console.log(response);
						// Vuex Promise回傳成功
						this.$router.push("/admin");
					})
					.catch((error) => {
						// Vuex Promise回傳失敗，清空input
						this.user.email = ''
						this.user.password = ''
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