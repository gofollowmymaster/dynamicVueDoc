<template>
    <div>
      rhis is {{n}}
      <el-button @click="add" size="mini">+1</el-button>
    </div>
</template>
<script>
import data  from "./data"
    export default {
      name:"Demo-s",
        data(){ return {n:data.a} },     // data 必须为函数
        methods:{add(){ this.n += 1 }}
   }
</script>
<style> </style>



