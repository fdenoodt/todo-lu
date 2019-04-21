<template>
  <div>
    <b-card class="p-0 mb-1">
      <b-card-text>
        <div class="row">
          <h2 class="col m-0 lead">{{task.data().title}}</h2>
          <p class="col m-0 text-muted">
            {{new Date(task.data().date).toLocaleDateString("nl-BE")}}
            <span
              class="font-weight-bold text-primary"
            >
              {{Math.floor(((new Date(task.data().date)) -
              new Date()) / (24 * 60 * 60 * 1000)) + 1}}D
            </span>
          </p>
        </div>
        <p class="m-0">{{task.data().content}}</p>
      
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
