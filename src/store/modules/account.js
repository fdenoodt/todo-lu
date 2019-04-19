import router from '../../router'
import firebase from 'firebase'
import { db } from '../../firebase'

const state = {
  user: null,
  tasks: [],
  notes: [],
  reminders: []
}

const getters = {
  getUser: (state) => state.user,
  getTasks: (state) => state.tasks,
  getReminders: (state) => state.reminders,
  getNotes: (state) => state.notes
}

/* eslint-disable */
const actions = {
  initAccount({ commit }) {
    actions.listenForChanges(commit, 'tasks')
    actions.listenForChanges(commit, 'reminders')
    actions.listenForChanges(commit, 'notes')
  },
  listenForChanges(commit, collection) {
    firebase
      .auth()
      .onAuthStateChanged((response) => {
        if (response) {
          commit('setUser', response)
          router.push('/HomeView')
          db.collection('users')
            .doc(response.uid)
            .collection('data')
            .doc(collection)
            .onSnapshot(function (doc) {
              let data = []
              if (doc.exists)
                data = doc.data().list

              const nameCapitalized = collection.charAt(0).toUpperCase() + collection.slice(1)
              commit('set' + nameCapitalized, data) //setTask | setReminders | setNotes
            })
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
      .then(() => {
        // actions.loadEmptyUserDataInFireStore()
      })
      .catch((ex) => {
        console.error('error', ex)
      });
  },
  signOut({ commit }) {
    firebase.auth().signOut()
  },
  addTask({ commit }) {
    const uid = firebase.auth().currentUser.uid
    db.collection('users')
      .doc(uid)
      .collection('data')
      .doc('tasks')
      .set({
        list: firebase.firestore.FieldValue.arrayUnion({
          title: 'new task',
          content: '',
          tags: ['big', 'small'],
          date: Date.now(),
        })
      }, { merge: true });
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