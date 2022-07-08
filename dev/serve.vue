<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { Vue3CountrySelectorSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  Vue3CountrySelectorSample,
  // }
  methods: {
    changed(country) {
      console.log(country);
    }
  },

  data() {
    return {
      country: null,
      countries: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.countries = ['CM', 'CI', 'US', 'DE'];
      this.country = 'CM';
    }, 3000);
  }
});
</script>

<template>
  <div id="app">
    <span class="fi fi-cm"></span> <span class="fi fi-gr fis"></span>
    <vue3-country-selector :codes="countries" :country="country" @change="changed" />
    <h1>Okay</h1>
  </div>
</template>
