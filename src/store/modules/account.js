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
    firebase
      .auth()
      .onAuthStateChanged((response) => {
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
  signIn({ commit }, user) {
    const email = user.email
    const pw = user.password

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
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
      .catch(() => {
        console.log("error")
      });
  },
  signOut({ commit }) {
    firebase.auth().signOut();
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