<template>
  <!--
	Awesome Exercise 3 - Vuex & Forms

	1) Create a Vuex Store for the food items, with the four different sections 
		 and add the food data to the appropriate section
	2) Create a getter to retreive the food and 
		 display these on the page using the getter
	3) Add the ability to delete an item (when the user clicks Delete) 
	   using actions & mutations - show a confirm dialog before deleting
	4) Add validation to the Add / Edit Food modal 
		 - make the Name a required field with a max of 20 characters. 
		 Make description not required, but with a max of 135 characters. 
		 Validation should be triggered when Save is clicked
	5) Add the ability to Add an item 
		 (hint: both Add and Edit modals use the same component
		 - use the 'type' prop to differentiate)
	6) Add the ability to Edit an item
	7) If no description is provided for a food item, 
		 display the text "No description provided." in italic text
	8) If no image is provided, fall back to the image statics/image-placeholder.png


  Awesome Exercise 4 - Firebase

  1) Create a new Firebase project called "Foods" and enable Email / Password authentication within Firebase
  2) Add the Firebase package to the project and create a boot file which makes the auth and database API's available within your app. Hint: you'll need to register a web app on Firebase
  3) Create an auth Vuex store file with empty state, mutations, actions & getters objects and import the Firebase Auth API
  4) Add the ability to register a user
  5) Add the ability to login a user
  6) Hide the Login button when the user is logged in
  7) Add a Logout button which only displays when the user is logged in. Log the user out when this is clicked
  8) Redirect the user to appropriate pages when they log in or log out
  9) Prevent the user from reaching the Foods page when not logged in
  10) Add some data for one of your users to the Realtime Database, based on the data in store-foods.js
  11) Add the ability to read the current user's food data from Firebase and display it within the app - whenever a food item is added, updated or deleted within Firebase
  12) Add the ability to write data to Firebase whenever a food item is added, updated or deleted within the app
  13) Ensure that multiple users can log in and log out without seeing another user's data in the app
  14) Add database rules to Firebase to ensure that each user can only read or write to their own data
  15) Display a nice error notification whenever there is an auth or database error
  16) Display the logged in user's email address within the logout button, e.g "Logout test@test.com"

	-->
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">
      <food
        v-for="(food, key) in foods"
        :key="key"
        :food="food"
        :id="key" />

      <button-add
        @click="showAddFoodModal = true" />

      <q-dialog v-model="showAddFoodModal">
        <modal-add-edit-food
          type="add"
          @close="showAddFoodModal = false" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      showAddFoodModal: false
    };
  },
  computed: {
    ...mapGetters("foods", ["foods"])
  },
  components: {
    "food": require("components/Food.vue").default,
    "button-add": require("components/ButtonAdd.vue").default,
    "modal-add-edit-food": require("components/ModalAddEditFood.vue").default
  },
}
</script>
