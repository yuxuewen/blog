/**
 *
 * @authors 于学文 (you@example.org)
 * @date    2018-05-24 09:49:36
 * @version $Id$
 */

import api from '../api.js'
import * as constant from '../constant.js'
const state ={
    loginState:false,
    refresh_user_id:"",
    keywords:'',
    refreshTime:'',

};
const actions={

};
const getters={

    getLoginState:state=>state.loginState,
    getRefreshUserId:state=>state.refresh_user_id,
    getRefreshTime:state=>state.refreshTime,
    getKeywords:state=>state.keywords

};

const mutations={
    [constant.QUIT_LOGIN] (state,res){
         state.loginState=res;
    },
    [constant.REFRESH_USER_ID](state,res)
    {
        state.refresh_user_id=res;
    },
    [constant.SEARCH_KEYWORDS](state,res)
    {
        state.keywords=res;
    },

    [constant.REFRESH_USER_INFO](state,res)
    {
      state.refreshTime=new Date().getTime();
    }






};

export default {
	state,
	actions,
	getters,
	mutations,

}
