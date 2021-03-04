<template lang="pug">
div.bg-white.pl-5(:style="`width: ${nTotalWidth}px;`")
  .inbl.vtal-top.pst-rlt(v-for="item, index in data"  :key="`bjnews-canvas-${index}`")
    canvas.bd-1.mr-5.mb-5.h-920.mw-650.bg-loading.bgs-60(
      :ref="`bjnews-canvas-${index}`"
    )
    a.pst-absl.r-5.t-0.w-50.h-20.bd-1.br-3.lh-20.bg-white.fs-12.t-c(:href="item.url" target="_blank") 详情
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
    }
  },
  mounted() {

    this.data.forEach((item, index) => {
      let loadingTask = pdfjsLib.getDocument(item.url);

      loadingTask
        .promise
        .then((pdfDocument) => {
          return pdfDocument
            .getPage(1)
            .then((pdfPage) => {
              let viewport = pdfPage.getViewport({ scale: 0.9 });

              let canvas = this.$refs[`bjnews-canvas-${index}`][0]
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
    })
  }
}
</script>
