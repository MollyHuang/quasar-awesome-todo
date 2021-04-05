<template>
  <q-page class="q-pa-md">

    <div class="row q-mb-lg">
      <search />
      <sort />
    </div>

    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">
      No search results.
    </p>

    <no-tasks
      v-if="!Object.keys(tasksTodo).length && !search" />

    <task-todo
      v-if="Object.keys(tasksTodo).length"
      :tasksTodo="tasksTodo" />

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
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapState("tasks", ["search"]),
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
    "search": require("components/Tools/Search.vue").default,
    "sort": require("components/Tools/Sort.vue").default
  }
};
</script>