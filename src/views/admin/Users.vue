<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'user'"></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3">จัดการพนักงาน</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="wrapper-content w-full mt-8">
                <div class="flex w-full px-5 py-8 font-th">
                    <input class="input w-full h-10 rounded-md mr-4 text-center"
                        placeholder="ค้นหาพนักงานในระบบ"
                        type="text"
                        v-model="searchUser">
                    <button class="button w-60 rounded-md" @click="addUser">เพิ่มพนักงานใหม่</button>
                </div>
                <div class="w-full px-5">
                    <table class="w-full">
                        <thead class="w-full font-th">
                            <tr class="flex w-full h-10 py-2 column">
                                <th class="w-1/12">ไอดี</th>
                                <th class="w-4/12">ชื่อ - นามสกุล</th>
                                <th class="w-2/12">ตำแหน่ง</th>
                                <th class="w-3/12">เวลาลงชื่อเข้าใช้ล่าสุด</th>
                                <th class="w-2/12 text-center"></th>
                                <th class="w-1/12 text-center"></th>
                            </tr>
                        </thead>
                        <div class="flex table-body w-full overflow-y-scroll">
                            <tbody class="w-full">
                                    <tr class="flex h-10 border-b-2 py-2 text-sm" v-for="(user, index) in resultQuery" :key="index">
                                        <div class="flex w-full font-th">
                                            <td class="w-1/12 text-center">{{index + 1}}</td>
                                            <td class="w-4/12 text-center" ><button class="status-btn" @click="editName(user.id)">{{user.firstname}}</button><button class="ml-2 status-btn" @click="editSurname(user.id)">{{user.surname}}</button></td>
                                            <td class="w-2/12 text-center">{{getRoleTH(user.role)}}</td>
                                            <td class="w-3/12 text-center">{{user.login_time}}</td>
                                            <td class="w-2/12 text-center"><button @click="updateStatus(user)" class="status-btn font-th" v-bind:class="{'text-emerald-600':user.status === 'active', 'text-red-700': user.status === 'banned'}">{{getStatusTH(user.status)}}</button></td>
                                            <td class="w-1/12 text-center"><button @click="removeUser(user)" class="font-bold font-th delete-btn">x</button></td>
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
import AdminStore from "@/store/Admin"
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            searchUser: null,
            allUsers: [],
            searchList: [],
            user:{
                firstname: '',
                surname: '',
                role: '',
            },
        }
    },
    components:{
        Header,
        Sidebar,
    },
    created(){
        this.fetchAllUser()
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
        async fetchAllUser(){
            await AdminStore.dispatch('fetchAllUser')
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
        },
        async addUser(){
            this.$router.push('/create-user')
        },
        currentDate(){
            return moment().format('DD') + ' ' + FormatThai.formatMonthTH(moment().format('MM')) + ' ' + FormatThai.formatYearTH(moment().format('YYYY'))
        },
        getStatusTH(status){
            if(status === 'active'){
                return 'ใช้งานได้'
            }
            else{
                return 'ถูกระงับ'
            }
        },
        editName(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขชื่อผู้ใช้',
                text: 'กรอกชื่อผู้ใช้ใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (firstname) => {
                    this.user.firstname = firstname
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'ชื่อผู้ใช้เปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.user.firstname +'</span>', 
                        text: 'คุณต้องการเปลี่ยนชื่อผู้ใช้ใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        
                        if(result.value){
                            this.updateName(id, this.user.firstname)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนชื่อผู้ใช้เสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllUser()
                        }
                    })
                }
            })
        },
        async updateName(id, firstname){
            let user = {
                id: id,
                firstname: firstname,
            }
            await AdminStore.dispatch('updateName', user)
        },
        editSurname(id){
            Swal.fire({
                icon: 'info',
                title: 'แก้ไขนามสกุลผู้ใช้',
                text: 'กรอกนามสกุลผู้ใช้ใหม่',
                input: 'text',
                showCloseButton: true,
                confirmButtonText: 'ตกลง',

                preConfirm: (surname) => {
                    this.user.surname = surname
                },
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        icon:'question',
                        title: 'นามสกุลผู้ใช้เปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.user.surname +'</span>', 
                        text: 'คุณต้องการเปลี่ยนนามสกุลผู้ใช้ใช่หรือไม่',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((result) => {
                        
                        if(result.value){
                            this.updateSurname(id, this.user.surname)
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนนามสกุลผู้ใช้เสร็จสิ้น',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            this.fetchAllUser()
                        }
                    })
                }
            })
        },
        async updateSurname(id, surname){
            let user = {
                id: id,
                surname: surname,
            }
            await AdminStore.dispatch('updateSurname', user)
        },
        // editRole(id){
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'แก้ไขตำแหน่งผู้ใช้',
        //         text: 'กรอกตำแหน่งผู้ใช้ใหม่',
        //         input: 'text',
        //         showCloseButton: true,
        //         confirmButtonText: 'ตกลง',

        //         preConfirm: (role) => {
        //             this.user.role = role
        //         },
        //     })
        //     .then((r) => {
        //         if(r.value){
        //             Swal.fire({
        //                 icon:'question',
        //                 title: 'ตำแหน่งผู้ใช้เปลี่ยนเป็น ' +  '<span class="text-emerald-600 font-eng">' + this.user.role +'</span>', 
        //                 text: 'คุณต้องการเปลี่ยนตำแหน่งผู้ใช้ใช่หรือไม่',
        //                 showCancelButton: true,
        //                 confirmButtonColor: '#3085d6',
        //                 cancelButtonColor: '#d33',
        //                 confirmButtonText: 'ใช่',
        //                 cancelButtonText: 'ไม่',
        //             })
        //             .then((result) => {
                        
        //                 if(result.value){
        //                     this.updateRole(id, this.user.role)
        //                     Swal.fire({
        //                         icon: 'success',
        //                         title: 'เปลี่ยนตำแหน่งผู้ใช้เสร็จสิ้น',
        //                         showConfirmButton: false,
        //                         timer: 1500,
        //                     })
        //                     this.fetchAllUser()
        //                 }
        //             })
        //         }
        //     })
        // },
        // async updateRole(id, role){
        //     let user = {
        //         id: id,
        //         role: role,
        //     }
        //     await AdminStore.dispatch('updateRole', user)
        // },
        updateStatus(user){
            if(user.status === 'active'){
                Swal.fire({
                    icon:'question',
                    title: 'ระงับการใช้งาน', 
                    text: 'คุณต้องการระงับการใช้งาน ชื่อผู้ใช้ ' + user.username + ' ' + 'ใช่หรือไม่',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ใช่',
                    cancelButtonText: 'ไม่',
                })
                .then((result) => {
                    if(result.value){
                        this.updateStatusDB(user.id, 'banned')
                        Swal.fire({
                            icon: 'success',
                            title: 'ระงับการใช้งานเสร็จสิ้น',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                        this.fetchAllUser()
                    }
                })
            }
            else{
                Swal.fire({
                    icon:'question',
                    title: 'ยกเลิกระงับการใช้งาน', 
                    text: 'คุณต้องยกเลิกการระงับการใช้งาน ชื่อผู้ใช้ ' + user.username + ' ' + 'ใช่หรือไม่',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ใช่',
                    cancelButtonText: 'ไม่',
                })
                .then((result) => {
                    if(result.value){
                        this.updateStatusDB(user.id, 'active')
                        Swal.fire({
                            icon: 'success',
                            title: 'ยกเลิกระงับการใช้งานเสร็จสิ้น',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                        this.fetchAllUser()
                    }
                })
            }
        },
        async updateStatusDB(id, status){
            let user = {
                id: id,
                status: status,
            }
            await AdminStore.dispatch('updateStatus', user)
        },
        removeUser(user){
            Swal.fire({
                icon:'question',
                title: '<span class="text-red-500 font-eng">ลบบัญชี</span>', 
                text: 'คุณต้องลบบัญชีผู้ใช้ ' + user.username + ' ' + 'ใช่หรือไม่',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            })
            .then((result) => {
                if(result.value){
                    this.remove(user.id)
                    Swal.fire({
                        icon: 'success',
                        title: 'ลบบัญชีเสร็จสิ้น',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.fetchAllUser()
                }
            })
        },
        async remove(id){
            await AdminStore.dispatch('removeUser', id)
        },
        getRoleTH(role){
            if(role === 'Header'){
                return 'หัวหน้างาน'
            }
            else {
                return 'พนักงาน'
            }
        }
    },
    computed: {
        resultQuery(){
            if(this.searchUser){
                return this.allUsers.filter((item)=>{
                    return this.searchUser.toLowerCase().split(' ').every(v => (item.firstname + item.surname).toLowerCase().includes(v))
                })
                }else{
                    return this.allUsers;
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
.status-btn:hover{
    text-decoration: underline;
}
</style>