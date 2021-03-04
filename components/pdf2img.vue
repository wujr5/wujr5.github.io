<template lang="pug">
div(:style="`width: ${nTotalWidth}px; height: 800px`")
  canvas.inbl.vtal-top.bd-1.mr-5.mb-5(
    v-for="item, index in data"
    :ref="`bjnews-canvas-${index}`"
    :key="`bjnews-canvas-${index}`"
  )
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

              this.nTotalWidth = this.nTotalWidth + viewport.width + 12;

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
