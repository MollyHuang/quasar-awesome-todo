export default {
  methods: {
    submitForm() {
      console.log('submitForm', this.$refs.name)
      // this.$refs.name.validate()
      this.submitTask()
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = ""
      this.taskToSubmit.dueTime = ""
    }
  },
  components: {
    'model-header': require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
    'model-task-name': require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
    'model-due-date': require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
    'model-due-time': require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
    'model-buttons': require('components/Tasks/Modals/Shared/ModalButtons.vue').default
  }
}