import firebase from 'firebase'
import { db } from '../../firebase'

const state = {
  tasks: [],
}

const getters = {
  getTasks: (state) => state.tasks,
}

/* eslint-disable */
const actions = {
  initTasks({ commit }) {
    actions.listenForChanges(commit, 'tasks')
  },
  async taskCollection(...params) {
    const uid = firebase.auth().currentUser.uid
    const col = db.collection('users')
    return Promise.resolve(
      col
        .doc(uid)
        .collection('tasks')
        .orderBy('date')
        .where(...params)
        .get()
    )
  },

  async listenForChanges(commit, collection) {
    const querySnapshot1 = await actions.taskCollection('done', '==', false)
    const querySnapshot2 = await actions.taskCollection('date', '>', (new Date(Date.now())).toLocaleDateString("en-US"))
    Promise.all([querySnapshot1, querySnapshot2])

    const fillListFromSnapshot = (querySnapshot) => {
      const list = []
      querySnapshot.forEach(function (doc) {
        list.push(doc)
      })
      return list
    }

    //Merges 2 lists, thank you internet :)
    Array.prototype.unique = function () {
      var a = this.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i].id === a[j].id)
            a.splice(j--, 1);
        }
      }

      return a;
    };

    const list1 = fillListFromSnapshot(querySnapshot1)
    const list2 = fillListFromSnapshot(querySnapshot2)
    const mergedList = list1.concat(list2).unique();

    commit('setTasks', mergedList)
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
  setTasks: (state, t) => (state.tasks = t),
}

export default {
  state,
  getters,
  actions,
  mutations
}