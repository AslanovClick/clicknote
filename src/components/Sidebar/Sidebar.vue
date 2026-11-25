<template>
  <div class="sidebar"
    :class="{open: sidebarOpen}"
  >
    <div class="sidebar__container">
      <div class="sidebar__paddings">
        <SidebarContent @closeMobileFilter="closeMobileFilter" 
          @getFiltersCount="count => $emit('getFiltersCount', count)" />
          
        <SidebarReset @click="resetFilters" />
      </div>
    </div>
    
    <SidebarCloseButtonMobile @click="$emit('sidebarClose')" />    
    <SidebarCloseButtonDesktop @click="closeSidebar" />

    <SidebarOpenButton @click="openSidebar" />
  </div>
</template>

<script>
import SidebarContent from './components/SidebarContent.vue';
import SidebarReset from "./components/SidebarReset.vue";
import SidebarCloseButtonDesktop from './components/SidebarCloseButtonDesktop.vue';
import SidebarCloseButtonMobile from './components/SidebarCloseButtonMobile.vue';
import SidebarOpenButton from './components/SidebarOpenButton.vue';
import { mapState } from 'vuex';
import {isMobileScreen} from '@/Hooks/isMobileScreen';

export default {
  components: {
    SidebarContent,
    SidebarReset,
    SidebarCloseButtonDesktop,
    SidebarCloseButtonMobile,
    SidebarOpenButton,
  },

  props: [
    "openMobileFilter", 
  ],

  emits: ["sidebarClose", "filter"],

  data() {
    return {
      sidebarOpen: true
    };
  },

  computed: {
    ...mapState({
      filters: state => state.sidebarFilters
    }),
  },

  methods: {
    openSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    closeSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    resetFilters() {
      this.resetOptions();
      this.$router.push('/')
      this.$emit("sidebarClose");
    },

    resetOptions() {
      for (let key in this.filters) {
        const checkedFilters = this.filters[key].list.filter(f => f.checked === true);
        checkedFilters.forEach((f) => this.$store.commit('updateFilterCheckboxValue', {filterKey: key, filterId: f.id, value: false}));
      }
    },

    closeMobileFilter() {
      if (isMobileScreen(window.innerWidth)) {
        this.sidebarOpen = false;

        this.$emit('sidebarClose');
      }
      
      window.addEventListener("resize", () => {
        console.log(isMobileScreen(window.innerWidth));
        // console.log(window.innerWidth);
        if (isMobileScreen(window.innerWidth)) {
          // console.log("resize", this.sidebarOpen === false );
          this.sidebarOpen === false ? this.$emit('sidebarClose') : this.$emit('sidebarOpen');
        }
      });
    }
  }, 

  created() {
    this.closeMobileFilter()

    console.log('updated');
  },

  watch: {
    openMobileFilter(newValue) {
      if (isMobileScreen(window.innerWidth)) {
        this.sidebarOpen = newValue;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  font-family: "Montserrat";
  font-style: normal;
  position: relative;
  width: 0;
  height: 100%;
  z-index: 9;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  
  &__container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: em(3);
    padding-top: em(25);
    background: var(--bgcolor-2);
    border-radius: 0 em(20) em(20) 0;
    z-index: 5;
    position: relative;
    transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
  }

  &__paddings {
    z-index: 5;
    width: calc(15em - 2.3em);
    padding-bottom: .3em;
    padding-top: 0;
    overflow: scroll;
    overflow-x: hidden;
    position: relative;
    box-sizing: border-box;
    height: auto;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    &.scroll {
      height: 86%;
    }

    /* width */
    &::-webkit-scrollbar {
      width: em(4);
      border-radius: em(20);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // background: var(--bgcolor-6);
      border-radius: em(20);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(20);
      transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(174, 174, 174, 0.8);
    }
  }

  &.open {
    width: 15em;
  }

  @media (max-width: 500px) {
    position: fixed;
    left: .6em;
    right: .6em;
    width: calc(100% - 1.2em) !important;
    height: calc(100% - 4.2em);

    opacity: 0;
    z-index: -9;
    transition: opacity 0.15s .1s ease-in-out;
    pointer-events: none;

    &::after, &::before {
      content: none;
    }

    &__container {
      height: 100%;
      border-radius: 1.25em 1.25em 1.25em 1.25em;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    &__paddings {
      width: 100%;
      height: 100%;
      padding-right: 0.2em;
    }

    &.open {
      pointer-events: auto;
      opacity: 1;
      z-index: 999;
    }
  }
}
</style>
