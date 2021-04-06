<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
    >
    <div>
      <list-header
        bgColor="bg-orange-4">
        Todo
      </list-header>
      
      <q-list
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
  </transition>
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