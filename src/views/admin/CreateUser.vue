<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'user'"></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3"><button @click="userList" class="mr-4 user">จัดการพนักงาน</button> > เพิ่มพนักงานใหม่</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="flex wrapper-content w-full mt-8">
                <form class="flex w-full" @submit.prevent="register">
                    <div class="flex mt-52 w-5/12">
                        <div class="mx-auto text-center">
                            <span class="text-center font-th text-2xl">รูปประจำตัว</span>
                            <img class="w-52 mx-auto my-4" :src="form.image">
                            <input class="mx-auto upload-img font-eng rounded-md" @change="handleImage" type="file" accept="image/*">
                        </div>
                    </div>
                    <div class="w-7/12 mt-10 text-center">
                        <span class="text-2xl font-th">ข้อมูลพนักงาน</span>
                        <div class="w-4/6 h-5/6 pt-10 px-10 mt-10 mx-auto rounded-lg form-wrapper">
                            <span class="flex mb-4 font-th">ชื่อผู้ใช้</span>
                            <input class="w-full h-10 input px-3 font-th" v-model="form.username" type="text">
                            <div class="flex w-full mt-4">
                                <div class="w-2/4">
                                    <span class="flex font-th">รหัสผ่าน</span>
                                    <input type="password" class="flex w-11/12 my-4 h-10 input px-3 font-th" v-model="form.password">
                                </div>
                                <div class="w-2/4">
                                    <span class="flex font-th">ยืนยันรหัสผ่าน</span>
                                    <input type="password" class="w-full my-4 h-10 input px-3 font-th" v-model="form.confirmPassword">
                                </div>
                            </div>
                            <span class="flex font-th">ชื่อ</span>
                            <input class="w-full my-4 h-10 input px-3 font-th" type="text" v-model="form.firstname">
                            <span class="flex font-th">นามสกุล</span>
                            <input class="w-full mt-4 h-10 input px-3 font-th" type="text" v-model="form.surname">
                            <span class="flex font-th mt-4">ตำแหน่ง</span>
                            <select 
                                v-model="form.role"
                                class="w-full my-4 h-10 input px-3 font-th">
                                <option v-for="(role, index) in roles" :value="role.name" :key="index">
                                    {{role.th}}
                                </option>
                            </select>
                            <button class="confirm-button rounded-md mt-5 px-4 py-1" type="submit">ยืนยัน</button>
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
import AdminStore from "@/store/Admin"
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            form: {
                image: "/images/user_img.png",
                username: "",
                password: "",
                confirmPassword: "",
                firstname: "",
                surname: "",
                role:"",
            },
            roles:[
                {
                    id: 1,
                    name: "Employee",
                    th: 'พนักงาน',
                },
                {
                    id: 2,
                    name: "Header",
                    th: 'หัวหน้างาน',
                },
                {
                    id: 3,
                    name: "Admin",
                    th: 'แอดมิน',
                },
            ],
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
        handleImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.image = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        async userList(){
            this.$router.push('/user')
        },
        register(){
            Swal.fire({
                title: 'เพิ่มบัญชีพนักงาน',
                text: 'คุณต้องการเพิ่มบัญชีใช่หรือไม่?',
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
                    if(this.form.image !== "/images/user_img.png" && 
                       this.form.username !== "" &&
                       this.form.password !== "" &&
                       this.form.confirmPassword !== "" &&
                       (this.form.password === this.form.confirmPassword) &&
                       this.form.firstname !== "" &&
                       this.form.surname !== "" &&
                       this.form.role !== ""){
                        let newEmployee = {
                                image: this.form.image,
                                username: this.form.username,
                                password: this.form.password,
                                firstname: this.form.firstname,
                                surname: this.form.surname,
                                role: this.form.role,
                            } 
                            console.log(this.form.image);
                            AdminStore.dispatch('createUser', newEmployee)
                            Swal.fire({
                                title: 'เพิ่มบัญชีสำเร็จ',
                                icon: 'success',
                                showCloseButton: true,
                                showConfirmButton: false,
                            })
                            this.$router.push('/user')
                    }
                    else if(this.form.password !== this.form.confirmPassword){
                        Swal.fire({
                            title: 'ยืนยันรหัสผ่านไม่ถูกต้อง',
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                        })
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
</style>