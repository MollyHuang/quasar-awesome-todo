<template>
  <q-item
    @click="updateTask({id: id, updates: {completed: !task.completed}})"
    :class="task.completed? 'bg-green-1' : 'bg-orange-1'"
    clickable
    v-ripple>

    <q-item-section side top>
      <q-checkbox
        :value="task.completed"
        class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="task.completed? 'text-strike': null">
        {{ task.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section
      v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
          <q-item-label class="row justify-end" caption><small>{{ task.dueTime }}</small></q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
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
    </q-item-section>

  </q-item>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        confirm: false,
      }
    },
    props: ['task', 'id'],
    methods: {
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      promptToDelete() {
        this.confirm = true
      }
    }
  }
</script>

<style lang="scss">
  
</style>