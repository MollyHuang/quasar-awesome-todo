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

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show Task in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle 
            v-model="showTasksInOneList"
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
          this.setShow12hourTimeformat(value)
        }
      },
      showTasksInOneList: {
        get () {
          return this.settings.showTasksInOneList
        },
        set(value) {
          this.setShowTasksInOneList(value)
        }
      }
    },
    methods: {
      ...mapActions('settings', [
        'setShow12hourTimeformat',
        'setShowTasksInOneList'
      ])
    }
  }
</script>