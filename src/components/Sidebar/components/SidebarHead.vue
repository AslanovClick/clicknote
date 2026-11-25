<template>
  <div class="sidebar__head">
      <div class="sidebar__arrow">
          <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.81539 2.4345C4.78714 2.4055 4.68047 2.2815 4.5811 2.1795C3.99854 1.538 2.47881 0.488 1.68339 0.1675C1.56259 0.116 1.25718 0.00699984 1.09401 -1.70736e-07C0.937653 -1.77571e-07 0.788602 0.0359998 0.646371 0.109C0.46907 0.211 0.326839 0.3715 0.248905 0.561C0.198734 0.6925 0.120799 1.086 0.120799 1.093C0.0428643 1.5235 3.79667e-07 2.223 3.45878e-07 2.996C3.13684e-07 3.7325 0.0428637 4.4035 0.106673 4.8405C0.113979 4.8475 0.191914 5.3365 0.277155 5.504C0.433512 5.81 0.738919 6 1.06576 6L1.09401 6C1.30687 5.9925 1.75451 5.8025 1.75451 5.7955C2.50706 5.4745 3.99172 4.476 4.58841 3.8125C4.58841 3.8125 4.75645 3.642 4.82952 3.5355C4.9435 3.3825 5 3.193 5 3.0035C5 2.792 4.93619 2.595 4.81539 2.4345Z" fill="#AEAEAE"/>
        </svg>
      </div>
      <div class="sidebar__title">
          {{ title }}
      </div>
      <div class="sidebar__count" v-if="filtersCount !== 0">
          <span>
              {{ filtersCount }}
          </span>
      </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'filtersCount'
  ]
}
</script>

<style scoped lang="scss">
.sidebar {
  &__head {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        margin-bottom: 0;
        padding-bottom: em(16);
        cursor: pointer;
    }

    &__title {
        font-weight: 500;
        font-size: .9em;
        line-height: 100%;
        color: var(--text-color-2);
        margin-right: em(8);
        user-select: none;
        transition: color .15s ease-in-out;
        
        .sidebar__filter.open & {
            color: #FF381D;
        }
    }

    &__head:hover {
        & .sidebar__title {
            color: #FF381D;
        }

        & .sidebar__arrow {
            & svg path {
                fill: #FF381D;
            }
        }
    }

    &__count {
      font-size: 0.9em;
      font-weight: 700;
      line-height: 100%;
      color: rgba(174, 174, 174, .9);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__arrow {
        margin-right: em(15);
        transition: transform .15s ease-in-out;
        & svg {
            min-width: em(6);
            max-width: em(6);
            width: 100%;
            height: auto;

            & path {
                transition: fill .15s ease-in-out;
            }
        }

        .sidebar__filter.open & {
            transform: rotate(90deg);
            & svg path {
                fill: #FF1923;
            }
        }
    }
}
</style>