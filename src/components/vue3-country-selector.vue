<template>
  <div class="v3-country-selector" @keydown.esc="isOpen = false;">
    <div style="height: 0 !important; width: 0 !important;"><input type="text" ref="hidden"
        style="height: 0 !important; width: 0 !important; background-color: transparent; border: none;"
        @keydown.esc="isOpen = false;">
    </div>
    <div class="v3-country-selector__selection" :class="{ open: isOpen }" @click="openList"
      :title="selectedCountry?.name">
      <div class="country-flag" :class="{ 'no-border': !selectedCountry?.code }">
        <span class="fi" :class="`fi-${selectedCountry?.code?.toLowerCase()}`"></span>
      </div>
      <span class="country-name ellipsis">{{ selectedCountry?.name }}</span>
      <i class="arrow" :class="{ 'down': !isOpen, 'up': isOpen }"></i>
    </div>
    <div class="v3-country-selector__list fade-in" v-if="isOpen">
      <input type="text" class="country-filter" v-model="countrySearch" @input="filterCountries">
      <div class="country-list">
        <div class="country-list-item" :class="{ 'selected': country.selected }" :title="country.name"
          v-for="(country, idx) in filteredCountries" :key="idx" @click="selectCountry(country)">
          <span class="fi" :class="`fi-${country.code.toLowerCase()}`"></span>
          <span class="country-name ellipsis">{{ country.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { countryListAlpha2Array } from '@/data/country-list';

const CAMEROON = "CM";

export default {
  props: {
    country: {
      type: String,
      default: CAMEROON
    },
    codes: {
      type: Array,
      default: () => void 0
    }
  },
  data() {
    return {
      isOpen: false,
      countrySearch: "",
      selectedCountry: {},
      isUsingDefaultCountryList: true,
      countries: [],
    };
  },
  mounted() {
    this.initCountries();
    this.initSelectedItem();
  },
  computed: {
    filteredCountries() {
      if (this.countrySearch) {
        const cf = this.countrySearch.toLowerCase();

        console.log(cf)

        return this.countries.filter(x => x.code.toLowerCase().startsWith(cf) || x.name.toLowerCase().startsWith(cf))
      }

      return this.countries;
    },
  },
  methods: {
    openList() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
        this.$refs.hidden?.focus();
      });
    },
    selectCountry(country) {
      this.selectedCountry.selected = false;
      this.selectedCountry = country;
      this.selectedCountry.selected = true;

      this.countrySearch = '';
      this.isOpen = false;

      this.$emit('change', { code: this.selectedCountry.code, name: this.selectedCountry.name });
    },
    initCountries() {
      let c = countryListAlpha2Array;

      if (this.codes && Array.isArray(this.codes)) {
        c = countryListAlpha2Array.filter(x => this.codes.includes(x.code));
        this.isUsingDefaultCountryList = false;
      }

      this.countries = c.map(x => ({ ...x, selected: false }));
    },
    initSelectedItem() {
      let targetCountry = this.countries.find(x => x.code == this.country);

      if (!targetCountry && this.isUsingDefaultCountryList) {
        targetCountry = this.countries.find(x => x.code == CAMEROON);
      }

      this.selectCountry(targetCountry);
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* margin: 0;
  padding: 0; */
}

/* Width */
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar:hover {
  width: 10px;
  height: 10px;
}

/* Track */
*::-webkit-scrollbar-track {
  border-radius: 2px;
}

/* Handle */
*::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

:focus {
  outline: none;
}

.v3-country-selector {
  padding: 4px;
  position: absolute;
  width: 100%;
}

.v3-country-selector__selection {
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-gap: 8px;
  align-content: center;
  height: 100%;
  width: 100%;
  min-height: 30px;
  border: 1px solid #eee;
  padding: 0 4px;
  border-radius: 4px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.v3-country-selector__selection:hover,
.v3-country-selector__selection.open,
.v3-country-selector__selection:hover .arrow {
  border-color: #9F0095;
}

.v3-country-selector .v3-country-selector__selection .country-flag {
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
}

.v3-country-selector__selection .country-name {
  color: rgba(105, 105, 105, 0.959);
}

.v3-country-selector__list {
  position: relative;
  top: 100%;
  transform: translateY(-4px);
  width: 100%;
  max-height: 300px;
  border-style: solid;
  border-color: white #9F0095 #9F0095 #9F0095;
  border-width: 1px;
  z-index: 5000;
  display: flex;
  flex-direction: column;
  padding: 4px;
  background: white;
}

.v3-country-selector__list .country-filter {
  padding: 4px;
  border: 1px solid #eee;
}

.v3-country-selector__list .country-filter:focus {
  border-color: #9F0095;
}

.v3-country-selector__list .country-list {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 4px 0;
  /* border: 1px solid #eee; */
  padding: 4px;
  border-radius: 4px;
}

.v3-country-selector__list .country-list .country-list-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-gap: 8px;
  align-content: center;
  cursor: pointer;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
}

.v3-country-selector__list .country-list .country-list-item.selected {
  background: #9F0095 !important;
  color: rgba(255, 255, 255, 0.952);
}

.v3-country-selector__list .country-list .country-list-item:hover {
  background: #eee;
}


.no-border {
  border: none !important;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  border: solid #aaa;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  width: 4px;
  height: 4px;
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrow.up {
  margin: 6px 0;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.fade-in {
  animation: fadeIn 100ms;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>