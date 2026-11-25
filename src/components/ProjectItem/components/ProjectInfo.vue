<template>
  <div class="project__info">
    <template v-if="isLoggedUser">
      <div class="project__author" v-if="user.avatar">
        <img :src="user.avatar" alt="" @load="imageLoaded = true" />
        <div v-if="!imageLoaded" class="user__author_default">
          <img src="img/panel/users/default.svg" alt="" />
        </div>
      </div>
    </template>

    <div class="project__data">
      <div class="project__title">
        {{ project.name }}
      </div>
      
      <template v-if="isLoggedUser">
        <div class="project__details">
          <b @click="executorRedirect(project.executor.id)">
            {{ user.firstName }}
            {{ user.lastName[0] }}.
          </b>
          <span> для </span>
          <b @click="clientRedirect(project.client.id)">
            {{ project.client.name }}
          </b>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { isLoggedUser } from "@/Hooks/isLoggedUser";

export default {
  props: ["user", "project"],

  data() {
    return {
      imageLoaded: false,
    };
  },

  computed: {
    isLoggedUser() {
      return isLoggedUser()
    }
  },

  methods: {
    executorRedirect(id) {
      window.location = `/?executor[0]=${id}`;
    },

    clientRedirect(id) {
      window.location = `/?client[0]=${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.project {
  &__info {
    display: flex;
    flex-direction: row;
    padding: em(17) em(16);
  }

  &__data {
    width: 80%;
    padding: 0.1em 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__author {
    border-radius: em(30);
    overflow: hidden;
    margin-right: em(12);
    width: em(36);
    height: em(36);
    position: relative;

    & img {
      width: 100%;
      height: 100%;
    }

    &_default {
      object-fit: auto;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      & img {
        width: em(22) !important;
        height: auto !important;
      }
    }
  }

  &__title {
    color: #aeaeae;
    font-weight: 600;
    font-size: max(13px, em(14));
    line-height: em(17, 14);
    color: var(--text-color-2);
    max-width: 20em;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease-in-out;
  }

  &__details {
    color: #7e7e7e;
    & span {
      font-weight: 400;
      font-size: max(12px, em(12));
      line-height: em(15, 12);
      color: #aeaeae;
    }
    & b {
      font-weight: 600;
      font-size: max(12px, em(12));
      line-height: em(17, 12);
      cursor: pointer;
    }
  }
  @media (max-width: 500px) {
    padding: em(6);

    &__author {
      display: none;
    }

    &__title {
      font-weight: 600;
      font-size: max(11px, em(10));
      line-height: em(12, 10);
      color: var(--text-color-2);
    }

    &__data {
      width: 100%;
    }

    &__details {
      font-weight: 500;
      line-height: em(11, 9);
      color: #7e7e7e;
      font-size: max(11px, 0.7em);
    }
  }
}
</style>
