<template>
  <div id="app" class="w-screen h-screen">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style lang="scss">
.bg-color-gray{
  background-color: #F8F8F8;
}
.wrapper{
    width: 1670px;
    // background-color: #fff;
    // box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}
.wrapper-content{
    height: 750px;
    background-color: #fff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}
.pad{
    width: 1670px;
}
.background{
    background-color: #eeeeee;
}
.header-text{
    color: #DF554C;
}
.date-text{
    color: #676767;
}
.delete-btn{
    font-weight: bold;  
}
.delete-btn:hover{
    color: #DF554C;
}
</style>