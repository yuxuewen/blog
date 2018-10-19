/**
 *
 * @authors 于学文 (you@example.org)
 * @date    2018-05-24 09:48:22
 * @version $Id$
 */


import Vue from 'vue'
import Vuex from 'vuex'
import base from './module/base'



Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
      base,

    },
      strict: false,
    strict:process.env.NODE_ENV !== 'production'
})

export default store;
