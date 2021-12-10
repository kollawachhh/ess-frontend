<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'cargo'"></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3">รายการขนส่งสินค้า</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="wrapper-content w-full mt-8">
                <div class="w-full px-5 pt-10">
                    <table class="w-full">
                        <thead class="w-full font-th">
                            <tr class="flex w-full h-10 py-2 column">
                                <th class="w-1/12">ลำดับ</th>
                                <th class="w-2/12">รหัสสินค้า</th>
                                <th class="w-3/12">รายการ</th>
                                <th class="w-2/12">ประเภท</th>
                                <th class="w-1/12" v-if="role === 'Admin' || role === 'Header'">จำนวน</th>
                                <th class="w-2/12" v-if="role === 'Employee'">จำนวน</th>
                                <th class="w-2/12">ราคารวม</th>
                                <th class="w-48" v-if="role === 'Admin' || role === 'Header'"></th>
                            </tr>
                        </thead>
                        <div class="flex table-body w-full overflow-y-scroll">
                            <tbody class="w-full">
                                    <tr class="flex h-10 border-b-2 py-2 text-sm" v-for="(stock, index) in allStockOut" :key="index">
                                        <div class="flex w-full font-th" v-if="role === 'Admin' || role === 'Header'">
                                            <td class="w-1/12 text-center">
                                                {{index + 1}}
                                            </td>
                                            <td class="w-2/12 text-center">
                                                <button class="edit-btn status-btn" @click="editCode(stock.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{stock.code}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{stock.code}}
                                                </div>
                                            </td>
                                            <td class="w-3/12 text-center">
                                                <button class="edit-btn status-btn" @click="editName(stock.goods.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{stock.goods.name}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{stock.goods.name}}
                                                </div>
                                            </td>
                                            <td class="w-2/12 text-center">
                                                <button class="edit-btn status-btn" @click="editType(stock.goods.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{stock.goods.type}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{stock.goods.type}}
                                                </div>
                                            </td>
                                            <td class="w-1/12 text-center">
                                                <button class="edit-btn status-btn" @click="editAmount(stock.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{stock.amount}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{stock.amount}}
                                                </div>
                                            </td>
                                            <td class="w-2/12 text-center">
                                                <button class="edit-btn status-btn" @click="editTotalPrice(stock.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{stock.total_price  + ' บ.'}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{stock.total_price  + ' บ.'}}
                                                </div>
                                            </td>
                                            <td class="flex w-48 text-center">
                                                <button class="flex w-full font-th status-btn" @click="showDetail(stock)">ดูรายละเอียด</button>
                                                <button class="flex w-full font-th delete-btn" @click="removeStock(stock.id)">x</button>
                                            </td>
                                        </div>
                                        <div class="flex w-full font-th" v-if="role === 'Employee'">
                                            <td class="w-1/12 text-center">{{index + 1}}</td>
                                            <td class="w-2/12 text-center">{{stock.code}}</td>
                                            <td class="w-3/12 text-center">{{stock.goods.name}}</td>
                                            <td class="w-2/12 text-center">{{stock.goods.type}}</td>
                                            <td class="w-2/12 text-center">{{stock.amount}}</td>
                                            <td class="w-2/12 text-center">{{stock.total_price + ' บ.'}}</td>
                                        </div>
                                    </tr>
                            </tbody>
                        </div>
                        <div class="flex w-full h-10 column font-th text-center">
                            <div class="w-8/12 py-2">
                                <span>รวม</span>
                            </div>
                            <div class="w-2/12 py-2">
                                <span>{{getTotalAmount()}}</span>
                            </div>
                            <div class="w-2/12 py-2">
                                <span>{{getTotalPrice() + ' บ.'}}</span>
                            </div>
                                <div class="w-48" v-if="role === 'Admin' || role === 'Header'">
                            </div>
                        </div>
                    </table>
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
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            allStockOut: [],
            stock:{
                code: '',
                amount: '',
                total_price: '',
                goods:{
                    id: '',
                    name: '',
                    type: '',
                },
            },
            role: AuthUser.getters.user.role,
        }
    },
    components:{
        Header,
        Sidebar,
    },
    created(){
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
        async fetchAllStocksOut(){
            await StockStore.dispatch('fetchAllStocksOut')
            this.allStockOut = StockStore.getters.goods
        },
        async addStock(){
            this.$router.push('/stock/form')
        },
        currentDate(){
            return moment().format('DD') + ' ' + FormatThai.formatMonthTH(moment().format('MM')) + ' ' + FormatThai.formatYearTH(moment().format('YYYY'))
        },
        editCode(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขรหัสสินค้าสินค้า',
                text: 'กรุณากรอกรหัสสินค้าใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (code) => {
                    this.stock.code = code
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'รหัสสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.stock.code + '</span>', 
                        text: 'คุณต้องการเปลี่ยนรหัสสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateCode(id, this.stock.code)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนรหัสสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllStocksOut()
                        }
                    })
                }
            })
        },
        async updateCode(id, code){
            let stock = {
                id: id,
                code: code,
            }
            await StockStore.dispatch('updateCode', stock)
        },
        editName(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขรายการสินค้า',
                text: 'กรุณากรอกรายการสินค้าใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (name) => {
                    this.stock.goods.name = name
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'รายการสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.stock.goods.name + '</span>', 
                        text: 'คุณต้องการเปลี่ยนรายการสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateName(id, this.stock.goods.name)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนรายการสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllStocksOut()
                        }
                    })
                }
                
            })
        },
        async updateName(id, name){
            let goods = {
                id: id,
                name: name,
            }
            await StockStore.dispatch('updateName', goods)
        },
        editType(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขประเภทสินค้า',
                text: 'กรุณากรอกประเภทสินค้าใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (type) => {
                    this.stock.goods.type = type
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'ประเภทสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.stock.goods.type + '</span>', 
                        text: 'คุณต้องการเปลี่ยนประเภทสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateType(id, this.stock.goods.type)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนประเภทสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllStocksOut()
                        }
                    })
                }
                
            })
        },
        async updateType(id, type){
            let goods = {
                id: id,
                type: type,
            }
            await StockStore.dispatch('updateType', goods)
        },
        editAmount(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขจำนวนสินค้า',
                text: 'กรุณากรอกจำนวนสินค้าใหม่',
                input: 'number',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (amount) => {
                    this.stock.amount = amount
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'จำนวนสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.stock.amount + '</span>', 
                        text: 'คุณต้องการเปลี่ยนจำนวนสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateAmount(id, this.stock.amount)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนจำนวนสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllStocksOut()
                        }
                    })
                }
            })
        },
        async updateAmount(id, amount){
            let stock = {
                id: id,
                amount: amount,
            }
            await StockStore.dispatch('updateAmount', stock)
        },
        editTotalPrice(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขราคารวม',
                text: 'กรุณากรอกราคารวมใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (total_price) => {
                    this.stock.total_price = total_price
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'ราคารวมเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.stock.total_price + '</span>', 
                        text: 'คุณต้องการเปลี่ยนราคารวมใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateTotalPrice(id, this.stock.total_price)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนราคารวมเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllStocksOut()
                        }
                    })
                }
            })
        },
        async updateTotalPrice(id, total_price){
            let stock = {
                id: id,
                total_price: total_price,
            }
            await StockStore.dispatch('updateTotalPrice', stock)
        },
        showDetail(stock){
            Swal.fire({
                icon: 'info',
                title: 'รายละเอียดขนส่งสินค้า',
                html: '<div class="w-80 mx-auto">' +'\n' + 
                        '<span class="flex font-th">' + 'รหัสสินค้า : '+ stock.code + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'รายการ : '+ stock.goods.name + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'จำนวน : '+ stock.amount + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'สำนักงานขาย : '+ stock.office + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'เส้นทางจัดส่ง : '+ stock.delivery_route + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'ขายโดย : '+ stock.seller + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'ลูกค้า : '+ stock.customer + '</span>' + '\n' +
                        '<br>' + '<span class="flex font-th">' + 'ราคารวม : '+ stock.total_price + '</span>'+ '\n' +
                        '<br>' + '<span class="flex font-th">' + 'บันทึกเมื่อ : '+ moment(stock.created_at).format('DD/MM/YYYY HH:mm:ss') + '</span>'+ '\n' +
                      '</div>',
            })
        },
        removeStock(id){
            Swal.fire({
                icon:'question',
                title: '<span class="text-red-500 font-eng">ลบรายการขนส่ง</span>', 
                text: 'คุณต้องการลบรายการขนส่งใช่หรือไม่',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            })
            .then((result) => {
                if(result.value){
                    this.removeStockDB(id)
                    Swal.fire({
                        icon: 'success',
                        title: 'ลบรายการขนส่งเสร็จสิ้น',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.fetchAllStocksOut()
                }
            })
        },
        async removeStockDB(id){
            await StockStore.dispatch('removeStock', id)
        },
        getTotalPrice(){
            let totalPrice = 0
            this.allStockOut.forEach(s => {
                totalPrice += s.total_price
            })
            return totalPrice
        },
        getTotalAmount(){
            let totalAmount = 0
            this.allStockOut.forEach(s => {
                totalAmount += s.amount
            })
            return totalAmount
        }
    },
}
</script>

<style lang='scss' scoped>
.button{
    color: #fff;
    background-color: #46ABD6;
}
.button:hover{
    background-color: #2a8bb4;
}
.column{
    background-color: #F7ECEC;
}
.table-body{
    height: 580px;
}
.status-btn:hover{
    text-decoration: underline;
}
</style>