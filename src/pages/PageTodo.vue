<template>
  <q-page class="q-pa-md">

    <q-list
      separator
      bordered>

      <task
        v-for="(task, key) in tasks"
        :key="key"
        :id="key"
        :task="task">
      </task>

    </q-list>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('tasks', ['tasks'])

    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
  },
  components: {
    'task': require('../components/Tasks/Task.vue').default
  }
}
</script>

<style scoped>

</style>