<template>
  <!-- <template v-if="productVisible"> -->
    <div
      class="project"
      :class="{ copy: copyProjectId === project.id, hover: hover }"
      @touchend="seeButtons(project.id)"
      @mouseover="hover = true"
      @mouseout="hover = false"
    >
      <project-preview
        :previewSrc="project.preview"
        @click="isDesktop && $router.push(projectUrl)"
        @mousedown="handleMouseDown"
      />

      <project-info
        :user="project.executor"
        :project="project"
      />

      <project-tags
        class="project__tags"
        :tags="project.tags"
        v-if="project.tags.length > 0"
      />

      <project-buttons
        :project="project"
        :mobileHoverElemId="mobileHoverElemId"
        :projectUrl="projectUrl"
        @copy="copy"
        @edit="$emit('modalEditOpen', project)"
      />
    </div>
  <!-- </template> -->
</template>

<script>
import ProjectPreview from "./components/ProjectPreview";
import ProjectInfo from "./components/ProjectInfo";
import ProjectTags from "./components/ProjectTags";
import ProjectButtons from "./components/ProjectButtons";

import { setProjectUrl } from "@/Hooks/setProjectUrl";
// import { isLoggedUser } from "@/Hooks/isLoggedUser";

export default {
  components: {
    ProjectPreview,
    ProjectInfo,
    ProjectTags,
    ProjectButtons,
  },

  props: ["project", "mobileHoverElemId"],

  emits: ["modalEditOpen"],

  data() {
    return {
      hover: false,

      copyProjectId: null,
      focusButtonsId: null,
      imageLoaded: false,
    };
  },

  computed: {
    isDesktop() {
      return window.innerWidth > 500;
    },

    projectUrl() {
      return setProjectUrl(this.project.id.toString());
    },

    showLeftArrow() {
      return 0;
    },

    showRightArrow() {
      return 1;
    },
  },

  methods: {
    copy(id) {
      this.copyProjectId = id;
    },
    handleMouseDown (event){
      if (event.button === 1) {
        event.preventDefault();
        window.open(this.$router.resolve(this.projectUrl).href, '_blank');
      }
    },
    seeButtons(projectId) {
      setTimeout(() => {
        this.$emit("mobileHover", projectId);

        const focused = this.mobileHoverElemId !== null;
        this.onFocusOut(focused, this.fseeButtonsHandler);
      }, 200);
    },

    fseeButtonsHandler(e) {
      const el = e.target;
      if (!el.closest(".project")) {
        this.$emit("mobileHover", null);
        document.removeEventListener("touchstart", this.filterEditHandler);
      }
    },

    onFocusOut(focused, handler) {
      if (focused) {
        document.addEventListener("touchstart", handler);
      } else {
        document.removeEventListener("touchstart", handler);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.project {
  background: var(--bgcolor-2);
  border-radius: em(15) em(15);
  height: max-content;
  transition: box-shadow 0.25s ease-in-out;
  position: relative;
  transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &__tags {
    --topOffset: 0.8em;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.6s ease-out;
    position: absolute;
    top: calc(100% - var(--topOffset));
    right: 0;
    left: 0;
    background: var(--bgcolor-2);
    border-radius: 0 0 em(15) em(15);
  }

  &:hover {
    box-shadow: 2px 10px 17px 0 rgba(118, 118, 118, 0.1);
  }

  @media (max-width: 500px) {
    width: 49%;
    margin-right: 2%;
    margin-bottom: em(11);
    padding-bottom: 0.3em;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
