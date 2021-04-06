<template>
  <q-card>

    <model-header>Add Task</model-header>

    <q-form @submit.prevent="submitForm">
      
      <q-card-section class="q-pt-none">

        <model-task-name
          :name.sync="taskToSubmit.name" />
        <model-due-date
          :dueDate.sync="taskToSubmit.dueDate"
          @clear="clearDueDate" />
        <model-due-time
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime" />

      </q-card-section>

      <model-buttons />

    </q-form>

  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

  export default {
    mixins: [mixinAddEditTask],
    data() {
      return {
        taskToSubmit: {
          name: '',
          completed: false,
          dueDate: '',
          dueTime: ''
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['addTask']),
      submitTask() {
        // console.log('submitTask')
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      }
    }
  }
</script>