<template>
  <q-page padding>

    <input
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage">

    <button @click="clearMessage">Clear</button>

    <h5
      class="border-grey"
      v-if="message.length">{{ message }}</h5>
    <h6 v-else>No message entered</h6>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: "I love Vue.js so hard"
    }
  },
  methods: {
    clearMessage() {
      this.message = ''
    },
    alertMessage() {
      alert(this.message)
    }
  }
}
</script>

<style scoped>
  .border-grey {
    border: 1px solid grey;
  }
</style>