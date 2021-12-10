<template>
  <div class="flex w-full h-full">
    <div>
      <div class="ess">
        <div class="flex font-eng text-8xl my-3">
          <span class="es ml-auto">ES</span><span class="s mr-auto">S</span>
        </div>
      </div>
      <img class="backgrond-gif" src="/images/background.gif" alt="">
    </div>
    <div class="w-96 mx-auto">
      <div class="flex mt-56">
        <span class="font-th text-4xl mx-auto text-center">ลงชื่อเข้าใช้</span>
      </div>
      <form class="w-80 mx-auto mt-20" @submit.prevent="submit">
        <span class="font-th text-lg">ชื่อผู้ใช้</span>
        <input class="input font-eng w-full rounded-md h-10 px-3 mt-3 mb-10" type="text" v-model="form.username">
        <span class="font-th text-lg">รหัสผ่าน</span>
        <input class="input font-eng w-full rounded-md h-10 px-3 mt-3 mb-10" type="password" v-model="form.password">
        <div class="flex w-full">
          <button class="submit-btn font-th px-4 py-1 rounded-md mx-auto" type="submit">ยืนยัน</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthUser from '../../store/AuthUser'
import moment from 'moment'
export default {
  components:{
  },
  data() {
      return {
          form: {
              username: "",
              password: "",
          },
          errors: '',
      }
  },
  methods:{
    async submit(e){
      e.preventDefault()
      if(this.form.username !== '' && this.form.password !== ''){
        let res = await AuthUser.dispatch('login', this.form)
        if(res.success){
          swal.fire({
            title: "ลงชื่อเข้าใช้สำเร็จ",
            text: 'ยินดีต้อนรับ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
          let user = {
            id: AuthUser.getters.user.id,
            login_time: moment().format('YYYY-MM-DD HH:mm:ss')
          }
          await AuthUser.dispatch('updateLoginTime', user)
          this.$router.push('/home')
        }
        else if(!res.success){
          swal.fire({
              title: "ชื่อผู้ใช้หรือรหัสผ่านผิด",
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
          })
        }
      }
      else{
        swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบ",
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
      }
    },
    clearForm() {
        this.form = {
            username: "",
            password: ""
        }
    }
  },
}
</script>

<style lang='scss' scoped>
.backgrond-gif{
  width: 1300px;
}
.input{
  background-color: #FFE7A9;
}
.submit-btn{
  color: #fff;
  background-color: #53946D;
}
.ess{
  position: absolute;
  width: 400px;
  height: 120px;
  left: 450px;
  top: 228px;
  background: #DF554C;
  border-radius: 20px;
  .es{
    color: #B9F694;
  }
  .s{
    color: #CFFFFC;
  }
}
</style>