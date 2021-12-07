# h5预览pdf
```javascript
//   "pdfjs": "^2.3.5",
//   "pdfjs-dist": "^2.2.228",
<template>
  <div class="container">
    <div class="pdfList"></div>
      <!-- <div class="arrow" v-show="btnshow">
      <div
        @click="changePdfPage(0)"
        :class="currentPage == 1 ? 'first' : 'nofirst'"
        >{{ currentPage == 1 ? '首页' : '上一页' }}</div
      >

      <div
        @click="changePdfPage(1)"
        :class="currentPage == page_count ? 'first' : 'nofirst'"
        >{{ currentPage == page_count ? '尾页' : '下一页' }}</div
      >
    </div> -->
  </div>
</template>
<script>
import PDFJS from "pdfjs-dist/webpack";
export default {
  data() {
    return {
      fileNamePdf: '',
      currentPage: "",
      btnshow: false,
      abc: "",
      pdfDoc: null, //pdfjs 生成的对象
      pageNum: 1, //
      pageRendering: false,
      pageNumPending: null,
      scale: 1, //放大倍数
      page_num: 0, //当前页数
      page_count: 0, //总页数
      ctx: null,
      maxScale: 3,
      minScale: 1,
      bigOrsmall: false,
    };
  },
  created() {
    PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min.js");
    this.init()
  },
  mounted() {
    let height = document.body.clientHeight; //窗口的宽度
    var pdfList1 = document.querySelector(".pdfList");
    pdfList1.style.position = 'relative'
    pdfList1.style.top = -30 + 'px'
     this.ready(() => {
      this.$store.state.history.length = 1
      this.fileNamePdf = this.nativeStartupParams().fileNamePdf
      this.nativeStartupParams().title ? this.nativeSetTitle(this.nativeStartupParams().title) : this.nativeSetTitle('协议')
      this.init()
    })
  },
  methods: {
    init() {
      var param = {
        fileName: this.fileNamePdf, // 文件名称
      };
      this.rpcDo("xxxxxxxx.do", param, (res) => {
           // 后端返回文件流
          //  let base64 = new Blob([res], { type: "application/pdf" });
          // var reader = new FileReader();
          // reader.readAsDataURL(base64);
          // reader.onload = () => {
          //   console.log(reader.result);
          // this.abc = reader.result.split(',')[1];
          //this.getBase64();
        // }
        if (res.RespCode === "000000") {
          // 后端返回base64
          this.abc = res.result;
          this.getBase64();
        } else {
          AlipayJSBridge.call("popWindow");
        }
      });
    },
    getBase64() {
      let res = this.abc;
      let raw = window.atob(res);
      let rawLength = raw.length;
      let rawArray = new Uint8Array(new ArrayBuffer(rawLength));
      for (var i = 0; i < rawLength; i++) {
        rawArray[i] = raw.charCodeAt(i);
      }
      var that = this;
      PDFJS.getDocument(rawArray).then(function (pdfDoc_) {
          console.log(pdfDoc_.numPages);
          that.pdfDoc = pdfDoc_;
          that.page_count = that.pdfDoc.numPages;
          that.currentPage = 1;
          that.renderPage();
        })
        .catch((err) => {
          alert(err);
        });
    },
     renderPage() {
      let pdfList = document.querySelector(".pdfList"); //通过querySelector选择DOM节点,使用document.getElementById()也一样
      for (let i = 1; i <= this.page_count; i++) {
        //循环页数
        let canvas = document.createElement("canvas");
        this.pdfDoc.getPage(i).then((res) => {
          let page = res;
          let width = document.body.clientWidth; //窗口的宽度
          let viewport = page.getViewport(2);
          let context = canvas.getContext("2d"); //创建绘制canvas的对象
          canvas.height = viewport.height; //定义canvas高和宽
          canvas.width = viewport.width;
          let renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
          canvas.className = "canvas"; //给canvas节点定义一个class名,这里我取名为canvas
          pdfList.appendChild(canvas); //插入到pdfList节点的最后
           if (this.currentPage-0 != this.page_count-0) this.btnshow = true;
        });
      }
    },
    // 翻页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        this.renderPage();
      }
      if (val === 1 && this.currentPage < this.page_count) {
        this.currentPage++;
        this.renderPage();
      }
    },
    // 分页
    renderPage2() {
      let pdfList = document.querySelector(".pdfList"); //通过querySelector选择DOM节点,使用document.getElementById()也一样
      pdfList.innerHTML = "";
      // for (let i = 1; i <= this.page_count; i++) {
      //循环页数
      let canvas = document.createElement("canvas");
      this.pdfDoc.getPage(this.currentPage).then((res) => {
        let page = res;
        let width = document.body.clientWidth; //窗口的宽度
        let viewport = page.getViewport(2);
        let context = canvas.getContext("2d"); //创建绘制canvas的对象
        canvas.height = viewport.height; //定义canvas高和宽
        canvas.width = viewport.width;
        let renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        // page.render(renderContext).then(() => {
        //   canvas.className = "canvas"; //给canvas节点定义一个class名,这里我取名为canvas
        //   pdfList.appendChild(canvas); //插入到pdfList节点的最后
        // });
        page.render(renderContext);
        canvas.className = "canvas"; //给canvas节点定义一个class名,这里我取名为canvas
        pdfList.appendChild(canvas); //插入到pdfList节点的最后
        if (this.currentPage-0 != this.page_count-0) this.btnshow = true;
      });
      // }
    },
    // 不分页

  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.canvas {
  // width: 750px!important;
  // background-color: red;
}
.container {
  height: 100%;
  // overflow-x: hidden;
  // overflow-y: hidden;
  background: #ffffff;
  word-break: break-all;
  // width: 750px;
  width: 100%;
  // background-color: red;
  	overflow-x: hidden;
		overflow-Y:scroll;
		 -webkit-overflow-scrolling:touch;
}
.container2 {
  overflow-x: hidden;
  overflow-y: hidden;
  // background: red;
  // height: 100%;
  // margin-bottom: 80px;
  // padding-bottom: 30px;
}
.arrow {
  height: 100px;
  line-height: 100px;
  text-align: center;
  z-index: 99;
  position: fixed;
  bottom: 20px;
  width: 100%;
  // background-color: red;
   display: flex;
   align-items: center;
   justify-content: center;
}

.first {
  color: #ffffff;
  background-color: #ccc;;
  padding: 15px 30px;
  margin: 30px;
  border-radius: 15px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  // display: block;


}
.nofirst {
  color: #ffffff;
  background-image: linear-gradient(135deg, #0086f3 0%, #4ca9f4 100%);
  padding: 15px 30px;
  margin: 30px;
  border-radius: 15px;
   width: 100px;
   height: 30px;
   line-height: 30px;
  //  display: block;
}
</style>
<style lang="less">
.canvas {
  width: 120%;
  margin-left: -10%;
  // height: 100%;
}
.pdfList {
  // height: 100%;
}
</style>
```



# h5录制视频
```javascript
 <input id="file"  name="file" type="file" ref="filElem" accept="video/*" capture="camcorder"  @change="addVideo" />

 addVideo (e) {
    let file = e.target.files[0];
    if (file.size > 209715200) {
      Dialog.alert({
        title: "温馨提示",
        content: "上传视频超过200M，请重新上传",
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      var imgNum = evt.target.result.split(";base64,")[1]; // 接口要的参数， 视频的base64
    }
 }
```