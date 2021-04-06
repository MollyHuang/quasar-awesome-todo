<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      autofocus
      v-select-all
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      label="Task name"
      ref="name"
      class="col">
      <template v-slot:append>
        <q-icon
          v-if="name"
          @click="$emit('update:name', '')"
          name="close"
          class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['name'],
  directives: {
    selectAll: {
      bind(el) {
        let input = el.querySelector('.q-field__native')
        input.addEventListener('focus', () => {
          if (input.value.length > 0 ){
            input.select()
          }
        })
      }
    }
  }
}
</script>