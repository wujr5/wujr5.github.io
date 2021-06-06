<template lang="pug">
  .p-20.pt-40
    h2 {{sDateStr}}

    .my-20
      .todo-item.inbl.vtal-top.w-178.h-60.lh-60.bd-1.t-c.mr-10.mb-10.br-4.pst-rlt(
        v-for="todo, index in aTodoList" :key="`todo-${index}`"
        :style="todo.bCheck ? 'background-color: #ddd' : ''"
      )
        a(v-if="todo.link" :href="`${todo.link}?t=${sTimeStamp}`" target="_blank" style="text-decoration: none; color: blue") {{todo.title}}
        span(v-else) {{todo.title}}

        .check-item.pst-absl.lh-16.fs-12.r-5.b-0.cs-pt(style="color: #bbb;" @click="todo.bCheck = !todo.bCheck") {{todo.bCheck ? 'Uncheck' : 'Check'}}

    h2.mb-10 新京报
    div(v-if="aBJnews && aBJnews.length > 0")
      a.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="item, index in aBJnews"
        :href="item.url"
        target="_blank"
      ) {{index + 1}}
    .h-50.w-100.bg-loading(v-else-if="aBJnews && aBJnews.length == 0")
    .h-50.w-100(v-else) 无数据

    h2.my-10 人民日报
    div(v-if="aRMDailyNews && aRMDailyNews.length > 0")
      a.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="item, index in aRMDailyNews"
        :href="item.url"
        target="_blank"
      ) {{index + 1}}
    .h-50.w-100.bg-loading(v-else-if="aRMDailyNews && aRMDailyNews.length == 0")
    .h-50.w-100(v-else) 无数据

    h2.mb-10 参考环球
    div(v-if="aCankaoxiaoxi && aCankaoxiaoxi.length > 0")
      a.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="item, index in aCankaoxiaoxi"
        :href="item"
        target="_blank"
      ) {{index + 1}}
    .h-50.w-100.bg-loading(v-else-if="aCankaoxiaoxi && aCankaoxiaoxi.length == 0")
    .h-50.w-100(v-else) 无数据

    h2.mb-10 经济日报
    div(v-if="aEconomyDaily && aEconomyDaily.length > 0")
      a.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="item, index in aEconomyDaily"
        :href="item.url"
        target="_blank"
      ) {{index + 1}}
    .h-50.w-100.bg-loading(v-else-if="aEconomyDaily && aEconomyDaily.length == 0")
    .h-50.w-100(v-else) 无数据

    h2.mb-10 中国环境报
    div(v-if="aEnvironmentNews && aEnvironmentNews.length > 0")
      a.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="item, index in aEnvironmentNews"
        :href="item.url"
        target="_blank"
      ) {{index + 1}}
    .h-50.w-100.bg-loading(v-else-if="aEnvironmentNews && aEnvironmentNews.length == 0")
    .h-50.lh-50.w-100.c-gray(v-else) 无数据

    h2.mb-10 羊城晚报
    div(v-if="aYangchengNews && aYangchengNews.length > 0")
      a.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="item, index in aYangchengNews"
        :href="item.url"
        target="_blank"
      ) {{index + 1}}
    .h-50.w-100.bg-loading(v-else-if="aYangchengNews && aYangchengNews.length == 0")
    .h-50.w-100(v-else) 无数据

</template>

<style>
.todo-item .check-item {
  opacity: 0;
}
.todo-item:hover .check-item {
  opacity: 1;
}
</style>

<script>
import config from '@/assets/config'
import pdf2img from '@/components/pdf2img'
import axios from 'axios'
import Promise from 'promise'

export default {
  components: {
    pdf2img
  },
  head() {
    return {
      title: '日程' + config.sPageBaseTitle,
    }
  },
  data() {
    let dToday = new Date();

    config.aTodoList.forEach(item => {
      item.bCheck = false;
    });

    let sWeekDay = ['日', '一', '二', '三', '四', '五', '六'];

    return {
      sDateStr: `${dToday.getFullYear()}年${dToday.getMonth() + 1}月${dToday.getDate()}日，星期${sWeekDay[dToday.getDay()]}`,
      sTimeStamp: `${dToday.getFullYear()}${dToday.getMonth() + 1}${dToday.getDate()}`,
      aTodoList: config.aTodoList,
      aBJnews: [],
      aRMDailyNews: [],
      aEconomyDaily: [],
      aYangchengNews: [],
      aEnvironmentNews: [],
      aCankaoxiaoxi: [],
    }
  },
  methods: {
    // 获取新京报数据
    getBJnewsData() {
      let aBJnewsInfo = [{
        index: 'A',
        num: 20
      }, {
        index: 'B',
        num: 8
      }, {
        index: 'C',
        num: 8
      }];

      let aBJnews = [], sCount = 0, dToday = new Date();

      let nMonth = dToday.getMonth() + 1;
      let sMonth = `${nMonth > 9 ? '' : '0'}${nMonth}`;
      let nDate = dToday.getDate();
      let sDate = `${nDate > 9 ? '' : '0'}${nDate}`;

      for (let i = 0; i < aBJnewsInfo.length; i++) {
        for (let j = 0; j < aBJnewsInfo[i].num; j++) {
          sCount = `${j >= 9 ? '' : '0'}${j + 1}`
          aBJnews.push({
            url: `${config.sServerHost}/ipaper/data/${dToday.getFullYear()}-${sMonth}/${sDate}/${aBJnewsInfo[i].index}${sCount}/xjb${dToday.getFullYear()}${sMonth}${sDate}${aBJnewsInfo[i].index}${sCount}.pdf`,
            title: `${aBJnewsInfo[i].index}${(j + 1)}版`,
            bShow: false
          })
        }
      }

      let aPromise = aBJnews.map((item) => {
        return new Promise((resolve, reject) => {
          axios
            .head(item.url)
            .then(() => {
              resolve(item)
            })
            .catch(() => {
              resolve()
            })
        })
      })

      Promise.all(aPromise)
        .then((res) => {
          let result = res.filter(i => i);

          if (result.length === 0) {
            this.aBJnews = null;
          } else {
            this.aBJnews = result;
          }
        })
    },
    // 获取人民日报数据
    getRMDailyNewsData() {
      let aNews = [], dToday = new Date();
      let sMonth = `${dToday.getMonth() + 1 > 9 ? '' : '0'}${dToday.getMonth() + 1}`;
      let sDate = `${dToday.getDate() > 9 ? '' : '0'}${dToday.getDate()}`;
      for (let i = 0; i < 20; i++) {
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
        aNews.push({
          url: `${config.sServerHost}/rmrb/images/${dToday.getFullYear()}-${sMonth}/${sDate}/${sCount}/rmrb${dToday.getFullYear()}${sMonth}${sDate}${sCount}.pdf`,
          bShow: false
        });
      }

      let aPromise = aNews.map((item) => {
        return new Promise((resolve, reject) => {
          axios
            .head(item.url)
            .then(() => {
              resolve(item)
            })
            .catch(() => {
              resolve()
            })
        })
      })

      Promise.all(aPromise)
        .then((res) => {
          let result = res.filter(i => i);

          if (result.length === 0) {
            this.aRMDailyNews = null;
          } else {
            this.aRMDailyNews = result;
          }
        })
    },
    // 获取经济日报数据
    getEconomyDailyNewsData() {
      let aNews = [], dToday = new Date();
      let sMonth = `${dToday.getMonth() + 1 > 9 ? '' : '0'}${dToday.getMonth() + 1}`;
      let sDate = `${dToday.getDate() > 9 ? '' : '0'}${dToday.getDate()}`;

      for (let i = 0; i < 20; i++) {
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`;
        aNews.push({
          url: `${config.sServerHost}/jjrb/page/1/${dToday.getFullYear()}-${sMonth}/${sDate}/${sCount}/${dToday.getFullYear()}${sMonth}${sDate}${sCount}_pdf.pdf`,
          bShow: false
        });
      }

      let aPromise = aNews.map((item) => {
        return new Promise((resolve, reject) => {
          axios
            .head(item.url)
            .then(() => {
              resolve(item)
            })
            .catch(() => {
              resolve()
            })
        })
      })

      Promise.all(aPromise)
        .then((res) => {
          let result = res.filter(i => i);

          if (result.length === 0) {
            this.aEconomyDaily = null;
          } else {
            this.aEconomyDaily = result;
          }
        })
    },
    // 获取中国环境报数据
    getEnvironmentNewsData() {
      let aNews = [], dToday = new Date();
      let sMonth = `${dToday.getMonth() + 1 > 9 ? '' : '0'}${dToday.getMonth() + 1}`;
      let sDate = `${dToday.getDate() > 9 ? '' : '0'}${dToday.getDate()}`;

      for (let i = 0; i < 8; i++) {
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`;

        aNews.push({
          url: `${config.sServerHost}/html/1/${dToday.getFullYear()}-${sMonth}/${sDate}/${sCount}B/${dToday.getFullYear()}${sMonth}${sDate}${sCount}B_pdf.pdf`,
          bShow: false
        });
      }

      let aPromise = aNews.map((item) => {
        return new Promise((resolve, reject) => {
          axios
            .head(item.url)
            .then(() => {
              resolve(item)
            })
            .catch(() => {
              resolve()
            })
        })
      })

      Promise.all(aPromise)
        .then((res) => {
          let result = res.filter(i => i);

          if (result.length === 0) {
            this.aEnvironmentNews = null;
          } else {
            this.aEnvironmentNews = result;
          }
        })
    },
    // 获取参考消息和环球时报数据
    getHqckData() {
      axios
        .get(config.sServerHost + '/hqck')
        .then((res) => {
          let result = res.data.urls;

          if (result.length === 0) {
            this.aCankaoxiaoxi = null;
          } else {
            this.aCankaoxiaoxi = result;
          }
        })
    },
    // 获取羊城晚报数据
    getYangchengData() {
      let aNews = [];

      let nLength = 16, sCount = 0, dToday = new Date();
      let nMonth = dToday.getMonth() + 1;
      let sMonth = `${nMonth > 9 ? '' : '0'}${nMonth}`;
      let nDate = dToday.getDate();
      let sDate = `${nDate > 9 ? '' : '0'}${nDate}`;
      let nYear = dToday.getFullYear();

      for (let i = 0; i < nLength; i++) {

        sCount = `${i >= 9 ? '' : '0'}${i + 1}`

        // 无法确定 G 后缀的规律，因此添加两个 url
        let url1 = `${config.sServerHost}/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}/ycwb${nYear}${sMonth}${sDate}A${sCount}.pdf`;
        let url2 = `${config.sServerHost}/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}G/ycwb${nYear}${sMonth}${sDate}A${sCount}G.pdf`;

        aNews.push({
          url: url1,
          bShow: false
        });
        i > 0 && aNews.push({
          url: url2,
          bShow: false
        });

      }

      let aPromise = aNews.map((item) => {
        return new Promise((resolve, reject) => {
          axios
            .head(item.url)
            .then(() => {
              resolve(item)
            })
            .catch(() => {
              resolve()
            })
        })
      })

      Promise.all(aPromise)
        .then((res) => {
          let result = res.filter(i => i);

          if (result.length === 0) {
            this.aYangchengNews = null;
          } else {
            this.aYangchengNews = result;
          }
        })
    },
  },
  mounted() {
    this.getBJnewsData();
    this.getRMDailyNewsData();
    this.getEconomyDailyNewsData();
    this.getEnvironmentNewsData();

    this.getHqckData();
    this.getYangchengData();
  }
}
</script>
