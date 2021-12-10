<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'stock'"></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3">ภาพรวมสต็อกสินค้า</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="wrapper-content w-full mt-8">
                <div class="flex w-full px-5 py-8 font-th">
                    <input class="input w-full h-10 rounded-md mr-4 text-center"
                        placeholder="ค้นหารายการสินค้าในระบบ"
                        type="text"
                        v-model="searchGoods">
                    <button v-if="role === 'Admin' || role === 'Header'" class="button w-60 rounded-md" @click="addGoods">เพิ่มสินค้าใหม่</button>
                </div>
                <div class="w-full px-5">
                    <table class="w-full">
                        <thead class="w-full font-th">
                            <tr class="flex w-full h-10 py-2 column">
                                <th class="w-4/12">รายการ</th>
                                <th class="w-3/12">ประเภทสินค้า</th>
                                <th class="w-1/12" v-bind:class="{'w-2/12' : role === 'Employee'}">ที่จัดเก็บ</th>
                                <th class="w-2/12">ราคา</th>
                                <th class="w-1/12">คงเหลือ</th>
                            </tr>
                        </thead>
                        <div class="flex table-body w-full overflow-y-scroll">
                            <tbody class="w-full">
                                    <tr class="flex h-10 border-b-2 py-2 text-sm" v-for="(g, index) in resultQuery" :key="index">
                                        <div class="flex w-full font-th">
                                            <td class="w-4/12 text-center">
                                                <button class="edit-btn" @click="editName(g.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{g.name}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{g.name}}
                                                </div>
                                            </td>
                                            <td class="w-3/12 text-center">
                                                <button class="edit-btn" @click="editType(g.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{g.type}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{g.type}}
                                                </div>
                                            </td>
                                            <td class="w-1/12 text-center" v-bind:class="{'w-2/12' : role === 'Employee'}">
                                                <button class="edit-btn" @click="editStorage(g.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{g.storage}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{g.storage}}
                                                </div>
                                            </td>
                                            <td class="w-2/12 text-center">
                                                <button class="edit-btn" @click="editPrice(g.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{g.price + ' บ.'}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{g.price}}
                                                </div>
                                            </td>
                                            <td class="w-1/12 text-center">
                                                <button class="edit-btn" @click="editRemain(g.id)" v-if="role === 'Admin' || role === 'Header'">
                                                    {{g.remain}}
                                                </button>
                                                <div v-if="role === 'Employee'">
                                                    {{g.remain}}
                                                </div>
                                            </td>
                                            <td class="w-1/12 text-center delete-btn" v-if="role === 'Admin' || role === 'Header'"><button @click="removeGoods(g.id)">x</button></td>
                                        </div>
                                    </tr>
                            </tbody>
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
import GoodsStore from "@/store/Goods"
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            searchGoods: null,
            allGoods: [],
            searchList: [],
            goods:{
                id: '',
                name: '',
                type: '',
                storage: '',
                price: '',
                remain: '',
            },
            role: AuthUser.getters.user.role,
        }
    },
    components:{
        Header,
        Sidebar,
    },
    created(){
        this.fetchAllGoods()
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
        async fetchAllGoods(){
            await GoodsStore.dispatch('fetchAllGoods')
            this.searchList = GoodsStore.getters.goods
            this.allGoods = GoodsStore.getters.goods
        },
        async addGoods(){
            this.$router.push('/create-goods')
        },
        currentDate(){
            return moment().format('DD') + ' ' + FormatThai.formatMonthTH(moment().format('MM')) + ' ' + FormatThai.formatYearTH(moment().format('YYYY'))
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
                    this.goods.name = name
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'รายการสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.goods.storage + '</span>', 
                        text: 'คุณต้องการเปลี่ยนรายการสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateName(id, this.goods.name)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนรายการสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllGoods()
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
            await GoodsStore.dispatch('updateName', goods)
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
                    this.goods.type = type
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'ประเภทสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.goods.storage + '</span>', 
                        text: 'คุณต้องการเปลี่ยนประเภทสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateType(id, this.goods.type)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนประเภทสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllGoods()
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
            await GoodsStore.dispatch('updateType', goods)
        },
        editStorage(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขที่จัดเก็บสินค้า',
                text: 'กรุณากรอกที่จัดเก็บสินค้าใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (storage) => {
                    this.goods.storage = storage
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'ที่จัดเก็บสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.goods.storage + '</span>', 
                        text: 'คุณต้องการเปลี่ยนที่จัดเก็บสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateStorage(id, this.goods.storage)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนที่จัดเก็บสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllGoods()
                        }
                    })
                }
                
            })
        },
        async updateStorage(id, storage){
            let goods = {
                id: id,
                storage: storage,
            }
            await GoodsStore.dispatch('updateStorage', goods)
        },
        editPrice(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขราคาสินค้า',
                text: 'กรุณากรอกราคาสินค้าใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (price) => {
                    this.goods.price = price
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'ราคาสินค้าเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.goods.price + '</span>', 
                        text: 'คุณต้องการเปลี่ยนราคาสินค้าใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updatePrice(id, this.goods.price)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนราคาสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllGoods()
                        }
                    })
                }
                
            })
        },
        async updatePrice(id, price){
            let goods = {
                id: id,
                price: price,
            }
            await GoodsStore.dispatch('updatePrice', goods)
        },
        editRemain(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขจำนวนสินค้าในคลัง',
                text: 'กรุณากรอกจำนวนสินค้าใหม่',
                input: 'number',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (number) => {
                    this.goods.remain = number
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'จำนวนสินค้าในคลังเปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.goods.remain + '</span>', 
                        text: 'คุณต้องการเปลี่ยนจำนวนสินค้าในคลังใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        if(result.value){
                            this.updateRemain(id, this.goods.remain)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนจำนวนสินค้าเสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllGoods()
                        }
                    })
                }
                
            })
        },
        async updateRemain(id, remain){
            let goods = {
                id: id,
                remain: remain,
            }
            await GoodsStore.dispatch('updateRemain', goods)
        },
        removeGoods(id){
            Swal.fire({
                icon:'question',
                title: '<span class="text-red-500 font-eng">ลบสินค้า</span>', 
                text: 'คุณต้องการสินค้าออกจากรายการใช่หรือไม่',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            })
            .then((result) => {
                if(result.value){
                    this.removeGoodsDB(id)
                    Swal.fire({
                        icon: 'success',
                        title: 'ลบสินค้าเสร็จสิ้น',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.fetchAllGoods()
                }
            })
        },
        async removeGoodsDB(id){
            await GoodsStore.dispatch('removeGoods', id)
        },
    },
    computed: {
        resultQuery(){
            if(this.searchGoods){
                return this.allGoods.filter((item)=>{
                    return this.searchGoods.toLowerCase().split(' ').every(v => (item.name).toLowerCase().includes(v))
                })
                }else{
                    return this.allGoods;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.input{
    background-color: #FCEDD6;
}
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
.edit-btn:hover{
    text-decoration: underline;
}
</style>