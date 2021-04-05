<template>
  <q-list
    v-if="Object.keys(tasksTodo).length"
    separator
    bordered>
    <task
      v-for="(task, key) in tasksTodo"
      :key="key"
      :id="key"
      :task="task">
    </task>
  </q-list>
</template>

<script>
export default {
  props: ['tasksTodo'],
  components: {
    "task": require("../Tasks/Task.vue").default,
  }
}
</script>