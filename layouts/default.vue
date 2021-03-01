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
</template>

<script>
export default {

}
</script>
