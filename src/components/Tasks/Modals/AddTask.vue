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

      <q-card-actions align="right">
        <q-btn
          label="Save"
          color="primary"
          type="submit" />
      </q-card-actions>

      <pre>{{ taskToSubmit }}</pre>
      
    </q-form>

  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
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
      submitForm() {
        console.log('submitForm', this.$refs.name)
        // this.$refs.name.validate()
        this.submitTask()
      },
      submitTask() {
        console.log('submitTask')
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      },
      clearDueDate() {
        this.taskToSubmit.dueDate = ""
        this.taskToSubmit.dueTime = ""
      }
    },
    components: {
      'model-header': require('../Modals/Shared/ModalHeader.vue').default,
      'model-task-name': require('../Modals/Shared/ModalTaskName.vue').default,
      'model-due-date': require('../Modals/Shared/ModalDueDate.vue').default,
      'model-due-time': require('../Modals/Shared/ModalDueTime.vue').default
    }
  }
</script>