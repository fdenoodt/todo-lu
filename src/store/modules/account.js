import router from '../../router'
import firebase from 'firebase'

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
  },
  /* eslint-disable */
  signIn({ commit }, user) {
    const email = user.email
    const pw = user.password

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(user => {
        console.log(user)
      })
      .catch(() => {
        console.log("error")
      })


  },
  register({ commit }, user) {
    const email = user.email
    const pw = user.password

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then(user => {
        console.log(user);
      })
      .catch(() => {
        console.log("error")
      });
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