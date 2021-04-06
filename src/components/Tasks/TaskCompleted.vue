<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div class="q-mt-lg">
      <list-header
        bgColor="bg-green-4">
        Completed
      </list-header>

      <q-list
        separator
        bordered>
        <task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :id="key"
          :task="task">
        </task>
      </q-list>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['tasksCompleted'],
  components: {
    "task": require("../Tasks/Task.vue").default,
    "list-header": require("../Shared/ListHeader").default
  }
}
</script>