<template>
<div class="header">
    <nav class="grid w-screen h-16 grid-cols-2">
      <div class="flex h-full">
        <a href="/home" class="text-5xl my-1 ml-2 ess font-eng">
            <span class="ee">ES</span>
            <span class="s">S</span> 
        </a>
      </div>
      <div class="flex flex-row-reverse mt-1 mr-2">
          <button class="flex profile" @click="profile">
              <span class="my-4 mr-3 font-th">สวัสดี, {{user.name}}</span>
              <div class="w-14 h-14 rounded-full bg-img">
                  <img class="w-12 h-12 rounded-full m-1" 
                  :src="user.image">
              </div>
          </button>
      </div>
  </nav>
</div>
  
</template>

<script>
import AuthUser from "@/store/AuthUser"
import FormatThai from "@/services/FormatThai"
export default {
    data(){
        return{
            user:{
                image: AuthUser.getters.user.image,
                name: AuthUser.getters.user.firstname + ' ' + AuthUser.getters.user.surname,
            },
        }
    },
    methods:{
        async profile() {
            Swal.fire({
                imageUrl: this.user.image,
                imageWidth: 400,
                imageAlt: 'Custom image',
                title: 'ข้อมูลส่วนตัว',
                text:  this.user.name + ' (' + FormatThai.formatRoleTH(AuthUser.getters.user.role) + ')' ,
                showCancelButton: false,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ออกจากระบบ',
            })
            .then((r) => {
                if(r.value){
                    Swal.fire({
                        title: 'ออกจากระบบ',
                        text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
                        icon: 'question',
                        showCancelButton: true,
                        showCloseButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((r) => {
                        if(r.value){
                            AuthUser.dispatch('logout')
                            Swal.fire({
                                title: 'ออกจากระบบสำเร็จ!',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false,
                            })
                            this.$router.push('/')
                        }
                    });
                }
            })
            
        },
    }
}
</script>

<style lang='scss' scoped>
.header{
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
.bg-img{
    background-color: #BCC8D6;
}
.ee{
    color: #DF554C;
}
.s{
    color: #57AEFF;
}
.ess:hover{
    .ee{
        color: #a0281f;
    }
    .s{
        color: #3280ca;
    }
}
.profile:hover{
    text-decoration: underline;
}
</style>