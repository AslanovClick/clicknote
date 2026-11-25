<template>
  <div class="body-wrap" :class="{ darkmode: darkmode }">
    <router-view @darkmode="darkModeHandler"></router-view>
    <div
      class="darkmode__anim"
      :class="{
        show: darkmodeAnim,
        enable: darkmodeAnim && darkmodeStatus,
        disable: darkmodeAnim && !darkmodeStatus,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "App",

  computed: {
    isNotGuestPage() {
      return !window.location.href.includes("project");
    },
  },

  data() {
    return {
      darkmode: false,
      darkmodeStatus: false,
      darkmodeAnim: false,
    };
  },

  methods: {
    updateDarkmodeAnimation() {
      this.darkmodeAnim = true;
      setTimeout(() => (this.darkmodeAnim = false), 1500);
    },

    darkModeHandler(darkmodeValue) {
      this.darkmode = darkmodeValue
      // this.darkmodeStatus = darkmodeValue;
      // const delay = darkmodeValue ? 1000 : 200;
      // setTimeout(() => (this.darkmode = darkmodeValue), delay);
      // this.updateDarkmodeAnimation();
    },
  },

  created() {
    const AUTH_TOKEN = localStorage.getItem("X-AUTH-TOKEN");
    const ROLE = localStorage.getItem("ROLE");
    const link = window.location.href;

    if (AUTH_TOKEN !== null && ROLE !== null) {
      // console.log(1);
      this.$store.dispatch("setToken", AUTH_TOKEN);

      this.$store.dispatch("getFilters");
      this.$store.dispatch("getUsers");
    } else if (
      AUTH_TOKEN === null &&
      ROLE === null &&
      !link.includes("?s") &&
      link.includes("?")
    ) {
      // console.log(2);
      const queryString = window.location.search;
      this.$router.push(`/${queryString}`);
    } else {
      // console.log(3);
    }
  },

  mounted() {
    this.darkmode = JSON.parse(localStorage.getItem("darkmode"));
  },
};
</script>

<style>
#app {
  height: 100%;
}
</style>
