<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">

      <template
        v-if="taskDownloaded">

        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>

        <q-scroll-area class="q-scroll-area-tasks">

          <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">
            No search results.
          </p>

          <no-tasks
            v-if="!Object.keys(tasksTodo).length 
            && !search
            && !settings.showTasksInOneList" />

          <task-todo
            v-if="Object.keys(tasksTodo).length"
            :tasksTodo="tasksTodo" />

          <task-completed
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted"
            class="q-mb-xl" />
        
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click.stop="showAddTask = true"
            round
            class="all-pointer-events"
            icon="add"
            size="24px"
            color="primary"
          />
        </div>

      </template>

      <template
        v-else>
        Loading...  
      </template>
    
    </div>

    <q-dialog v-model="showAddTask">
      <add-task
        @close="showAddTask = false" />
    </q-dialog>
    
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapState("tasks", ["search", "taskDownloaded"]),
    ...mapGetters("settings", ["settings"]),
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

<style>
  /* full available height */
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>