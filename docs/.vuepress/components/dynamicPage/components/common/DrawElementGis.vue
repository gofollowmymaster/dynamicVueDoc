// props dialogVisible:{value:true} title 弹窗title zoom 地图视窗层级 推荐11  position 当前选择点位置[lon,lat]


<template>
  <el-dialog
    class="select-point-container"
    :title="title"
    :visible.sync="visible.value"
    :width="'45vw'"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-click-escape="false"
    :append-to-body="true"
  >
    <el-amap
      class="amap-box"
      vid="amap-vue"
      :events="events"
      v-bind="amapStyleConfig"

      @created="mapCreated"
    >
    <component   :is="elementType"  v-bind="elementInfo" :editable='true'></component>
    </el-amap>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clearDrawElement">清 除</el-button>
      <el-button type="primary" @click="selectPointConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import regionPath from './region'
  let   amapStyleConfig= localStorage.getItem('global_config')
     amapStyleConfig= amapStyleConfig?JSON.parse(amapStyleConfig):{}

export default {
  name: "DrawElementGis",
  props: {
    visible: {
      type: Object,
      default: function () {
        return { value: false };
      },
    },
    zoom: {
      type: Number,
      default: function () {
        return 11;
      },
    },
    title: {
      type: String,
      default: function () {
        return "选择位置";
      },
    },
      drawType: {
      type: String,
      default: function () {
        return "polygon";
      },
    },
    
    elementdata: {
      type: [Array],
      default: function () {
        return [];
      },
    },
  },
  model: {
    prop: "elementdata",
    event: "change",
  },
  data() {
    return {
      amapStyleConfig,
      // path: regionPath,
      center: [106.680603, 29.402348],
      events: {},
      drawTypeClone:''
      // overlays:[]
    };
  },
  computed: {
    elementType(){
      return 'el-amap-'+this.drawType
    },
    elementInfo(){
      debugger
      switch(this.drawType){
        case 'marker':
          return {position:this.elementdata}
        case 'polygon':
        case 'polyline':
          if(!Array.isArray(this.elementdata)) {
              console.warn('数据格式错误：'+this.elementdata)
            return 
          }
           return {path:this.elementdata}
        case 'circle':
        case 'ellipse':
        case 'rectangle':
          //todo 验证数据格式
           return this.elementdata
          default:
          throw '不支持的图形:'+this.drawType
      }
    }
  },

  mounted() {},
  methods: {
    selectPointConfirm() {
      if (this.elementdata.length < 1) {
        this.$alert("您还没有选择任何要素", "", {
          confirmButtonText: "确定",
          showCancelButton: true,
          callback: (action) => {
            if (action === "confirm") {
              this.visible.value = false;
            }
          },
        });
        return;
      }
      this.visible.value = false;
    },
    clearDrawElement() {
      this.$emit("change", []);
      this.initDrawTool()

    },
    handleClose() {
      this.$emit("change", []);
      // this.visible.value = false;

    },
    mapCreated(mapIns) {
      debugger
      // this.drawTypeClone=this.drawType
      // this.$forceUpdate()
      console.log('----mapCreated---')
      mapIns.plugin(["AMap.MouseTool"], () => {
        debugger
        this.mouseTool = new AMap.MouseTool(mapIns);
        this.initDrawTool()
      });
    },
    initDrawTool(){
         var drawObj = this.mouseTool[this.drawType]();
        AMap.event.addListener(this.mouseTool, "draw",  (e) =>{
          debugger
          const path = e.obj.getPath();

          const lnglatpoints = [];
          path.forEach((point) => {
            lnglatpoints.push([point.lng,point.lat]);
          });
          console.log(lnglatpoints );
          this.mouseTool.close(true);

          this.$emit("change", lnglatpoints);
        });
    }
  },
};
</script>

<style lang="css" scoped>
.amap-box {
  height: 40vh;
  min-height: 420px;
}

.select-point-container /deep/ .el-dialog__body {
  height: auto !important;
  padding: 0px 4px;
}
</style>
