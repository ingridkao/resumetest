import { createStore } from 'vuex'
import axios from "axios"
//重新整理後vuex仍然會不見，資訊可以透過localStorage緩存

export default createStore({
	state: {
		userToken: localStorage.getItem('userToken') || '',

		// 資安角度的話，user info不能存在localStorage，僅能存去識別化的token
		//在這邊專案怕server不夠力，就先還是存在localStorage
		userInfo: null
	},
	getters: {
	},
	actions: {
		//dispatch： 取其他的actions
		//commit：   取其他的mutations
		checkUserToken ({ dispatch, commit }, token) {

			//僅註冊或登入成功
			//將token存入localStorage
			if(token){
				localStorage.setItem('userToken', token)
			}

			//透過Promise來處理非同步行為
			return new Promise((resolve, reject) => {

				//1.確認是否有token，有的話當做已註冊登入成功 
				if(localStorage.getItem('userToken')) {
					dispatch('checkUserInfo')
					.then((response) => {
						// checkUserInfo説請求成功
						resolve(response)
					})
					.catch(error => {
						// checkUserInfo説請求失敗
						reject(error)
					})
				}else{
					//沒有token將資料清空，丟給mutation叫他改變state
					commit('setUserInfo', null)
					reject('No token')
				}
			})
		},
		checkUserInfo ({ commit }) {
			//透過Promise來處理非同步行為---確認是否有userInfo
			return new Promise((resolve, reject) => {

				// !正式工作後不要這樣傳使用者資訊!
				if(localStorage.getItem('userInfo')) {
					const UserInfoData = localStorage.getItem('userInfo')
					commit('setUserInfo', JSON.parse(UserInfoData))
					// 告知任務完成，丟UserInfoData
					resolve(UserInfoData)

				}else{
					// 2. 使用token去換userinfo，一般在到header裡但這邊先用參數的方式比較好debug
					axios.get('https://reqres.in/api/users/4')
					.then((response) => {
						const UserInfoData = response.data.data
						// 3. 成功後把資料丟給mutation，叫他改變state
						commit('setUserInfo', UserInfoData)

						// !正式工作後不要這樣傳使用者資訊!
						localStorage.setItem('userInfo', JSON.stringify(UserInfoData))

						// 告知任務完成，丟UserInfoData
						resolve(UserInfoData)
					})
					.catch(error => {
						// 告知任務失敗，並回傳錯誤
						reject(error)
					})
				}
			})
		}
	},
	mutations: {
		setUserInfo(state, payload){
			// 4. 透過mutations把data帶入state.userInfo
			state.userInfo = payload;
			if(!payload){
				//登出
				localStorage.removeItem('userToken')
				localStorage.removeItem('userInfo')
			}
		}
	},
})
