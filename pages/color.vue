<template lang="pug">
div
  h1.h-80.lh-80.t-c 色相轮
  p(v-for="aColorGroup, i in aColor" :key="`color-group-${i}`")
    span.inbl.vtal-top.mb-10.mr-5(
      v-for="item, index in aColorGroup"
      :key="`color-${index}`"
    )
      .w-115.h-40(:style="`background-color: ${item}`")
      .w-115.lh-24.t-c.fs-12 {{item}}
</template>

<script>
export default {
  data() {
    return {
      aColor: []
    }
  },
  mounted() {
    let aColor = [];

    for (let i = 0; i <= 360; i = i + 10) {
      let aColorForOneHue = [];
      for (let j = 0; j <= 100; j = j + 10) {
        aColorForOneHue.push(`hsl(${i}, ${j}%, 50%)`);
      }
      aColor.push(aColorForOneHue);
    }

    this.aColor = aColor;
  }
}
</script>
