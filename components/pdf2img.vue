<template lang="pug">
.h-940.wp-100.ovfl-x-scroll.ovfl-y-hd.bd-1.bgs-80.bg-text.pt-5(ref="pdf-container")
  div.bg-white.pl-5.pst-rlt(:style="`width: ${nTotalWidth}px;`" v-if="type == 'pdf'")
    .inbl.vtal-top.pst-rlt.h-920.ovfl-y-scroll.mr-5.mb-5(v-for="item, index in data" :key="`${name}-canvas-${index}`" v-show="item.bShow")
      canvas.bd-1.bg-loading.bgs-60(:ref="`${name}-canvas-${index}`")
      a.pst-absl.r-5.t-0.w-50.h-20.bd-1.br-3.lh-20.bg-white.fs-12.t-c(:href="item.url" target="_blank") 详情

    .pst-absl.h-30.lh-30.fs-14.w-60.bg-white.r-0.b-0.t-c.cs-pt.bd-1.br-4.c-blue(v-if="bShowRenderRest" @click="renderNextPDF") 下一页

  div.bg-white.pl-5.pst-rlt(v-else :style="`width: ${nTotalWidth}px;`")
    .inbl.vtal-top.pst-rlt.h-920.ovfl-y-scroll.mr-5.mb-5(v-for="item, index in data" :key="`${name}-img-${index}`")
      img.w-1300(:src="item")
</template>

<script>
const pdfjsLib = require('pdfjs-dist/webpack')

export default {
  props: {
    type: String, // pdf or img
    data: Array,
    name: String,
    scale: Number,
    gap: Number,
  },
  data() {
    return {
      nTotalWidth: 5,
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
              let viewport = pdfPage.getViewport({ scale: this.scale });

              let canvas = this.$refs[ref][0]
              canvas.width = viewport.width;
              canvas.height = viewport.height;

              this.nTotalWidth = this.nTotalWidth + viewport.width + this.gap;

              let ctx = canvas.getContext("2d");

              let renderTask = pdfPage.render({
                canvasContext: ctx,
                viewport,
              })

              return renderTask
                .promise
                .then(() => {
                  this.$refs['pdf-container'].scrollLeft = this.nTotalWidth;
                });
            })
        })
        .catch((reason) => {
          console.error("Error: " + reason);
        });
    },
  },
  mounted() {
    if (this.type == 'pdf') this.renderNextPDF();
    if (this.type == 'img') this.nTotalWidth = (1300 + this.gap) * this.data.length;
  }
}
</script>
