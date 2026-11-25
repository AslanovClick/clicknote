<template>
  <field :title="title" :class="{ error: error }">
    <template #content>
      <div class="form__tags">
        <div class="form__tags_scroll">
          <div class="form__tags_wrapper" v-if="tags">
            <div
              class="form__tag"
              v-for="(tag, index) in tags"
              :key="tag.id + index"
              @click="removeTag(tag)"
            >
              <span>
                {{ tag.name }}
              </span>
              <div class="form__tag_icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z"
                    fill="#FF0000"
                  />
                  <path
                    d="M7.38528 8.13655L6.02184 6.77311L4.67022 8.12473C4.45259 8.34236 4.09821 8.34081 3.87868 8.12128C3.65915 7.90176 3.65761 7.54737 3.87523 7.32975L5.22685 5.97812L3.86341 4.61468C3.67966 4.38889 3.69511 4.06221 3.89919 3.85813C4.10327 3.65405 4.42995 3.6386 4.65574 3.82235L6.01491 5.18152L7.36229 3.83414C7.5865 3.65234 7.91332 3.67064 8.11918 3.87651C8.32505 4.08237 8.34335 4.40919 8.16156 4.6334L6.81417 5.98078L8.17761 7.34422C8.36137 7.57002 8.34592 7.89669 8.14183 8.10077C7.93775 8.30485 7.61108 8.3203 7.38528 8.13655Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <input type="hidden" :value="stringifidedTags" required />
          </div>
        </div>
      </div>
    </template>
  </field>
  <field :class="{ error: error }">
    <template #content>
      <div class="form__tags form__tags_add">
        <div class="form__tags_scroll">
          <label class="form__tags_search">
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
                fill="var(--bgcolor-5)"
              />
            </svg>
            <input
              type="text"
              placeholder="Search & add tag"
              v-model="tagsSearchInputValue"
              @keydown.Enter="addTagFromSearch"
            />
          </label>
          <div class="form__tags_wrapper">
            <template v-for="obj in tagsByAlphabet" :key="obj">
              <div v-if="obj.values.length" class="form__tags_sort">
                <div class="form__tags_sort_name">
                  {{ obj.key }}
                </div>
                <div
                  class="form__tag form__tag_silver"
                  @click="addTag(tag)"
                  v-for="tag in obj.values"
                  :key="tag"
                >
                  <span>
                    {{ tag.name }}
                  </span>
                  <div class="form__tag_icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z"
                        fill="#05CD99"
                      />
                      <path
                        d="M8.49028 6.53125H6.56208V8.44273C6.56208 8.7505 6.3104 9 5.99994 9C5.68948 9 5.4378 8.7505 5.4378 8.44273V6.53125H3.5096C3.22001 6.50152 2.99994 6.25961 2.99994 5.97099C2.99994 5.68237 3.22001 5.44046 3.5096 5.41073H5.43175V3.50524C5.46174 3.21816 5.70578 3 5.99692 3C6.28806 3 6.53209 3.21816 6.56208 3.50524V5.41073H8.49028C8.77987 5.44046 8.99994 5.68237 8.99994 5.97099C8.99994 6.25961 8.77987 6.50152 8.49028 6.53125Z"
                        fill="var(--bgcolor-1)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </field>
</template>

<script>
import { mapState } from "vuex";
import { sortArrayByAlphabet } from "@/Hooks/sortArrayByAlphabet";
import Field from "@/components/FormComponents/Field.vue";

export default {
  components: { Field },

  props: ["tags", "title", "name", "defaultValue", "error"],

  emits: ["onTagsChange"],

  data() {
    return {
      tagsSearchInputValue: "",
    };
  },

  computed: {
    ...mapState({
      allTags: (state) => state.filters.tag,
    }),

    stringifidedTags() {
      return JSON.stringify(this.tags);
    },

    tagsSearchResults() {
      return this.tagsSearchInputValue === ""
        ? this.allTags
        : this.allTags.filter((t) =>
            t.name
              .toLowerCase()
              .includes(this.tagsSearchInputValue.toLowerCase())
          );
    },

    tagsByAlphabet() {
      return sortArrayByAlphabet(this.tagsSearchResults);
    },
  },

  methods: {
    tagsIds(tags) {
      const res = [];
      tags.forEach((tag) => res.push(tag.id));

      return res;
    },

    updateTags(newTag) {
      const newTags = this.tags !== null ? [...this.tags] : [];
      newTags.push(newTag);
      this.$emit("onTagsChange", {value: newTags, validated: newTags.length > 0});
    },

    isExistTag(newTag) {
      return this.tags === null
        ? false
        : this.tags.find((t) => t.name === newTag.name) !== undefined
        ? true
        : false;
    },

    addTag(newTag) {
      if (this.isExistTag(newTag)) return;
      this.tagsSearchInputValue = "";
      this.updateTags(newTag);
    },

    addTagFromSearch() {
      if (this.tagsSearchResults.length !== 0) {
        this.updateTags(this.tagsSearchResults[0]);
        this.tagsSearchInputValue = "";
      }
    },

    removeTag(tag) {
      const newTags = this.tags.filter((t) => t.id !== tag.id);
      const tags = newTags.length === 0 ? null : newTags;

      this.$emit("onTagsChange", {value: tags, validated: tags !== null});
    },
  },

  created() {},
};
</script>

<style scoped lang="scss">
.form {
  &__tags {
    padding: em(16);
    width: 100%;
    height: em(360);
    background: var(--bgcolor-1);
    border-radius: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    border: em(1) solid var(--bgcolor-1);

    .error & {
      border-color: red;
    }
  }

  &__tags_wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }

  &__tags_sort {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    &_name {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: em(16);
      line-height: em(20, 16);
      text-align: center;
      color: #7e7e7e;
      width: em(72, 16);
      margin-right: em(6, 16);

      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.375em;
    }
  }

  &__tags_add {
    margin-top: 1.2em;
    background: var(--bgcolor-2);
    border: em(1) solid var(--bgcolor-3);
    position: relative;
    overflow: hidden;

    .error & {
      border-color: red;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 92%;
      height: 4em;
      display: block;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        var(--bgcolor-2) 100%
      );
      pointer-events: none;
    }
  }

  &__tags_scroll {
    width: 100%;
    overflow: auto;
    padding-right: em(8);
    padding-top: 0.2em;
    /* width */
    &::-webkit-scrollbar {
      width: em(6);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--bgcolor-1);
      border-radius: em(8);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(8);
    }
  }

  &__tags_search {
    padding: em(4) em(10) em(10);
    border-bottom: em(1) solid var(--bgcolor-3);
    margin-bottom: em(12);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & svg {
      width: 100%;
      min-width: em(16);
      max-width: em(16);
      margin-right: em(10);
    }

    & input {
      font-size: em(14);
      line-height: em(17, 14);
      color: var(--bgcolor-5);
      border: 0;
      padding: 0;
      width: 100%;
      background: transparent;
    }
  }

  &__tag {
    display: flex;
    align-items: center;
    text-align: center;
    padding: em(8) em(12);
    background: var(--bgcolor-2);
    border-radius: em(15);
    position: relative;
    cursor: pointer;
    margin-right: em(8);
    margin-bottom: em(6);
    user-select: none;

    & span {
      color: var(--bgcolor-5);
      font-weight: 500;
      font-size: em(10);
      line-height: em(12, 10);
      margin-bottom: 0;
      transition: color 0.15s ease-in-out;
    }

    &_silver {
      background: var(--bgcolor-1);
    }
  }

  &__tag_icon {
    position: absolute;
    top: em(-4);
    right: em(-4);
    opacity: 0;
    transition: opacity 0.15s ease-in-out;

    & svg {
      width: 100%;
      min-width: em(12);
      max-width: em(12);
    }
  }

  &__tag:hover {
    & span {
      color: var(--text-color-1);
    }

    & .form__tag_icon {
      opacity: 1;
    }
  }
}
</style>
