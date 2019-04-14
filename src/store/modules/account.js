import router from '../../router'

const state = {
  user: null
}

const getters = {
  getUser: (state) => state.user
}

const actions = {
  initAccount({ commit }) {
    commit('setUser', "user")
    router.push("/SignInView");
  }
}

const mutations = {
  setUser: (state, u) => (state.user = u),
}

export default {
  state,
  getters,
  actions,
  mutations
}