<template>
  <transition name="slide-fade-left">
  <main     v-if="visible" class="absolute top0 bottom0 left0 right0  flex flex-direction bg-white  z-index10 " >
    <header class="flex align-center vertical-center height50 border-b pl16">
       <el-page-header @back="goBack" :content="title"   ></el-page-header>
    </header>
        <section class="p16 over-scroll flex1">
            <slot></slot>
        </section>
  </main>
  </transition>
</template>
<script>

export default {
  name: "DyPage",
  props: {
    visible: {
      type:Boolean,
      required:true,
    },
    title: {
      type: String,
      default: ''
    },
    navType:{
      type:String,
      default:'dialog'
    }

  },
  data: function () {
    return {}
  },
  computed: {
     
  },
  watch: {
    
  },
  mounted() {
    
  },
  components: {},
  methods: {
    goBack(){
      if(this.navType=='router'){
      this.$router.go(-1)
      }
      this.$emit('update:visible',false)
        this.$nextTick(()=>{
            debugger
            this.$emit('closed')
        })
        return 
    }
  },
};
</script>
<style lang="less" scoped>
.bg-white{
  background: white;
}
 .slide-fade-left-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-left-leave-active {
  transition: all 0.4s ease;
}
 .slide-fade-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-fade-left-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
.border-b{
  border-bottom: solid 1px var(--color-border-color);
}
</style>
