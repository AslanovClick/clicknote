<template>
  <header class="header" ref="header">
    <a href="/" class="header__logo">
      <img src="img/logo.svg" alt="" />
    </a>

    <div class="header__buttons">
      <div
        class="header__button header__button_search"
        @click="openSearchInput"
        :class="{
          searchOpen: searchInputOpen,
        }"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.03569 2.44068C4.51021 2.44068 2.44068 4.5136 2.44068 7.09825C2.44068 9.68291 4.51021 11.7558 7.03569 11.7558C9.56116 11.7558 11.6307 9.68291 11.6307 7.09825C11.6307 5.8588 11.1434 4.67271 10.2802 3.80022C9.41748 2.92818 8.25012 2.44068 7.03569 2.44068ZM0 7.09825C0 3.19034 3.13771 0 7.03569 0C8.90591 0 10.6969 0.751058 12.0153 2.08366C13.3333 3.41582 14.0714 5.21987 14.0714 7.09825C14.0714 8.37997 13.7339 9.5845 13.1427 10.6246C13.2904 10.7002 13.4304 10.7965 13.5582 10.9136L14.9179 12.0111H15.0262L15.3844 12.3732C16.2052 13.2029 16.2052 14.5426 15.3844 15.3723C14.5564 16.2092 13.2084 16.2092 12.3804 15.3723L12.3536 15.3451L10.8942 13.6726L10.8199 13.5888L10.7985 13.5617C10.7162 13.4575 10.6452 13.3457 10.5862 13.2282C9.54518 13.8434 8.33251 14.1965 7.03569 14.1965C3.13771 14.1965 0 11.0062 0 7.09825Z"
            fill="#AEAEAE"
          />
        </svg>
      </div>
      <div
        class="header__button header__button_filter"
        @touchend="sidebarOpen ? $emit('closeFilters') : $emit('openFilters')"
        :class="{
          open: sidebarOpen,
        }"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.06675 11.5202L10.1122 11.5326C10.3645 11.5335 10.5687 11.7447 10.5687 12.0037V14.2796C10.5687 14.5394 10.4211 14.7745 10.1912 14.8832L6.51892 16.6076C6.43312 16.6473 6.34217 16.6668 6.25122 16.6668C6.13024 16.6668 6.00927 16.6314 5.90373 16.5616C5.71926 16.4396 5.60772 16.2293 5.60772 16.0039V11.9913C5.60772 11.7306 5.81364 11.5194 6.06675 11.5202ZM14.8932 0.00012207C15.873 0.00012207 16.6667 0.817666 16.6667 1.827V3.10325C16.6667 3.5929 16.4753 4.06309 16.1356 4.40602L10.7147 9.88931C10.6212 9.98476 10.4942 10.0378 10.3629 10.0369L5.82411 10.0228C5.68597 10.0228 5.5547 9.96355 5.46032 9.86014L0.478764 4.38127C0.170742 4.04277 0 3.59555 0 3.13154V1.82788C0 0.81855 0.793651 0.00012207 1.77349 0.00012207H14.8932Z"
            fill="#AEAEAE"
          />
        </svg>

        <div class="header__button_filter_count" v-show="filtersCount">
          <span>
            {{ filtersCount }}
          </span>
        </div>
      </div>
      <div
        class="header__button header__button_user"
        v-if="isLoggedUser"
        @click="userModalOpen = !userModalOpen"
        :class="{ open: userModalOpen }"
      >
        <img :src="user.avatar" alt="" />
      </div>
      <div class="header__button" v-else>
        <login-form />
      </div>
    </div>

    <div
      class="search-input"
      :class="{
        open: searchInputOpen,
      }"
    >
      <div class="search-input__wrapper">
        <label>
          <img
            src="img/search/search-icon.svg"
            alt=""
            @click="$emit('search', inputValue)"
          />

          <input
            type="text"
            placeholder="Поиск"
            v-model="inputValue"
            @keydown.enter="$emit('search', inputValue)"
          />
        </label>
        <div class="search-input__close" @click="inputReset">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="8" fill="#EE5D50" />
            <path
              d="M14.7706 16.7583L12.0437 14.0315L9.34044 16.7347C8.90519 17.1699 8.19642 17.1669 7.75736 16.7278C7.3183 16.2887 7.31521 15.58 7.75047 15.1447L10.4537 12.4415L7.72682 9.71459C7.35932 9.263 7.39022 8.60966 7.79838 8.20149C8.20655 7.79333 8.85989 7.76243 9.31148 8.12993L12.0298 10.8483L14.7246 8.1535C15.173 7.78992 15.8266 7.82651 16.2384 8.23825C16.6501 8.64998 16.6867 9.30362 16.3231 9.75202L13.6283 12.4468L16.3552 15.1737C16.7227 15.6253 16.6918 16.2786 16.2837 16.6868C15.8755 17.0949 15.2222 17.1258 14.7706 16.7583Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <!-- <div class="search-results">
                <div class="search-results__item"
                    v-for="project in searchResults"
                    :key="project.id"
                    >
                    <a :href="project.url">
                        {{project.name}}
                    </a>
                </div>
            </div> -->
    </div>

    <div class="user" :class="{ open: userModalOpen }">
      <div class="user__info">
        <div class="user__name">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="user__role" v-if="user.role">
          {{ userRole }}
        </div>
      </div>
      <!-- <label class="theme-switcher">
                <input type="checkbox" class="theme-switcher__checkbox">
                <div class="theme-switcher__circle">
                    <img src="img/header/theme.svg" alt="">
                </div>
            </label> -->
      <label class="theme-switcher" :class="{ darkmode: darkmode }">
        <input
          type="checkbox"
          class="theme-switcher__checkbox"
          :checked="darkmode"
          @change="changeDarkmode"
        />
        <div class="theme-switcher__circle">
          <img
            :src="
              darkmode ? 'img/header/theme-dark.svg' : 'img/header/theme.svg'
            "
            alt=""
          />
        </div>
      </label>

      <div class="user__logout" @click="logout">
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66247 0.333252C8.31751 0.333252 9.66732 1.65992 9.66732 3.29325V6.48658H5.59755C5.30588 6.48658 5.07526 6.71325 5.07526 6.99992C5.07526 7.27992 5.30588 7.51325 5.59755 7.51325H9.66732V10.6999C9.66732 12.3333 8.31751 13.6666 6.64891 13.6666H3.34561C1.68379 13.6666 0.333984 12.3399 0.333984 10.7066V3.29992C0.333984 1.65992 1.69057 0.333252 3.3524 0.333252H6.66247ZM11.3608 4.70005C11.5608 4.49339 11.8875 4.49339 12.0875 4.69339L14.0341 6.63338C14.1341 6.73338 14.1875 6.86005 14.1875 7.00005C14.1875 7.13339 14.1341 7.26672 14.0341 7.36005L12.0875 9.30005C11.9875 9.40005 11.8541 9.45338 11.7275 9.45338C11.5941 9.45338 11.4608 9.40005 11.3608 9.30005C11.1608 9.10005 11.1608 8.77338 11.3608 8.57338L12.4275 7.51338H9.66745V6.48672H12.4275L11.3608 5.42672C11.1608 5.22672 11.1608 4.90005 11.3608 4.70005Z"
            fill="#AEAEAE"
          />
        </svg>

        <span> Выйти </span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { isLoggedUser } from "@/Hooks/isLoggedUser";
import LoginForm from "@/components/LoginForm/LoginForm";

export default {
  components: { LoginForm },

  props: ["sidebarOpen", "filtersCount"],

  emits: ["openFilters", "closeFilters"],

  data() {
    return {
      roles: {
        ROLE_ADMIN: "администратор",
        ROLE_MANAGER: "менеджер",
        ROLE_EXECUTOR: "исполнитель",
      },

      inputValue: "",

      userModalOpen: false,
      searchInputOpen: false,
      darkmode: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user,
      projects: (state) => state.projects,
    }),

    userRole() {
      const ROLE = localStorage.getItem("ROLE");

      return this.roles[ROLE];
    },

    isLoggedUser() {
      return isLoggedUser()
    },
  },

  methods: {
    openSearchInput() {
      this.userModalOpen = false;
      this.searchInputOpen = !this.searchInputOpen;
    },

    logout() {
      this.$store.dispatch("logout").then(() => {
        // this.$router.push('/login')
        this.$router.go();
      });
    },

    routeTo(projectId) {
      this.$router.push(`/project/${projectId}`);
      this.$store.dispatch("getProjectById", { id: projectId });

      this.inputValue = "";
    },

    closeSearchInput() {
      this.inputValue = "";
      this.searchInputOpen = false;

      this.$emit("search", this.inputValue);
    },

    changeDarkmode() {
      this.darkmode = !this.darkmode;
      this.$emit("darkmode", this.darkmode);

      localStorage.setItem("darkmode", this.darkmode);
    },

    inputReset() {
      this.inputValue = "";
      this.$emit("search", this.inputValue);
    },

    getUser() {
      if (!isLoggedUser()) return;
      if (!localStorage.getItem("user")) {
        this.$store.dispatch("getUser").then((data) => {
          localStorage.setItem("user", JSON.stringify(data.user));
        });
      } else {
        this.$store.commit("setUser", JSON.parse(localStorage.getItem("user")));
      }
    },
  },

  mounted() {
    this.darkmode = JSON.parse(localStorage.getItem("darkmode"));
    // this.$emit("darkmode", this.darkmode);
  },

  created() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: em(12) em(16);
  z-index: 11;
  // background: var(--bgcolor-1);
  z-index: 999;

  &__logo {
    width: em(125);

    & img {
      width: 100%;
    }
  }

  &__buttons {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__button {
    width: em(44);
    height: em(44);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: em(44);
    height: em(44);
    background: var(--bgcolor-2);
    border-radius: em(10);
    margin-left: em(8);

    & svg {
      width: 100%;
      height: auto;
      min-width: em(16);
      max-width: em(16);
    }

    & img {
      width: em(34);
      height: em(34);
      border-radius: em(10);
      display: block;
    }
  }

  &__button_search {
    & svg {
      width: 100%;
      height: auto;
      min-width: em(16);
      max-width: em(16);
    }

    &.searchOpen path {
      fill: #ff1923;
    }
  }

  &__button_filter {
    position: relative;

    &.open {
      & svg path {
        fill: #ff1923;
      }
    }

    &_count {
      background: #ff1923;
      border-radius: em(35);
      width: auto;
      min-width: em(16);
      height: em(16);
      padding: 0.1em;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -0.2em;
      right: -0.2em;

      & span {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 700;
        font-size: em(10);
        line-height: em(12, 10);
        color: var(--bgcolor-2);
      }
    }
  }

  &__button_user.open {
    border: em(1) solid #ff381d;
  }

  @media (max-width: 500px) {
  }
}

.search-input {
  position: absolute;
  top: 100%;
  left: 1em;
  right: 1em;

  width: calc(100% - 2em);

  opacity: 0;
  z-index: -9;
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;

  &.open {
    pointer-events: auto;
    opacity: 1;
    z-index: 1;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100%);
    background: var(--bgcolor-2);
    border-radius: em(15);
    padding: em(9) em(15);
    background: var(--bgcolor-2);
    border-radius: em(15);
    border: em(1) solid var(--bordercolor-1);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    & svg {
      width: 100%;
      height: auto;
      min-width: em(26);
      max-width: em(26);
    }
  }

  & label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: text;
  }

  & input {
    border: 0;
    color: var(--text-color-1);
    outline: none;
    cursor: text;
    font-size: em(16);
    width: 84%;
    background: transparent;
  }

  & img {
    width: em(16);
    height: em(16);
    margin-right: 0.7em;
  }
}

.search-input.search .search-results {
  border: em(1) solid var(--bordercolor-1);
}

.search-results {
  position: absolute;
  top: 103%;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: var(--bgcolor-2);
  border-radius: em(15) em(15);

  &__item {
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: em(16);
    line-height: em(20, 16);
    color: #383838;
    padding: em(13) em(20);
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }

    &:last-child {
      border-radius: 0 0 em(15) em(15);
    }
  }
}

.user {
  position: absolute;
  top: 100%;
  right: 0.9em;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  padding: em(16);
  width: em(257);
  height: em(120);

  background: var(--bgcolor-2);
  box-shadow: em(5) em(8) em(35) rgba(125, 130, 141, 0.09),
    em(5) em(10) em(24) rgba(155, 161, 174, 0.04);
  border-radius: em(15);

  opacity: 0;
  z-index: -9;
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;

  &.open {
    pointer-events: auto;
    opacity: 1;
    z-index: 1;
  }

  &__info {
    width: 73%;
  }

  &__name {
    font-weight: 500;
    font-size: em(12);
    line-height: 120%;
    color: #383838;
    margin-bottom: em(2, 12);
  }

  &__role {
    font-weight: 600;
    font-size: em(10);
    line-height: 120%;
    color: #ff1923;
  }

  &__logout {
    width: 100%;
    margin-top: em(18);
    padding-top: em(17);
    padding-bottom: em(9);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: em(1) solid rgba(174, 174, 174, 0.5);

    & svg {
      width: 100%;
      height: auto;
      min-width: em(14);
      max-width: em(14);
      margin-right: em(6);
    }

    & span {
      font-weight: 500;
      font-size: em(12);
      line-height: 120%;
      color: #383838;
    }
  }
}

.theme-switcher {
  padding: em(4);

  width: em(56);
  height: em(32);
  background: var(--bgcolor-1);
  border-radius: em(20);
  border: 0;
  cursor: pointer;
  // margin-right: 1.5em;
  position: relative;
  transition: background 0.15s ease-in-out;

  &.darkmode {
    background: var(--bordercolor-1);
  }

  &__circle {
    width: em(24);
    height: em(24);
    background: var(--bgcolor-5);
    border-radius: em(15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease-in-out, background 0.15s ease-in-out;
    position: relative;

    .darkmode & {
      background: #775ffc;
    }
  }

  &__checkbox {
    position: absolute;
    z-index: -5;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__checkbox:checked ~ &__circle {
    transform: translate(80%, 0);
  }
}
</style>
