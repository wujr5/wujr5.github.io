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

    pdf2img(:data="aBJnews" name="bjnews" :scale="1.8" v-if="aBJnews.length")
    .h-920.bg-text(v-else)

    h2.my-10 人民日报

    pdf2img(:data="aRMDailyNews" name="rmrb" :scale="1.8" v-if="aRMDailyNews.length")
    .h-920.bg-text(v-else)

    h2.mb-10 经济日报

    pdf2img(:data="aEconomiyDaily" name="bjnews" :scale="1.8" v-if="aEconomiyDaily.length")
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
      aEconomiyDaily: [],
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
          this.aEconomiyDaily = res.filter(i => i);
        })
    }
  },
  mounted() {
    this.getBJnewsData();
    this.getRMDailyNewsData();
    this.getEconomyDailyNewsData();
  }
}

// let dToday = new Date();
// let nYear = dToday.getFullYear(); // 年份
// let nMonth = dToday.getMonth() + 1; // 月份
// let nDate = dToday.getDate(); // 日期
// let nDay = dToday.getDay(); // 星期

// let sMonth = `${nMonth > 9 ? '' : '0'}${nMonth}`; // 月份（用来显示）
// let sDate = `${nDate > 9 ? '' : '0'}${nDate}`; // 日期（用来显示）

// /**
//  * 羊城晚报
//  */
// function setYangchengDaily() {
//   let domYangchengDaily = document.getElementById('yangcheng-daily');

//   let nLength;
//   if (nDay === 6 || nDay === 0) nLength = 8; // 周六、周日
//   else nLength = 16; // 周一~周五

//   for (let i = 0; i < nLength; i++) {
//     let aLink01 = document.createElement('a');
//     let aLink02 = document.createElement('a');

//     let sCount = `${i >= 9 ? '' : '0'}${i + 1}`

//     aLink01.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
//     aLink01.setAttribute('target', '_blank');
//     aLink02.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
//     aLink02.setAttribute('target', '_blank');

//     aLink01.setAttribute('href', `http://ep.ycwb.com/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}/ycwb${nYear}${sMonth}${sDate}A${sCount}.pdf`);
//     aLink02.setAttribute('href', `http://ep.ycwb.com/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}G/ycwb${nYear}${sMonth}${sDate}A${sCount}G.pdf`);

//     aLink01.innerText = i + 1 + '版';
//     i > 9 && (aLink02.innerText = i + 1 + '版G');

//     domYangchengDaily.appendChild(aLink01);
//     i > 9 && domYangchengDaily.appendChild(aLink02);
//   }
// }
</script>
