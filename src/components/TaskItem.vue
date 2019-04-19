<template>
  <div>
    <b-card class="p-0 mb-1">
      <b-card-text class="p-0 m-0">
        <b-row>
          <b-col md="auto">
            <h2 class="m-0 lead">{{task.title}}</h2>
          </b-col>
          <b-col md="auto" class="p-0 m-0">
            <p class="m-0 text-muted">
              {{new Date(task.date).toLocaleDateString("nl-BE")}}
              <span class="font-weight-bold text-primary">
                {{
                Math.floor(((new Date(task.date)) - new Date()) / (24 * 60 * 60 * 1000)) + 1
                }}D
              </span>
            </p>
          </b-col>
        </b-row>
        <p class="m-0">{{task.content}}</p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task"]
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
