<template>
  <q-item
    @click="updateTask({id: id, updates: {completed: !task.completed}})"
    :class="task.completed? 'bg-green-1' : 'bg-orange-1'"
    clickable
    v-touch-hold:1000.mouse="showEditTaskModal"
    v-ripple>

    <q-item-section side top>
      <q-checkbox
        :value="task.completed"
        class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="task.completed? 'text-strike': null"
        v-html="$options.filters.searchHighlight(task.name, search)">
      </q-item-label>
    </q-item-section>

    <q-item-section
      v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate | niceDate }}</q-item-label>
          <q-item-label class="row justify-end" caption><small>{{ taskDueTime }}</small></q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit" />
          <q-dialog v-model="showEditTask">
            <edit-task
              @close="showEditTask = false"
              :task="task"
              :id="id" />
          </q-dialog>

        <q-btn
          @click.stop="promptToDelete()"
          flat
          round
          dense
          icon="delete" />
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="delete" color="primary" text-color="white" />
                <span class="q-ml-sm">Really delete?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="third" v-close-popup />
                <q-btn
                  @click.stop="deleteTask(id)"
                  flat
                  dense
                  label="Yes"
                  color="primary"
                  v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
      </div>
    </q-item-section>

  </q-item>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { date } from 'quasar'

  export default {
    props: ['task', 'id'],
    data() {
      return {
        confirm: false,
        showEditTask: false
      }
    },
    computed: {
      ...mapState('tasks', ['search']),
      ...mapGetters('settings', ['settings']),
      taskDueTime() {
        if (this.settings.show12hourTimeformat) {
          const { formatDate } = date // it would be better to add this so that only the formatDate method is added to the project
          // 2019/05/15 16:00
          return formatDate(this.task.dueDate + ' ' + this.task.dueTime, 'h:mm A')
        }
        return this.task.dueTime
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      showEditTaskModal() {
        this.showEditTask = true
      },
      promptToDelete() {
        this.confirm = true
      }
    },
    filters: {
      niceDate(value) {
        const { formatDate } = date // it would be better to add this so that only the formatDate method is added to the project
        return formatDate(value, 'MMM D')
      },
      searchHighlight(value, search) {
        // console.log('value: ', value)
        // console.log('search: ', search)
        if (search) {
          // return value.replace(search, '<span class="bg-yellow-6">' + search + '</span>')
          let searchRegExp = new RegExp(search, 'ig')
          return value.replace(searchRegExp, (match) => {
            return '<span class="bg-yellow-6">' + match + '</span>'
          })
        }
        return value
      }
    },
    components: {
      'edit-task': require('../Tasks/Modals/EditTask.vue').default
    }
  }
</script>