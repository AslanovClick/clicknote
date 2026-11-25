<template>
  <div class="users">
    <users-list :users="filteredUsers" :userID='userID' 
      @removeUser="removeUser"
      />
  </div>
</template>

<script>
import UsersList from './UsersList.vue';
import { mapState } from 'vuex';

export default {
  components: { UsersList },

  data() {
    return {
    }
  },

  props: ['searchInputValue'],

  computed: {
    filteredUsers() {
      const users = Array.isArray(this.users) ? this.users : [];
      const query = (this.searchInputValue || '').trim().toLowerCase();
      if (!query) return users;

      return users.filter(user => [
        `${user.firstName || ''} ${user.lastName || ''}`,
        user.email,
      ].some(value => value && value.toLowerCase().includes(query)));
    },

    ...mapState({
      users: state => state.users,
      userID: state => state.user.id
    })
  },

  methods: {
    removeUser(id) {
      this.$store.dispatch('removeUser', {id}).then(() => {
        this.$store.dispatch('getUsersList')
      })
    }
  },

  created() {
    this.$store.dispatch('getUsersList')
  }
};

</script>

<style>
</style>