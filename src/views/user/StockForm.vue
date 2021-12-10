<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3">เพิ่มรายการสินค้านำเข้า - ส่งออก</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="wrapper-content w-full mt-8">
                <form class="w-full" @submit.prevent="addStock">
                    <div class="flex w-full">
                        <div class="w-full mt-10 mx-auto text-center">
                            <span class="text-2xl font-th">ข้อมูลนำเข้า - ส่งออก</span>
                            <div class="w-4/6 h-5/6 pt-8 pb-14 mt-10 mx-auto rounded-lg form-wrapper">
                                <div class="flex">
                                    <div class="w-2/4 pl-10 pr-5">
                                        <span class="flex mb-4 font-th">รหัสสินค้า</span>
                                        <input class="w-full h-10 input px-3 font-th" v-model="form.code" type="text">
                                        <span class="flex mt-4 font-th ">ชื่อสินค้า</span>
                                        <select 
                                            @change="autoFillGoods(form.name)"
                                            v-model="form.name"
                                            class="w-full my-4 h-10 input px-3 font-th">
                                            <option v-for="(goods, index) in allGoods" :value="goods.name" :key="index">
                                                {{goods.name}}
                                            </option>
                                        </select>
                                        <span class="flex font-th">ประเภทสินค้า</span>
                                        <input class="w-full my-4 h-10 input px-3 font-th" type="text" v-model="form.goods_type">
                                        <span class="flex font-th">จำนวนสินค้า</span>
                                        <input class="w-full mt-4 h-10 input px-3 font-th" type="number" min="0" v-model="form.amount">
                                    </div>
                                    <div class="w-2/4 pl-5 pr-10">
                                        <span class="flex font-th">ราคารวม</span>
                                        <input class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.total_price">
                                        <span class="flex font-th mt-4">ประเภทของรายการ</span>
                                        <select 
                                            @change="autoFillType(form.stock_type)"
                                            v-model="form.stock_type"
                                            class="w-full mt-4 h-10 input px-3 font-th">
                                            <option v-for="(type, index) in types" :value="type.name" :key="index">
                                                {{type.th}}
                                            </option>
                                        </select>
                                        <span class="flex mt-4 font-th">ป้อนข้อมูลจาก</span>
                                        <input v-model="form.input" class="w-full mt-4 h-10 input px-3 font-th" type="text">
                                        <span class="flex mt-4 font-th">รับผิดชอบโดย</span>
                                        <input class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.responsible">
                                    </div>
                                </div>
                                <button v-if="this.form.stock_type === 'stock-in' || this.form.stock_type === ''" class="confirm-button rounded-md mt-20 px-4 py-1" type="submit">ยืนยัน</button>
                            </div>
                        </div>
                        <div v-if="this.form.stock_type === 'stock-out'" class="w-full mt-10 ml-auto text-center">
                            <span class="text-2xl font-th">ข้อมูลการส่งออก</span>
                            <div class="w-4/6 h-5/6 pt-8 px-10 mt-10 mx-auto rounded-lg form-wrapper">
                                <span class="flex font-th">สำนักงานขาย</span>
                                <input class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.office">
                                <span class="flex font-th mt-4">เส้นทางจัดส่ง</span>
                                <input  class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.delivery_route">
                                <span class="flex mt-4 font-th">ขายโดย</span>
                                <input  class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.seller">
                                <span class="flex mt-4 font-th">ลูกค้า</span>
                                <input class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.customer">
                            </div>
                        </div>
                    </div>
                    <button v-if="this.form.stock_type === 'stock-out'" class="flex confirm-button rounded-md mx-auto mt-20 px-4 py-1" type="submit">ยืนยัน</button>
                </form>
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
            form: {
                code: '',
                name: '',
                goods_type: '',
                total_price: '',
                amount: '',
                stock_type: '',
                input: '',
                responsible: '',
                office: '',
                delivery_route: '',
                seller: '',
                customer: '',
            },
            allGoods: [],
            types:[
                {
                    id: 1,
                    name: "stock-in",
                    th: 'รายการนำเข้า',
                },
                {
                    id: 2,
                    name: "stock-out",
                    th: 'รายการส่งออก',
                },
            ],
            errors: '',
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
        autoFillGoods(name){
            this.allGoods.forEach(g => {
                if(g.name === name){
                    this.form.goods_type = g.type
                }
            });
        },
        autoFillType(type){
            if(type === 'stock-in'){
                this.form.input = 'ใบส่งเข้า'
            }
            else if(type === 'stock-out'){
                this.form.input = 'ใบส่งออก'
            }
        },
        async fetchAllGoods(){
            await GoodsStore.dispatch('fetchAllGoods')
            this.allGoods = GoodsStore.getters.goods
        },
        currentDate(){
            return moment().format('DD') + ' ' + FormatThai.formatMonthTH(moment().format('MM')) + ' ' + FormatThai.formatYearTH(moment().format('YYYY'))
        },
        async goodsList(){
            this.$router.push('/stock')
        },
        addStock(){
            let type
            if(this.form.stock_type === 'stock-in'){
                type = 'นำเข้า'
            }
            else{
                type = 'ส่งออก'
            }
            Swal.fire({
                title: 'เพิ่มรายการสินค้า' + type +'ใหม่',
                text: 'คุณต้องการเพิ่มรายการสินค้า' + type +  'ใช่หรือไม่?',
                icon: 'question',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง',
                cancelButtonText: 'ยกเลิก',
            })
            .then((r) => {
                if(r.value){
                    if((this.form.stock_type === 'stock-in' &&
                       this.form.code !== "" &&
                       this.form.name !== "" &&
                       this.form.goods_type !== "" &&
                       this.form.total_price !== "" &&
                       this.form.amount !== "" &&
                       this.form.stock_type !== "" &&
                       this.form.input !== "" &&
                       this.form.responsible !== "") ||
                       (this.form.stock_type === 'stock-out' &&
                       this.form.code !== "" &&
                       this.form.name !== "" &&
                       this.form.goods_type !== "" &&
                       this.form.total_price !== "" &&
                       this.form.amount !== "" &&
                       this.form.stock_type !== "" &&
                       this.form.input !== "" &&
                       this.form.responsible !== "" &&
                       this.form.office !== "" &&
                       this.form.delivery_route !== "" &&
                       this.form.seller !== "" &&
                       this.form.customer !== "")){
                        let goods = {
                            id: ''
                        }
                            this.allGoods.forEach(g => {
                                if(g.name === this.form.name){
                                    goods = g
                                    let newRemain
                                    if(this.form.stock_type === 'stock-in'){
                                        newRemain = parseInt(goods.remain) + parseInt(this.form.amount)
                                    }
                                    else if(this.form.stock_type === 'stock-out'){
                                        newRemain = parseInt(goods.remain) - parseInt(this.form.amount)
                                    }
                                    let newGoods = {
                                        id: goods.id,
                                        remain: newRemain,
                                    }
                                    this.updateRemainFromStock(newGoods)
                                }
                            })
                        let newStock = {
                            goods_id: goods.id,
                            code: this.form.code,
                            total_price: this.form.total_price,
                            amount: this.form.amount,
                            stock_type: this.form.stock_type,
                            input: this.form.input,
                            responsible: this.form.responsible,
                            office: this.form.office,
                            delivery_route: this.form.delivery_route,
                            seller: this.form.seller,
                            customer: this.form.customer,
                        } 
                        this.pushData(newStock, goods)
                        Swal.fire({
                            title: 'เพิ่มรายการสินค้า' + type + 'สำเร็จ',
                            icon: 'success',
                            timer: 1500,
                            showCloseButton: false,
                            showConfirmButton: false,
                        })
                        if(this.form.stock_type === 'stock-in'){
                            this.$router.push('/stock-in')
                        }
                        else if(this.form.stock_type === 'stock-out'){
                            this.$router.push('/stock-out')
                        }
                    }
                    else{
                        Swal.fire({
                            title: 'กรุณากรอกข้อมูลให้ครบ',
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                        })
                    }
                }
            });
        },
        async pushData(newStock, goods){
            await GoodsStore.dispatch('createStock', newStock)
        },
        async updateRemainFromStock(newGoods){
            await GoodsStore.dispatch('updateRemainFormStock', newGoods)
        }
    }
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
.user:hover{
    text-decoration: underline;
}
.upload-img{
    width: 100px;
}
.form-wrapper{
    background-color: #D6AFAF;
}
.confirm-button{
    color: #fff;
    background-color: #52A1BA;
}
.input{
    background-color: #F0E5E5;
    border-radius: 5px;
}
.es{
    color: #DF554C;
}
.s{
    color: #57AEFF;
}
</style>