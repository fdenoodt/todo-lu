<template>
  <div>
    <b-card class="p-0 mb-1">
      <b-card-text v-show="editStatus">
        <div class="m-0 text-muted">
          <span>{{new Date((task.data().date).toLocaleDateString("en-US")).toLocaleDateString("nl-BE")}}</span>
          <span class="font-weight-bold text-primary">
            {{Math.floor(((new Date(task.data().date)) -
            new Date()) / (24 * 60 * 60 * 1000)) + 1}}D
          </span>
        </div>
        <div class="m-0">
          <div v-html="task.data().content"></div>
        </div>
        <div class="mt-1">
          <button @click="removeTask(task.id)" type="button" class="btn btn-primary">Delete</button>
          <button @click="editTheStatus" type="button" class="btn btn-primary">Edit</button>
        </div>
      </b-card-text>

      <b-card-text v-show="!editStatus">
        <form>
          <p>
            <date-picker v-model="editedTaskItem.date" :config="options"></date-picker>
          </p>
          <p>
            <editor
              api-key="le96jjyz4xlxqt253bhlkmilpapl19astxv62p1s5fp1uku6"
              v-model="editedTaskItem.content"
              :init="{
                branding: false,
                toolbar: false,
                statusbar: false,
                anchorbar: false,
                setup: function(ed) {
                  ed.on('keydown', function(event) {
                      if (event.keyCode == 9) { // tab pressed
                        if (event.shiftKey) {
                          ed.execCommand('Outdent');
                        }
                        else {
                          ed.execCommand('Indent');
                        }

                        event.preventDefault();
                        return false;
                      }
                  });
                }}"
            ></editor>
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

import editor from "@tinymce/tinymce-vue";

export default {
  name: "TaskItem",
  props: ["task"],
  methods: {
    ...mapActions(["removeTask", "editTask"]),
    editTheStatus() {
      this.editStatus = !this.editStatus;
      this.editedTaskItem = {
        content: this.task.data().content,
        date: this.task.data().date,
        tags: this.task.data().tags,
        done: this.task.data().done
      };
    },
    update() {
      /* eslint-disable */
      this.editTask({ id: this.task.id, task: this.editedTaskItem });
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
    datePicker,
    editor
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

.test {
  background: blue;
}
</style>
