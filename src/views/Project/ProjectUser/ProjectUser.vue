<template>
  <div class="wrapper">
    <div class="container" ref="container">
      <header-component
        @openAddProjectModal="modalAddOpen = true"
        @openFilters="openMobileFilter = true"
        @closeFilters="openMobileFilter = false"
        :sidebarOpen="openMobileFilter"
        :filtersCount="filtersCount"
        @search="(inputValue) => (this.searchInputValue = inputValue)"
        @darkmode="(darkmode) => $emit('darkmode', darkmode)"
      />

      <div class="content" v-if="project">
        <div class="top">
          <BackButton @click="$router.push(prevPage)" />

          <div class="user">
            <div class="user__avatar">
              <img
                v-if="project.executor"
                :src="project.executor.avatar"
                alt=""
              />
            </div>

            <div>
              <div class="title">
                {{ project.name }}
              </div>

              <div class="info">
                <b
                  v-if="project.executor"
                  @click="executorRedirect(project.executor.id)"
                >
                  {{ project.executor.firstName }}

                  {{ project.executor.lastName }}
                </b>

                <span
                  v-if="project.client"
                  @click="clientRedirect(project.client.id)"
                >
                  <span> для </span>

                  <b>
                    {{ project.client.name }}
                  </b>
                </span>
              </div>
            </div>
          </div>

          <div class="tags">
            <div
              v-if="projectTags"
              class="tags__wrapper"
              :ref="`tags-${index}`"
              :style="`transform: translate3d(${tagsTranslate}px, 0, 0);`"
            >
              <div class="tag" v-for="tag in projectTags" :key="tag">
                {{ tag.name }}
              </div>
            </div>
          </div>

          <div class="buttons">
            <button class="button" @click="copy(project)">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.9836 2C12.3134 1.99992 12.6399 2.06482 12.9446 2.19099C13.2493 2.31715 13.5262 2.50211 13.7594 2.7353C13.9925 2.96849 14.1775 3.24534 14.3037 3.55003C14.4298 3.85471 14.4947 4.18128 14.4947 4.51105C14.4946 4.84083 14.4295 5.16737 14.3032 5.472C14.1769 5.77663 13.9918 6.05339 13.7585 6.28647L13.7582 6.2868L11.5016 8.54341C11.2685 8.77653 10.9917 8.96145 10.6871 9.08762C10.3825 9.21378 10.0561 9.27871 9.72642 9.27871C9.39674 9.27871 9.07029 9.21378 8.7657 9.08762C8.46112 8.96145 8.18437 8.77653 7.95125 8.54341C7.56072 8.15289 6.92756 8.15289 6.53703 8.54341C6.14651 8.93394 6.14651 9.5671 6.53703 9.95763C6.95587 10.3765 7.4531 10.7087 8.00034 10.9354C8.54757 11.162 9.13409 11.2787 9.72642 11.2787C10.3187 11.2787 10.9053 11.162 11.4525 10.9354C11.9997 10.7087 12.497 10.3765 12.9158 9.95763L15.1721 7.70134C15.5912 7.28257 15.9238 6.78533 16.1507 6.23801C16.3776 5.69069 16.4945 5.10402 16.4947 4.51152C16.4948 3.91902 16.3782 3.3323 16.1515 2.78487C15.9248 2.23745 15.5925 1.74005 15.1736 1.32109C14.7546 0.902126 14.2572 0.569815 13.7098 0.343139C13.1624 0.116463 12.5756 -0.000137684 11.9831 1.22008e-07C11.3906 0.000138166 10.804 0.117011 10.2567 0.343942C9.70948 0.570814 9.21235 0.903242 8.79365 1.32224L8.7936 1.32229L8.79332 1.32257L7.86433 2.25156C7.47381 2.64208 7.47381 3.27525 7.86433 3.66577C8.25486 4.0563 8.88802 4.0563 9.27855 3.66577L10.2079 2.73646L10.2082 2.73613C10.4413 2.50283 10.718 2.31774 11.0227 2.19143C11.3273 2.06513 11.6538 2.00008 11.9836 2ZM6.05753 7.15664C6.36211 7.03047 6.68856 6.96554 7.01824 6.96554C7.34792 6.96554 7.67437 7.03047 7.97896 7.15664C8.28354 7.2828 8.56029 7.46772 8.79341 7.70084C9.18394 8.09136 9.8171 8.09136 10.2076 7.70084C10.5981 7.31031 10.5981 6.67715 10.2076 6.28662C9.78879 5.86779 9.29156 5.53555 8.74432 5.30888C8.19709 5.0822 7.61056 4.96554 7.01824 4.96554C6.42592 4.96554 5.8394 5.0822 5.29216 5.30888C4.74492 5.53555 4.24769 5.86779 3.82886 6.28662L1.57257 8.54291L1.5724 8.54308L1.57224 8.54324C1.15324 8.96194 0.820814 9.45907 0.593942 10.0062C0.367011 10.5536 0.250138 11.1402 0.25 11.7327C0.249862 12.3252 0.366463 12.912 0.593139 13.4594C0.819815 14.0068 1.15213 14.5042 1.57109 14.9232C1.99005 15.3421 2.48745 15.6744 3.03487 15.9011C3.5823 16.1278 4.16902 16.2444 4.76152 16.2442C5.35402 16.2441 5.94069 16.1272 6.48801 15.9003C7.03518 15.6734 7.53231 15.341 7.95101 14.922L7.95134 14.9217L8.88018 13.9928C9.27071 13.6023 9.27071 12.9691 8.88018 12.5786C8.48966 12.1881 7.85649 12.1881 7.46597 12.5786L6.5368 13.5078L6.53647 13.5081C6.30339 13.7414 6.02663 13.9265 5.72199 14.0528C5.41736 14.1791 5.09083 14.2442 4.76105 14.2442C4.43128 14.2443 4.10471 14.1794 3.80002 14.0533C3.49534 13.9271 3.21849 13.7421 2.9853 13.509C2.75211 13.2758 2.56715 12.9989 2.44099 12.6942C2.31482 12.3895 2.24992 12.063 2.25 11.7332C2.25008 11.4034 2.31513 11.0769 2.44143 10.7723C2.56774 10.4676 2.75283 10.1909 2.98613 9.95778L2.98646 9.95745L5.24307 7.70084C5.47619 7.46772 5.75294 7.2828 6.05753 7.15664Z"
                  fill="var(--bgcolor-5)"
                />
              </svg>
            </button>

            <button
              class="button"
              @click="modalEditOpen(project)"
              v-if="
                isAdminRole ||
                (isExecutorRole && user?.id === project.executor?.id)
              "
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.352 14.1807C15.8472 14.1807 16.25 14.5887 16.25 15.0903C16.25 15.5929 15.8472 16 15.352 16H10.2764C9.78118 16 9.37842 15.5929 9.37842 15.0903C9.37842 14.5887 9.78118 14.1807 10.2764 14.1807H15.352ZM11.8321 0.62139L13.1432 1.66292C13.6809 2.08335 14.0393 2.63756 14.1619 3.22044C14.3034 3.8616 14.1525 4.49129 13.728 5.03595L5.91791 15.1359C5.55947 15.5946 5.03125 15.8526 4.4653 15.8621L1.35257 15.9003C1.18279 15.9003 1.0413 15.7857 1.00357 15.6232L0.296132 12.556C0.173509 11.9922 0.296132 11.4093 0.654567 10.9602L6.19145 3.79375C6.28578 3.67909 6.45556 3.66094 6.56875 3.74598L8.89858 5.59971C9.0495 5.72393 9.25702 5.79082 9.47397 5.76215C9.93616 5.70482 10.2474 5.28438 10.2003 4.83528C10.172 4.60596 10.0588 4.41485 9.90786 4.27152C9.8607 4.2333 7.64406 2.45601 7.64406 2.45601C7.50257 2.34135 7.47427 2.13113 7.58746 1.98876L8.46469 0.850717C9.27588 -0.190812 10.6908 -0.286365 11.8321 0.62139Z"
                  fill="var(--bgcolor-5)"
                />
              </svg>
            </button>

            <div class="copy_success" :class="{ copy: copyStatus === true }">
              <span> Ссылка скопирована! </span>
            </div>
          </div>
        </div>

        <div class="project" :class="{ loaded: iframe.loaded }">
          <iframe
            :src="projectURL"
            width="100%"
            @load="iframeLoad"
            v-show="iframe"
          ></iframe>

          <preloader class="project__preloader" />
        </div>
        <div class="project__arrows" v-if="projectsSiblingsId">
          <div
            class="project__arrow project__arrow_left"
            v-show="projectsSiblingsId.prev"
            @click="$router.push(projectsSiblingsId.prev)"
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.2095 0.238643L0.229198 5.42386C-0.0764184 5.74205 -0.0764184 6.25794 0.229198 6.57614L5.2095 11.7614C5.51511 12.0795 6.01061 12.0795 6.31623 11.7614C6.62184 11.4432 6.62184 10.9273 6.31623 10.6091L1.8893 6L6.31623 1.39091C6.62184 1.07272 6.62184 0.556834 6.31623 0.238643C6.01061 -0.0795478 5.51511 -0.0795478 5.2095 0.238643Z"
                fill="#AEAEAE"
              />
            </svg>
          </div>

          <div
            class="project__arrow project__arrow_right"
            v-show="projectsSiblingsId.next"
            @click="$router.push(projectsSiblingsId.next)"
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.33595 0.238643L6.31624 5.42386C6.62186 5.74205 6.62186 6.25794 6.31624 6.57614L1.33595 11.7614C1.03033 12.0795 0.534828 12.0795 0.229212 11.7614C-0.076404 11.4432 -0.076404 10.9273 0.229212 10.6091L4.65614 6L0.229212 1.39091C-0.076404 1.07272 -0.076404 0.556834 0.229212 0.238643C0.534828 -0.0795478 1.03033 -0.0795478 1.33595 0.238643Z"
                fill="#AEAEAE"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <project-add :open="modalAddOpen" @modalClose="modalAddOpen = false" />

    <project-edit
      :open="modalEdit.open"
      :project="modalEdit.project"
      @modalClose="modalEditClose"
      @edit="getProject"
    />
  </div>
</template>

<script>
import HeaderComponent from "@/components/header/HeaderComponent";
import { mapState } from "vuex";

import ProjectAdd from "@/components/modals/ProjectAdd.vue";
import ProjectEdit from "@/components/modals/ProjectEdit.vue";
import Preloader from "@/components/Preloader/Preloader.vue";

import { getProjectUrl } from "@/Hooks/getProjectUrl";
import { setProjectUrl } from "@/Hooks/setProjectUrl";
import BackButton from "../../../components/UI/BackButton.vue";

export default {
  name: "ProjectPage",

  components: {
    HeaderComponent,
    ProjectAdd,
    ProjectEdit,
    Preloader,
    BackButton,
  },

  data() {
    return {
      token: String,

      copyStatus: false,

      modalAddOpen: false,

      modalEdit: {
        open: false,
        project: {},
      },

      prevPage: "",

      iframe: {
        loaded: false,
      },
    };
  },

  computed: {
    projectId() {
      const urlParams = this.$route.params.id;
      let parseUrl = urlParams.split("");
      let id = null;

      if (parseUrl[0] === "p") {
        parseUrl.splice(0, 1);
        parseUrl = parseUrl.join("");

        id = getProjectUrl(parseUrl);
      } else {
        id = urlParams;
      }

      return id;
    },

    ...mapState({
      project: (state) => state.viewProject,
      projects: (state) => state.projects,
    }),

    // Links to the neighbouring projects in the loaded list; null when this project
    // isn't in the list (e.g. opened by direct link), prev/next null at the ends.
    projectsSiblingsId() {
      const projects = Array.from(this.projects || []);
      const current = projects.findIndex((p) => p.id === this.project.id);
      if (current === -1) return null;

      const urlAt = (index) =>
        projects[index] ? setProjectUrl(projects[index].id.toString()) : null;

      return {
        current: urlAt(current),
        prev: urlAt(current - 1),
        next: urlAt(current + 1),
      };
    },

    user() {
      return JSON.parse(localStorage.getItem("user"));
    },

    isAdminRole() {
      const ROLE = localStorage.getItem("ROLE");
      return ROLE === "ROLE_ADMIN";
    },

    isExecutorRole() {
      const ROLE = localStorage.getItem("ROLE");
      return ROLE === "ROLE_EXECUTOR";
    },

    projectTags() {
      return this.project.tags
        ? Object.values(this.project.tags).filter((f, index) => index <= 5)
        : [];
    },

    projectURL() {
      return (
        this.project.url ||
        (this.project.images &&
          this.project.images[0] &&
          this.project.images[0].path)
      );
    },
  },

  methods: {
    executorRedirect(id) {
      window.location = `/?executor[0]=${id}`;
    },

    clientRedirect(id) {
      window.location = `/?client[0]=${id}`;
    },

    getTokenFromLocalStorage() {
      this.token = window.localStorage.getItem("X-AUTH-TOKEN");
    },

    edit(project) {
      this.modalEdit.open = true;
      this.modalEdit.project = project;
    },

    copy() {
      const urlParams = this.$route.params.id;
      const url = window.location.origin + "/project/" + urlParams;

      navigator.clipboard.writeText(url).then(
        () => {
          this.copyStatus = true;

          setTimeout(() => {
            this.copyStatus = false;
          }, 1000);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },

    modalEditOpen(project) {
      this.modalEdit.open = true;
      this.modalEdit.project = project;
    },

    modalEditClose() {
      this.modalEdit.open = false;
      this.modalEdit.project = {};
    },

    iframeLoad() {
      this.iframe.loaded = true;
    },

    checkUrl() {
      const urlParams = this.$route.params.id;

      if (urlParams.split("")[0] !== "p") {
        const url = setProjectUrl(urlParams);
        // replace, not push: otherwise Back returns to the raw URL, which redirects forward again.
        this.$router.replace(url);
      }
    },

    getProject() {
      this.$store
        .dispatch("getProjectById", { id: this.projectId })
        .then((data) => {
          if (!data || data.project === null) {
            this.$router.replace("/404");
          }
        })
        .catch(() => this.$router.replace("/404"));
    },
  },

  watch: {
    // The page is reused when the arrows change the route, so reload on id change.
    // (It used to refetch in updated(), which re-rendered and refetched endlessly.)
    projectId(newId, oldId) {
      if (newId === oldId) return;
      this.iframe.loaded = false;
      this.getProject();
    },
  },

  created() {
    this.getTokenFromLocalStorage();

    this.checkUrl();

    this.getProject();
  },

  mounted() {
    const pagesList = JSON.parse(localStorage.getItem("pagesList"));
    this.prevPage = pagesList?.prev || "/";
  },

  unmounted() {
    this.$store.commit("setViewProject", {});
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
}

.container {
  height: 100%;
  overflow: auto;
  overflow: hidden;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 em(1) rgba(0, 0, 0, 0.3);
    border-radius: 5em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bgcolor-5);
    border-radius: 5em;
  }
}

.content {
  width: 100%;
  height: 100%; // height: auto;
  padding-left: 3.125em;
  padding-right: 3.125em;
  padding-bottom: em(40);
  overflow: unset;
}

.top {
  width: 100%;
  display: grid;
  grid-template-columns: 6% 48% 41% 5%;
  align-content: center;
}

.tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

.tag {
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: em(12);
  line-height: em(12, 10);
  color: var(--bgcolor-5);
  padding: em(8, 12) em(16, 12);
  background: var(--bgcolor-2);
  border-radius: em(15, 12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: em(6, 10);
  transition: color 0.15s ease-in-out;
  &:hover {
    color: #ff1923;
  }
}

.user {
  display: grid;
  grid-template-columns: 6% 94%;
  align-items: center;
  justify-items: flex-start;
  padding: em(17) em(16);
  &__avatar {
    border-radius: em(30);
    overflow: hidden;
    margin-right: em(12);
    width: em(40);
    height: em(40);
    & img {
      width: 100%;
      height: 100%;
    }
  }
}

.title {
  color: var(--bgcolor-5);
  margin-bottom: em(4, 19);
  font-weight: 600;
  font-size: em(19);
  line-height: em(23, 19);
  color: var(--text-color-2);
  max-width: 27em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  color: #7e7e7e;
  font-size: em(11);
  line-height: em(13, 11);
  & span {
    font-weight: 400;
    color: var(--bgcolor-5);
  }
  & b {
    font-weight: 600;
    cursor: pointer;
  }
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  position: relative;
}

.button {
  background: var(--bgcolor-2);
  border-radius: em(15);
  width: em(36);
  height: em(36);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: em(6);
  cursor: pointer;
  font-size: 1em;
  & svg {
    width: 100%;
    height: auto;
    max-width: em(16);
    min-width: em(16);
  }
  & path {
    transition: fill 0.15s ease-in-out;
  }
  &:hover {
    & path {
      fill: #ff1923;
    }
  }
}

.project {
  width: 100%; // min-height: 60em;
  height: 100%;
  overflow: hidden;
  border-radius: 1em;
  position: relative;
  & iframe {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.1s 1s ease-in-out;
    &::-webkit-scrollbar {
      width: 0.5em;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 em(1) rgba(0, 0, 0, 0.3);
      border-radius: 5em;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--bgcolor-5);
      border-radius: 5em;
    }
  }
  &.loaded iframe {
    opacity: 1;
  }
  &__img {
    width: 100%;
    border-radius: 1em;
  }
  &__preloader {
    opacity: 1;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s 1s ease-in-out;
    .loaded & {
      // z-index: -9;
      // opacity: 0;
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    & svg {
      min-width: em(12);
      max-width: em(12);
      width: 100%;
      height: auto;
      & path {
        transition: fill 0.15s ease-in-out;
      }
    }

    &:hover {
      & path {
        fill: #ff1923;
      }
    }

    &_left {
      left: em(25);
    }

    &_right {
      right: em(25);
    }
  }
}

.copy_success {
  position: absolute;
  top: 1.25em;
  left: -10.5em;
  padding: em(8) em(16);
  background: var(--bgcolor-2);
  border: em(1) solid var(--bgcolor-3);
  box-shadow: em(8) em(8) em(30) rgba(112, 126, 174, 0.1);
  border-radius: em(10);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.15s ease-in-out;
  &.copy {
    opacity: 1;
    z-index: 1;
  }
  & span {
    font-weight: 500;
    font-size: em(12);
    line-height: 120%;
    color: var(--text-color-2);
  }
}
</style>
