<template lang="pug">
div
  .h-50(style="background-color: hsl(180, 100%, 40%)")
    .layout-default.t-r.pl-10
      //- .inbl.vtal-top.h-50.w-50.fl-l.vh-parent
        img.w-80.h-80.pst-absl.l-10.t-5(src="/wu.png")
      nuxt-link.inbl.vtal-top.h-50.lh-50.w-130.t-c.c-white(
        to="/"
        :style="`background-color: hsl(180, ${$route.path == '/' ? '50%' : '100%'}, 40%); text-decoration: none`"
      ) 日程
      nuxt-link.inbl.vtal-top.h-50.lh-50.w-130.t-c.c-white(
        to="/color"
        :style="`background-color: hsl(180, ${$route.path == '/color' ? '50%' : '100%'}, 40%); text-decoration: none`"
      ) 色相轮
      nuxt-link.inbl.vtal-top.h-50.lh-50.w-130.t-c.c-white(
        to="/strategy"
        :style="`background-color: hsl(180, ${$route.path == '/strategy' ? '50%' : '100%'}, 40%); text-decoration: none`"
      ) 策略
      nuxt-link.inbl.vtal-top.h-50.lh-50.w-130.t-c.c-white(
        to="/resume"
        :style="`background-color: hsl(180, ${$route.path == '/resume' ? '50%' : '100%'}, 40%); text-decoration: none`"
      ) 简历

  Nuxt.layout-default.bg-white(style="min-height: calc(100vh - 50px)")

  //- .pst-fx.w-65.h-65.lh-65.br-65.t-c.bd-1.b-160.r-50.fs-14.cs-pt.c-gray.bg-white(@click="fixedPage") {{bFixedPage ? '允许' : '禁止'}}滚动

  .h-150(style="background-color: hsl(0, 0%, 95%)")
    .layout-default
      .h-78.lh-78.t-c.fs-36 雄关漫道真如铁，而今迈步从头越
      .h-12.lh-12.fs-12.t-r.pr-350(style="color: #999") —— 毛泽东·《忆秦娥·娄山关》
      .h-30.lh-30.fs-14.t-c(style="color: #aaa") Copyright @ wujr5.cn, {{year}},
        a.ml-8(href="https://github.com/wujr5/wujr5.github.io" target="_blank" style="text-decoration: none; color: #aaa") github.com/wujr5/wujr5.github.io

      .h-30.lh-30.fs-14.t-c(style="color: #aaa")
        span {{sVersion}}
        span （{{sComment}}）

</template>

<style>
.layout-default {
  width: 1356px;
  height: 100%;
  margin: 0 auto;
}
</style>

<script>
import config from '@/assets/config'

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      bFixedPage: false,
      sVersion: config.sVersion,
      sComment: config.sComment
    }
  },
  methods: {
    fixedPage() {
      document.getElementsByTagName('html')[0].style['overflow-y'] = this.bFixedPage ? 'scroll' : 'hidden';
      document.getElementById('__layout').style.backgroundColor = this.bFixedPage ? '#fff' : '#222';
      this.bFixedPage = !this.bFixedPage;
    }
  }
}
</script>
