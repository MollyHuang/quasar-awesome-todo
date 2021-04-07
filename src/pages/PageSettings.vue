<template>
  <q-page padding>
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle 
            v-model="show12hourTimeformat"
            color="blue"></q-toggle>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters('settings', [ 'settings' ]),
      show12hourTimeformat: {
        get () {
          return this.settings.show12hourTimeformat
        },
        set(value) {
          this.setshow12hourTimeformat(value)
        }
      }
    },
    methods: {
      ...mapActions('settings', ['setshow12hourTimeformat'])
    }
  }
</script>