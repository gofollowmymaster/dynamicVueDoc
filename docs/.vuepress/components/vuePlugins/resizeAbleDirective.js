import Vue from 'vue'


export default {
  inserted: function (resize, binding, vnode) {
    setTimeout(()=>{
      const left = getPrevElement(resize);
      const mid =getPrevElement(resize);
      const box = resize.parentNode;
      // 鼠标按下事件
      resize.onmousedown = function(e) {
        const startX = e.clientX;
        const resizeLeft = resize.offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function(e) {
          debugger
          const moveX = e.clientX;
          let moveLen = resizeLeft + (moveX - startX);
          const maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
          moveLen = moveLen < 32 ? 32 : moveLen; //左边区域最小宽度为32px
          moveLen = moveLen > (maxT - 150) ? maxT - 150 : moveLen; //右边区域最小宽度为150px
          left.style.width = moveLen + 'px';
          // mid.style.left = moveLen + 'px';
          // resize.style.left = (moveLen - 5) + 'px';
        };
        // 鼠标松开事件
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    })
   
 
  }
}
 
function getNextElement(element) {
  var el = element;
  while (el = el.nextSibling) {
      if (el.nodeType === 1) {
          return el;
      }
  }
  return null;
}

function getPrevElement(element) {
  var el = element;
  while (el = el.previousSibling) {
      if (el.nodeType === 1) {
          return el;
      }
  }
  return null;
}