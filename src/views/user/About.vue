<template>
  <div class="w-full h-full background">
      <Header></Header>
      <div class="flex">
        <Sidebar :page="'about'"></Sidebar>
        <div class="pad mx-auto mt-7">
            <span class="flex header-text text-4xl font-th mb-3">เกี่ยวกับเรา</span>
            <span class="date-text font-th">{{currentDate()}}</span>
            <div class="wrapper-content w-full mt-8">
                <div class="w-full text-center pt-10 mb-10">
                    <span class="text-3xl font-th">รายชื่อสมาชิก</span>
                </div>
                <div class="w-full h-5/6 overflow-y-scroll">
                    <div class="w-2/6 text-center mx-auto py-5 mb-8 rounded-md profile_wrapper">
                        <img class="w-40 mx-auto mb-5" src="/images/member1.jpg" alt="">
                        <div class="mx-auto font-th">
                            <div class="mb-4">
                                <span>ชื่อ : นายขวัญ ศรีพุทธา</span>
                            </div>
                            <div class="mb-4">
                                <span>รหัส : 6201101101024</span>
                            </div>
                            <div class="mb-4">
                                <span>มหาวิทยาลัยธนบุรี</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="w-2/6 text-center mx-auto py-5 my-8 rounded-md profile_wrapper">
                        <img class="w-40 mx-auto mb-5" src="/images/member2.jpg" alt="">
                        <div class="mx-auto font-th">
                            <div class="mb-4">
                                <span>ชื่อ : นางสาวสุดารัตน์ บุญส่ง</span>
                            </div>
                            <div class="mb-4">
                                <span>รหัส : 6201101101005</span>
                            </div>
                            <div class="mb-4">
                                <span>มหาวิทยาลัยธนบุรี</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="w-2/6 text-center mx-auto py-5 my-8 rounded-md profile_wrapper">
                        <img class="w-40 mx-auto mb-5" src="/images/member3.jpg" alt="">
                        <div class="mx-auto font-th">
                            <div class="mb-4">
                                <span>ชื่อ : นางสาวพวงผกา ศรีสมบูรณ์</span>
                            </div>
                            <div class="mb-4">
                                <span>รหัส : 6201101101036</span>
                            </div>
                            <div class="mb-4">
                                <span>มหาวิทยาลัยธนบุรี</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="w-2/6 text-center mx-auto py-5 my-8 rounded-md profile_wrapper">
                        <img class="w-40 mx-auto mb-5" src="/images/member4.jpg" alt="">
                        <div class="mx-auto font-th">
                            <div class="mb-4">
                                <span>ชื่อ : นายพิสิฐพงษ์ การธารี</span>
                            </div>
                            <div class="mb-4">
                                <span>รหัส : 6201101101033</span>
                            </div>
                            <div class="mb-4">
                                <span>มหาวิทยาลัยธนบุรี</span>
                            </div>
                            
                        </div>
                    </div>
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
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
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
    },
}
</script>

<style lang='scss' scoped>
.profile_wrapper{
    color: #fff;
    background-color: rgb(128, 60, 60);
}
</style>