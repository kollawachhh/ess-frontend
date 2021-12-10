import Axios from "axios"
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_CCS_ENDPOINT || "http://localhost:8000"

export default {
    async getAllUser(){
        try{
            let url = `${api_endpoint}/api/admin/all-users`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        }catch (e){
            
        }
    },
    async getUser(id){
        try{
            let url = `${api_endpoint}/api/admin/user/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
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
    async createUser(newUser){
        try{
            let url = `${api_endpoint}/api/admin/create-user`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, newUser, header)
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
    async updateStatus(user){
        try{
            let url = `${api_endpoint}/api/admin/ban-user/${user.id}`;
            let header = AuthService.getApiHeader();
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
    async updateName(user){
        try{
            let url = `${api_endpoint}/api/admin/update-firstname/${user.id}`;
            let header = AuthService.getApiHeader();
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
    async updateSurname(user){
        try{
            let url = `${api_endpoint}/api/admin/update-surname/${user.id}`;
            let header = AuthService.getApiHeader();
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
    async updateRole(user){
        try{
            let url = `${api_endpoint}/api/admin/update-role/${user.id}`;
            let header = AuthService.getApiHeader();
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
    async removeUser(id){
        try{
            let url = `${api_endpoint}/api/admin/remove-user/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, header)
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