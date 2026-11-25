<template>
  <div class="users">
    <users-list :users="users" :userID='userID' 
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

  computed: {
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