import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import errorLog from './modules/errorLog'
// import tagsView from './modules/tagsView'
import user from './modules/user'
import map from './modules/map'
import xbInfo from './modules/xbInfo'
import tableRow from './modules/tableRow'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    map,
    xbInfo,
    tableRow
  },
  getters
})

export default store
