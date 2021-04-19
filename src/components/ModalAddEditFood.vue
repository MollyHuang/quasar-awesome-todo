<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ type }} Food</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <q-input
          filled
          v-model="foodToSubmit.name"
          :rules="[
            val => !!val || '* Required',
            val => val.length < 20 || 'Please use maximum 20 character'
          ]"
          ref="name"
          label="Name (e.g. Burger)"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="foodToSubmit.description"
          :rules="[
            val => val.length <= 135 || 'Please use maximum 135 characters'
          ]"
          ref="description"
          label="Description"
          type="textarea"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="foodToSubmit.imageUrl"
          label="Image URL"
          class="col" />
        <q-img
          :src="foodToSubmit.imageUrl? foodToSubmit.imageUrl : 'image-placeholder.png'"
          class="q-ml-sm"
          contain />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Rating:</p>
        </div>
        <div class="row">
          <q-rating v-model="foodToSubmit.rating" size="2em" color="orange" />
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Cancel" color="grey" v-close-popup />
      <q-btn label="Save" color="primary" @click="submitForm" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["type", "food", "id"],
  data() {
    return {
      foodToSubmit: {
        name: "",
        description: "",
        rating: 1,
        imageUrl: ""
      }
    };
  },
  methods: {
    ...mapActions("foods", ["addFood", "updateFood"]),
    submitForm() {
      console.log("[ModalAddEditFood.vue] submitForm", this.$refs.name);
      this.$refs.name.validate();
      this.$refs.description.validate();

      if (!this.$refs.name.hasError && !this.$refs.name.description) {
        this.submitFood();
        this.$emit("close");
      }
    },
    submitFood() {
      console.log("[ModalAddEditFood.vue] submitFood type", this.type)
      if (this.type == "add") {
        this.addFood(this.foodToSubmit)
      } else {
        this.updateFood({
          id: this.id, 
          updates: this.foodToSubmit
        })
        // this.updateFood(this.foodToSubmit);
      }
    }
  },
  mounted() {
    if (this.type == "edit") {
      this.foodToSubmit = Object.assign({}, this.food)
    }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
