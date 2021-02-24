<template lang="pug">
  .p-20
    h2 {{`${nYear}年${nMonth}月${nDate}日，星期${sWeekDay[nDay]}`}}

    nuxt-link.inbl.mt-10(to="/color") 色相轮

    .my-20.bd-1.br-4.py-30.px-10
      .inbl.h-24.lh-24.mr-10.mb-10(v-for="todo, index in aTodoList" :key="`todo-${index}`")
        label.inbl.vtal-top.w-200.t-r.mr-5(:for="`todo-${index}`" style='cursor: pointer;')
          a(
            v-if="todo.link"
            :href="`${todo.link}?t=${sTimeStamp}`"
            target='_blank'
          ) {{todo.title}}
          span(v-else) {{todo.title}}
        input.inbl.mt-6(:id="`todo-${index}`" type='checkbox' style='cursor: pointer;')

    h3.mb-10 新京报
    p#bjnews-a
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('bjnews-a')") 打开
    p#bjnews-b
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('bjnews-b')") 打开
    p#bjnews-c
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('bjnews-c')") 打开

    h3.mt-20.mb-10 经济日报
    p#economic-daily
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('economic-daily')") 打开

    h3.mt-20.mb-10 人民日报
    p#people-daily
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('people-daily')") 打开

    hr.my-10.mt-30

    h3.mt-20.mb-10 参考消息
    p
      a(:href="`https://www.hqck.net/ckxx.html?t=${sTimeStamp}`" target="_blank") 参考消息

    h3.mt-20.mb-10 环球时报
    p
      a(:href="`https://www.hqck.net/hqsb.html?t=${sTimeStamp}`" target="_blank") 环球时报

    h3.mt-20.mb-10 羊城晚报
    p#yangcheng-daily
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('yangcheng-daily')") 打开
</template>

<script>
import config from '@/assets/config'

export default {
  data() {
    let dToday = new Date();

    return {
      nYear: dToday.getFullYear(),
      nMonth: dToday.getMonth() + 1,
      nDate: dToday.getDate(),
      nDay: dToday.getDay(),

      sWeekDay: ['日', '一', '二', '三', '四', '五', '六'],
      sTimeStamp: `${dToday.getFullYear()}${dToday.getMonth() + 1}${dToday.getDate()}`,

      aTodoList: config.aTodoList,
    }
  },
  methods: {
    /**
     * 打开多个网页
     *
     * @param id {string} 元素 id
     * @param start {number} 可选，开始序号
     * @param end {number} 可选，结束序号
     */
    openMultiTabs(id, start, end) {
        domTarget = document.getElementById(id).querySelectorAll('a');
      for (let i = start || 0; i < (end || domTarget.length); i++) {
        let url = domTarget[i].getAttribute('href');
        window.open(url);
      }
    }
  },
  mounted() {
    let dToday = new Date();
    let nYear = dToday.getFullYear(); // 年份
    let nMonth = dToday.getMonth() + 1; // 月份
    let nDate = dToday.getDate(); // 日期
    let nDay = dToday.getDay(); // 星期

    let sMonth = `${nMonth > 9 ? '' : '0'}${nMonth}`; // 月份（用来显示）
    let sDate = `${nDate > 9 ? '' : '0'}${nDate}`; // 日期（用来显示）

    /**
     * 开始设置
     */
    function startSetting() {

      setBJnews();
      setPeopleDaily();
      setEconomicDaily();
      setYangchengDaily();
    }

    startSetting();

    /**
     * 新京报
     */
    function setBJnews() {
      // A 版
      let domBJnewsA = document.getElementById('bjnews-a');
      for (let i = 0; i < 16; i++) {
        let aLink = document.createElement('a');
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
        aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink.setAttribute('target', '_blank');
        aLink.setAttribute('href', `http://appimg2.tbnimg.com/ipaper/data/${nYear}-${sMonth}/${sDate}/A${sCount}/xjb${nYear}${sMonth}${sDate}A${sCount}.pdf`);
        aLink.innerText = 'A' + (i + 1) + '版';
        domBJnewsA.appendChild(aLink);
      }

      // B 版
      let domBJnewsB = document.getElementById('bjnews-b');
      for (let i = 0; i < 8; i++) {
        let aLink = document.createElement('a');
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
        aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink.setAttribute('target', '_blank');
        aLink.setAttribute('href', `http://appimg2.tbnimg.com/ipaper/data/${nYear}-${sMonth}/${sDate}/B${sCount}/xjb${nYear}${sMonth}${sDate}B${sCount}.pdf`);
        aLink.innerText = 'B' + (i + 1) + '版';
        domBJnewsB.appendChild(aLink);
      }

      // C 版
      let domBJnewsC = document.getElementById('bjnews-c');
      for (let i = 0; i < 8; i++) {
        let aLink = document.createElement('a');
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
        aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink.setAttribute('target', '_blank');
        aLink.setAttribute('href', `http://appimg2.tbnimg.com/ipaper/data/${nYear}-${sMonth}/${sDate}/C${sCount}/xjb${nYear}${sMonth}${sDate}C${sCount}.pdf`);
        aLink.innerText = 'C' + (i + 1) + '版';
        domBJnewsC.appendChild(aLink);
      }
    }

    /**
     * 人民日报
     */
    function setPeopleDaily() {
      let domPeopleDaily = document.getElementById('people-daily');
      let nPeopleDailyPageLength = (nDay === 0 || nDay === 6) ? 8 : 20;

      for (let i = 0; i < nPeopleDailyPageLength; i++) {
        let aLink = document.createElement('a');
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
        aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink.setAttribute('target', '_blank');
        aLink.setAttribute('href', `http://paper.people.com.cn/rmrb/images/${nYear}-${sMonth}/${sDate}/${sCount}/rmrb${nYear}${sMonth}${sDate}${sCount}.pdf`);
        aLink.innerText = i + 1 + '版';
        domPeopleDaily.appendChild(aLink);
      }
    }

    /**
     * 经济日报
     */
    function setEconomicDaily() {
      let domEconomicDaily = document.getElementById('economic-daily');

      for (let i = 0; i < 12; i++) {
        let aLink = document.createElement('a');
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
        aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink.setAttribute('target', '_blank');
        aLink.setAttribute('href', `http://paper.ce.cn/jjrb/page/1/${nYear}-${sMonth}/${sDate}/${sCount}/${nYear}${sMonth}${sDate}${sCount}_pdf.pdf`);
        aLink.innerText = i + 1 + '版';
        domEconomicDaily.appendChild(aLink);
      }
    }

    /**
     * 羊城晚报
     */
    function setYangchengDaily() {
      let domYangchengDaily = document.getElementById('yangcheng-daily');

      let nLength;
      if (nDay === 6 || nDay === 0) nLength = 8; // 周六、周日
      else nLength = 16; // 周一~周五

      for (let i = 0; i < nLength; i++) {
        let aLink01 = document.createElement('a');
        let aLink02 = document.createElement('a');

        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`

        aLink01.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink01.setAttribute('target', '_blank');
        aLink02.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
        aLink02.setAttribute('target', '_blank');

        aLink01.setAttribute('href', `http://ep.ycwb.com/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}/ycwb${nYear}${sMonth}${sDate}A${sCount}.pdf`);
        aLink02.setAttribute('href', `http://ep.ycwb.com/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}G/ycwb${nYear}${sMonth}${sDate}A${sCount}G.pdf`);

        aLink01.innerText = i + 1 + '版';
        i > 9 && (aLink02.innerText = i + 1 + '版G');

        domYangchengDaily.appendChild(aLink01);
        i > 9 && domYangchengDaily.appendChild(aLink02);
      }
    }
  }
}
</script>
