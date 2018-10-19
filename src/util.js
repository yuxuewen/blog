export default {
  systemKey:'hysenritz12345',
  //上传图片
  baseImgUrl: 'http://nankai.hysenritz.com/NK_DataSystem/image/showImage?id=',
  //邮箱
  emailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  //验证手机号
  phone_reg: /^1[3|4|5|7|8][0-9]{9}$/,
  //6到13位数字与字母组合
  pwdReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,13}$/,
  //电弧好吗与手机号码同时验证
  telReg: /^0\d{2,3}-?\d{7,8}$/,
  // 截取地址栏信息
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  /*
     关键字 添加样式
   */
  ruleKeywords(titleString,searchValue) {

    if (!titleString) {
      return '';
    }
    if (searchValue && searchValue.length > 0) {
      // 匹配关键字正则
      let replaceReg = new RegExp(searchValue, 'g');
      // 高亮替换v-html值
      let replaceString = '<span class="search-text">' + searchValue + '</span>';
      // 开始替换
      titleString = titleString.replace(replaceReg, replaceString);
    }
    return titleString;
  },
   replaceHtmlContent(data)
   {
     data = data.replace(/(\n)/g, "");
     data = data.replace(/(\t)/g, "");
     data = data.replace(/(\r)/g, "");
     data = data.replace(/<\/?[^>]*>/g, "");
     data = data.replace(/\s*/g, "");
     data = data.replace(/<\/?(img|a)[^>]*>/gi, '');
     return data;

   },
  numToEn(month) { //数字转换成英文
    var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec");
    var mm = m[month - 1];
    // //console.log(m[month-1]);
    return mm;
  },
  getFormatOnlyDate(time){
    var date = new Date(time);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  /*
     判断字符长度
   */
  getStrLength(str)
  {
     //讲中文替换成两个字符
    return str.replace(/[\u0391-\uFFE5]/g,str).length;
  },
    validatemobile(mobile)
  {
    if(mobile.length!=11)
    {
      return false;
    }

    var partten = /^1[3|4|5|7|8][0-9]{9}$/;
    if(!partten.test(mobile))
    {
      alert(mobile)
      console.log(mobile)
      return false;
    }
    return true;
  },
  checkEmail(str) {

    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (myreg.test(str)) {
      return true
    } else {
      return false;
    }
  },
  getFormatDate(time) {
    var date = new Date(time);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var seconds=date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
      minute = "0" + minute;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + hour + seperator2 + minute
      + seperator2 + seconds;
    return currentdate;
  },
  confirmDialog(self,title,content,cb)
  {
    self.$Modal.confirm({
      title: title,
      content: content,
      onOk: () => {
        cb(self)
        //this.$Message.info('Clicked ok');
      },
      onCancel: () => {
        //this.$Message.info('Clicked cancel');
      }
    });
  },
  sizeof(str) {
    var total = 0,
      charCode,
      i,
      len;
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0x007f) {
        total += 1;
      } else if (charCode <= 0x07ff) {
        total += 2;
      } else if (charCode <= 0xffff) {
        total += 3;
      } else {
        total += 4;
      }
    }
    return total;
  },
  //判断是否是回文
  checkPalindrom(str)
  {
      return str===str.split('').join('');
  },
 //数组去重 set

 arrayDeweighting(array)
 {
     console.log(new Set(array))
     return Array.from(new Set(array));

 },

  /*

   */
  getHtmlImgUrl(str)
  {

    var urlArray=[];
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = str.match(imgReg);  // arr 为包含所有img标签的数组
    if (arr==null)
    {
      return urlArray;
    }
    for (var i = 0; i < arr.length; i++) {
      var src = arr[i].match(srcReg);
       urlArray.push(src[1]);
    }

    return urlArray;

  },
//、排序后相邻去除法
arrayDeweighting2(array)
{
    var newArray=[];
    array.sort();
    for (var i = 0; i < array.length; i++) {
      if (array[i]!==array[i-1]) {
          newArray.push(array[i])
      }
    }
    return newArray;
},
 //统计一个字符串出现最多的字母
 findMaxDuplicateChar(str)
 {
  if (str=='') {
      return str;
  }
  var strArray=str.split('');
   let charObj = {};
  for (var i = 0; i < strArray.length; i++) {
      if (!charObj[strArray[i]]) {
          charObj[strArray[i]]=1;
      }
      else
      {
          charObj[strArray[i]]+=1;
      }
  }
  console.log(JSON.stringify(charObj))
  var maxValue=1;
  var maxChar='';
  for(var i in charObj)
  {

      if (charObj[i]>=maxValue) {
           maxValue=charObj[i]
           maxChar=i;
      }
  }
  return maxChar;


 },
 //冒泡排序
 maopaoSort(array){

        for (var i = 0; i < array.length; i++) {
              for (var j = 0; j < array.length-1; j++) {
                 if (array[i]>array[j]) {
                     let max=array[i];
                     array[i]=array[j];
                     array[j]=max;

                 }
              }
        }
        return array;
 },
 //快速排序
 quickSort(arr)
 {
  var times=0;
      //如果数组长度小于等于1无需判断直接返回即可
    if(arr.length<=1){
        return arr;
    }
    var midIndex=Math.floor(arr.length/2);//取基准点
    var midIndexVal=arr.splice(midIndex,1);//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数arr[index+1]
    var left=[];//存放比基准点小的数组
    var right=[];//存放比基准点大的数组
    //遍历数组，进行判断分配
    for(var i=0;i<arr.length;i++){
        if(arr[i]<midIndexVal){
            left.push(arr[i]);//比基准点小的放在左边数组
        }
        else{
            right.push(arr[i]);//比基准点大的放在右边数组
        }
        console.log("第"+(++times)+"次排序后："+arr);
    }

    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
    return this.quickSort(left).concat(midIndexVal,this.quickSort(right));
 },
 swap(a,b)
 {
    a=b-a;
    a=a+b;
    b=a-b;
 },
 userPrototype(){

 }

}
