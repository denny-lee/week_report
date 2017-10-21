import {Message} from 'antd';

const mailRegx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const timeSpanRegx = /^(?!,)(,?\d{1,2}:\d{2}(~|-)\d{1,2}:\d{2})*$/;
const trimRegx = /(^\s*)|(\s*$)/g;


function padding2(v) {
  let ret = v;
  if ((v + '').length < 2) {
    ret = '0' + v;
  }
  return ret;
}

const util = {
  redirectToLogin() {
    Message.error('长时间不操作，将重新刷新页面');
    setTimeout(() => {
      location.reload();
    }, 1500);
  },
  getMonthStr(date) {
    const year = date.getFullYear();
    const month = padding2(date.getMonth() + 1);
    return `${year}-${month}`;
  },
  validateEmail(email) {
      if(email) {
        return mailRegx.test(email);
      }
      return true;
  },
  validateTimeSpan(timespan) {
      if(timespan) {
        return timeSpanRegx.test(timespan);
      }
      return true;
  },
  trim(value) {
      if(value) {
          return value.replace(trimRegx,'');
      }
      return value;
  },
  inArray(arr, str, seperator) {
      return (arr.length > 0 && (seperator + arr.join(seperator) + seperator).indexOf(seperator + str + seperator) > -1);
  }
};

export default util;
