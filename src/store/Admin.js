import Vue from 'vue'
import Vuex from 'vuex'
import AdminService from '@/services/AdminService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        users: (state) => state.data
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
        async fetchAllUser({ commit }) {
            let payload = await AdminService.getAllUser();
            commit("fetch", payload.data)
        },
        async fetchUser({ commit }, userId){
            let payload = await AdminService.getUser(userId);
            commit("fetch", payload.data)
        },
        async createUser({ commit }, newUser){
            let payload = await AdminService.createUser(newUser);
            commit("push", payload.data)
        },
        async updateStatus({ commit }, user){
            let payload = await AdminService.updateStatus(user);
            commit("push", payload.data)
        },
        async updateName({ commit }, user){
            let payload = await AdminService.updateName(user);
            commit("push", payload.data)
        },
        async updateSurname({ commit }, user){
            let payload = await AdminService.updateSurname(user);
            commit("push", payload.data)
        },
        async updateRole({ commit }, user){
            let payload = await AdminService.updateRole(user);
            commit("push", payload.data)
        },
        async removeUser({ commit }, id){
            let payload = await AdminService.removeUser(id);
            commit("push", payload.data)
        },
    },

    modules: {
        //
    }
});