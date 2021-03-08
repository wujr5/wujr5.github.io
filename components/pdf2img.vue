<template lang="pug">
div.bg-white.pl-5.pst-rlt(:style="`width: ${nTotalWidth}px;`")
  .inbl.vtal-top.pst-rlt(v-for="item, index in data"  :key="`bjnews-canvas-${index}`")
    canvas.bd-1.mr-5.mb-5.h-920.mw-650.bg-loading.bgs-60(
      :ref="`bjnews-canvas-${index}`"
    )
    a.pst-absl.r-5.t-0.w-50.h-20.bd-1.br-3.lh-20.bg-white.fs-12.t-c(:href="item.url" target="_blank") 详情

  .pst-absl.h-100.lh-100.w-200.bg-white.l-850.t-380.t-c.cs-pt.c-gray(v-if="bShowRenderRest" @click="renderRestPDF") 查看剩余内容
</template>

<script>
const pdfjsLib = require('pdfjs-dist/webpack')

export default {
  props: {
    data: Array
  },
  data() {
    return {
      nTotalWidth: 0,
      bShowRenderRest: true,
    }
  },
  methods: {
    renderRestPDF() {
      this.bShowRenderRest = false;

      this.data.forEach((item, index) => {
        if (index == 0) return;

        this.renderOnePDF(item.url, `bjnews-canvas-${index}`)
      })
    },
    renderOnePDF(url, ref) {
      let loadingTask = pdfjsLib.getDocument(url);

      loadingTask
        .promise
        .then((pdfDocument) => {
          return pdfDocument
            .getPage(1)
            .then((pdfPage) => {
              let viewport = pdfPage.getViewport({ scale: 0.9 });

              let canvas = this.$refs[ref][0]
              canvas.width = viewport.width;
              canvas.height = viewport.height;

              this.nTotalWidth = this.nTotalWidth + viewport.width + 7;

              let ctx = canvas.getContext("2d");

              let renderTask = pdfPage.render({
                canvasContext: ctx,
                viewport,
              })

              return renderTask.promise;
            })
        })
        .catch((reason) => {
          console.error("Error: " + reason);
        });
    }
  },
  mounted() {
    this.renderOnePDF(this.data[0].url, `bjnews-canvas-${0}`);
  }
}
</script>
