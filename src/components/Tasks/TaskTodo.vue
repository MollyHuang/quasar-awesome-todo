<template>
  <div>
    <list-header
      bgColor="bg-orange-4">
      Todo
    </list-header>
    
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
  
  </div>
</template>

<script>
export default {
  props: ['tasksTodo'],
  components: {
    "task": require("../Tasks/Task.vue").default,
    "list-header": require("../Shared/ListHeader").default
  }
}
</script>