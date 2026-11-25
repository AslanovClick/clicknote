<template>
  <div class="wrapper">
    <div
      class="container"
      ref="container"
    >
      <div class="top">
        <a href="/" class="logo">
          <img src="/img/logo.svg" class="logo__dark" alt="" />
          <img src="/img/logo_white.svg" class="logo__white" alt="" />
        </a>
      </div>
      <div class="content" v-if="project">

        <div class="project" :class="{'loaded': iframe.loaded}">
          <iframe :src="projectURL" width="100%" @load="iframeLoad" v-show="iframe"></iframe> 

          <preloader class="project__preloader" />

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Preloader from '@/components/Preloader/Preloader.vue';
import { setProjectUrl } from '@/Hooks/setProjectUrl';
import { getProjectUrl } from '@/Hooks/getProjectUrl';

export default {
  components: { Preloader },
  name: 'ProjectPageGuest',

  data() {
    return {
      iframe: {
        loaded: false
      }
    }
  },

  computed: {
    projectId() {
      const urlParams = this.$route.params.id;
      let parseUrl = urlParams.split('');
      let id = null;

      // console.log(this.$route);
      if (parseUrl[0] === 'p') {
        parseUrl.splice(0, 1)
        parseUrl = parseUrl.join('')


        id = getProjectUrl(parseUrl)
      } else {
        id = urlParams;
      }

      return id
    },

    ...mapState({
      project: state => state.viewProject
    }),


    projectURL() {
      return this.project.url || (this.project.images && this.project.images[0] && this.project.images[0].path);
    }
  },

  created() {
    // this.$store.dispatch('getProjectById', {id: this.projectId})

    this.checkUrl();

    this.$store.dispatch('getProjectById', {id: this.projectId}).then(data => {
      if (!data || data.project === null) {
        this.$router.replace('/404')
      }
    }).catch(() => this.$router.replace('/404'));
  },

  methods: {
    iframeLoad() {
      if (this.iframe.loaded) return this.iframeLoaded();
      else return; // do nothing
    },

    iframeLoaded() {
      console.log('loaded');
    },

    checkUrl() {
      const urlParams = this.$route.params.id;

      if (urlParams.split('')[0] !== 'p') {
        const url = setProjectUrl(urlParams);
        this.$router.replace(url)
      }
    }
  },

  updated() {
    this.iframe.loaded = true
  },
};
</script>

<style scoped lang="scss">

.wrapper {
  height: 100%;
}

.container {
  height: 100%;
  overflow: hidden;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: .5em;
  }
   
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 em(1) rgba(0, 0, 0, 0.3);
    border-radius: 5em;
  }
   
  &::-webkit-scrollbar-thumb {
    background-color: #AEAEAE;
    border-radius: 5em;
  }
}

.content {
  width: 100%;
  height: 100%;
  padding-left: 3.125em;
  padding-right: 3.125em;
  padding-bottom: em(40);
  overflow: unset;

  @media (max-width: 500px) {
    padding-left: 1.125em;
    padding-right: 1.125em;
  }
}

.logo {
  margin-top: em(60);
  margin-bottom: em(36);
  width: em(190);
  margin-left: auto;
  margin-right: auto;
  display: block;

  & svg {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: auto;
  }

  &__white {
    display: none;
  }

  .darkmode &__dark {
    display: none;
  }
  .darkmode &__white {
    display: block;
  }
}

.top {
    width: 100%;
    display: block;
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
    font-size: em(10);
    line-height: em(12, 10);
    color: #aeaeae;
    padding: em(8, 10) em(12, 10);
    background: #fff;
    border-radius: em(15, 10);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: em(6, 10);
    transition: color 0.15s ease-in-out;

    &:hover {
        color: #ff1923;
    }
}

.back {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &__icon {
    margin-right: em(6.5);

    & svg {
      width: 100%;
      height: 100%;
      min-width: em(15);
      max-width: em(15);
      max-height: em(10);

      & path {
        transition: fill 0.15s ease-in-out;
      }
    }
  }

  & span {
    font-weight: 500;
    font-size: em(16);
    line-height: em(20);
    color: #aeaeae;
    transition: color 0.15s ease-in-out;
  }

  &:hover {
    & span {
      color: #ff0000;
    }

    & path {
      fill: #ff0000;
    }
  }
}

.user {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: em(17) em(16);

    &__author {
        border-radius: em(30);
        overflow: hidden;
        margin-right: em(12);
        width: em(48);
        height: em(48);
    }

    &__name {
        color: #AEAEAE;
        margin-bottom: em(4, 24);
        font-weight: 600;
        font-size: em(24);
        line-height: em(29, 24);
        color: #383838;
    }

    &__type {
        color: #7E7E7E;
        & span {
            font-weight: 400;
            font-size: em(14);
            line-height: em(15, 14);
            color: #AEAEAE;
        }
        & b {
            font-weight: 600;
            font-size: em(14);
            line-height: em(17, 14);
        }
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
    background: #ffffff;
    border-radius: em(15);
    width: em(36);
    height: em(36);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: em(6);
    cursor: pointer;

    & svg {
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
    width: 100%;
    height: 100%;
    border-radius: 1em;
    overflow: hidden;

    & iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
      
      &::-webkit-scrollbar {
        width: .5em;
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
      transition: opacity .2s 1s ease-in-out;

      .loaded & {
        // z-index: -9;
        // opacity: 0;
      }
    }
}

.copy_success {
  position: absolute;
  top: 1.6em;
  left: -8.5em;
  padding: em(8) em(16);
  background: #FFFFFF;
  border: em(1) solid #ECECEC;
  box-shadow: em(8) em(8) em(30) rgba(112, 126, 174, 0.1);
  border-radius: em(10);
  opacity: 0;
  z-index: -1;
  transition: opacity .15s ease-in-out;

  &.copy {
    opacity: 1;
    z-index: 1;
  }

  & span {
      font-weight: 500;
      font-size: em(12);
      line-height: 120%;
      color: #383838;
  }
}
</style>