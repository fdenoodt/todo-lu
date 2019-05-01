import router from '../../router'
import firebase from 'firebase'
// import { db } from '../../firebase'

const state = {
  user: null,
}

const getters = {
  getUser: (state) => state.user,
}

/* eslint-disable */
const actions = {
  initAccount({ commit }) {
    actions.listenForChanges(commit)
  },
  listenForChanges(commit) {
    firebase
      .auth()
      .onAuthStateChanged((response) => {
        if (response) {
          commit('setUser', response)
          router.push('/HomeView')
        }
        else {
          commit('setUser', null)
          router.push('/SignInView')
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
        console.error('error')
      })
  },
  register({ commit }, user) {
    const email = user.email
    const pw = user.password

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .catch((ex) => {
        console.error('error', ex)
      });
  },
  signOut({ commit }) {
    firebase.auth().signOut()
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