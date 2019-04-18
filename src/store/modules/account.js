import router from '../../router'
import firebase from 'firebase'
import { db } from '../../firebase'

const state = {
  user: null,
  tasks: [],
  notes: [],
  reminder: []
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

          db.collection('users')
            .doc(response.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data()
                commit('setNotes', data.notes)
                commit('setReminders', data.reminders)
                commit('setTasks', data.tasks)
              }
              else {
                actions.loadEmptyUserDataInFireStore()
                //Todo: when user didnt have data and signs in. this method is called, but the data isn't loaded into ram. only into firestore
              }
            })
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
        console.error("error")
      })
  },
  register({ commit }, user) {
    const email = user.email
    const pw = user.password

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then(() => {
        actions.loadEmptyUserDataInFireStore()
      })
      .catch((ex) => {
        console.error("error", ex)
      });
  },
  loadEmptyUserDataInFireStore() {
    const uid = firebase.auth().currentUser.uid
    db.collection("users")
      .doc(uid)
      .set({
        tasks: [],
        reminders: [],
        notes: []
      })
      .catch((ex) => {
        console.error("error", ex)
      })
  },
  signOut({ commit }) {
    firebase.auth().signOut()
  }
}

const mutations = {
  setUser: (state, u) => (state.user = u),
  setTasks: (state, t) => (state.tasks = t),
  setReminders: (state, r) => (state.reminders = r),
  setNotes: (state, n) => (state.notes = n)
}

export default {
  state,
  getters,
  actions,
  mutations
}