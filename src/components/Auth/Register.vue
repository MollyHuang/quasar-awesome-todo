<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register to access your todo anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input 
        v-model="formData.email"
        outlined
        class="col"
        label="Email"
        ref="email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        lazy-rules
        stack-label />
    </div>
    <div class="row q-mb-md">
      <q-input 
        v-model="formData.password"
        outlined
        class="col"
        label="Password"
        type="password"
        ref="password"
        :rules="[ val => val.length > 6 || 'Please enter at least 6 characters.']"
        lazy-rules
        stack-label />
    </div>
    <div class="row">
      <q-space />
      <q-btn 
        color="primary"
        label="Register"
        type="submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: ""
      }
    }
  },
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        console.log('register user')
      }
    },
  }
}
</script>