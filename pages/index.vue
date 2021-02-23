<template lang="pug">
  .p-20
    h2#time
    // Todo list
    p
    ul#todolist
      li
        label(for='todo16' style='cursor: pointer;') 猫和打扫：
        input#todo16(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo3' style='cursor: pointer;')
          a(href='https://weibo.com/mygroups?gid=3921172360211603&wvr=6&leftnav=1&isspecialgroup=1' target='_blank') 特别关注：
        input#todo3(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo5' style='cursor: pointer;')
          a(href='https://t.bilibili.com/' target='_blank') B 站时政：
        input#todo5(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo4' style='cursor: pointer;')
          a(href='https://s.weibo.com/top/summary?cate=realtimehot' target='_blank') 微博热搜：
        input#todo4(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo6' style='cursor: pointer;')
          a(href='https://www.youtube.com/feed/subscriptions' target='_blank') 油管时政：
        input#todo6(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo13' style='cursor: pointer;')
          a(href='http://forecast.weather.com.cn/town/weather1dn/101010700002.shtml' target='_blank') 今天天气：
        input#todo13(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo19' style='cursor: pointer;')
          a(href='https://azi.azzico.xyz/user#' target='_blank') 检查代理：
        input#todo19(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo14' style='cursor: pointer;') 检查日历：
        input#todo14(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo15' style='cursor: pointer;')
          a(href='https://mail.qq.com' target='_blank') 检查邮件：
        input#todo15(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo11' style='cursor: pointer;')
          a(href='https://www.zhihu.com/hot' target='_blank') 知乎热榜：
        input#todo11(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo7' style='cursor: pointer;')
          a(href='https://36kr.com/search/articles/8%E7%82%B91%E6%B0%AA%209%E7%82%B91%E6%B0%AA' target='_blank') 8 点 1 氪：
        input#todo7(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo8' style='cursor: pointer;')
          a(href='https://www.chinastarmarket.cn/telegraph' target='_blank') 科创电报：
        input#todo8(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo10' style='cursor: pointer;')
          a(href='https://www.gov.cn/' target='_blank') 政府网站：
        input#todo10(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo9' style='cursor: pointer;')
          a(href='https://www.qcc.com/monitor_dynamic' target='_blank') 风险动态：
        input#todo9(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo17' style='cursor: pointer;')
          a(href='http://quote.eastmoney.com/center' target='_blank') 行情中心：
        input#todo17(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo18' style='cursor: pointer;')
          a(href='https://www.oschina.net/news/project' target='_blank') 开源中国：
        input#todo18(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo6' style='cursor: pointer;') 微信时政：
        input#todo6(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo12' style='cursor: pointer;') 微信看看：
        input#todo12(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo1' style='cursor: pointer;') 上午报纸：
        input#todo1(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo2' style='cursor: pointer;') 下午报纸：
        input#todo2(type='checkbox' style='cursor: pointer;')
      li
        label(for='todo20' style='cursor: pointer;')
          a(href='https://github.com/trending' target='_blank') Github趋势：
        input#todo20(type='checkbox' style='cursor: pointer;')
    p
    h3 新京报
    p#bjnews-a
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('bjnews-a')") 打开
    p#bjnews-b
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('bjnews-b')") 打开
    p#bjnews-c
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('bjnews-c')") 打开
    h3 经济日报
    p#economic-daily
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('economic-daily')") 打开
    h3 人民日报
    p#people-daily
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('people-daily')") 打开
    hr
    h3(style='color: red') 参考消息
    p#cankaoxiaoxi
    h3(style='color: red') 环球时报
    p#huanqiushibao
    h3(style='color: red') 羊城晚报
    p#yangcheng-daily
      button(style='margin-right: 10px;cursor: pointer;' @click="openMultiTabs('yangcheng-daily')") 打开
</template>

<script>
export default {
  methods: {
    /**
     * 打开多个网页
     *
     * @param id {string} 元素 id
     * @param start {number} 可选，开始序号
     * @param end {number} 可选，结束序号
     */
    openMultiTabs(id, start, end) {
      let domTarget = document.getElementById(id).querySelectorAll('a');
      debugger;
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
    let sDay = ['日', '一', '二', '三', '四', '五', '六'][nDay]; // 星期（用来显示）

    /**
     * 开始设置
     */
    function startSetting() {
      setDate();

      updateQueryString();

      setCankao();
      setHuanqiu();
      setBJnews();
      setPeopleDaily();
      setEconomicDaily();
      // setBeijingDaily();
      setYangchengDaily();
      // setBeijingNight();
      // setChinaBusinessJournal();
      // setScienceAndTechDaily();
      // setSecuritiesTimes();
      // setNationBusinessDaily();
    }

    startSetting();

    /**
     * todo list 更新日期后缀
     */
    function updateQueryString() {
      let domTodolistLink = document.querySelectorAll('#todolist a');

      for (let i = 0; i < domTodolistLink.length; i++) {
        domTodolistLink[i].setAttribute('href', `${domTodolistLink[i].href}?t=${nYear}${sMonth}${sDate}`)
      }
    }

    /**
     * 设置显示时间
     */
    function setDate() {
      let domTime = document.getElementById('time');
      domTime.innerText = `${nYear}年${nMonth}月${nDate}日，星期${sDay}`;
    }

    /**
     * 参考消息
     */
    function setCankao() {
      let domCankaoxiaoxi = document.getElementById('cankaoxiaoxi');
      let aCankaoxiaoxiLink = document.createElement('a');
      aCankaoxiaoxiLink.setAttribute('target', '_blank');
      aCankaoxiaoxiLink.setAttribute('href', `https://www.hqck.net/ckxx.html?t=${nYear}${sMonth}${sDate}`);
      aCankaoxiaoxiLink.innerText = '点击查看';
      domCankaoxiaoxi.appendChild(aCankaoxiaoxiLink);
    }

    /**
     * 环球时报
     */
    function setHuanqiu() {
      let domHuanqiushibao = document.getElementById('huanqiushibao');
      let aHuanqiushibaoLink = document.createElement('a');
      aHuanqiushibaoLink.setAttribute('target', '_blank');
      aHuanqiushibaoLink.setAttribute('href', `https://www.hqck.net/hqsb.html?t=${nYear}${sMonth}${sDate}`);
      aHuanqiushibaoLink.innerText = '点击查看';
      domHuanqiushibao.appendChild(aHuanqiushibaoLink);
    }

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
