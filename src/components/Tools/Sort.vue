<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by"
    class="col q-ml-sm"
    stack-label />
</template>

<script>
  export default {
    data () {
      return {
        sortBy: null,
        options: [
          {
            label: 'Name',
            value: 'name'
          },
          {
            label: 'Date',
            value: 'dueDate'
          }
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