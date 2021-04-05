<template>
  <q-page class="q-pa-md">

    <div class="row q-mb-lg">
      <search />
    </div>

    <task-todo
      v-if="Object.keys(tasksTodo).length"
      :tasksTodo="tasksTodo" />
    <no-tasks
      v-else />

    <task-completed
      v-if="Object.keys(tasksCompleted).length"
      :tasksCompleted="tasksCompleted" />

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
import Search from 'components/Tools/Search.vue';
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
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    "task-todo": require("components/Tasks/TaskTodo.vue").default,
    "task-completed": require("components/Tasks/TaskCompleted.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    "search": require("components/Tools/Search.vue").default
  }
};
</script>