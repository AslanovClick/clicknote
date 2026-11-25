<template>
    <div class="users__item">
      <div class="users__item_img">
          <img :src="user.avatar" alt="" @load="imageLoaded = true">
          <div v-if="!imageLoaded" class="users__item_img_default">
            <img src="img/panel/users/default.svg" alt="">
          </div>
      </div>
      <div>
          <div class="users__item_name">
              <span>
                  {{ user.firstName }} {{ user.lastName }}
              </span>
          </div>
          <div class="users__item_email">
              <span>
                  {{ user.email }}
              </span>
          </div>
      </div>
      <div class="users__item_job">
          <span>
              {{ user.job }}
          </span>
      </div>
      <div class="users__item_buttons">
          <div class="users__item_button users__item_button--admin"
              v-show="isAdmin(user)"
              >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.61641 8.05547L5.81484 8.81484C5.73047 8.94141 5.5875 9 5.4375 9H4.5V9.9375C4.5 10.2492 4.24922 10.5 3.9375 10.5H3V11.4375C3 11.7492 2.74922 12 2.4375 12H0.5625C0.251953 12 0 11.7492 0 11.4375V9.5625C0 9.4125 0.0592734 9.26953 0.164742 9.16406L3.94453 5.38359C3.81797 4.9875 3.75 4.56328 3.75 4.125C3.75 1.84688 5.59688 0 7.875 0C10.1531 0 12 1.84688 12 4.125C12 6.40312 10.1531 8.25 7.875 8.25C7.43672 8.25 7.0125 8.18203 6.61641 8.05547ZM8.8125 4.125C9.33047 4.125 9.75 3.70547 9.75 3.1875C9.75 2.66953 9.33047 2.25 8.8125 2.25C8.29453 2.25 7.875 2.66953 7.875 3.1875C7.875 3.70547 8.29453 4.125 8.8125 4.125Z" fill="#FFCE20"/>
              </svg>
              <span>
                  Админ
              </span>
          </div>
          <div class="users__item_button users__item_button--remove"
              v-if="userID !== user.id"
              @click="confirmRemove"
              >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1223 1.94633C11.3557 1.94633 11.55 2.13953 11.55 2.38612V2.61411C11.55 2.8547 11.3557 3.05389 11.1223 3.05389H1.17831C0.944316 3.05389 0.75 2.8547 0.75 2.61411V2.38612C0.75 2.13953 0.944316 1.94633 1.17831 1.94633H2.92774C3.28311 1.94633 3.59238 1.69314 3.67233 1.33675L3.76394 0.927568C3.90632 0.370187 4.3749 0 4.91175 0H7.38884C7.91985 0 8.39309 0.370187 8.53022 0.898769L8.62826 1.33615C8.70762 1.69314 9.01689 1.94633 9.37284 1.94633H11.1223ZM10.2338 10.2806C10.4164 8.57851 10.7362 4.53405 10.7362 4.49325C10.7478 4.37025 10.7076 4.25326 10.6276 4.15846C10.5419 4.07086 10.4333 4.01807 10.3137 4.01807H1.99137C1.87117 4.01807 1.75679 4.07086 1.67743 4.15846C1.59691 4.25326 1.55723 4.37025 1.56306 4.49325C1.56413 4.50075 1.57561 4.64319 1.59479 4.88133C1.68 5.93935 1.91736 8.88634 2.07073 10.2806C2.17927 11.3072 2.85325 11.9534 3.8295 11.9768C4.58284 11.9942 5.35893 12.0002 6.15254 12.0002C6.90004 12.0002 7.6598 11.9942 8.4359 11.9768C9.44599 11.9588 10.1194 11.3252 10.2338 10.2806Z" fill="var(--bgcolor-5)"/>
              </svg>
              <span>
                  Удалить
              </span>
          </div>
      </div>
      <div class="users__item_roles">
        <select name="" class="users__item_roles_list"
            :value="this.user.role"
            :disabled="userID === user.id"
            :title="userID === user.id ? 'Нельзя изменить собственную роль' : ''"
            @change="updateRole">
            <option v-for="role in roles"
                :key="role"
                :value="role.name">
                {{role.title}}
            </option>
        </select>
        <div class="users__item_roles_icon">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-35e7ec81=""><path d="M4.869 0.369216C4.811 0.425719 4.563 0.639065 4.359 0.837798C3.076 2.00292 0.976 5.04238 0.335 6.63322C0.232 6.87482 0.014 7.48563 0 7.81198C0 8.12469 0.072 8.4228 0.218 8.70726C0.422 9.06186 0.743 9.34632 1.122 9.50219C1.385 9.60253 2.172 9.7584 2.186 9.7584C3.047 9.91427 4.446 10 5.992 10C7.465 10 8.807 9.91427 9.681 9.78665C9.695 9.77204 10.673 9.61617 11.008 9.44569C11.62 9.13298 12 8.52216 12 7.86848V7.81198C11.985 7.38626 11.605 6.49099 11.591 6.49099C10.949 4.98587 8.952 2.01656 7.625 0.823186C7.625 0.823186 7.284 0.487092 7.071 0.340964C6.765 0.113005 6.386 0 6.007 0C5.584 0 5.19 0.127618 4.869 0.369216Z" fill="var(--bgcolor-3)" data-v-35e7ec81=""></path></svg>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['user', 'userID'],

    emits: ['removeUser'],

    data() {
      return {
        imageLoaded: false,
        
        roles: [
            {
                title: 'Админ',
                name: 'ROLE_ADMIN'
            },
            {
                title: 'Исполнитель',
                name: 'ROLE_EXECUTOR'
            },
            {
                title: 'Менеджер',
                name: 'ROLE_MANAGER'
            },
        ],

        rolesValue: ''
      }
    },

    methods: {
        isAdmin(user) {
          return user.role === 'ROLE_ADMIN'
        },

        userName() {
            return [this.user.firstName, this.user.lastName].filter(Boolean).join(' ') || this.user.email
        },

        confirmRemove() {
            if (window.confirm(`Удалить пользователя ${this.userName()}? Это действие нельзя отменить.`)) {
                this.$emit('removeUser', this.user.id)
            }
        },

        updateRole(e) {
            const role = e.target.value
            const title = this.roles.find(r => r.name === role)?.title || role
            if (!window.confirm(`Сменить роль пользователя ${this.userName()} на «${title}»?`)) {
                e.target.value = this.user.role
                return
            }
            this.$store.dispatch('updateUserRole', {id: this.user.id, role})
                .catch(() => { e.target.value = this.user.role })
        }
    },

    // mounted
}
</script>

<style scoped lang="scss">

.users {
    &__item {
        display: grid;
        grid-template-columns: 3% 12% 22% 3% 28%;
        grid-gap: em(24);
        align-items: center;

        padding: em(10) em(25) em(10) em(10);
        background: var(--bgcolor-7);
        border-radius: em(10);
        transition: background .2s ease-in-out, box-shadow .2s ease-in-out;
        position: relative;

        &:nth-child(2n) {
            background: var(--bgcolor-1);
        }
        
        &:hover {
            background: var(--bgcolor-2);
            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                box-shadow: em(31) em(45) em(35) rgba(167, 167, 167, 0.03), em(14) em(20) em(24) rgba(134, 134, 134, 0.04);
                z-index: 2;
            }
        }
    }

    &__item_img {
        width: em(48);
        height: em(48);
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        z-index: 3;
        
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
            width: em(28) !important;
            height: auto !important;
          }
        }
    }

    &__item_name {
        margin-bottom: em(4);
        position: relative;
        z-index: 3;

        & span {
            font-style: normal;
            color: var(--text-color-2);
            font-weight: 600;
            font-size: max(13px, em(14));
            line-height: 120%;
            transition: color .2s ease-in-out;
        }
    }

    &__item_email {
        justify-self: center;
        position: relative;
        z-index: 3;

        & span {
            font-style: normal;
            font-weight: 500;
            font-size: max(12px, em(12));
            line-height: em(15, 12);
            color: var(--bgcolor-5);
            transition: color .2s ease-in-out;
        }
    }

    &__item_job {
        text-align: center;
        position: relative;
        z-index: 3;

        & span {
            font-style: normal;
            font-weight: 500;
            font-size: max(12px, em(12));
            line-height: em(15);
            color: #8D8D8D;
        }
    }

    &__item_buttons {
        display: flex;
        justify-content: flex-end;
        position: relative;
        z-index: 3;

    }

    &__item_button {
        cursor: pointer;
        margin-left: em(12);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        & svg {
            width: 100%;
            min-width: em(12);
            max-width: em(12);
            & path {
                transition: fill .2s ease-in-out;
            }
        }

        & span {
            opacity: 0;
            font-weight: 500;
            font-size: max(10px, em(8));
            line-height: em(10, 8);
            color: #05CD99;
            position: absolute;
            // bottom: -1.35em;
            bottom: -2.55em;
            left: 50%;
            transform: translate(-50%, 0);
            transition: opacity .2s ease-in-out;
            white-space: nowrap;
        }

        &:hover {
            & svg path {
                fill: #05CD99;
            }
            & span {
                opacity: 1;
            }
        }
    }

    &__item_button--remove {
        & span {
            color: #EE5D50
        }

        &:hover {
            & svg path {
                fill: #EE5D50;
            }
        }
    }
    
    &__item_button--admin {
        & svg path {
            fill: #AEAEAE;
        }

        & span {
            color: #FFCE20;
        }

        &:hover {
            & svg path {
                fill: #FFCE20;
            }
        }
    }

    &__item_roles {
        position: relative;
        z-index: 3;
        justify-self: center;
        // padding-right: 1.2em;

        &_icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            pointer-events: none;

            & svg {
                width: 100%;
                height: auto;
                min-width: em(11);
                max-width: em(11);
                transform: rotate(180deg);
                
                path {
                    transition: fill .2s ease-in-out;
                    fill: var(--bgcolor-5);
                }
            }
        }

        &:hover path {
            fill: #05CD99;
        }
    }

    &__item_roles_list {
        border: 0;
        background: transparent;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        color: var(--text-color-2);
        font-weight: 400;
        font-size: max(12px, 0.875em);
        line-height: 120%;
        padding: .5em 1.5em .5em 0;

        &::marker {
            content: none;
        }
    }
}
</style>