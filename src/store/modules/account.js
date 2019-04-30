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
    const oi = null;
    firebase
      .auth()
      .onAuthStateChanged((response) => {
        if (response) {
          commit('setUser', response)
          router.push('/HomeView')
          db.collection('users')
            .doc(response.uid)
            .collection(collection)
            .orderBy('date')
            .where('done', '==', false)
            .onSnapshot(function (querySnapshot) {
              const list = []

              querySnapshot.forEach(function (doc) {
                list.push(doc)
              });

              const nameCapitalized = collection.charAt(0).toUpperCase() + collection.slice(1)
              commit('set' + nameCapitalized, list) //setTask | setReminders | setNotes
            });
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
  },
  addTask({ commit }) {
    const uid = firebase.auth().currentUser.uid
    const today = new Date().toLocaleDateString("en-US");
    db.collection('users')
      .doc(uid)
      .collection('tasks')
      .add({
        content: '<h2></h2>',
        tags: ['big', 'small'],
        date: today,
        done: false
      })
      .catch((error) => console.error("error: ", error))
  },
  editTask({ commit }, data) {
    const uid = firebase.auth().currentUser.uid
    const id = data.id
    const task = data.task
    db.collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(id)
      .update(task)
      .catch((error) => console.error("error: ", error))
  },
  removeTask({ commit }, taskId) {
    const uid = firebase.auth().currentUser.uid
    db.collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .delete()
      .catch((error) => console.error("Error removing document: ", error));
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