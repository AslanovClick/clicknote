<template>
  <button class="auth_with_google" @click="login" aria-label="Войти с помощью Google" title="Войти с помощью Google">
    <img src="/img/login/google.svg" alt="" />
    <span> Войти с помощью Google </span>
  </button>
</template>

<script>
import { googleTokenLogin } from "vue3-google-login";
import { isLoggedUser } from "../../Hooks/isLoggedUser";

export default {
  methods: {
    getUser() {
      this.$store.dispatch("getUser").then((data) => {
        if (data.user.role) {
          localStorage.setItem("ROLE", data.user.role);
          
          // this.$emit('userRoleIsNull')
          if (isLoggedUser()) this.$router.go();
        } else {
          console.log("error");
        
          this.$emit('userRoleIsNull')
        }
      });
    },

    login() {
      googleTokenLogin().then((response) => {
        this.$store
          .dispatch("login", { googleAuthToken: response.access_token })
          .then((data) => {
            if (!data.errors) {
              this.getUser();
            }
          });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.auth_with_google {
  width: 100%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  color: var(--text-color-2);
  background: var(--bgcolor-1);
  border-radius: em(15);
  padding: em(12) em(20);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease-in-out;
  border: 0;
  cursor: pointer;
  font-size: 1em;

  & img {
    width: em(20);
    height: em(20);
    margin-right: em(8);
  }

  & span {
    font-size: em(16);
    line-height: em(20, 16);
  }

  &:hover {
    background: var(--bgcolor-9);
  }

  // The compact (tablet/phone) header has no room for the label: icon only.
  @media (max-width: 768px) {
    padding: em(10);

    & img {
      margin-right: 0;
    }

    & span {
      display: none;
    }
  }

  @media (max-width: 500px) {
    padding: 0;
    height: 100%;
    background: transparent;

    &:focus {
      background: var(--bgcolor-1);
    }

    & img {
      margin-right: 0;
    }

    & span {
      font-size: max(13px, 0.9em);
      display: none;
    }
  }
}
</style>
