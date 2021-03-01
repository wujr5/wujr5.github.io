<template lang="pug">
div
  .h-1356.w-1356.vh-parent
    .vh.w-10.h-10.bg-black.br-50(style="z-index: 100")
    div.bg-yellow(v-for="aColorGroup, nHueIndex in aColor" :key="`color-group-${nHueIndex}`")
      span.inbl.vtal-top.pst-absl(
        v-for="item, index in aColorGroup"
        :key="`color-${index}`"
        :style="`\
        left: ${((nDiameter / 2 * index / aColorGroup.length) * Math.cos(nHueIndex / aColor.length * Math.PI * 2)) + nOriginX}px; \
        top: ${((nDiameter / 2 * index / aColorGroup.length) * Math.sin(nHueIndex / aColor.length * Math.PI * 2)) + nOriginY}px;\
        transform-origin: 50%, 50%;\
        transform: translate(-50%, -50%) rotate(${360 * nHueIndex / aColor.length + 90}deg);\
        `"
      )

        div.h-0(
          :style="`\
          width: ${180 * index / aColorGroup.length}px;\
          border-width: ${180 * index / aColorGroup.length / 2}px ${180 * index / aColorGroup.length / 2 / 2}px 0px ${180 * index / aColorGroup.length / 2 / 2}px; \
          border-color: ${item} transparent transparent transparent; \
          border-style: solid;`"
        )
</template>

<script>
import config from '@/assets/config'

export default {
  head() {
    return {
      title: '色相轮' + config.sPageBaseTitle,
    }
  },
  data() {
    // 色相轮直径
    let nDiameter = 1356;

    return {
      aColor: [[]], // 颜色数组
      nDiameter,
      nOriginX: nDiameter / 2, // 原点 x 坐标
      nOriginY: nDiameter / 2, // 原点 y 坐标
    }
  },
  mounted() {
    let aColor = [];

    for (let i = 0; i < 360; i = i + 15) {
      let aColorForOneHue = [];
      for (let j = 0; j <= 100; j = j + 10) {
        aColorForOneHue.push(`hsl(${i}, ${j}%, 40%)`);
      }
      aColor.push(aColorForOneHue);
    }

    this.aColor = aColor;
  }
}
</script>
