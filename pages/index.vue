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

    pdf2img(:data="aBJnews" name="bjnews" :scale="1.8" :gap="10" type="pdf" v-if="aBJnews.length")
    .h-920.bg-text(v-else)

    h2.my-10 人民日报

    pdf2img(:data="aRMDailyNews" name="rmrb" :scale="1.8" :gap="10" type="pdf" v-if="aRMDailyNews.length")
    .h-920.bg-text(v-else)

    h2.mb-10 经济日报

    pdf2img(:data="aEconomyDaily" name="economy" :scale="1.8" :gap="10" type="pdf" v-if="aEconomyDaily.length")
    .h-920.bg-text(v-else)

    h2.mb-10 中国环境报

    pdf2img(:data="aEnvironmentNews" name="environment" :scale="1.8" :gap="25" type="pdf" v-if="aEnvironmentNews.length")
    .h-920.bg-text(v-else)

    h2.mb-10 参考消息

    pdf2img(:data="aCankaoxiaoxi" name="cankao" :scale="1.8" :gap="7" type="img" v-if="aCankaoxiaoxi.length")
    .h-920.bg-text(v-else)

    h2.mb-10 环球时报

    pdf2img(:data="aHuanqiushibao" name="huanqiu" :scale="1.8" :gap="7" type="img" v-if="aHuanqiushibao.length")
    .h-920.bg-text(v-else)

    h2.mb-10 羊城晚报

    pdf2img(:data="aYangchengNews" name="yangcheng" :scale="1.8" :gap="10" type="pdf" v-if="aYangchengNews.length")
    .h-920.bg-text(v-else)

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
      aHuanqiushibao: [],
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
          this.aBJnews = res.filter(i => i);
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
          this.aRMDailyNews = res.filter(i => i);
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
          this.aEconomyDaily = res.filter(i => i);
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
          this.aEnvironmentNews = res.filter(i => i);
        })
    },
    // 获取参考消息和环球时报数据
    getHqckData() {
      axios
        .get(config.sServerHost + '/hqck')
        .then((res) => {
          this.aCankaoxiaoxi = res.data.urls.slice(0, 8);
          this.aHuanqiushibao = res.data.urls.slice(8);
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
          this.aYangchengNews = res.filter(i => i);
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
