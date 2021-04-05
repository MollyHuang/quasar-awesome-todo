<template>
  <q-page class="q-pa-md">

    <task-todo :tasksTodo="tasksTodo" />

    <task-completed :tasksCompleted="tasksCompleted" />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click.stop="showAddTask = true"
        round
        icon="add"
        size="24px"
        color="primary"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task
        @close="showAddTask = false" />
    </q-dialog>
    
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import TaskCompleted from '../components/Tasks/TaskCompleted.vue';

export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"])

    // tasks() {
    //   return this.$store.getters['tasks/tasksTodo']
    // }
  },
  components: {
    "task-todo": require("../components/Tasks/TaskTodo.vue").default,
    "task-completed": require("../components/Tasks/TaskCompleted.vue").default,
    "add-task": require("../components/Tasks/Modals/AddTask.vue").default
  }
};
</script>