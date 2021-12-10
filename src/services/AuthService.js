import Axios from "axios"

const auth_key = "auth-ess"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""

const api_endpoint = process.env.VUE_APP_CCS_ENDPOINT || "http://localhost:8000"

export default {
    getApiHeader() {
        if (this.jwt !== undefined && this.jwt !== "") {
            return {
                headers: {
                    Authorization: `Bearer ${this.jwt}`
                }
            }
        } else {
            this.jwt = JSON.parse(localStorage.getItem(auth_key)).jwt
            return {
                headers: {
                    Authorization: `Bearer ${this.jwt}`
                }
            }
        }
    },

    getUser() {
        return user
    },

    getJwt() {
        return jwt
    },

    async login({ password, username }) {
        try {
            let url = `${api_endpoint}/api/auth/login`
            let body = {
                username: username,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200 && res.data !== 'out') {
                let user = {
                    jwt: res.data.access_token,
                    user: res.data.user
                }
                localStorage.setItem(auth_key, JSON.stringify(user))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.access_token
                }
            } else if (res.data == "out") {
                return {
                    sucess: false,
                    user: "failed"
                }
            } else {
                console.log("NOT 200", res)
                return {
                    sucess: false,
                    user: "failed"
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },

    logout() {
        localStorage.removeItem(auth_key)
    },

    async updateLoginTime(user){
        try{
            let url = `${api_endpoint}/api/update-login-time/${user.id}`;
            let header = this.getApiHeader();
            let res = await Axios.post(url, user, header)
            return res
        }catch (e){
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },
}