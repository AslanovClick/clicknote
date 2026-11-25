<template>
  <div class="active-filters" v-if="chips.length || total !== null">
    <span class="active-filters__total" v-if="total !== null">
      {{ totalLabel }}
    </span>

    <button
      v-for="chip in chips"
      :key="chip.key + chip.id"
      class="active-filters__chip"
      type="button"
      :title="`Убрать фильтр «${chip.name}»`"
      @click="remove(chip)"
    >
      <span class="active-filters__chip_group">{{ chip.group }}:</span>
      {{ chip.name }}
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </button>

    <button
      v-if="chips.length > 1"
      class="active-filters__reset"
      type="button"
      @click="$router.push('/')"
    >
      Сбросить все
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { parseFilterQuery, buildFilterQuery } from "@/Hooks/projectFilters";

const GROUP_TITLES = {
  direction: "Направление",
  scope: "Сфера",
  type: "Тип работы",
  program: "Программа",
  format: "Формат",
  client: "Клиент",
  tag: "Тег",
  executor: "Исполнитель",
};

// "57 работ", "1 работа", "3 работы"
function worksLabel(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} работа`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} работы`;
  return `${n} работ`;
}

// The filters in the URL as removable chips, with how many works they give.
// A single direction is not shown: its tab is already highlighted above.
export default {
  name: "ActiveFilters",

  props: {
    total: { type: Number, default: null },
    directionNames: { type: Object, default: () => ({}) },
  },

  computed: {
    ...mapState({ sidebarFilters: (state) => state.sidebarFilters }),

    urlFilters() {
      const query = this.$route.fullPath.split("?")[1];
      return parseFilterQuery(query ? `?${query}` : "");
    },

    chips() {
      const chips = [];
      Object.keys(this.urlFilters).forEach((key) => {
        const ids = this.urlFilters[key];
        if (key === "direction" && ids.length === 1) return;
        const list = this.sidebarFilters[key]?.list || [];
        ids.forEach((id) => {
          const option = list.find((item) => item.id === id);
          const name = option
            ? option.name || [option.firstName, option.lastName].filter(Boolean).join(" ")
            : (key === "direction" && this.directionNames[id]) || `#${id}`;
          chips.push({ key, id, group: GROUP_TITLES[key] || key, name: String(name).trim() });
        });
      });
      return chips;
    },

    totalLabel() {
      return this.chips.length || this.urlFilters.direction
        ? `Найдено: ${worksLabel(this.total)}`
        : worksLabel(this.total);
    },
  },

  methods: {
    remove(chip) {
      const filters = { ...this.urlFilters };
      filters[chip.key] = filters[chip.key].filter((id) => id !== chip.id);
      this.$router.push(`/${buildFilterQuery(filters)}`);
    },
  },
};
</script>

<style scoped lang="scss">
.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: em(8);
  margin: em(4) 0 em(16);
  min-height: em(28);

  &__total {
    font-weight: 500;
    font-size: max(13px, em(14));
    color: var(--text-color-4);
    margin-right: em(8);
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: em(6);
    padding: em(6) em(10) em(6) em(12);
    border: 0;
    border-radius: em(20);
    background: var(--bgcolor-3);
    color: var(--text-color-2);
    font-family: inherit;
    font-size: max(12px, em(13));
    line-height: 1.2;
    cursor: pointer;
    transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

    &_group {
      color: var(--text-color-4);
    }

    svg {
      width: max(8px, em(8));
      height: auto;
      opacity: 0.6;
    }

    &:hover {
      background: #ff381d;
      color: #fff;

      .active-filters__chip_group {
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  &__reset {
    border: 0;
    background: none;
    padding: em(6) em(4);
    color: #ff381d;
    font-family: inherit;
    font-size: max(12px, em(13));
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
