<template>
  <div>
    <div class="project__tags_overflow">
      <div class="project__tags_wrapper"
        ref='tags'
        :style="tagsTranslate && `transform: translate(${tagsTranslate}px, 0);`"
        >
        <div class="project__tag"
            v-for="tag in tags"
            :key="tag"
            >
            {{ tag.name }}
        </div>
      </div>
      <div class="project__tags_arrow project__tags_arrow_left"
        @mousedown="moveLeft"
        @mouseup="tagsLeft = false"
        v-show="showLeftArrow"
        >
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.36329 0.198869L5.51354 4.51989C5.76822 4.78505 5.76822 5.21495 5.51354 5.48011L1.36329 9.80113C1.10861 10.0663 0.69569 10.0663 0.44101 9.80113C0.18633 9.53597 0.18633 9.10606 0.44101 8.8409L4.13012 5L0.44101 1.1591C0.18633 0.893936 0.18633 0.464029 0.44101 0.198869C0.69569 -0.0662898 1.10861 -0.0662898 1.36329 0.198869Z" fill="#AEAEAE"/>
        </svg>
      </div>
      <div class="project__tags_arrow project__tags_arrow_right"
        @mousedown="moveRight"
        @mouseup="tagsRight = false"
        v-show="showRightArrow"
        >
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.36329 0.198869L5.51354 4.51989C5.76822 4.78505 5.76822 5.21495 5.51354 5.48011L1.36329 9.80113C1.10861 10.0663 0.69569 10.0663 0.44101 9.80113C0.18633 9.53597 0.18633 9.10606 0.44101 8.8409L4.13012 5L0.44101 1.1591C0.18633 0.893936 0.18633 0.464029 0.44101 0.198869C0.69569 -0.0662898 1.10861 -0.0662898 1.36329 0.198869Z" fill="#AEAEAE"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tags'
  ],

  data() {
    return {
      tagsTranslate: 0,

      tagsLeft: false,
      tagsRight: false,

      showRightArrow: false,
    }
  },

  computed: {
    showLeftArrow() {
      return this.tagsTranslate < 0;
    },

    maxTranslateX() {
      const tagsWrapper = this.$refs[`tags`];
      return tagsWrapper.offsetWidth - tagsWrapper.parentElement.offsetWidth;
    }
  },

  methods: {
    moveRight() {
      this.tagsRight = this.tagsRight !== true && true;
      if (this.tagsRight) {
        if (Math.abs(this.tagsTranslate) < Math.abs(this.maxTranslateX)) {
          this.tagsTranslate -= 25;
        } else {
          this.showRightArrow = false;
        }
      }
    },

    moveLeft() {
      this.tagsLeft = this.tagsLeft !== true && true;
      this.showRightArrow = this.checkTagsWrapper(); 
      if (this.tagsLeft) {
        if (this.showLeftArrow) {
            this.tagsTranslate += 25;
        }
      }
    },

    checkTagsWrapper() {
      const tagsWrapper = this.$refs[`tags`];
      return tagsWrapper.parentElement.offsetWidth < tagsWrapper.offsetWidth;
    },
  },

  mounted() {
    this.showRightArrow = this.checkTagsWrapper(); 
  }
}
</script>

<style scoped lang="scss">

.project {
  &__tags {
    .hover & {
      max-height: 4em;
    }
    &_overflow {
      width: 100%;
      overflow: hidden;
      position: relative;
      margin-top: var(--topOffset);
      margin-bottom: em(16);
    }

    &_wrapper {
      display: flex;
      flex-direction: row;
      padding: 0 em(11);
      padding-right: 0;
      overflow: auto;
      width: max-content;
      transition: transform .2s ease-in-out;

      &::-webkit-scrollbar {
          height: 0;
      }
      &::-webkit-scrollbar-thumb {
          background-color: #C4C4C4;
      }
    }

    &_arrow {
        position: absolute;
        top: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 3.1em;
        z-index: 3;
        height: 100%;

        & svg {
            width: 100%;
            height: 100%;
            min-width: em(6);
            max-width: em(6);

            & path {
                transition: fill .15s ease-in-out;
            }
        }

        &:hover path {
            fill: #FF1923;
        }

        &_left {
            width: 2.2em;
            left: 0;
            padding-right: 1.1em;
            background: linear-gradient(90deg, var(--bgcolor-2) 71.57%, rgba(255, 255, 255, 0) 100%);
            & svg {
                transform: rotate(180deg)
            }
        }
        &_right {
            // right: em(15);
            padding-right: em(15);
            right: 0;
            background: linear-gradient(270deg, var(--bgcolor-2) 43.57%, rgba(255, 255, 255, 0) 94%);
        }
    }
  }

  &__tag {
    font-style: normal;
    font-weight: 400;
    font-size: max(11px, em(10));
    line-height: em(12, 10);
    color: #AEAEAE;
    padding: em(8, 10) em(12, 10);
    background: var(--bgcolor-1);
    border-radius: em(15, 10);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: em(6, 10);
    cursor: pointer;
    transition: color .15s ease-in-out;

    &:hover {
        color: #FF1923;
    }
  }

  @media (max-width: 500px) {
    &__tags {
        font-size: max(12px, 0.75em);
        z-index: 888;
        height: max-content;
        transition: max-height .75s ease-in-out;

        .hover & {
          max-height: 20em;
        }
    }

    &__tags_overflow {
        height: max-content;

        &::after, &::before {
            content: none;
        }
    }

    &__tags_wrapper {
        overflow: unset;
        width: 100%;
        height: max-content;
        flex-wrap: wrap;
    }

    &__tags_arrow {
        display: none;
    }

    &__tag {
        margin-bottom: 1em;
    }
  }
}

</style>