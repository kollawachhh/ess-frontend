<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'stock'"></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3"><button @click="goodsList" class="mr-4 user">ภาพรวมสต็อกสินค้า</button> > เพิ่มสินค้าใหม่</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="flex wrapper-content w-full mt-8">
                <form class="flex w-full" @submit.prevent="addGoods">
                    <div class="flex mt-36 w-5/12">
                        <div class="w-5/6 mx-auto">
                            <img class="w-80 mx-auto my-4" src="/images/goods_box.png">
                            <div class="flex text-7xl font-eng mx-auto">
                                <span class="es ml-auto">ES</span>
                                <span class="s mr-auto">S</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-7/12 mt-10 text-center">
                        <span class="text-2xl font-th">ข้อมูลสินค้า</span>
                        <div class="w-4/6 h-5/6 pt-8 px-10 mt-10 mx-auto rounded-lg form-wrapper">
                            <span class="flex mb-4 font-th">ชื่อสินค้า</span>
                            <input class="w-full h-10 input px-3 font-eng" v-model="form.name" type="text">
                            <span class="flex mt-4 font-th">ประเภท</span>
                            <input class="w-full my-4 h-10 input px-3 font-eng" v-model="form.type" type="text">
                            <span class="flex font-th">ที่จัดเก็บ</span>
                            <input class="w-full my-4 h-10 input px-3 font-eng" type="text" v-model="form.storage">
                            <span class="flex font-th">ราคา</span>
                            <input class="w-full mt-4 h-10 input px-3 font-eng" type="text" v-model="form.price">
                            <span class="flex mt-4 font-th">จำนวน</span>
                            <input class="w-full mt-4 h-10 input px-3 font-eng" type="number" v-model="form.remain">
                            <button class="confirm-button rounded-md mt-12 px-4 py-1" type="submit">ยืนยัน</button>
                        </div>
                    </div>
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
                name: '',
                type: '',
                storage: '',
                price: '',
                remain: '',
            },
            errors: '',
        }
    },
    components:{
        Header,
        Sidebar,
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
        currentDate(){
            return moment().format('DD') + ' ' + FormatThai.formatMonthTH(moment().format('MM')) + ' ' + FormatThai.formatYearTH(moment().format('YYYY'))
        },
        async goodsList(){
            this.$router.push('/stock')
        },
        addGoods(){
            Swal.fire({
                title: 'เพิ่มสินค้าใหม่',
                text: 'คุณต้องการเพิ่มสินค้าใช่หรือไม่?',
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
                    if(this.form.name !== "" &&
                       this.form.type !== "" &&
                       this.form.storage !== "" &&
                       this.form.price !== "" &&
                       this.form.remain !== "" ){
                        let newGoods = {
                                name: this.form.name,
                                type: this.form.type,
                                storage: this.form.storage,
                                price: this.form.price,
                                remain: this.form.remain,
                            } 
                            GoodsStore.dispatch('createGoods', newGoods)
                            Swal.fire({
                                title: 'เพิ่มสินค้าสำเร็จ',
                                icon: 'success',
                                showCloseButton: true,
                                showConfirmButton: false,
                            })
                            this.$router.push('/stock')
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