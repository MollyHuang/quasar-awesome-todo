<template>
  <q-page class="q-pa-md">

    <q-list
      v-if="Object.keys(tasks).length"
      separator
      bordered>

      <task
        v-for="(task, key) in tasks"
        :key="key"
        :id="key"
        :task="task">
      </task>

    </q-list>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click.stop="showAddTask = true"
        round
        icon="add"
        size="24px"
        color="primary" />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])

    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
  },
  components: {
    'task': require('../components/Tasks/Task.vue').default,
    'add-task': require('../components/Tasks/Modals/AddTask.vue').default
  }
}
</script>

<style scoped>

</style>