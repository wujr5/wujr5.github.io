<template lang="pug">
div.bg-white.pl-5.pst-rlt(:style="`width: ${nTotalWidth}px;`")
  .inbl.vtal-top.pst-rlt.h-920.ovfl-y-scroll(v-for="item, index in data" :key="`${name}-canvas-${index}`" v-show="item.bShow")
    canvas.bd-1.mr-5.mb-5.bg-loading.bgs-60(:ref="`${name}-canvas-${index}`")
    a.pst-absl.r-5.t-0.w-50.h-20.bd-1.br-3.lh-20.bg-white.fs-12.t-c(:href="item.url" target="_blank") 详情

  .pst-absl.h-30.lh-30.fs-14.w-60.bg-white.r-0.b-0.t-c.cs-pt.c-gray.bd-1.br-4(v-if="bShowRenderRest" @click="renderNextPDF") 下一页
</template>

<script>
const pdfjsLib = require('pdfjs-dist/webpack')

export default {
  props: {
    data: Array,
    name: String,
  },
  data() {
    return {
      nTotalWidth: 0,
      nCount: 0,
      bShowRenderRest: true,
    }
  },
  methods: {
    renderNextPDF() {
      this.data[this.nCount].bShow = true;
      this.renderOnePDF(this.data[this.nCount].url, `${this.name}-canvas-${this.nCount}`);
      this.nCount += 1;

      if (this.nCount === this.data.length) this.bShowRenderRest = false;
    },
    renderOnePDF(url, ref) {
      let loadingTask = pdfjsLib.getDocument(url);

      loadingTask
        .promise
        .then((pdfDocument) => {
          return pdfDocument
            .getPage(1)
            .then((pdfPage) => {
              let viewport = pdfPage.getViewport({ scale: 1.2 });

              let canvas = this.$refs[ref][0]
              canvas.width = viewport.width;
              canvas.height = viewport.height;

              this.nTotalWidth = this.nTotalWidth + viewport.width + 10;

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
    this.renderNextPDF();
  }
}
</script>
