<template>
  <div>
    <b-card class="p-0 mb-1">
      <b-card-text v-show="editStatus">
        <div class="row">
          <h2 class="col m-0 lead" v-show="editStatus">{{task.data().title}}</h2>
          <p class="col m-0 text-muted">
            <span v-show="editStatus">{{new Date(task.data().date).toLocaleDateString("nl-BE")}}</span>
            <span class="font-weight-bold text-primary">
              {{Math.floor(((new Date(task.data().date)) -
              new Date()) / (24 * 60 * 60 * 1000)) + 1}}D
            </span>
          </p>
        </div>
        <div class="m-0">
          <span v-show="editStatus">{{task.data().content}}</span>
        </div>
        <p>
          <button @click="removeTask(task.id)" type="button" class="btn btn-primary">Delete</button>
          <button @click="editTheStatus" type="button" class="btn btn-primary">Edit</button>
        </p>
      </b-card-text>

      <b-card-text v-show="!editStatus">
        <form>
          <p>
            <b-form-input type="text" v-model="editedTaskItem.title"></b-form-input>
          </p>
          <p>
            <date-picker v-model="editedTaskItem.date" :config="options"></date-picker>
          </p>
          <p>
            <b-form-input v-model="editedTaskItem.content"></b-form-input>
          </p>
          <p>
            <button @click="editTheStatus" type="button" class="btn btn-primary">Cancel</button>
            <button @click="update" type="button" class="btn btn-primary">Save</button>
          </p>
        </form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

export default {
  name: "TaskItem",
  props: ["task"],
  methods: {
    ...mapActions(["removeTask"]),
    editTheStatus() {
      this.editStatus = !this.editStatus;
      this.editedTaskItem = {
        content: this.task.data().content,
        date: new Date(this.task.data().date).toLocaleDateString("nl-BE"),
        title: this.task.data().title,
        tags: this.task.data().tags,
        id: this.task.id
      };
    },
    update() {
      //Todo: save into firestore
      this.editTheStatus();
    }
  },
  data() {
    return {
      editStatus: true,
      editedTaskItem: {},
      options: {
        format: "DD/MM/YYYY",
        useCurrent: false
      }
    };
  },
  components: {
    datePicker
  }
};
</script>

<style>
b-badge {
  margin-right: 20px;
}

.pastdeadline {
  background: rgba(255, 0, 0, 0.5);
}

.done {
  opacity: 0.5;
  text-decoration: line-through;
}

.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}
</style>
