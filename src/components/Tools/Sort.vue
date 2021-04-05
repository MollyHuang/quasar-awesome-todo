<template>
  <q-select
    filled
    v-model="model"
    :options="options"
    label="Sort by"
    class="col q-ml-sm"
    stack-label />
</template>

<script>
  export default {
    data () {
      return {
        model: null,

        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ]
      }
    }
  }
</script>

<style scope>
  .q-select {
    flex: 0 0 112px;
  }
</style>