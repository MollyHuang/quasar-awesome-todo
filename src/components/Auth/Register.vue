<template>
  <form @submit.prevent="formSubmit">
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
        stack-label />
    </div>
    <div class="row q-mb-md">
      <q-input 
        v-model="formData.password"
        outlined
        class="col"
        label="Password"
        type="password"
        stack-label />
    </div>
    <div class="row">
      <q-space />
      <q-btn 
        color="primary"
        label="Register" />
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
    formSubmit() {
      console.log('Form Submit')
    }
  }
}
</script>