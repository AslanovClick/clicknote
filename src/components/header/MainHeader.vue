<template>
  <header class="header" ref="header">
    <a href="/" @click="$router.push('/')" class="header__logo">
      <img src="/img/logo.svg" class="header__logo_dark" alt="" />
      <img src="/img/logo_white.svg" class="header__logo_white" alt="" />
    </a>

    <div class="header__center">
      <div
        class="search-input"
        :class="{
          search: inputValue.length && !searchEnter,
          focus: searchEnter || searchFocused,
        }"
      >
        <label v-if="searchEnter === true">
          <div class="search-input__icon">
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
          <div class="search-input__result">Поиск: {{ inputValue }}</div>
          <div class="search-input__reset" @click="enterReset">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.998047"
                width="20.0015"
                height="20"
                rx="10"
                fill="#EE5D50"
              />
              <path
                d="M14.6852 12.1741L12.5109 10.0011L14.6839 7.82806C15.1019 7.4113 15.1019 6.733 14.6839 6.31624C14.266 5.89581 13.5901 5.89703 13.1721 6.31501L10.9979 8.48803L8.82366 6.31257C8.40568 5.89459 7.7286 5.89703 7.31062 6.31257C6.89386 6.73055 6.89386 7.40885 7.31062 7.82561L9.48607 10.0011L7.3155 12.1704C6.89752 12.5884 6.89752 13.2667 7.3155 13.6822C7.5245 13.8925 7.79704 13.9963 8.0708 13.9963C8.34579 13.9963 8.61833 13.8924 8.82733 13.6835L10.9979 11.5129L13.1734 13.6871C13.3823 13.8961 13.6549 14 13.9287 14C14.2024 14 14.4762 13.8949 14.6852 13.6871C15.1032 13.2691 15.1032 12.5921 14.6852 12.1741Z"
                fill="#F7F7F7"
              />
            </svg>
          </div>
        </label>
        <label v-else>
          <div class="search-input__icon">
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
          <input
            type="text"
            :placeholder="isPanelPage ? 'Поиск: работа, исполнитель, клиент, email' : 'Поиск'"
            v-model="inputValue"
            @input="search"
            @keydown.enter="enterPress"
            @focus="searchFocused = true"
            @focusout="searchFocused = false"
          />
        </label>
        <div class="search-results" v-if="searchEnter === false && !isPanelPage">
          <div class="search-results__help" v-if="inputValue.length !== 0">
            <span> Искать “{{ inputValue }}” </span>
            <div class="search-results__help_icon" @click="enterPress">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.92498 1.70847C3.15715 1.70847 1.70847 3.15952 1.70847 4.96878C1.70847 6.77804 3.15715 8.22908 4.92498 8.22908C6.69281 8.22908 8.14149 6.77804 8.14149 4.96878C8.14149 4.10116 7.80041 3.27089 7.19617 2.66015C6.59224 2.04972 5.77508 1.70847 4.92498 1.70847ZM0 4.96878C0 2.23324 2.19639 0 4.92498 0C6.23414 0 7.4878 0.525741 8.41069 1.45856C9.33328 2.39107 9.84996 3.65391 9.84996 4.96878C9.84996 5.86598 9.61369 6.70915 9.19987 7.43721C9.3033 7.49014 9.40126 7.55758 9.49076 7.63954L10.4425 8.40779H10.5183L10.7691 8.66123C11.3436 9.242 11.3436 10.1799 10.7691 10.7606C10.1895 11.3465 9.24591 11.3465 8.6663 10.7606L8.64749 10.7416L7.62597 9.57085L7.57395 9.51216L7.55897 9.4932C7.50135 9.42026 7.45163 9.342 7.41031 9.25975C6.68163 9.69038 5.83276 9.93756 4.92498 9.93756C2.19639 9.93756 0 7.70432 0 4.96878Z"
                  fill="#383838"
                />
              </svg>
            </div>
          </div>
          <div class="search-results__items" v-if="searchResults.length">
            <div
              class="search-results__item"
              v-for="project in searchResults"
              :key="project.id"
              @click="routeTo(project.id)"
            >
              <template
                v-for="(part, index) in formatName(project.name)"
                :key="index"
              >
                <b v-if="part.match" style="color: var(--text-color-1)">{{ part.text }}</b>
                <template v-else>{{ part.text }}</template>
              </template>
            </div>
          </div>
        </div>
      </div>

      <template v-if="isLoggedUser && (isAdminRole || isExecutorRole)">
        <button class="add-job-button" @click="$emit('openAddProjectModal')">
          <svg
            class="add-job-button__icon"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.04405 0.666504C9.25858 0.666504 9.42359 0.841504 9.42359 1.04984V3.73317C9.42359 5.25817 10.6695 6.50817 12.1794 6.5165C12.8064 6.5165 13.3015 6.52484 13.681 6.52484C13.9368 6.52484 14.3576 6.5165 14.7124 6.5165C14.9186 6.5165 15.0837 6.68317 15.0837 6.8915V13.5915C15.0837 15.6582 13.4252 17.3332 11.3708 17.3332H4.81138C2.66617 17.3332 0.916992 15.5748 0.916992 13.4082V4.42484C0.916992 2.35817 2.58366 0.666504 4.63811 0.666504H9.04405ZM7.84769 7.1415C7.5094 7.1415 7.22887 7.4165 7.22887 7.75817V9.19984H5.80973C5.47145 9.19984 5.19092 9.47484 5.19092 9.82484C5.19092 10.1665 5.47145 10.4415 5.80973 10.4415H7.22887V11.8832C7.22887 12.2248 7.5094 12.4998 7.84769 12.4998C8.18597 12.4998 8.45825 12.2248 8.45825 11.8832V10.4415H9.88564C10.2239 10.4415 10.5045 10.1665 10.5045 9.82484C10.5045 9.47484 10.2239 9.19984 9.88564 9.19984H8.45825V7.75817C8.45825 7.4165 8.18597 7.1415 7.84769 7.1415ZM10.625 1.42167C10.625 1.0625 11.0565 0.884171 11.3032 1.14334C12.1951 2.08 13.7537 3.7175 14.625 4.6325C14.8659 4.885 14.6894 5.30417 14.342 5.305C13.6638 5.3075 12.8643 5.305 12.2892 5.29917C11.3766 5.29917 10.625 4.54 10.625 3.61834V1.42167Z"
              fill="#FF1923"
            />
          </svg>
          <span> Добавить работу </span>
        </button>

        <button
          class="admin-panel-button"
          @click="$router.push('/')"
          v-if="isPanelPage"
        >
          <svg
            class="admin-panel-button__icon_back"
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-v-3611af2e=""
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.20947 0.238643L0.229167 5.42386C-0.0764489 5.74205 -0.0764489 6.25794 0.229167 6.57614L5.20947 11.7614C5.51508 12.0795 6.01058 12.0795 6.3162 11.7614C6.62181 11.4432 6.62181 10.9273 6.3162 10.6091L1.88927 6L6.3162 1.39091C6.62181 1.07272 6.62181 0.556834 6.3162 0.238643C6.01058 -0.0795478 5.51508 -0.0795478 5.20947 0.238643Z"
              fill="#AEAEAE"
              data-v-3611af2e=""
            ></path>
          </svg>
          <span> Назад на Главную </span>
        </button>

        <template v-else>
          <button
            class="admin-panel-button"
            v-if="isAdminRole"
            @click="$router.push('/panel')"
          >
            <svg
              class="admin-panel-button__icon"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.59736 0.666992C9.22757 0.666992 9.79816 1.01699 10.1133 1.53366C10.2666 1.78366 10.3688 2.09199 10.3432 2.41699C10.3262 2.66699 10.4028 2.91699 10.5391 3.15033C10.9734 3.85866 11.9358 4.12533 12.6852 3.72533C13.5283 3.24199 14.5928 3.53366 15.0783 4.35866L15.6489 5.34199C16.1428 6.16699 15.8703 7.22533 15.0187 7.70033C14.2948 8.12532 14.0393 9.06699 14.4736 9.78366C14.6099 10.0087 14.7632 10.2003 15.0016 10.317C15.2997 10.4753 15.5296 10.7253 15.6915 10.9753C16.0066 11.492 15.981 12.1253 15.6744 12.6837L15.0783 13.6837C14.7632 14.217 14.1755 14.5503 13.5709 14.5503C13.2728 14.5503 12.9407 14.467 12.6682 14.3003C12.4467 14.1587 12.1912 14.1087 11.9187 14.1087C11.0756 14.1087 10.3688 14.8003 10.3432 15.6253C10.3432 16.5837 9.55971 17.3337 8.58033 17.3337H7.42211C6.43422 17.3337 5.65072 16.5837 5.65072 15.6253C5.63369 14.8003 4.92683 14.1087 4.08372 14.1087C3.80268 14.1087 3.54719 14.1587 3.33428 14.3003C3.06176 14.467 2.72111 14.5503 2.43155 14.5503C1.81838 14.5503 1.23075 14.217 0.91565 13.6837L0.328024 12.6837C0.0129208 12.142 -0.00411182 11.492 0.310992 10.9753C0.447253 10.7253 0.702742 10.4753 0.992297 10.317C1.23075 10.2003 1.38405 10.0087 1.52882 9.78366C1.95464 9.06699 1.69915 8.12532 0.975264 7.70033C0.132149 7.22533 -0.140373 6.16699 0.345057 5.34199L0.91565 4.35866C1.4096 3.53366 2.46562 3.24199 3.31725 3.72533C4.05817 4.12533 5.02051 3.85866 5.45484 3.15033C5.5911 2.91699 5.66775 2.66699 5.65072 2.41699C5.63369 2.09199 5.72737 1.78366 5.88918 1.53366C6.20428 1.01699 6.77487 0.683659 7.39656 0.666992H8.59736ZM8.00974 6.65033C6.67268 6.65033 5.5911 7.70033 5.5911 9.00866C5.5911 10.317 6.67268 11.3587 8.00974 11.3587C9.3468 11.3587 10.4028 10.317 10.4028 9.00866C10.4028 7.70033 9.3468 6.65033 8.00974 6.65033Z"
                fill="var(--bgcolor-5)"
              />
            </svg>
            <span> Админ. панель </span>
          </button>
          <button
            class="admin-panel-button"
            v-else
            @click="$router.push('/panel')"
          >
            <svg
              class="admin-panel-button__icon"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.59736 0.666992C9.22757 0.666992 9.79816 1.01699 10.1133 1.53366C10.2666 1.78366 10.3688 2.09199 10.3432 2.41699C10.3262 2.66699 10.4028 2.91699 10.5391 3.15033C10.9734 3.85866 11.9358 4.12533 12.6852 3.72533C13.5283 3.24199 14.5928 3.53366 15.0783 4.35866L15.6489 5.34199C16.1428 6.16699 15.8703 7.22533 15.0187 7.70033C14.2948 8.12532 14.0393 9.06699 14.4736 9.78366C14.6099 10.0087 14.7632 10.2003 15.0016 10.317C15.2997 10.4753 15.5296 10.7253 15.6915 10.9753C16.0066 11.492 15.981 12.1253 15.6744 12.6837L15.0783 13.6837C14.7632 14.217 14.1755 14.5503 13.5709 14.5503C13.2728 14.5503 12.9407 14.467 12.6682 14.3003C12.4467 14.1587 12.1912 14.1087 11.9187 14.1087C11.0756 14.1087 10.3688 14.8003 10.3432 15.6253C10.3432 16.5837 9.55971 17.3337 8.58033 17.3337H7.42211C6.43422 17.3337 5.65072 16.5837 5.65072 15.6253C5.63369 14.8003 4.92683 14.1087 4.08372 14.1087C3.80268 14.1087 3.54719 14.1587 3.33428 14.3003C3.06176 14.467 2.72111 14.5503 2.43155 14.5503C1.81838 14.5503 1.23075 14.217 0.91565 13.6837L0.328024 12.6837C0.0129208 12.142 -0.00411182 11.492 0.310992 10.9753C0.447253 10.7253 0.702742 10.4753 0.992297 10.317C1.23075 10.2003 1.38405 10.0087 1.52882 9.78366C1.95464 9.06699 1.69915 8.12532 0.975264 7.70033C0.132149 7.22533 -0.140373 6.16699 0.345057 5.34199L0.91565 4.35866C1.4096 3.53366 2.46562 3.24199 3.31725 3.72533C4.05817 4.12533 5.02051 3.85866 5.45484 3.15033C5.5911 2.91699 5.66775 2.66699 5.65072 2.41699C5.63369 2.09199 5.72737 1.78366 5.88918 1.53366C6.20428 1.01699 6.77487 0.683659 7.39656 0.666992H8.59736ZM8.00974 6.65033C6.67268 6.65033 5.5911 7.70033 5.5911 9.00866C5.5911 10.317 6.67268 11.3587 8.00974 11.3587C9.3468 11.3587 10.4028 10.317 10.4028 9.00866C10.4028 7.70033 9.3468 6.65033 8.00974 6.65033Z"
                fill="var(--bgcolor-5)"
              />
            </svg>
            <span> Мои работы </span>
          </button>
        </template>
      </template>
    </div>

    <div class="header__right">
      <switcher
        :value="darkmode"
        @switcherChange="changeDarkmode"
        :checkedIcon="'/img/header/theme-dark.svg'"
        :uncheckedIcon="'/img/header/theme.svg'"
      />

      <div class="user" v-if="isLoggedUser">
        <div class="user__info">
          <div class="user__name">
            {{ user.firstName }}
            {{ user.lastName }}
          </div>

          <div class="user__type" v-if="user.role">
            {{ userRole }}
          </div>
        </div>

        <div class="user__avatar">
          <img :src="user.avatar" alt="" />
        </div>

        <button class="user__logout" @click="logout">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5776 1.6665C11.6464 1.6665 13.3337 3.32484 13.3337 5.3665V9.35817H8.24645C7.88187 9.35817 7.59359 9.6415 7.59359 9.99984C7.59359 10.3498 7.88187 10.6415 8.24645 10.6415H13.3337V14.6248C13.3337 16.6665 11.6464 18.3332 9.56065 18.3332H5.43153C3.35425 18.3332 1.66699 16.6748 1.66699 14.6332V5.37484C1.66699 3.32484 3.36273 1.6665 5.44001 1.6665H9.5776ZM15.4505 7.125C15.7005 6.86667 16.1088 6.86667 16.3588 7.11667L18.7922 9.54167C18.9172 9.66667 18.9838 9.825 18.9838 10C18.9838 10.1667 18.9172 10.3333 18.7922 10.45L16.3588 12.875C16.2338 13 16.0672 13.0667 15.9088 13.0667C15.7422 13.0667 15.5755 13 15.4505 12.875C15.2005 12.625 15.2005 12.2167 15.4505 11.9667L16.7838 10.6417H13.3338V9.35834H16.7838L15.4505 8.03334C15.2005 7.78334 15.2005 7.375 15.4505 7.125Z"
              fill="#AEAEAE"
            />
          </svg>
        </button>
      </div>
      <div v-else>
        <login-form />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { setPrevPage } from "@/Hooks/setPrevPage";
import { isLoggedUser } from "@/Hooks/isLoggedUser";
import Switcher from "../UI/Switcher.vue";
import LoginForm from "../LoginForm/LoginForm.vue";

export default {
  props: ["resetSearch"],
  emits: ["openAddProjectModal"],
  components: { Switcher, LoginForm },
  data() {
    return {
      roles: {
        ROLE_ADMIN: "администратор",
        ROLE_MANAGER: "менеджер",
        ROLE_EXECUTOR: "исполнитель",
      },
      inputValue: "",
      darkmode: false,
      searchEnter: false,
      searchFocused: false
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
    searchResults() {
      if (!this.inputValue.length) {
        return [];
      }
      const projects = isLoggedUser()
        ? this.projects
        : this.projects.filter((project) => project.public === true);

      const filteredData = JSON.parse(JSON.stringify(projects)).filter(
        (project) =>
          project.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );

      return filteredData;
    },
    isPanelPage() {
      return window.location.href.includes("panel");
    },
    isAdminRole() {
      return localStorage.getItem("ROLE") === "ROLE_ADMIN";
    },
    isExecutorRole() {
      return localStorage.getItem("ROLE") === "ROLE_EXECUTOR";
    },
    isLoggedUser() {
      return isLoggedUser();
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.go();
      });
    },
    routeTo(projectId) {
      this.$router.push(`/project/${projectId}`);
      this.$store.dispatch("getProjectById", { id: projectId });
      this.inputValue = "";
    },
    changeDarkmode() {
      this.darkmode = !this.darkmode;
      this.$emit("darkmode", this.darkmode);
      localStorage.setItem("darkmode", this.darkmode);
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
    search() {
      this.inputValue = this.inputValue.replace(/^\s+/g, "");
      if (
        this.inputValue.length > 2 &&
        this.inputValue[this.inputValue.length - 2] === " "
      ) {
        this.inputValue = this.inputValue.replace(/\s+$/g, " ");
      }
      // In the admin panel the lists filter as you type; elsewhere search runs on Enter.
      if (!this.inputValue.length || this.isPanelPage) {
        this.$emit("search", this.inputValue);
      }
    },
    // Splits the name into plain and highlighted parts. Rendered as text, never as HTML,
    // so a project name can't inject markup.
    formatName(name) {
      const start = name.toLowerCase().indexOf(this.inputValue.toLowerCase());
      if (start === -1 || !this.inputValue) {
        return [{ text: name, match: false }];
      }
      const end = start + this.inputValue.length;
      return [
        { text: name.slice(0, start), match: false },
        { text: name.slice(start, end), match: true },
        { text: name.slice(end), match: false },
      ].filter((part) => part.text);
    },
    enterPress() {
      if (!this.inputValue) {
        return;
      }
      const routePath = this.$router.currentRoute["_value"].fullPath;
      const query = encodeURIComponent(this.inputValue);
      if (routePath === "/panel") {
        this.$router.push(`/panel?s=${query}`);
      } else {
        this.$router.push(`/?s=${query}`);
      }
      this.$emit("search", this.inputValue);
      this.searchEnter = true;
    },
    enterReset() {
      this.inputValue = "";
      this.$emit("search", this.inputValue);
      this.searchEnter = false;
      this.$router.push(window.location.pathname);
    },
    getSearchParams() {
      // let url = new URL(window.location.href);
      // let searchParams = new URLSearchParams(url.search);
      let searchValue =
        window.location.href.split("?s=")[1] &&
        decodeURIComponent(window.location.href.split("?s=")[1]);
      if (!searchValue) {
        return;
      }
      this.inputValue = searchValue;
      this.$emit("search", this.inputValue);
      this.searchEnter = true;
    },
  },
  created() {
    this.getUser();
    setPrevPage();
  },
  mounted() {
    this.darkmode = JSON.parse(localStorage.getItem("darkmode"));
    // this.$emit("darkmode", this.darkmode);
    this.getSearchParams();
  },
  watch: {
    resetSearch(prevVal, newVal) {
      if (newVal === true) {
        this.enterReset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.6625em 3.125em 1.8em 3.125em;
  z-index: 5;
  position: relative;
  width: calc(100vw - 0.5em);

  &__logo {
    width: em(189);
    cursor: pointer;

    &_white {
      display: none;
    }

    .darkmode &_dark {
      display: none;
    }
    .darkmode &_white {
      display: block;
    }

    & img {
      width: 100%;
    }
  }

  &__center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    // width: 59.9em;
    width: em(1170);
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: em(8) em(12) em(8) em(16);
    width: 100%;
    max-width: em(392);

    background: var(--bgcolor-2);
    border-radius: em(15);
    overflow: hidden;
    transition: background 0.2s ease-in-out;
  }
}

.search-input {
  width: 31.225em;
  margin-right: 1.8em;
  position: relative;
  border-radius: em(15);
  display: block;
  width: 100%;

  &.search {
    border-radius: em(15) em(15) 0 0;
  }

  & label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875em 1.25em 0.875em 1.35em;
    background: var(--bgcolor-2);
    border-radius: em(15);
    cursor: text;
    border: em(1) solid var(--bordercolor-1);
    transition: background 0.2s ease-in-out, border-color .2s ease-in-out;
  }

  & input {
    width: 100%;
    border: 0;
    color: var(--text-color-1);
    outline: none;
    cursor: text;
    font-size: em(16);
    // background: var(--bgcolor-2);
    background: transparent;
  }

  &__icon {
    & svg {
      width: 100%;
      min-width: em(16);
      max-width: em(16);
      height: auto;
      margin-right: 0.4em;

      & path {
        transition: fill 0.2s ease-in-out;
      }

      .focus & path {
        fill: #ff1923;
      }
    }
  }

  &__result {
    font-family: "Montserrat";
    font-style: normal;
    // font-weight: 500;
    font-weight: 400;
    font-size: em(16);
    line-height: 1.3438em;
    color: #aeaeae;
    width: 100%;
    height: 1.3438em;
    vertical-align: middle;
    display: inline-block;
    padding-left: em(2);
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__reset {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & svg {
      height: auto;
      min-width: em(20);
      max-width: em(20);
    }
  }
}

.search-input.search label {
  border-bottom-color: transparent;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.search-input.search .search-results {
  border: em(1) solid var(--bordercolor-1);
  border-top-color: transparent;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // justify-content: center;
  background: var(--bgcolor-2);
  border-radius: 0 0 em(15) em(15);

  &__items {
    width: 99%;
    max-height: 20em;
    overflow-y: auto;
    margin-bottom: 0.3em;

    /* width */
    &::-webkit-scrollbar {
      width: em(5);
      border-radius: em(20);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--bgcolor-3);
      border-radius: em(20);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(20);
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(174, 174, 174, 0.8);
    }
  }

  &__help {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: em(8) em(21);
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color-1);

    & span {
      // width: 60%;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &_icon {
      cursor: pointer;

      & svg {
        width: 100%;
        height: auto;
        min-width: em(12);
        max-width: em(12);
      }
    }
  }

  &__item {
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: em(16);
    line-height: em(20, 16);
    color: var(--text-color-2);
    padding: em(8) em(20);
    cursor: pointer;
    color: #aeaeae;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & b {
      // font-weight: 800;
      background: #000;
    }

    &:hover {
      background: var(--bgcolor-4);
    }

    &:last-child {
      border-radius: 0 0 em(15) em(15);
    }
  }
}

.add-job-button {
  width: auto;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: em(15) em(22);
  border: em(1) solid #ff381d;
  border-radius: 1.1375em;
  background: transparent;
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  white-space: nowrap;
  font-size: 1em;

  &__icon {
    height: auto;
    margin-right: 0.5em;
    max-width: 1.2em;
    min-height: 1.2em;
    & path {
      transition: fill 0.2s ease-in-out;
    }
  }

  & span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: em(16);
    line-height: em(20, 16);
    color: #ff381d;
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    background: #ff381d;
    & span {
      color: var(--only-white);
    }

    & svg path {
      fill: var(--only-white);
    }
  }
}

.admin-panel-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: em(15) em(22);
  border: em(1) solid var(--bgcolor-3);
  border-radius: em(15);
  background: var(--bgcolor-3);
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out, border-color .2s ease-in-out;
  white-space: nowrap;
  font-size: 1em;

  &__icon {
    // width: 100%;
    height: auto;
    margin-right: 0.6em;
    min-width: 1.1em;
    max-width: 1.1em;
    & path {
      transition: fill 0.2s ease-in-out;
    }
  }

  &__icon_back {
    height: auto;
    width: 100%;
    min-width: 0.45em;
    max-width: 0.45em;
    margin-right: 0.5em;
  }

  & span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: em(16);
    line-height: em(20, 16);
    color: var(--bgcolor-5);
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    background: #ff381d;
    & span {
      color: var(--only-white);
    }

    & svg path {
      fill: var(--only-white);
    }
  }
}
.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: em(392);
  // background: var(--bgcolor-2);
  border-radius: em(15);

  &__info {
    // min-width: 48%;
    width: 67%;
    padding-right: em(5);
  }

  &__name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: max(13px, em(14));
    line-height: 120%;
    text-align: right;
    color: var(--text-color-2);
    margin-bottom: em(2);
  }

  &__type {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: max(12px, em(12));
    line-height: 120%;
    text-align: right;
    color: #ff1923;
  }

  &__avatar {
    // margin-left: 1.4em;
    // margin-right: 1em;
    margin-left: 1.3em;
    margin-right: 1.4em;
    background: #d9d9d9;
    border-radius: em(40);
    box-shadow: 0 0 0 em(15) var(--bgcolor-1);
    width: em(40);
    height: em(40);
    background: url("/img/header/avatar-default.png");
    transition: box-shadow 0.2s ease-in-out;
    & img {
      border-radius: 50%;
      overflow: hidden;
    }
  }

  &__logout {
    margin-left: auto;
    margin-right: auto;
    background: transparent;
    border: 0;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      min-width: 1.36rem;
      max-width: 1.36rem;
      width: 100%;
      height: auto;

      & path {
        transition: fill 0.2s ease-in-out;
      }
    }

    &:hover {
      & svg path {
        fill: #ff1923;
      }
    }
  }
}
</style>
