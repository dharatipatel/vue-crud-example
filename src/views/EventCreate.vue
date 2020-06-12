<template>
  <!-- <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>Created by {{ user.id }}</p>
    <p>There are {{ catLength }} Categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div> -->
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <!-- <label>Select a category</label> -->
      <!-- <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select> -->
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="fields"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p>
      </template>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="fields"
        @blur="$v.event.time.$touch()"
        :class="{ error: $v.event.time.$error }"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out required field(s).
      </p>
    </form>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import Datepicker from "vuejs-datepicker";
import Nprogress from "nprogress";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times: times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Nprogress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            Nprogress.done();
            // console.log("There was a problem creating an event");
          });
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id: id,
        user: user,
        category: "",
        organizer: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  }
};
// export default {
// computed: {
//   userName() {
//     return this.$store.state.user.name;
//   },
//   userId() {
//     return this.$store.state.user.id;
//   }
// }
// computed: {
//   catLength() {
//     return this.$store.getters.catLength;
//   },
//   ...mapState(["user", "categories"])
// }
// };
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
