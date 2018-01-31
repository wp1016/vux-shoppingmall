import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const vux={
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
}


export default new Vuex.Store({
  modules:{
    vux
  }
})


