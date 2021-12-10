<template>
    <div class="w-52">
        <div v-bind:class="{'pb-80': role !== 'Admin', 'pb-64': role === 'Admin' || role === 'Header'}" class="sidebar font-th w-52 mt-1">
            <button v-if="page !== 'home'" @click="homeBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/home_btn.png">
                <span class="my-5">หน้าแรก</span>
            </button>
            <button v-if="page === 'home'" @click="homeBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/home_btn_hover.png">
                <span class="my-5">หน้าแรก</span>
            </button>
            <button v-if="page !== 'stock'" @click="stockBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/stock_btn.png">
                <span class="my-5">ภาพรวมสต็อกสินค้า</span>
            </button>
            <button v-if="page === 'stock'" @click="stockBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/stock_btn_hover.png">
                <span class="my-5">ภาพรวมสต็อกสินค้า</span>
            </button>
            <button v-if="page !== 'stock-in'" @click="stockInBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/stock_in_btn.png">
                <span class="my-5">นำเข้า</span>
            </button>
            <button v-if="page === 'stock-in'" @click="stockInBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/stock_in_btn_hover.png">
                <span class="my-5">นำเข้า</span>
            </button>
            <button v-if="page !== 'stock-out'" @click="stockOutBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/stock_out_btn.png">
                <span class="my-5">ส่งออก</span>
            </button>
            <button v-if="page === 'stock-out'" @click="stockOutBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/stock_out_btn_hover.png">
                <span class="my-5">ส่งออก</span>
            </button>
            <button v-if="page !== 'cargo'" @click="cargoBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/cargo_list_btn.png">
                <span class="my-5">ขนส่ง</span>
            </button>
            <button v-if="page === 'cargo'" @click="cargoBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/cargo_list_btn_hover.png">
                <span class="my-5">ขนส่ง</span>
            </button>
            <button v-if="page !== 'user' && role === 'Admin'" @click="userBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/users_btn.png">
                <span class="my-5">จัดการพนักงาน</span>
            </button>
            <button v-if="page === 'user' && role === 'Admin'" @click="userBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/users_btn_hover.png">
                <span class="my-5">จัดการพนักงาน</span>
            </button>
        </div>
        <div class="sidebar font-th w-52 bottom">
            <button v-if="page !== 'about'" @click="aboutBtn" class="flex h-16 w-full button">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/about_btn.png">
                <span class="my-5">เกี่ยวกับเรา</span>
            </button>
            <button v-if="page === 'about'" @click="aboutBtn" class="flex h-16 w-full selected">
                <img
                    class="w-8 my-4 mx-3" 
                    src="/icons/about_btn_hover.png">
                <span class="my-5">เกี่ยวกับเรา</span>
            </button>
        </div>
    </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
export default {
    props:['page'],
    data(){
        return{
            role: AuthUser.getters.user.role,
        }
    },
    methods:{
        async homeBtn(){
            this.$router.push('/home')
        },
        async stockBtn(){
            this.$router.push('/stock')
        },
        async stockInBtn(){
            this.$router.push('/stock-in')
        },
        async stockOutBtn(){
            this.$router.push('/stock-out')
        },
        async cargoBtn(){
            this.$router.push('/cargo')
        },
        async userBtn(){
            this.$router.push('/user')
        },
        async aboutBtn(){
            this.$router.push('/about')
        }
    },
}
</script>

<style lang='scss' scoped>
.sidebar{
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
.button:hover{
    background-color: #EDEDED;
}
.selected{
    background-color: #EDEDED;
    border-left: 10px solid #DF554C;
}
.bottom{
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    height: 267px;
}
</style>