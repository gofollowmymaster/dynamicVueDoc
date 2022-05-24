<template>
    <!-- 普通展示 -->
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key}`"
         class="table-col-box  ">
         <slot></slot>
    </div>
</template>

<script>
    import TableColMixin from './mixin';

    export default {
        name: 'ColTeml',
        mixins: [ TableColMixin ],
        computed: {
             
        }
    };
</script>

<style scoped lang="less">
    
</style>
