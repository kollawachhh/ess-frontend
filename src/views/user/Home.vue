<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'home'"></Sidebar>
        <div class="flex wrapper mx-auto my-7 font-th"> 
            <div class="w-2/4 h-full pt-10">
                <span class="ml-20 text-2xl font-bold">ยอดสินค้านำเข้า</span>
                <div class="flex w-10/12 h-2/5 bg-white ml-20 mt-5 mb-10 py-10 pl-8 rounded-sm">
                    <div class="bg-emerald-500 rounded-full w-60 h-60 text-center py-6">
                        <div class="bg-white rounded-full w-48 h-48 text-center py-16 mx-auto">
                            <span class="">ยอดรวม</span>
                            <br>
                            <span class="text-4xl text-emerald-600">{{getTotalStockInPrice()}}</span>
                        </div>
                    </div>
                    <div class="w-5/12 h-full mx-auto py-14">
                        <span class="flex text-2xl text-emerald-700">รายละเอียด</span>
                        <span class="flex text-xl mt-6">นำเข้าทั้งหมด {{allStockIn.length}} รายการ</span>
                        <span class="flex text-xl mt-6">จำนวนทั้งหมด {{getTotalStockInAmount()}} ชิ้น</span>
                    </div>
                </div>
                <span class="ml-20 text-2xl font-bold">ยอดสินค้าส่งออก</span>
                <div class="flex w-10/12 h-2/5 bg-white mt-5 ml-20 py-10 pl-8 rounded-sm">
                    <div class="bg-primary rounded-full w-60 h-60 text-center py-6">
                        <div class="bg-white rounded-full w-48 h-48 text-center py-16 mx-auto">
                            <span class="">ยอดรวม</span>
                            <br>
                            <span class="text-4xl text-primary">{{getTotalStockOutPrice()}}</span>
                        </div>
                    </div>
                    <div class="w-5/12 h-full mx-auto py-14">
                        <span class="flex text-2xl text-red-700">รายละเอียด</span>
                        <span class="flex text-xl mt-6">ส่งออกทั้งหมด {{allStockOut.length}} รายการ</span>
                        <span class="flex text-xl mt-6">จำนวนทั้งหมด {{getTotalStockOutAmount()}} ชิ้น</span>
                    </div>
                </div>
            </div>
            <div class="w-2/4 h-full pt-24 pb-5">
                <div class="w-full h-full overflow-y-scroll">
                    <button class="flex btn w-10/12 h-1/5 bg-white ml-10 pt-5 pl-8 rounded-xl" @click="stockBtn">
                        <img class="w-28" src="/icons/stock_btn_hover.png" alt="">
                        <div class="ml-10 py-3">
                            <span class="flex text-3xl text-red-700">ภาพรวมสต็อกสินค้า</span>
                            <span class="flex mt-5">แสดงรายการและจัดการสินค้าทั้งในคลัง</span>
                        </div>
                    </button>
                    <button class="flex btn w-10/12 h-1/5 bg-white mt-12 ml-10 pt-5 pl-8 rounded-xl" @click="stockInBtn">
                        <img class="w-28" src="/icons/stock_in_btn_hover.png" alt="">
                        <div class="ml-10 py-3">
                            <span class="flex text-3xl text-red-700">นำเข้า</span>
                            <span class="flex mt-5">แสดงรายการสินค้านำเข้า</span>
                        </div>
                    </button>
                    <button class="flex btn w-10/12 h-1/5 bg-white mt-12 ml-10 pt-5 pl-8 rounded-xl" @click="stockOutBtn">
                        <img class="w-28" src="/icons/stock_out_btn_hover.png" alt="">
                        <div class="ml-10 py-3">
                            <span class="flex text-3xl text-red-700">ส่งออก</span>
                            <span class="flex mt-5">แสดงรายการสินค้าส่งเข้า</span>
                        </div>
                    </button>
                    <button class="flex btn w-10/12 h-1/5 bg-white mt-12 ml-10 pt-5 pl-8 rounded-xl" @click="cargoBtn">
                        <img class="w-28" src="/icons/cargo_list_btn_hover.png" alt="">
                        <div class="ml-10 py-3">
                            <span class="flex text-3xl text-red-700">ขนส่ง</span>
                            <span class="flex mt-5">แสดงรายการสินค้าส่งออกและรายละเอียดการขนส่ง</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Sidebar from '../../components/Sidebar.vue'
import AuthUser from "@/store/AuthUser"
import StockStore from "@/store/Goods"
export default {
    data() {
        return {
            allStockIn: [],
            allStockOut: [],
        }
    },
    created(){
        this.fetchAllStocksIn()
        this.fetchAllStocksOut()
    },
    mounted(){
        if (!this.isAuthen()) {
            Swal.fire({
                title: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้!!",
                text: 'กรุณาลงชื่อเข้าใช้ระบบก่อน',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
            })
            this.$router.push("/")
        }
    },
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async fetchAllStocksIn(){
            await StockStore.dispatch('fetchAllStocksIn')
            this.allStockIn = StockStore.getters.goods
        },
        async fetchAllStocksOut(){
            await StockStore.dispatch('fetchAllStocksOut')
            this.allStockOut = StockStore.getters.goods
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
        getTotalStockInPrice(){
            let total = 0
            this.allStockIn.forEach(s => {
                total += s.total_price
            })
            return total
        },
        getTotalStockOutPrice(){
            let total = 0
            this.allStockOut.forEach(s => {
                total += s.total_price
            })
            return total
        },
        getTotalStockInAmount(){
            let total = 0
            this.allStockIn.forEach(s => {
                total += s.amount
            })
            return total
        },
        getTotalStockOutAmount(){
            let total = 0
            this.allStockOut.forEach(s => {
                total += s.amount
            })
            return total
        },
    },
    components:{
        Header,
        Sidebar,
    },
}
</script>

<style lang='scss' scoped>
.bg-white{
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}
.btn:hover{
    border: 3px solid #DF554C;
}
.t:hover{
    color: #df554c;
}
</style>