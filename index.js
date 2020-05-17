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
  setBeijingDaily();
  setYangchengDaily();
  setBeijingNight();
  setChinaBusinessJournal();
  setScienceAndTechDaily();
  setSecuritiesTimes();
  setNationBusinessDaily();
}

window.onload = startSetting;

/**
 * 打开多个网页
 * 
 * @param id {string} 元素 id
 * @param start {number} 可选，开始序号
 * @param end {number} 可选，结束序号
 */
function openMultiTabs(id, start, end) {
  let domTarget = document.getElementById(id).querySelectorAll('a');
  debugger;
  for (let i = start || 0; i < (end || domTarget.length); i++) {
    let url = domTarget[i].getAttribute('href');
    window.open(url);
  }
}

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
    aLink.setAttribute('href', `http://paper.people.com.cn/rmrb/page/${nYear}-${sMonth}/${sDate}/${sCount}/rmrb${nYear}${sMonth}${sDate}${sCount}.pdf`);
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
 * 北京日报
 */
function setBeijingDaily() {
  let domBeijingDaily = document.getElementById('beijing-daily');

  let nBeijingDailyPageLength;
  if (nDay === 0) nBeijingDailyPageLength = 4; // 周日
  else if (nDay === 6) nBeijingDailyPageLength = 8 // 周六
  else nBeijingDailyPageLength = 16; // 周一~周五

  for (let i = 0; i < nBeijingDailyPageLength; i++) {
    let aLink = document.createElement('a');
    let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
    aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
    aLink.setAttribute('target', '_blank');
    aLink.setAttribute('href', `http://bjrb.bjd.com.cn/images/${nYear}-${sMonth}/${sDate}/${sCount}/${sCount}.pdf`);
    aLink.innerText = i + 1 + '版';
    domBeijingDaily.appendChild(aLink);
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

/**
 * 北京晚报
 */
function setBeijingNight() {
  let domBeijingNight = document.getElementById('beijing-night');

  let nBeijingNightPageLength;
  if (nDay === 6 || nDay === 0 || nDay === 1) nBeijingNightPageLength = 16; // 周六、周日、周一
  else nBeijingNightPageLength = 32; // 周二~周五

  for (let i = 0; i < nBeijingNightPageLength; i++) {
    let aLink = document.createElement('a');
    let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
    aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
    aLink.setAttribute('target', '_blank');
    aLink.setAttribute('href', `http://bjwb.bjd.com.cn/images/${nYear}-${sMonth}/${sDate}/${sCount}/${sCount}.pdf`);
    aLink.innerText = i + 1 + '版';
    domBeijingNight.appendChild(aLink);
  }
}

/**
 * 中国经营报
 * 
 * pdf 链接规律：
 *  1. 48 页
 *  2. 前 4 页后缀是 C，剩余的规律是 CBBC，也就是：CCCCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBC
 *  3. 数目：A 8，B 20，C 12，D 4，E 4
 *  4. 链接样例：http://dianzibao.cb.com.cn/images/2020-04/27/01/2353A01C.pdf
 */
function setChinaBusinessJournal() {
  document.getElementById('china-business-journal-btn').addEventListener('click', () => {
    let dom = document.getElementById('china-business-journal');
    dom.remove();

    let newDom = document.createElement('p');
    newDom.id = 'china-business-journal';
    document.body.appendChild(newDom);

    let sNumber = document.getElementById('china-business-journal-number').value; // 表示第几期，需要手动输入
    let year = document.getElementById('china-business-journal-year').value; // 年
    let month = document.getElementById('china-business-journal-month').value; // 月
    let day = document.getElementById('china-business-journal-day').value; // 日

    // 后缀规律
    let sPrefix, sSuffix = 'CCCCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBCCBBC';

    for (let i = 0; i < 48; i++) {
      let aLink = document.createElement('a');
      let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
      aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
      aLink.setAttribute('target', '_blank');

      let sPageCount; // 版面序号

      if      (i < 8)   {  sPrefix = 'A'; sPageCount = i       }
      else if (i < 28)  {  sPrefix = 'B'; sPageCount = i - 8;  }
      else if (i < 40)  {  sPrefix = 'C'; sPageCount = i - 28; }
      else if (i < 44)  {  sPrefix = 'D'; sPageCount = i - 40; }
      else              {  sPrefix = 'E'; sPageCount = i - 44; }

      sPageCount = `${sPageCount >= 9 ? '' : '0'}${sPageCount + 1}`
      
      aLink.setAttribute('href', `http://dianzibao.cb.com.cn/images/${year}-${month}/${day}/${sCount}/${sNumber}${sPrefix}${sPageCount}${sSuffix[i]}.pdf`);
      aLink.innerText = i + 1 + '版';
      newDom.appendChild(aLink);
    }
  });
}

/**
 * 科技日报
 */
function setScienceAndTechDaily() {
  let domScienceAndTechDaily = document.getElementById('science-and-tech-daily');

  for (let i = 0; i < 8; i++) {
    let aLink = document.createElement('a');
    let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
    aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
    aLink.setAttribute('target', '_blank');
    aLink.setAttribute('href', `http://digitalpaper.stdaily.com/http_www.kjrb.com/kjrb/images/${nYear}-${sMonth}/${sDate}/${sCount}/KJRB${nYear}${sMonth}${sDate}${sCount}.pdf`);
    aLink.innerText = i + 1 + '版';
    domScienceAndTechDaily.appendChild(aLink);
  }
}

/**
 * 证券时报
 */
function setSecuritiesTimes() {
  let domSecuritiesTimes = document.getElementById('securities-times');

  for (let i = 0; i < 10; i++) {
    let aLink = document.createElement('a');
    let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
    aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
    aLink.setAttribute('target', '_blank');
    aLink.setAttribute('href', `http://epaper.stcn.com/paper/zqsb/page/1/${nYear}-${sMonth}/${sDate}/A0${sCount}/${nYear}${sMonth}${sDate}A0${sCount}_pdf.pdf`);
    aLink.innerText = i + 1 + '版';
    domSecuritiesTimes.appendChild(aLink);
  }
}

/**
 * 每日经济新闻
 */
function setNationBusinessDaily() {
  let domNationBusinessDaily = document.getElementById('national-business-daily');

  for (let i = 0; i < 8; i++) {
    let aLink = document.createElement('a');
    let sCount = `${i >= 9 ? '' : '0'}${i + 1}`
    aLink.style = 'display: inline-block; margin-right: 10px; margin-bottom: 10px;';
    aLink.setAttribute('target', '_blank');
    aLink.setAttribute('href', `http://epaper.mrjjxw.com/index.php?s=/index/printimg/t/mrjjxw/d/${nYear}${sMonth}${sDate}/url/edition_${sCount}.jpg`);
    aLink.innerText = i + 1 + '版';
    domNationBusinessDaily.appendChild(aLink);
  }
}
