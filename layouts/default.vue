<template lang="pug">
div
  .h-60.t-r.pr-100(style="background-color: hsl(180, 100%, 40%)")
    nuxt-link.inbl.vtal-top.h-60.lh-60.w-150.t-c.c-white(
      to="/"
      :style="`background-color: hsl(180, ${$route.path == '/' ? '50%' : '100%'}, 40%); text-decoration: none`"
    ) 首页
    nuxt-link.inbl.vtal-top.h-60.lh-60.w-150.t-c.c-white(
      to="/color"
      :style="`background-color: hsl(180, ${$route.path == '/color' ? '50%' : '100%'}, 40%); text-decoration: none`"
    ) 色相轮
  Nuxt
  .h-150(style="background-color: hsl(0, 0%, 95%)")
    .h-98.lh-98.t-c.fs-36 雄关漫道真如铁，而今迈步从头越
    .h-12.lh-12.fs-12.t-r.pr-380(style="color: #999") —— 毛泽东·《忆秦娥·娄山关》
    .h-40.lh-40.fs-14.t-c(style="color: #aaa") Copyright @ wujr5.cn, {{year}}
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
