<template>
  <q-page padding>

    <button
      style="position: absolute; right: 10px"
      @click="counter++">
      {{ counter }}
    </button>

    <input
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage">

    <button @click="clearMessage">Clear</button>

    <h5
      class="border-grey"
      v-if="message.length">{{ message }}</h5>
    <h6 v-else>No message entered</h6>

    <hr>

    <p>Uppercase message: {{ messageUppercase }}</p>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: "I love Vue.js so hard",
      counter: 0
    }
  },
  computed: {
    messageUppercase() {
      console.log("messageUppercase was fired.")
      return this.message.toUpperCase()
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