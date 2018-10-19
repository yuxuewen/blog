/**
 * 常量
 * @authors 于学文 (you@example.org)
 * @date    2018-05-24 09:51:48
 * @version $Id$
 */
/**
 * 常量
 * @authors 于学文 (you@example.org)
 * @date    2018-05-24 09:51:48
 * @version $Id$
 */

const ApiRootUrl = '/api/';

module.exports = {
  userListUrl: ApiRootUrl + 'user/getUserList', //用户列表
  DELETE_USER: ApiRootUrl + 'user/deleteUser', //删除用户
  DETIAL_USER_INFO: ApiRootUrl + 'user/getUserDetialInfo', //首页数据接口
  SAVE_USER_INFO:ApiRootUrl+"user/saveUserInfo",
  REGISTER_URL:ApiRootUrl+"user/registerUser",//手机号注册 :暂未真正实现
  REGISTER_BY_EMAIL_URL:ApiRootUrl+"user/registerUserByEmail",//邮箱注册已经实现
  LOGIN_URL:ApiRootUrl+"user/login",
  GET_EMAIL_CODE:ApiRootUrl+"user/getEmailCode",
  LOGIN_STATE:ApiRootUrl+"user/judgeUserLoginState",
  RECOMMEND_LIST:ApiRootUrl+"admin/getRecommendList",
  SAVE_ARTICLE_TYPE:ApiRootUrl+"article/saveType",
  ARITICLE_TYPE_LIST:ApiRootUrl+'article/getTypeList',
  DELETE_ARTICLE_TYPE:ApiRootUrl+'article/deleteType',
  SAVE_ARTICLE_SORT:ApiRootUrl+"article/saveSort",
  GET_ARTICLE_SORT:ApiRootUrl+"article/getSortList",
  USER_ARTICLE_STATISTICE:ApiRootUrl+"article/getUserStatistics",
  DELETE_ARTICLE_SORT:ApiRootUrl+"article/delecteType",
  SAVE_ARTICLE:ApiRootUrl+'article/saveArticle',
  GET_ARITICLE_LIST:ApiRootUrl+'article/getArticleList',
  PRAISE_ARITICLE:ApiRootUrl+'article/praiseArticle',
  COLLECT_ARITICLE:ApiRootUrl+'article/collectArticle',
  DELETE_ARITICLE:ApiRootUrl+'article/deleteArticle',
  BROWISE_ARITICLE:ApiRootUrl+'article/browseArticle',
  PERSONAL_ARTICLE_STATE:ApiRootUrl+'article/getPersonalArticleState',//获得个人点赞 收藏 浏览文章
  COMMENT_LIST:ApiRootUrl+"comment/getCommentlist",//查询文章pinglun
  PERSONAL_COMMENT_LIST:ApiRootUrl+"comment/getPersonalComment",//查询个人全部评论
  SAVE_COMMENT:ApiRootUrl+'comment/saveComment',
  PRAISE_COMMENT:ApiRootUrl+'comment/praiseComment',
  DELETE_REPLAY:ApiRootUrl+'comment/deleteReplay',
  SAVE_COMMENTREPLAY:ApiRootUrl+'comment/saveCommentReplay',
  DELETE_COMMENT:ApiRootUrl+'comment/deleteComment',
  JUDGE_PRAISE_COMMENT:ApiRootUrl+'comment/judgePraiseComment',
  PERSONAL_COMMENT:ApiRootUrl+'personal/getPersonalCommentArticle',
  PERSONAL_BROWISE:ApiRootUrl+'personal/getPersonalBrowseArticle',
  PERSONAL_PRAISE:ApiRootUrl+'personal/getPersonalPraiseArticle',
  PERSONAL_COLLECT:ApiRootUrl+'personal/getPersonalCollectArticle',
  GET_BANNER_LIST:ApiRootUrl+'banner/getBannerList',
  JUDGE_ATTENTION_USER:ApiRootUrl+'attention/judgeAttentionUserArray',
  ATTENTION_USER:ApiRootUrl+'attention/attentionUser',
  MY_ATTENTION_LIST:ApiRootUrl+'attention/getMyAttentionUserList',//我的关注
  MY_FANS_LIST:ApiRootUrl+'attention/getAttentionToMeUser',//我的粉丝

  SPECIAL_LIST:ApiRootUrl+'submission/getSpecialList',
  SPECIAL_DETIAL:ApiRootUrl+'submission/getSpecialDetial',
  SPECIAL_ARTICLE:ApiRootUrl+'submission/getSubmissionArticleList',
  ATTENTION_SPECIAL:ApiRootUrl+'submission/attentionSpecial',
  JUDGE_IS_ATTENTION_SPECIAL:ApiRootUrl+'submission/judgeAttentionSpecialArray',
  SAVE_SUBMISSION:ApiRootUrl+'submission/saveSubmission',

  /*
     关键字搜索接口
   */

  SEARCH_ARTICLE:ApiRootUrl+'search/searchSysArticle',

  SEARCH_USER:ApiRootUrl+'search/searchSysUser',
  SEARCH_SPECIAL:ApiRootUrl+'search/searchSpecial',


  /*
     vuex 常量
   */
  QUIT_LOGIN:'QUIT_LOGIN',
  REFRESH_USER_ID:'REFRESH_USER_ID',

  /*
     VUEX
   */

  SEARCH_KEYWORDS:'SEARCH_KEYWORDS',
  REFRESH_USER_INFO:'REFRESH_USER_INFO',

  /*
     部分路由
   */
  SEARCH_ROUTE:'blog/search',
  SPECIAL_DETIAL_ROUTE:'blog/special_detial',
  PERSONAL_INFO_EDIT:'blog/personalinfo-edit'




};


