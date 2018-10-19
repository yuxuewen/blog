//引入axios
import $axios from 'axios';
import qs from 'qs';
import Constant from './constant.js'

// axios.defaults.withCredentials = true;//跨域凭证 默认 false
//返回状态判断
$axios.interceptors.response.use((res) => {
  if (!res.data.code == 200) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  // _.toast("网络异常", 'fail');
  //this.$message('sss');
  return Promise.reject(error);
});
//POST传参序列化
$axios.interceptors.request.use((config) => {
  //参数是否序列化
  if (config.data.Serialize) {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
  }
  return config;
}, (error) => {
  alert("错误的传参");
  return Promise.reject(error);
});

//请求方法 get
let get_$axios = (url, params) => {
  return new Promise((success, error) => {
    $axios.get(url, {
        params: params
      })
      .then(res => {
        success(res)
      })
      .catch(err => {
        error(err)
      });
  })
}
//post
let post_$axios = (url, params) => {
  console.log(url)

  return new Promise((success, error) => {
    $axios.post(url, params)
      .then(res => {
        success(res.data)
      })
      .catch(err => {
        error(err)
      });
  })
}
//序列化传参
let fetchSerialize = (url, params) => {
  params.token = localStorage.getItem('token');
  params.Serialize = true;
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);

      }, err => {
        reject(err);
      })
      .catch((error) => {

        reject(error)
      })
  });
}


export default {

  getBannerList: (params) => post_$axios(Constant.GET_BANNER_LIST , params),
  //文章列表(全部,个人,置顶,标题各种类型查询)
  getArticleList:(params)=>post_$axios(Constant.GET_ARITICLE_LIST,params),
  getArticleTypeList:(params)=>post_$axios(Constant.ARITICLE_TYPE_LIST,params),
  getRecommendList:(params)=>post_$axios(Constant.RECOMMEND_LIST,params),
  getCommentlist:(params)=>post_$axios(Constant.COMMENT_LIST,params),
  saveComment:(params)=>post_$axios(Constant.SAVE_COMMENT,params),
  praiseComment:(params)=>post_$axios(Constant.PRAISE_COMMENT,params),//评论点赞
  getPersonalArticleState:(params)=>post_$axios(Constant.PERSONAL_ARTICLE_STATE,params),
  getPersonalComment:(params)=>post_$axios(Constant.PERSONAL_COMMENT_LIST,params),
  praiseArticle:(params)=>post_$axios(Constant.PRAISE_ARITICLE,params),
  publishArticle:(params)=>post_$axios(Constant.SAVE_ARTICLE,params),
  collectArticle:(params)=>post_$axios(Constant.COLLECT_ARITICLE,params),
  deleteArticle:(params)=>post_$axios(Constant.DELETE_ARITICLE,params),
  browiseArticle:(params)=>post_$axios(Constant.BROWISE_ARITICLE,params),
  getUserStatistics:(params)=>post_$axios(Constant.USER_ARTICLE_STATISTICE,params),//用户各种统计
  replayComment:(params)=>post_$axios(Constant.SAVE_COMMENTREPLAY,params),
  judgeAttentionUserArray:(params)=>post_$axios(Constant.JUDGE_ATTENTION_USER,params),
  judgePraiseComment:(params)=>post_$axios(Constant.JUDGE_PRAISE_COMMENT,params),//判断是否点赞过一组评论,主要用于评论中点赞按钮是否变红

  attentionUser:(params)=>post_$axios(Constant.ATTENTION_USER,params),
  getUserAttentionList:(params)=>post_$axios(Constant.MY_ATTENTION_LIST,params),//用户关注用户列表
  getUserFansList:(params)=>post_$axios(Constant.MY_FANS_LIST,params),//用户关注用户列表
  saveUserInfo:(params)=>post_$axios(Constant.SAVE_USER_INFO,params),//用户关注用户列表

  searchArticleByKey:(params)=>post_$axios(Constant.SEARCH_ARTICLE,params),//关键字搜索用户
  searchUserByKey:(params)=>post_$axios(Constant.SEARCH_USER,params),//关键字搜索用户
  searchSpecialByKey:(params)=>post_$axios(Constant.SEARCH_SPECIAL,params),//关键字搜索专题

  getSpeciaList:(params)=>post_$axios(Constant.SPECIAL_LIST,params),//获得专题列表
  getSpecialDetial:(params)=>post_$axios(Constant.SPECIAL_DETIAL,params),//获得专题详情
  getSubmissionArticleList:(params)=>post_$axios(Constant.SPECIAL_ARTICLE,params),//获得专题详情
  attentionSpecial:(params)=>post_$axios(Constant.ATTENTION_SPECIAL,params),//专题关注
  judgeAttentionSpecialArray:(params)=>post_$axios(Constant.JUDGE_IS_ATTENTION_SPECIAL,params),//判断是否关注专题
  saveSubmission:(params)=>post_$axios(Constant.SAVE_SUBMISSION,params),//专题投稿

  login:(params)=>post_$axios(Constant.LOGIN_URL,params),
  getUserDetialInfo:(params)=>post_$axios(Constant.DETIAL_USER_INFO,params),
  registerUser:(params)=>post_$axios(Constant.REGISTER_BY_EMAIL_URL,params),
  getEmailCode:(params)=>post_$axios(Constant.GET_EMAIL_CODE,params),


}
