<template>
    <div>
      rhis is {{n}}
      <el-button @click="add">+1</el-button>
    </div>
</template>
<script>
    export default {
      name:"Demo-s",
        data(){ return {n:0} },     // data 必须为函数
        methods:{add(){ this.n += 1 }}
   }
</script>
<style> </style>



