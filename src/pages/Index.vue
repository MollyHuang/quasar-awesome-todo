<template>
  <q-page padding>
    <input v-model="message" @keyup="handleKeyup">
    <button @click="clearMessage">Clear</button>
    <h5>{{ message }}</h5>
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
    handleKeyup(e) {
      console.log(e)
      if (e.keyCode == 27) {  // ESC: 27
        this.clearMessage()
      }
      if (e.keyCode == 13) {  // Enter: 13
        this.alertMessage()
      }
    },
    alertMessage() {
      alert(this.message)
    }
  }
}
</script>
