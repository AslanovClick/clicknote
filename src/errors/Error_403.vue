<template>
  <div class="wrapper">
    <div
      class="container"
      ref="container"
    >
      <header-component 
        @openAddProjectModal="modalAddOpen = true" 
        @openFilters="openMobileFilter = true"
        @closeFilters="openMobileFilter = false"
        :sidebarOpen="openMobileFilter"
        :filtersCount="filtersCount"
        @search="inputValue => this.searchInputValue = inputValue"
        @darkmode="darkmode => $emit('darkmode', darkmode)"
        />

      <div class="content">
        <div class="error">
          <div class="error__wrapper">
            <div class="error__borders">
              <!-- <div class="error__icon">
                <svg width="63" height="78" viewBox="0 0 63 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M49.9713 56.0507L48.3086 57.0845L59.5694 75.1968C60.4877 74.6259 60.7693 73.4187 60.1984 72.5004L49.9713 56.0507Z" fill="#FF998C"/>
                  <path d="M49.97 56.0504L44.7725 59.2817L54.4176 74.7954C55.3099 76.2306 57.1968 76.6707 58.632 75.7784C60.0673 74.8861 60.5074 72.9992 59.6151 71.564L49.97 56.0504Z" stroke="#FF381D" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M31.5823 62.0865C48.3182 62.0865 61.8853 48.5194 61.8853 31.7835C61.8853 15.0476 48.3182 1.48047 31.5823 1.48047C14.8464 1.48047 1.2793 15.0476 1.2793 31.7835C1.2793 48.5194 14.8464 62.0865 31.5823 62.0865Z" stroke="#FF381D" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.74458 34.9871C8.2406 30.3165 8.8341 25.5928 10.4778 21.1921C12.1215 16.7914 14.77 12.8352 18.2124 9.63867C14.3982 11.9415 11.2438 15.191 9.05525 19.072C6.86668 22.9529 5.7182 27.3336 5.7212 31.7891C5.72419 36.2446 6.87856 40.6237 9.07234 44.5017C11.2661 48.3797 14.4249 51.625 18.2422 53.9227C12.8853 48.9711 9.51001 42.2417 8.74458 34.9871Z" fill="white"/>
                  <path d="M57.2982 29.0446C56.5797 22.3035 53.2423 16.1143 48.0049 11.8101C42.7674 7.50582 36.0489 5.43087 29.2964 6.03213C35.4167 6.61247 41.1302 9.35391 45.4125 13.765C49.6948 18.176 52.2658 23.9682 52.6646 30.103C53.0634 36.2379 51.2639 42.3142 47.5887 47.2425C43.9136 52.1708 38.6031 55.6289 32.6094 56.9967C31.9349 57.2298 31.2455 57.4431 30.5462 57.6216C34.2601 57.7752 37.9634 57.1262 41.4038 55.719C44.8442 54.3119 47.9408 52.1796 50.4826 49.4674C53.0243 46.7552 54.9515 43.527 56.1328 40.0026C57.3141 36.4783 57.7217 32.7407 57.3279 29.0446H57.2982Z" fill="#FF998C"/>
                  <path d="M31.5833 57.6423C45.865 57.6423 57.4426 46.0647 57.4426 31.783C57.4426 17.5014 45.865 5.92383 31.5833 5.92383C17.3017 5.92383 5.72412 17.5014 5.72412 31.783C5.72412 46.0647 17.3017 57.6423 31.5833 57.6423Z" stroke="#FF381D" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M40.4595 31.3821L40.4725 31.7301L40.8033 31.8386C45.3432 33.3281 44.3013 40.3209 39.3586 40.3209H23.0557C16.7498 40.3209 15.5817 31.2751 21.5813 29.623L21.9311 29.5267L21.948 29.1643C22.2217 23.3267 29.7285 21.3181 32.9467 26.1456L33.1493 26.4495L33.5005 26.3489C34.2966 26.1208 35.1343 26.0766 35.9501 26.2196C36.7659 26.3625 37.5383 26.689 38.2089 27.174C38.8794 27.6591 39.4305 28.2901 39.8204 29.0192C40.2103 29.7483 40.4289 30.5563 40.4595 31.3821Z" stroke="#FF381D"/>
                </svg>
              </div> -->
              <div class="error__code">
                403
              </div>
              <div class="error__title">
                в доступе отказано
              </div>
              <div class="error__desc">
                Этой ссылки больше не существует,
                <br>
                а может и никогда не существовало
              </div>
              <button class="error__btn"
                @click="$router.push('/')"
                >
                Вернуться на главную
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <project-add 
      :open="modalAddOpen"
      @modalClose="modalAddOpen = false" 
      />

  </div>
</template>

<script>
import ProjectAdd from '@/components/modals/ProjectAdd.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';

export default {
  name: 'Error_403',

  components: {
    ProjectAdd,
    HeaderComponent,
  },

  data() {
    return {
      modalAddOpen: false,
    };
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

  @media (max-width: 1080px) {
    overflow: auto; 
  }
}

.content {
  width: 100%;
  height: 100%;
  padding-left: 3.125em;
  padding-right: 3.125em;
  padding-bottom: em(40);

  @media (max-width: 1080px) {
    padding-left: 1em;
    padding-right: 1em;
  }
}

.error {
  width: 100%;
  height: 100%;
  padding-left: 3.125em;
  padding-right: 3.125em;
  padding-bottom: em(40);
  overflow: unset;
  background: rgba(0, 0, 0, 0.04);
  border-radius: em(25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat';
  font-style: normal;

  &__wrapper {
    padding: em(20);
    width: 100%;
    max-width: em(650);
    height: auto;
    background: #FFFFFF;
    border-radius: em(25);
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: em(20);
  }

  &__borders {
    padding: em(53) 4.125em;
    width: 100%;
    height: auto;
    background: #FFFFFF;
    border: em(1) solid #FF381D;
    border-radius: em(24);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  &__icon {
    position: absolute;
    left: -.1em;
    top: -.1em;

    & svg {
      width: 100%;
      height: auto;
      min-width: em(60);
      max-width: em(60);
      position: relative;
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: em(60);
      height: em(60);
      background: #fff;
    }
  }

  &__code {
    font-weight: 500;
    font-size: em(24);
    line-height: 100%;
    color: #FF381D;
    position: absolute;
    right: -.1em;
    top: -.1em;
    width: em(38);
    height: em(24);
    text-align: right;
    background: #fff;
  }

  &__title {
    font-weight: 500;
    font-size: em(24);
    line-height: 100%;
    color: #FF381D;
    margin-bottom: em(40);
  }

  &__desc {
    font-weight: 500;
    font-size: em(20);
    line-height: 140%;
    color: #383838;
    margin-bottom: em(40);
    text-align: center;
  }

  &__btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: em(14) em(30);
    background: #FF381D;
    border-radius: em(15);
    font-weight: 600;
    font-size: em(16);
    line-height: em(20);
    color: #F4F7FE;
    cursor: pointer;
    border: em(1) solid #FF381D;
    transition: background .15s ease-in-out, color .15s ease-in-out;

    &:hover {
      background: #ffffff;
      color: #FF381D;
    }
  }

  @media (max-width: 1080px) {
    padding-top: 1.5em;
    padding-left: 1em;
    padding-right: 1em;

    &__borders {
      padding: em(60) em(30) em(30);
    }

    &__icon {
      & svg {
        min-width: 2.75em;
        max-width: 2.75em;
      }

      &::after {
        width: 2.75em;
        height: 2.75em;
      }
    }

    &__title {
      font-size: em(16);
      margin-bottom: em(20);
    }

    &__desc {
      font-size: em(14);
    }

    &__btn {
      font-size: .9em;
      padding-left: 1em;
      padding-right: 1em;
      width: 100%;
    }

  }
}

</style>