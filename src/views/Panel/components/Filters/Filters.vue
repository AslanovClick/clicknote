<template>
  <div class="filters">
    <!-- <div class="filters__alert" :class="{'open': alert.open}">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 -0.000488281C15.53 -0.000488281 20 4.48051 20 9.99951C20 15.5205 15.53 19.9995 10 19.9995C4.48 19.9995 0 15.5205 0 9.99951C0 4.48051 4.48 -0.000488281 10 -0.000488281ZM10 12.9305C9.52 12.9305 9.13 13.3205 9.13 13.8005C9.13 14.2805 9.52 14.6805 10.01 14.6805C10.49 14.6805 10.88 14.2805 10.88 13.8005C10.88 13.3205 10.49 12.9305 10 12.9305ZM10 5.32951C9.52 5.32951 9.12 5.73051 9.12 6.20951V10.6295C9.12 11.1105 9.52 11.4995 10 11.4995C10.48 11.4995 10.87 11.1105 10.87 10.6295V6.20951C10.87 5.73051 10.48 5.32951 10 5.32951Z" fill="#EE5D50"/>
        </svg>
        <span>
            {{alert.text}}
        </span>
    </div> -->

    <filters-items @alert="openAlert" />
  </div>
</template>

<script>
import FiltersItems from './FiltersItems.vue'

export default {
    components: { 
        FiltersItems 
    },

    data() {
        return {
            alert: {
                open: true,
                text: ''
            }
        }
    },

    methods: {
        openAlert(text) {
            this.alert.text = text;
            this.alert.open = true;

            setTimeout(() => {
                this.alert.open = false;
            }, 5000)
        }
    }
}
</script>

<style lang="scss">
.filters {
    position: relative;
    padding-top: .5em;

    &__alert {
        padding: em(8) em(12) !important;
        background: #EE5D50;
        box-shadow: em(31) em(45) em(35) rgba(167, 167, 167, 0.03), em(14) em(20) em(24) rgba(134, 134, 134, 0.04);
        border-radius: em(15);
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        margin: auto;
        position: absolute;
        top: -3em;
        left: 0;
        opacity: 0;
        transition: opacity .2s ease-in-out;
        visibility: hidden;
        white-space: nowrap;
        
        &.open {
            opacity: 1;
            visibility: visible;
        }

        & svg {
            width: 100%;
            min-width: em(20);
            max-width: em(20);
            margin-right: em(10);
        }

        & span {
            font-style: normal;
            font-weight: 500;
            font-size: em(12);
            line-height: em(15, 12);
            color: #ffffff;
        }
    }
}
</style>