<template>
  <div class="modal">
      <div class="title left">
        <span> Выбери тип пользователя </span>
      </div>
      <div class="modal__types">
        <label
          v-for="(checkbox, index) in checkboxes"
          :key="checkbox + index"
          :ref="`checkbox${index}`"
          class="modal__type"
          @mouseup="setNewCheckbox(checkbox.value)"
        >
          <input type="checkbox" />

          <span>
            {{ checkbox.text }}
          </span>
        </label>
      </div>
      <button class="modal__button" @click="addUserRole">
        <span> Сохранить </span>
      </button>
    </div>
</template>

<script>
// import { isLoggedUser } from '@/Hooks/isLoggedUser';

export default {
  name: "ChangeRole",

  data() {
    return {
      token: String,
      step: 0,
      checkboxes: [
        {
          text: "Исполнитель",
          value: "ROLE_EXECUTOR",
        },
        {
          text: "Менеджер",
          value: "ROLE_MANAGER",
        },
        {
          text: "Админ",
          value: "ROLE_ADMIN",
        },
      ],
      selectedCheckbox: "",
    };
  },
  created() {
    // this.checkToken();
  },
  methods: {
    openRollesStep() {
      this.step++;
    },
    checkToken() {
      const AUTH_TOKEN = localStorage.getItem("X-AUTH-TOKEN");
      if (AUTH_TOKEN) {
        this.$router.push("/");
      }
    },
    checkboxesReset() {
      for (let i = 0; i <= this.checkboxes.length; i++) {
        const checkbox = this.$refs[`checkbox${i}`];
        if (checkbox) {
          checkbox[0].querySelector("input").checked = false;
        }
      }
    },
    setNewCheckbox(checkboxValue) {
      this.checkboxesReset();
      this.selectedCheckbox = this.checkboxes.filter(
        (c) => c.value === checkboxValue
      )[0];
    },
    addUserRole() {
      const roleName = this.selectedCheckbox.value;

      this.$store.dispatch("addUserRole", { roleName }).then(() => {
        this.$store.dispatch("getUser").then((data) => {
          if (data.user.role) {
            localStorage.setItem("ROLE", data.user.role);
            this.$router.push("/");
            // if (isLoggedUser()) this.$router.go();
          } else {
            console.log("addUserRole error");
          }
        });
      });
    },
  },
}
</script>

<style scoped lang='scss'>

.title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  display: flex;
  color: #383838;
  margin-bottom: em(24);

  & span {
    font-size: em(24);
    line-height: em(29, 24);
  }

  &.left {
    justify-content: flex-start;
  }

  @media (orientation: portrait) {
    justify-content: center;
  }

  @media (max-width: 500px) {
    & span {
      font-size: em(18);
    }
  }
}

.modal {
  max-width: 83%;
  width: em(496);
  height: auto;
  background: #ffffff;
  box-shadow: em(31) em(45) em(35) rgba(125, 130, 141, 0.03),
    em(14) em(20) em(24) rgba(155, 161, 174, 0.04);
  border-radius: em(25);
  margin: auto;
  padding: em(48);
  margin-top: 12em;

  &__types {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__type {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    // &:first-child {
    //   margin-bottom: em(24);
    // }

    & input {
      z-index: -9;
      position: relative;
    }

    & span {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: em(16);
      line-height: 100%;
      color: #383838;
    }

    & span::before {
      position: absolute;
      content: "";
      background: #ff1923;
      left: em(5);
      top: 50%;
      transform: translate(0, -50%);
      width: em(8);
      height: em(8);
      border-radius: 50%;
      z-index: 4;
      opacity: 0;
    }

    & span::after {
      position: absolute;
      content: "";
      background: #ffffff;
      border: em(1) solid #ececec;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: em(16);
      height: em(16);
      border-radius: 50%;
    }

    & input[type="checkbox"]:checked ~ span {
      &::before {
        opacity: 1;
      }
    }

    &:hover {
      & span::after {
        border-color: #ccc;
      }
    }
  }

  &__button {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 1em;
    color: #f7f7f7;
    padding: em(12) em(20);
    width: 100%;
    background: #ff381d;
    border-radius: em(15);
    border: 0;
    margin-top: em(30);
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: rgba(255, 56, 29, 0.8);
    }

    & span {
      font-size: em(16);
      line-height: em(20);
    }
  }

}
</style>