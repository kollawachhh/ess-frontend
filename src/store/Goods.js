import Vue from 'vue'
import Vuex from 'vuex'
import GoodsService from '@/services/GoodsService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        goods: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload;
        },
        push(state, payload){
            state.data = payload
        }
    },

    actions: {
        async fetchAllGoods({ commit }) {
            let payload = await GoodsService.getAllGoods();
            commit("fetch", payload.data)
        },
        async fetchAllStocksIn({ commit }) {
            let payload = await GoodsService.getAllStocksIN();
            commit("fetch", payload.data)
        },
        async fetchAllStocksOut({ commit }) {
            let payload = await GoodsService.getAllStocksOut();
            commit("fetch", payload.data)
        },
        async createGoods({ commit }, newGoods){
            let payload = await GoodsService.createGoods(newGoods);
            commit("push", payload.data)
        },
        async createStock({ commit }, newStock){
            let payload = await GoodsService.createStock(newStock);
            commit("push", payload.data)
        },
        async updateRemainFormStock({ commit }, goods){
            let payload = await GoodsService.updateRemainFormStock(goods);
            commit("push", payload.data)
        },
        async updateName({ commit }, goods){
            let payload = await GoodsService.updateName(goods);
            commit("push", payload.data)
        },
        async updateType({ commit }, goods){
            let payload = await GoodsService.updateType(goods);
            commit("push", payload.data)
        },
        async updateStorage({ commit }, goods){
            let payload = await GoodsService.updateStorage(goods);
            commit("push", payload.data)
        },
        async updatePrice({ commit }, goods){
            let payload = await GoodsService.updatePrice(goods);
            commit("push", payload.data)
        },
        async updateRemain({ commit }, goods){
            let payload = await GoodsService.updateRemain(goods);
            commit("push", payload.data)
        },
        async updateCode({ commit }, goods){
            let payload = await GoodsService.updateCode(goods);
            commit("push", payload.data)
        },
        async updateAmount({ commit }, goods){
            let payload = await GoodsService.updateAmount(goods);
            commit("push", payload.data)
        },
        async updateTotalPrice({ commit }, goods){
            let payload = await GoodsService.updateTotalPrice(goods);
            commit("push", payload.data)
        },
        async removeGoods({ commit }, id){
            let payload = await GoodsService.removeGoods(id);
            commit("push", payload.data)
        },
        async removeStock({ commit }, id){
            let payload = await GoodsService.removeStock(id);
            commit("push", payload.data)
        },
    },

    modules: {
        //
    }
});