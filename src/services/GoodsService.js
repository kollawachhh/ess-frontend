import Axios from "axios"
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_CCS_ENDPOINT || "http://localhost:8000"

export default {
    async getAllGoods(){
        try{
            let url = `${api_endpoint}/api/goods/all-goods`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        }catch (e){
            
        }
    },
    async getAllStocksIN(){
        try{
            let url = `${api_endpoint}/api/goods/all-stock-in`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        }catch (e){
            
        }
    },
    async getAllStocksOut(){
        try{
            let url = `${api_endpoint}/api/goods/all-stock-out`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        }catch (e){
            
        }
    },
    async createGoods(newGoods){
        try{
            let url = `${api_endpoint}/api/goods/create-goods`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, newGoods, header)
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
    async createStock(newStock){
        try{
            let url = `${api_endpoint}/api/goods/create-stock`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, newStock, header)
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
    async updateRemainFormStock(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-remain-form-stock/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateName(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-name/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateType(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-type/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateStorage(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-storage/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updatePrice(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-price/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateRemain(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-remain/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateCode(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-code/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateAmount(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-amount/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async updateTotalPrice(goods){
        try{
            let url = `${api_endpoint}/api/goods/update-total-price/${goods.id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, goods, header)
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
    async removeGoods(id){
        try{
            let url = `${api_endpoint}/api/goods/remove-goods/${id}`;
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
    async removeStock(id){
        try{
            let url = `${api_endpoint}/api/goods/remove-stock/${id}`;
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