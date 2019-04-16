import router from '../../router'
import firebase from 'firebase'

const state = {
  user: null
}

const getters = {
  getUser: (state) => state.user
}

/* eslint-disable */
const actions = {
  initAccount({ commit }) {
    commit('setUser', "user")
    firebase.auth().onAuthStateChanged((response) => {
      if (response) {
        commit('setUser', response)
        router.push("/HomeView")

      }
      else {
        commit('setUser', null)
        router.push("/SignInView")
      }

    })
  },
  signIn(user) {
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
  register(user) {
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